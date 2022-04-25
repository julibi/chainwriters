import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { experimentalAddHardhatNetworkMessageTraceHook } from "hardhat/config";
import { ProjectDao } from "../typechain";

const wait = (seconds: number) => new Promise((resolve, _) => {
  setTimeout(resolve, seconds * 1000)
})

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
  let ProjectDaoAsContribB: ProjectDao;
  let title: string;
  let textIpfsHash: string

  beforeEach(async function() {
    [factory, author, contribA, contribB, userA, userB] = await ethers.getSigners();

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
    console.log({userA});
    ProjectDaoAsAuthor = ProjectDao.connect(author);
    ProjectDaoAsUserA = ProjectDao.connect(userA);
    ProjectDaoAsUserB = ProjectDao.connect(userB);
    ProjectDaoAsContribB = ProjectDao.connect(contribB)
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
     
     const Buy1Tx = await ProjectDaoAsUserA.buy({value: "50000000000000000"});
     await Buy1Tx.wait();
     const balanceOfUserA = await ProjectDao.balanceOf(userA.address, 1);
     expect(balanceOfUserA).to.equal(1);
  });

  it("only allows buying until Gen Ed is sold out",  async () =>  {
    // authorMint + trigger
    const max = await ProjectDao.currentEditionMax();
    const authorMintTx = await ProjectDaoAsAuthor.authorMint(2);
    await authorMintTx.wait();
    const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(1000);
    await triggerFirstAuctionTx.wait();

    const Buy1Tx = await ProjectDaoAsUserA.buy({value: "50000000000000000"});
    await Buy1Tx.wait();
    const Buy2Tx = await ProjectDaoAsUserB.buy({value: "50000000000000000"});
    await Buy2Tx.wait();

    await expect(
      ProjectDaoAsAuthor.buy({value: "50000000000000000"})
    ).to.be.revertedWith("Auctions finished");
 });

 it("requires users to at least pay the current price",  async () =>  {
  // authorMint + trigger
  const max = await ProjectDao.currentEditionMax();
  const authorMintTx = await ProjectDaoAsAuthor.authorMint(2);
  await authorMintTx.wait();
  const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(1000);
  await triggerFirstAuctionTx.wait();

  const Buy1Tx = await ProjectDaoAsUserA.buy({value: "50000000000000000"});
  await Buy1Tx.wait();
  await expect(
    ProjectDaoAsUserB.buy({value: "20000000000000000"})
  ).to.be.revertedWith("Value sent not sufficient.");

});

  it("lets author add contributors",  async () =>  {
    const authorAddsContribTx = await ProjectDaoAsAuthor.addContributor(contribA.address, 50, 'editor');
    await authorAddsContribTx.wait();
    const contributor = await ProjectDao.contributors(0);
    expect(contributor.share).to.equal(50);
    expect(contributor.shareRecipient).to.equal(contribA.address);
  });

  it("distributes shares after sellout of Gen Ed", async () => {
    const authorAddsContribTx = await ProjectDaoAsAuthor.addContributor(contribA.address, 50, 'editor');
    await authorAddsContribTx.wait();
    const authorMintTx = await ProjectDaoAsAuthor.authorMint(1);
    await authorMintTx.wait();
    const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(1000000);
    await triggerFirstAuctionTx.wait();

    const provider = waffle.provider;
    const authorBalanceBefore = await provider.getBalance(author.address);
    const contribBalanceBefore = await provider.getBalance(contribA.address);

    const Buy1Tx = await ProjectDaoAsUserA.buy({value: "50000000000000000"});
    await Buy1Tx.wait();
    const Buy2Tx = await ProjectDaoAsUserB.buy({value: "50000000000000000"});
    await Buy2Tx.wait();
    const Buy3Tx = await ProjectDaoAsContribB.buy({value: "50000000000000000"});
    await Buy3Tx.wait();

    const authorBalanceAfter = await provider.getBalance(author.address);
    const contribBalanceAfter = await provider.getBalance(contribA.address);
    
    const gainsAuthor = (parseInt(authorBalanceAfter._hex, 16) - parseInt(authorBalanceBefore._hex, 16));
    const gainsContributor = (parseInt(contribBalanceAfter._hex, 16) - parseInt(contribBalanceBefore._hex, 16));
    expect(gainsAuthor + gainsContributor).to.be.greaterThan(149999999999000000);
  });
});
