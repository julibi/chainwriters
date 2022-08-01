import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { formatEther } from "@ethersproject/units";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import {
  MoonpageManager,
  MoonpageCollection,
  MoonpageFactory,
  BallotsFactory,
  Ballot,
  AuctionsManager,
} from "../typechain";

// const wait = (seconds: number) =>
//   new Promise((resolve, _) => {
//     setTimeout(resolve, seconds * 1000);
//   });

const advanceDays = async (days: any) => {
  await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * days]);
  await ethers.provider.send("evm_mine", []);
};

describe("Project", function () {
  let factory: SignerWithAddress;
  let author: SignerWithAddress;
  let contribA: SignerWithAddress;
  let contribB: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let ManagerAsAuthor: MoonpageManager;
  let Manager: MoonpageManager;
  let AuctionsManager: AuctionsManager;
  let AuctionsManagerAsAuthor: AuctionsManager;
  let Factory: MoonpageFactory;
  let FactoryAsAuthor: MoonpageFactory;
  let Collection: MoonpageCollection;
  let CollectionAsAuthor: MoonpageCollection;
  let BallotsFactory: BallotsFactory;
  let BallotsFactoryAsAuthor: BallotsFactory;
  let Ballot: Ballot;
  let BallotAsAuthor: Ballot;
  let CollectionAddress: string;
  const title = "My little Phony";
  const symbol = "MLP";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const mintPrice = ethers.utils.parseUnits("0.1", 18);
  const firstEditionMax = 4;
  const provider = waffle.provider;

  beforeEach(async function () {
    [factory, author, contribA, contribB, userA, userB] =
      await ethers.getSigners();

    // deploy AuctionsManager
    const AuctionsManagerFactory = await ethers.getContractFactory(
      "AuctionsManager"
    );
    AuctionsManager = await AuctionsManagerFactory.deploy();
    AuctionsManagerAsAuthor = AuctionsManager.connect(author);

    // deploy dao
    const ManagerFactory = await ethers.getContractFactory("MoonpageManager");
    Manager = await ManagerFactory.deploy();

    // deploy factory
    const FactoryFactory = await ethers.getContractFactory("MoonpageFactory");
    Factory = await FactoryFactory.deploy(
      Manager.address,
      AuctionsManager.address
    );

    // connect to factory as author
    FactoryAsAuthor = Factory.connect(author);

    // set contracts
    // "factory" as in "deployer"
    const AuctionsManagerAsDeployer = AuctionsManager.connect(factory);
    await AuctionsManagerAsDeployer.setContracts(
      Manager.address,
      Factory.address
    );

    // connect to Dao as author
    ManagerAsAuthor = Manager.connect(author);

    // set factory inside dao
    const setFactoryTx = await Manager.setFactory(Factory.address);
    await setFactoryTx.wait();

    // author deploys own collection
    const createDaoTx = await FactoryAsAuthor.createDao(
      title,
      symbol,
      textIpfsHash,
      mintPrice,
      firstEditionMax
    );

    await createDaoTx.wait();

    CollectionAddress = await Factory.collections(0);
    const CollectionFactory = await ethers.getContractFactory(
      "MoonpageCollection"
    );
    Collection = CollectionFactory.attach(CollectionAddress);

    //connect to Collection as author
    CollectionAsAuthor = Collection.connect(author);

    // deploy BallotsFactory
    const BallotsFactoryFactory = await ethers.getContractFactory(
      "BallotsFactory"
    );
    BallotsFactory = await BallotsFactoryFactory.deploy(Manager.address);
    BallotsFactoryAsAuthor = BallotsFactory.connect(author);
  });

  describe("happy path", async () => {
    it("from configuration to sellout of genEd and gen2", async () => {
      // configure
      const baseDataBefore = await Manager.baseDatas(CollectionAddress);
      const genreBefore = baseDataBefore.genre;
      const subtitleBefore = baseDataBefore.subtitle;
      const configureTx = await ManagerAsAuthor.configureProjectDetails(
        CollectionAddress,
        "",
        "",
        "Fiction",
        "My fancy subtitle"
      );
      await configureTx.wait();
      const baseDataAfter = await ManagerAsAuthor.baseDatas(CollectionAddress);
      const genreAfter = baseDataAfter.genre;
      const subtitleAfter = baseDataAfter.subtitle;
      const titleAfter = baseDataAfter.title;
      // data is set correctly inside Dao
      expect(genreBefore).to.equal("");
      expect(subtitleBefore).to.equal("");
      expect(genreAfter).to.equal("Fiction");
      expect(subtitleAfter).to.equal("My fancy subtitle");
      // and data is reflected in Collection, too
      expect(titleAfter).to.equal(title);
      expect(await Collection.moonpageManager()).to.equal(Manager.address);
      // // add contributors
      const addContribsTx = await ManagerAsAuthor.addContributors(
        CollectionAddress,
        [contribA.address, contribB.address],
        [25, 15],
        ["co-writer", "marketer"]
      );
      await addContribsTx.wait();
      const firstContributor = await Manager.contributions(
        CollectionAddress,
        0
      );
      const secondContributor = await Manager.contributions(
        CollectionAddress,
        1
      );
      expect(firstContributor[0]).to.equal(contribA.address);
      expect(secondContributor[0]).to.equal(contribB.address);
      const discountRate = 10000000000;
      const authorOwnsAmount = 2;
      // author triggers collection
      await CollectionAsAuthor.startAuctions(
        authorOwnsAmount,
        "ipfs://testuri",
        discountRate
      );
      // author owns correct amount now
      expect(await Collection.balanceOf(author.address)).to.equal(
        authorOwnsAmount
      );
      // preminted is two
      expect(await Collection.premintedByCreator()).to.equal(authorOwnsAmount);
      // discountRate is correct
      const auctionSettings = await AuctionsManager.auctions(CollectionAddress);
      expect(auctionSettings.discountRate).to.equal(discountRate);
      // auctionStarted is true
      expect(auctionSettings.auctionsStarted).to.equal(true);
      // start At is correct
      // expiresAt is set
      // userA sucessfully buys
      const CollectionAsUserA = Collection.connect(userA);
      await CollectionAsUserA.buy({
        value: mintPrice,
      });
      expect(await Collection.balanceOf(userA.address)).to.equal(1);
      // get user balance before distribution of shares
      const authorBalanceBefore = await provider.getBalance(author.address);
      const contribABalanceBefore = await provider.getBalance(contribA.address);
      const contribBBalanceBefore = await provider.getBalance(contribB.address);
      // userA sucessfully buys
      const CollectionAsUserB = Collection.connect(userB);
      const selloutTx = await CollectionAsUserB.buy({
        value: mintPrice,
      });
      await selloutTx.wait();
      expect(await Collection.balanceOf(userB.address)).to.equal(1);
      // check if total balance is split correctly
      // factory gets 15%, co-writer gets 25%, marketer 15% and author the rest
      const collectionBalance = await provider.getBalance(Collection.address);
      const factoryBalance = await provider.getBalance(Factory.address);
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
      // expect(gainsAuthor).to.equal("0.09");
      // expect(gainsContribA).to.equal("0.05");
      // expect(gainsContribB).to.equal("0.03");
      // expect(formatEther(factoryBalance)).to.equal("0.03");
      // expect(formatEther(collectionBalance)).to.equal("0.0");
      // author can enable next edition
      const enableNextEdTX = await CollectionAsAuthor.enableNextEdition(
        4,
        mintPrice
      );
      await enableNextEdTX.wait();
      const newEdition = await Collection.edition();
      expect(parseInt(newEdition.current._hex, 16)).to.equal(2);
      expect(parseInt(newEdition.maxAmount._hex, 16)).to.equal(8);
      expect(formatEther(newEdition.mintPrice._hex)).to.equal("0.1");
      // after second edition sells out, funds are correctly distributed again
      const userAMintTx = await CollectionAsUserA.publicMint(2, {
        value: mintPrice.mul(2),
      });
      await userAMintTx.wait();
      const ed2BalanceUserA = await Collection.balanceOf(userA.address);
      expect(ed2BalanceUserA).to.equal(3);
      const userBMintTx = await CollectionAsUserB.publicMint(1, {
        value: mintPrice,
      });
      await userBMintTx.wait();
      const ed2BalanceUserB = await Collection.balanceOf(userB.address);
      expect(ed2BalanceUserB).to.equal(2);
      const factoryBalance2 = await provider.getBalance(Factory.address);
      // expect(formatEther(factoryBalance2)).to.equal("0.03");
      const newAuthorBalance = await provider.getBalance(author.address);
      const newContribABalance = await provider.getBalance(contribA.address);
      const newContribBBalance = await provider.getBalance(contribB.address);
      const authorTotalGains = newAuthorBalance.sub(authorBalanceBefore);
      const contribATotalGains = newContribABalance.sub(contribABalanceBefore);
      const contribBTotalGains = newContribBBalance.sub(contribBBalanceBefore);

      // this varies a bit depending on gas... do a "more or less comparison" or deduct the gas fees
      // expect(formatEther(authorTotalGains)).to.equal("0.089944618316026652");
      // expect(formatEther(contribATotalGains)).to.equal("0.05");
      // expect(formatEther(contribBTotalGains)).to.equal("0.03");

      // afterwards author creates (deploys) a ballot and starts a vote
      await BallotsFactoryAsAuthor.createBallot(CollectionAddress);
      const ballotAddress = await BallotsFactoryAsAuthor.ballots(
        CollectionAddress
      );
      const BallotFactory = await ethers.getContractFactory("Ballot");
      Ballot = BallotFactory.attach(ballotAddress);
      BallotAsAuthor = Ballot.connect(author);

      await BallotAsAuthor.startVote(
        "Publish it as a real book?",
        ["Yes", "No", "abstention"],
        false
      );

      // userA votes with tokenId 2 - she votes 0->"yes"
      const BallotAsUserA = Ballot.connect(userA);
      await BallotAsUserA.vote(2, 0);

      // userB votes with tokenId 3 - he votes 1->"no"
      const BallotAsUserB = Ballot.connect(userB);
      await BallotAsUserB.vote(3, 1);

      // vote cannot be ended before expiry or before everyone has voted
      await expect(BallotAsAuthor.endVote()).to.revertedWith(
        "Vote not yet expired"
      );

      // userA votes some more for yes, coz she got another 2
      await BallotAsUserA.vote(4, 0);
      await BallotAsUserA.vote(5, 0);

      // vote ends and results can be read
      await advanceDays(9);
      await expect(BallotAsAuthor.endVote()).to.not.reverted;
      const voteResults = await Ballot.voteSettings(0);
      expect(voteResults.votesCount).to.equal("4");
      expect(voteResults.option1Votes).to.equal("3");
      expect(voteResults.option2Votes).to.equal("1");
    });
  });
});

// TODO - test all around the auction e.g. correct discount rate!
// TODO all unhappy cases and requires!
// TODO - the roles are not correct. Make sure the deployer can access all funds and set Factory etc.
// royalties - only to

// proxy

// events everywhere
// emergencywithdraw everywhere
// everything upgradable
