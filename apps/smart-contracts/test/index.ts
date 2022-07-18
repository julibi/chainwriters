import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { formatEther } from "@ethersproject/units";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ProjectDao, ProjectCollection, ProjectFactory } from "../typechain";

const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });
const advanceDays = async (hours: any) => {
  await ethers.provider.send("evm_increaseTime", [60 * 60 * hours]);
  await ethers.provider.send("evm_mine", []);
};

describe("ProjectDao", function () {
  let factory: SignerWithAddress;
  let author: SignerWithAddress;
  let contribA: SignerWithAddress;
  let contribB: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let ProjectDaoAsAuthor: ProjectDao;
  let ProjectDao: ProjectDao;
  let ProjectFactoryAsAuthor: ProjectFactory;
  let ProjectFactory: ProjectFactory;
  let ProjectCollection: ProjectCollection;
  let ProjectCollectionAsAuthor: ProjectCollection;
  let CollectionAddress: string;
  const title = "My little Phony";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const initialMintPrice = ethers.utils.parseUnits("0.05", 18);
  const firstEditionMax = 4;
  const provider = waffle.provider;

  beforeEach(async function () {
    [factory, author, contribA, contribB, userA, userB] =
      await ethers.getSigners();

    // deploy dao
    const projectDaoFactory = await ethers.getContractFactory("ProjectDao");
    ProjectDao = await projectDaoFactory.deploy();

    // deploy factory
    const projectFactoryFactory = await ethers.getContractFactory(
      "ProjectFactory"
    );
    ProjectFactory = await projectFactoryFactory.deploy(ProjectDao.address);

    // connect to factory as author
    ProjectFactoryAsAuthor = ProjectFactory.connect(author);

    // connect to Dao as author
    ProjectDaoAsAuthor = ProjectDao.connect(author);

    // set factory inside dao
    await ProjectDao.setFactory(ProjectFactory.address);

    // author deploys own collection
    await ProjectFactoryAsAuthor.createDao(
      title,
      textIpfsHash,
      initialMintPrice,
      firstEditionMax
    );

    CollectionAddress = await ProjectFactory.collections(0);
    const ProjectCollectionFactory = await ethers.getContractFactory(
      "ProjectCollection"
    );
    ProjectCollection = ProjectCollectionFactory.attach(CollectionAddress);

    // connect to Collection as author
    ProjectCollectionAsAuthor = ProjectCollection.connect(author);
  });

  describe("first test", async () => {
    // triggerMint
    // buy
    it("should configure project data correctly", async () => {
      // configure

      const baseDataBefore = await ProjectDao.baseDatas(CollectionAddress);
      const genreBefore = baseDataBefore.genre;
      const subtitleBefore = baseDataBefore.subtitle;

      const configureTx = await ProjectDaoAsAuthor.configureProjectDetails(
        CollectionAddress,
        "",
        "",
        "Fiction",
        "My fancy subtitle"
      );
      await configureTx.wait();
      const baseDataAfter = await ProjectDaoAsAuthor.baseDatas(
        CollectionAddress
      );
      const genreAfter = baseDataAfter.genre;
      const subtitleAfter = baseDataAfter.subtitle;

      // data is set correctly inside Dao
      expect(genreBefore).to.equal("");
      expect(subtitleBefore).to.equal("");
      expect(genreAfter).to.equal("Fiction");
      expect(subtitleAfter).to.equal("My fancy subtitle");

      // and data is reflected in Collection, too
      expect(await ProjectCollection.name()).to.equal(baseDataAfter[0]);
      expect(await ProjectCollection.daoManager()).to.equal(ProjectDao.address);

      // add contributors
      const addContribsTx = await ProjectDaoAsAuthor.addContributors(
        CollectionAddress,
        [contribA.address, contribB.address],
        [25, 15],
        ["co-writer", "marketer"]
      );
      await addContribsTx.wait();
      const firstContributor = await ProjectDao.contributions(
        CollectionAddress,
        0
      );
      const secondContributor = await ProjectDao.contributions(
        CollectionAddress,
        1
      );

      expect(firstContributor[0]).to.equal(contribA.address);
      expect(secondContributor[0]).to.equal(contribB.address);
      const discountRate = 10000000000;
      const authorOwnsAmount = 2;

      // author triggers collection
      await ProjectCollectionAsAuthor.triggerFirstAuction(
        authorOwnsAmount,
        "newUriTest",
        discountRate
      );
      // const openingTime = Math.floor(new Date().getTime() / 1000);

      // author owns correct amount now

      expect(await ProjectCollection.balanceOf(author.address, 1)).to.equal(
        authorOwnsAmount
      );
      // preminted is two
      expect(await ProjectCollection.premintedByAuthor()).to.equal(
        authorOwnsAmount
      );
      // discountRate is correct
      expect(await ProjectCollection.discountRate()).to.equal(discountRate);
      // auctionStarted is true
      expect(await ProjectCollection.auctionsStarted()).to.equal(true);

      // start At is correct
      // expiresAt is set

      // TODO - test with correct discount rate!
      // userA sucessfully buys
      const ProjectCollectionAsUserA = ProjectCollection.connect(userA);
      await ProjectCollectionAsUserA.buy({
        value: initialMintPrice,
      });
      expect(await ProjectCollection.balanceOf(userA.address, 1)).to.equal(1);

      // get user balance before distribution of shares
      const authorBalanceBefore = await provider.getBalance(author.address);
      const contribABalanceBefore = await provider.getBalance(contribA.address);
      const contribBBalanceBefore = await provider.getBalance(contribB.address);

      // userA sucessfully buys
      const ProjectCollectionAsUserB = ProjectCollection.connect(userB);
      const selloutTx = await ProjectCollectionAsUserB.buy({
        value: initialMintPrice,
      });
      await selloutTx.wait();
      expect(await ProjectCollection.balanceOf(userB.address, 1)).to.equal(1);

      // check if total balance is split correctly
      // factory gets 15%, co-writer gets 25%, marketer 15% and author the rest

      const collectionBalance = await provider.getBalance(
        ProjectCollection.address
      );

      const factoryBalance = await provider.getBalance(ProjectFactory.address);

      const authorBalanceAfter = await provider.getBalance(author.address);
      const contribABalanceAfter = await provider.getBalance(contribA.address);
      const contribBBalanceAfter = await provider.getBalance(contribB.address);

      const gainsAuthor = formatEther(
        authorBalanceAfter.sub(authorBalanceBefore)
      );
      const gainsContribA = formatEther(
        contribABalanceAfter.sub(contribABalanceBefore)
      );
      const gainsContribB = formatEther(
        contribBBalanceAfter.sub(contribBBalanceBefore)
      );

      expect(gainsAuthor).to.equal("0.045");
      expect(gainsContribA).to.equal("0.025");
      expect(gainsContribB).to.equal("0.015");
      expect(formatEther(factoryBalance)).to.equal("0.015");
    });
  });

  // it("author should be able to claim nfts", async () => {
  //   const authorMintTx = await ProjectDaoAsAuthor.authorMint(2);
  //   await authorMintTx.wait();
  //   const author = await ProjectDao.author();

  //   expect(author.hasClaimedGenesis).to.equal(true);
  //   expect(author.claimedAmount).to.equal(2);
  // });

  // it("author cannot claim max amount", async () => {
  //   const max = await ProjectDao.currentEditionMax();
  //   console.log({ max });
  //   await expect(ProjectDaoAsAuthor.authorMint(max)).to.be.revertedWith(
  //     "Invalid amount"
  //   );
  // });

  // it("can only trigger auction, when author has claimed her share", async () => {
  //   // state before authorMint
  //   await expect(
  //     ProjectDaoAsAuthor.triggerFirstAuction(1000)
  //   ).to.be.revertedWith("Mint tokens before triggering auctions");
  //   const auctionStarted = await ProjectDaoAsAuthor.auctionStarted();
  //   expect(auctionStarted).to.equal(false);

  //   // authorMint + trigger
  //   const authorMintTx = await ProjectDaoAsAuthor.authorMint(1);
  //   await authorMintTx.wait();
  //   const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(
  //     1000
  //   );
  //   await triggerFirstAuctionTx.wait();

  //   // auction running
  //   const auctionShouldHaveStarted = await ProjectDaoAsAuthor.auctionStarted();
  //   expect(auctionShouldHaveStarted).to.equal(true);
  // });

  // it("allows users to mint, once auction was triggered", async () => {
  //   // authorMint + trigger
  //   const authorMintTx = await ProjectDaoAsAuthor.authorMint(2);
  //   await authorMintTx.wait();
  //   const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(
  //     1000
  //   );
  //   await triggerFirstAuctionTx.wait();

  //   const Buy1Tx = await ProjectDaoAsUserA.buy({ value: "50000000000000000" });
  //   await Buy1Tx.wait();
  //   const balanceOfUserA = await ProjectDao.balanceOf(userA.address, 1);
  //   expect(balanceOfUserA).to.equal(1);
  // });

  // it("only allows buying until Gen Ed is sold out", async () => {
  //   // authorMint + trigger
  //   const max = await ProjectDao.currentEditionMax();
  //   const authorMintTx = await ProjectDaoAsAuthor.authorMint(2);
  //   await authorMintTx.wait();
  //   const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(
  //     1000
  //   );
  //   await triggerFirstAuctionTx.wait();

  //   const Buy1Tx = await ProjectDaoAsUserA.buy({ value: "50000000000000000" });
  //   await Buy1Tx.wait();
  //   const Buy2Tx = await ProjectDaoAsUserB.buy({ value: "50000000000000000" });
  //   await Buy2Tx.wait();

  //   await expect(
  //     ProjectDaoAsAuthor.buy({ value: "50000000000000000" })
  //   ).to.be.revertedWith("Auctions finished");
  // });

  // it("requires users to at least pay the current price", async () => {
  //   // authorMint + trigger
  //   const max = await ProjectDao.currentEditionMax();
  //   const authorMintTx = await ProjectDaoAsAuthor.authorMint(2);
  //   await authorMintTx.wait();
  //   const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(
  //     1000
  //   );
  //   await triggerFirstAuctionTx.wait();

  //   const Buy1Tx = await ProjectDaoAsUserA.buy({ value: "50000000000000000" });
  //   await Buy1Tx.wait();
  //   await expect(
  //     ProjectDaoAsUserB.buy({ value: "20000000000000000" })
  //   ).to.be.revertedWith("Value sent not sufficient.");
  // });

  // it("lets author add contributors", async () => {
  //   const authorAddsContribTx = await ProjectDaoAsAuthor.addContributor(
  //     contribA.address,
  //     50,
  //     "editor"
  //   );
  //   await authorAddsContribTx.wait();
  //   const contributor = await ProjectDao.contributors(0);
  //   expect(contributor.share).to.equal(50);
  //   expect(contributor.shareRecipient).to.equal(contribA.address);
  // });

  // it("distributes shares after sellout of Gen Ed", async () => {
  //   const authorAddsContribTx = await ProjectDaoAsAuthor.addContributor(
  //     contribA.address,
  //     50,
  //     "editor"
  //   );
  //   await authorAddsContribTx.wait();
  //   const authorMintTx = await ProjectDaoAsAuthor.authorMint(1);
  //   await authorMintTx.wait();
  //   const triggerFirstAuctionTx = await ProjectDaoAsAuthor.triggerFirstAuction(
  //     1000000
  //   );
  //   await triggerFirstAuctionTx.wait();

  //   const provider = waffle.provider;
  //   const authorBalanceBefore = await provider.getBalance(author.address);
  //   const contribBalanceBefore = await provider.getBalance(contribA.address);

  //   const Buy1Tx = await ProjectDaoAsUserA.buy({ value: "50000000000000000" });
  //   await Buy1Tx.wait();
  //   const Buy2Tx = await ProjectDaoAsUserB.buy({ value: "50000000000000000" });
  //   await Buy2Tx.wait();
  //   const Buy3Tx = await ProjectDaoAsContribB.buy({
  //     value: "50000000000000000",
  //   });
  //   await Buy3Tx.wait();

  //   const authorBalanceAfter = await provider.getBalance(author.address);
  //   const contribBalanceAfter = await provider.getBalance(contribA.address);

  //   const gainsAuthor =
  //     parseInt(authorBalanceAfter._hex, 16) -
  //     parseInt(authorBalanceBefore._hex, 16);
  //   const gainsContributor =
  //     parseInt(contribBalanceAfter._hex, 16) -
  //     parseInt(contribBalanceBefore._hex, 16);
  //   expect(gainsAuthor + gainsContributor).to.be.greaterThan(
  //     149999999999000000
  //   );
  // });
});
