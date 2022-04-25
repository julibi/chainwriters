import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { wait } from "../scripts/deployAll";
import { ProjectDao } from "../typechain";

describe("ProjectDao", function () {
  let factory: SignerWithAddress;
  let author: SignerWithAddress;
  let contribA: SignerWithAddress;
  let contribB: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let ProjectDao: ProjectDao;
  let ProjectDaoAsAuthor: ProjectDao;
  let ProjectDaoAsUserA: ProjectDao;
  let ProjectDaoAsUserB: ProjectDao;
  let title: string;
  let textIpfsHash: string

  beforeEach(async function() {
    const [factory, author, contribA, contribB, userA, userB] = await ethers.getSigners();

    // deploy args
    const title = "My little Phony";
    const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
    const initialMintPrice = ethers.utils.parseUnits("0.05", 18);
    const firstEditionMax = 4;
    // deploy contract
    const projectDaoFactory = await ethers.getContractFactory("ProjectDao", factory);
    ProjectDao = await projectDaoFactory.deploy(
      title,
      author.address,
      textIpfsHash,
      initialMintPrice,
      firstEditionMax,
      // not correc,but not important for testing
      author.address
    );
    ProjectDaoAsAuthor = ProjectDao.connect(author);
    ProjectDaoAsUserA = ProjectDao.connect(userA);
    ProjectDaoAsUserB = ProjectDao.connect(userB);
  });

  it("should configure project data correctly",  async () =>  {
    const projectGenreBefore = (await ProjectDao.project()).genre;

    const configureTx = await ProjectDaoAsAuthor.configureProjectDetails("", "", "Fiction", "");
    await configureTx.wait();
    const projectGenreAfter = (await ProjectDaoAsAuthor.project()).genre;
    expect(projectGenreBefore).to.equal("");
    expect(projectGenreAfter).to.equal("Fiction");
  });

  it("author should be able to claim nfts",  async () =>  {
    const authorMintTx = await ProjectDaoAsAuthor.authorMint(2);
    await authorMintTx.wait();
    const author = (await ProjectDao.author());

    expect(author.hasClaimedGenesis).to.equal(true);
    expect(author.claimedAmount).to.equal(2);
  });

  it("author cannot claim max amount",  async () =>  {
    const max = await ProjectDao.currentEditionMax();
    console.log({max})
    await expect(
      ProjectDaoAsAuthor.authorMint(max)
    ).to.be.revertedWith("Invalid amount");
  });

  it("can only trigger auction, when author has claimed her share",  async () =>  {
    // state before authorMint
    await expect(
      ProjectDaoAsAuthor.triggerFirstAuction(1000)
    ).to.be.revertedWith("Mint tokens before triggering auctions");
    const auctionStarted = await ProjectDaoAsAuthor.auctionStarted();
    expect(auctionStarted).to.equal(false);

    // authorMint + trigger
    const authorMintTx = await ProjectDaoAsAuthor.authorMint(1);
    await authorMintTx.wait();
    const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(1000);
    await triggerFirstAuctionTx.wait();

    // auction running
    const auctionShouldHaveStarted = await ProjectDaoAsAuthor.auctionStarted();
    expect(auctionShouldHaveStarted).to.equal(true);
  });

  it("allows users to mint, once auction was triggered",  async () =>  {
     // authorMint + trigger
     const authorMintTx = await ProjectDaoAsAuthor.authorMint(2);
     await authorMintTx.wait();
     const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(1000);
     await triggerFirstAuctionTx.wait();
 
     const Buy1Tx = await ProjectDaoAsUserA.buy();
     await Buy1Tx.wait();
     const balanceOfUserA = await ProjectDao.balanceOf(userA);
  });
});
