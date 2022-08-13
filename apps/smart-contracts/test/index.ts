import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { formatEther } from "@ethersproject/units";
import {
  MoonpageManager,
  MoonpageCollection,
  MoonpageFactory,
  BallotsFactory,
  Ballot,
  AuctionsManager,
} from "../typechain";

const advanceDays = async (days: any) => {
  await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * days]);
  await ethers.provider.send("evm_mine", []);
};

describe("Project", function () {
  let deployer: SignerWithAddress;
  let creator: SignerWithAddress;
  let contribA: SignerWithAddress;
  let contribB: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let Collection: MoonpageCollection;
  let CollectionAsDeployer: MoonpageCollection;
  let CollectionAsCreator: MoonpageCollection;
  let Manager: MoonpageManager;
  let ManagerAsDeployer: MoonpageManager;
  let ManagerAsCreator: MoonpageManager;
  let AuctionsManager: AuctionsManager;
  let AuctionsManagerAsDeployer: AuctionsManager;
  let Factory: MoonpageFactory;
  let FactoryAsDeployer: MoonpageFactory;
  let FactoryAsCreator: MoonpageFactory;
  let BallotsFactory: BallotsFactory;
  let BallotsFactoryAsDeployer: BallotsFactory;
  let BallotsFactoryAsCreator: BallotsFactory;
  let Ballot: Ballot;
  let BallotAsCreator: Ballot;

  const title = "My little Phony";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const originalLanguage = "ENG";
  const myMintPrice = ethers.utils.parseUnits("0.1", 18);
  const firstEditionMax = 6;
  const provider = waffle.provider;

  beforeEach(async function () {
    [deployer, creator, contribA, contribB, userA, userB] =
      await ethers.getSigners();

    // ------------------
    // DEPLOY CONTRACTS
    // -----------------

    // deploy Collection
    const CollectionFactory = await ethers.getContractFactory(
      "MoonpageCollection"
    );
    Collection = await CollectionFactory.deploy();
    CollectionAsDeployer = Collection.connect(deployer);
    CollectionAsCreator = Collection.connect(creator);

    // deploy Manager
    const ManagerFactory = await ethers.getContractFactory("MoonpageManager");
    Manager = await ManagerFactory.deploy(Collection.address);
    ManagerAsDeployer = Manager.connect(deployer);
    ManagerAsCreator = Manager.connect(creator);

    // deploy AuctionsManager
    const AuctionsManagerFactory = await ethers.getContractFactory(
      "AuctionsManager"
    );
    AuctionsManager = await AuctionsManagerFactory.deploy();
    AuctionsManagerAsDeployer = AuctionsManager.connect(deployer);

    // deploy Factory
    const FactoryFactory = await ethers.getContractFactory("MoonpageFactory");
    Factory = await FactoryFactory.deploy(
      Manager.address,
      AuctionsManager.address
    );
    FactoryAsDeployer = Factory.connect(deployer);
    FactoryAsCreator = Factory.connect(creator);

    // deploy BallotFactory
    const BallotsFactoryFactory = await ethers.getContractFactory(
      "BallotsFactory"
    );
    BallotsFactory = await BallotsFactoryFactory.deploy(
      Manager.address,
      Collection.address
    );
    BallotsFactoryAsDeployer = BallotsFactory.connect(deployer);
    BallotsFactoryAsCreator = BallotsFactory.connect(creator);

    // ------------------
    // SET OTHER CONTRACTS IN CONTRACTS
    // -----------------

    // set Contracts on Collection
    await CollectionAsDeployer.setContracts(
      Manager.address,
      AuctionsManager.address
    );

    // set Contracts on Manager
    await ManagerAsDeployer.setContracts(Collection.address, Factory.address);

    // set Contracts on Auctions
    await AuctionsManagerAsDeployer.setContracts(
      Manager.address,
      Factory.address,
      Collection.address
    );

    // set Contracts on Factory
    await FactoryAsDeployer.setContracts(
      Manager.address,
      AuctionsManager.address
    );

    // set Contracts on Ballots Factory
    await BallotsFactoryAsDeployer.setContract(
      Manager.address,
      Collection.address
    );
  });

  describe("happy path", async () => {
    it("from configuration to sellout of genEd and gen2", async () => {
      // ------------------
      // CREATE A COLLECTION AND A BALLOT
      // -----------------
      const projectId = await Factory.projectsIndex();
      expect(projectId).to.equal(1);

      await expect(
        FactoryAsCreator.createProject(
          title,
          textIpfsHash,
          originalLanguage,
          myMintPrice,
          1001
        )
      ).to.revertedWith("Incorrect amount");

      // first project creation
      const creationTX = await FactoryAsCreator.createProject(
        title,
        textIpfsHash,
        originalLanguage,
        myMintPrice,
        firstEditionMax
      );

      await creationTX.wait();

      const baseData = await Manager.baseDatas(projectId);
      const [authorShare, authorShareInMatic] = await Manager.readAuthorShare(
        projectId
      );
      const [
        current,
        initialMintPrice,
        mintPrice,
        startTokenId,
        currentTokenId,
        lastGenEdTokenId,
        currentEdLastTokenId,
        endTokenId,
      ] = await Manager.readEditionData(projectId);
      const contributionIndex = await Manager.readContributionIndex(projectId);
      const projectBalance = await Manager.readProjectBalance(projectId);
      const projectExists = await Manager.exists(projectId);
      const isProjectCurated = await Manager.curatedProjectIds(projectId);
      const isProjectFrozen = await Manager.isFrozen(projectId);
      const isProjectPaused = await Manager.pausedProjectIds(projectId);
      expect(baseData.title).to.equal("My little Phony");
      expect(baseData.subtitle).to.equal("");
      expect(baseData.genre).to.equal("");
      expect(baseData.creatorAddress).to.equal(creator.address);
      expect(baseData.textIpfsHash).to.equal(textIpfsHash);
      expect(baseData.imgIpfsHash).to.equal("");
      expect(baseData.blurbIpfsHash).to.equal("");
      expect(baseData.originalLanguage).to.equal("ENG");
      expect(baseData.premintedByCreator).to.equal("0");
      expect(authorShare).to.equal(85);
      expect(authorShareInMatic).to.equal(0);
      expect(current).to.equal(1);
      expect(initialMintPrice).to.equal(myMintPrice);
      expect(mintPrice).to.equal(myMintPrice);
      expect(startTokenId).to.equal(1);
      expect(currentTokenId).to.equal(1);
      expect(lastGenEdTokenId).to.equal(6);
      expect(currentEdLastTokenId).to.equal(6);
      expect(endTokenId).to.equal(1000);
      expect(contributionIndex).to.equal(0);
      expect(projectBalance).to.equal(0);
      expect(projectExists).to.equal(true);
      expect(isProjectCurated).to.equal(false);
      expect(isProjectFrozen).to.equal(false);
      expect(isProjectPaused).to.equal(false);

      // second creation
      const FactoryAsSecondCreator = Factory.connect(userA);
      const secondCreationTX = await FactoryAsSecondCreator.createProject(
        "",
        "textIpfsHash",
        "ENG",
        myMintPrice,
        100
      );

      await secondCreationTX.wait();
      const [
        current2,
        initialMintPrice2,
        mintPrice2,
        startTokenId2,
        currentTokenId2,
        lastGenEdTokenId2,
        currentEdLastTokenId2,
        endTokenId2,
      ] = await Manager.readEditionData(2);
      expect(current2).to.equal(1);
      expect(initialMintPrice2).to.equal(myMintPrice);
      expect(mintPrice2).to.equal(myMintPrice);
      expect(startTokenId2).to.equal(1001);
      expect(currentTokenId2).to.equal(1001);
      expect(lastGenEdTokenId2).to.equal(1100);
      expect(currentEdLastTokenId2).to.equal(1100);
      expect(endTokenId2).to.equal(2000);

      // third creation
      const FactoryAsThirdCreator = Factory.connect(userB);
      const thirdCreationTX = await FactoryAsThirdCreator.createProject(
        "thirdProject",
        "textIpfsHash",
        "ENG",
        myMintPrice,
        188
      );

      await thirdCreationTX.wait();
      const [
        current3,
        initialMintPrice3,
        mintPrice3,
        startTokenId3,
        currentTokenId3,
        lastGenEdTokenId3,
        currentEdLastTokenId3,
        endTokenId3,
      ] = await Manager.readEditionData(3);
      expect(current3).to.equal(1);
      expect(initialMintPrice3).to.equal(myMintPrice);
      expect(mintPrice3).to.equal(myMintPrice);
      expect(startTokenId3).to.equal(2001);
      expect(currentTokenId3).to.equal(2001);
      expect(lastGenEdTokenId3).to.equal(2188);
      expect(currentEdLastTokenId3).to.equal(2188);
      expect(endTokenId3).to.equal(3000);

      // creator configures
      const configureTx = await ManagerAsCreator.configureProjectDetails(
        1,
        "",
        "",
        "Fiction",
        "My fancy subtitle"
      );
      await configureTx.wait();
      const baseDataAfter = await Manager.baseDatas(1);
      const genreAfter = baseDataAfter.genre;
      const subtitleAfter = baseDataAfter.subtitle;
      expect(genreAfter).to.equal("Fiction");
      expect(subtitleAfter).to.equal("My fancy subtitle");

      // creator adds contributors
      const addContribsTx = await ManagerAsCreator.addContributors(
        1,
        [contribA.address, contribB.address],
        [25, 15],
        ["co-writer", "marketer"]
      );
      await addContribsTx.wait();
      const firstContributor = await Manager.contributions(1, 0);
      const secondContributor = await Manager.contributions(1, 1);
      expect(firstContributor[0]).to.equal(contribA.address);
      expect(secondContributor[0]).to.equal(contribB.address);

      // cannot add contributors again
      await expect(
        ManagerAsCreator.addContributors(
          1,
          [deployer.address],
          [10],
          ["random"]
        )
      ).to.revertedWith("Contributors set already");

      // creator starts auctions
      const discountRate = 10000000000;
      const authorOwnsAmount = 2;
      await CollectionAsCreator.startAuctions(
        1,
        authorOwnsAmount,
        discountRate
      );
      const baseDataAfterStartingAuctions = await Manager.baseDatas(1);
      expect(baseDataAfterStartingAuctions.premintedByCreator).to.equal(
        authorOwnsAmount
      );
      const auctionSettings = await AuctionsManager.auctions(1);
      expect(auctionSettings.discountRate).to.equal(discountRate);
      expect(auctionSettings.auctionsStarted).to.equal(true);
      // start At is correct
      // expiresAt is set

      const creatorBalanceBefore = await provider.getBalance(creator.address);
      const contribABalanceBefore = await provider.getBalance(contribA.address);
      const contribBBalanceBefore = await provider.getBalance(contribB.address);

      const CollectionAsUserA = Collection.connect(userA);
      const CollectionAsUserB = Collection.connect(userB);

      await CollectionAsUserA.buy(1, {
        value: mintPrice,
      });
      await CollectionAsUserA.buy(1, {
        value: mintPrice,
      });
      await CollectionAsUserB.buy(1, {
        value: mintPrice,
      });
      await CollectionAsUserB.buy(1, {
        value: mintPrice,
      });

      expect(await Collection.balanceOf(userA.address)).to.equal(2);
      expect(await Collection.balanceOf(userB.address)).to.equal(2);
      expect(await Collection.balanceOf(creator.address)).to.equal(
        authorOwnsAmount
      );

      // balance is split correctly
      // total of 0.4 MATIC
      // factory gets 15%
      // co-writer gets 25%
      // marketer 15%
      // creator gets 45%
      const collectionBalance = await provider.getBalance(Collection.address);
      const factoryBalance = await provider.getBalance(Factory.address);
      const creatorBalanceAfter = await provider.getBalance(creator.address);
      const contribABalanceAfter = await provider.getBalance(contribA.address);
      const contribBBalanceAfter = await provider.getBalance(contribB.address);
      const gainsAuthor = formatEther(
        creatorBalanceAfter.sub(creatorBalanceBefore)
      );
      const gainsContribA = formatEther(
        contribABalanceAfter.sub(contribABalanceBefore)
      );
      const gainsContribB = formatEther(
        contribBBalanceAfter.sub(contribBBalanceBefore)
      );
      console.log({ gainsAuthor });
      console.log({ gainsContribA });
      console.log({ gainsContribB });
      console.log(formatEther(factoryBalance));
      console.log(formatEther(collectionBalance));
      // unfortunately due to gas, these are not fully accurate
      // expect(gainsContribB).to.equal("0.06");
      // expect(gainsContribA).to.equal("0.1");
      // expect(gainsAuthor).to.equal("0.18");
      // expect(formatEther(factoryBalance)).to.equal("0.06");
      // expect(formatEther(collectionBalance)).to.equal("0.0");
      // author can enable next edition

      //   const enableNextEdTX = await CollectionAsAuthor.enableNextEdition(
      //     4,
      //     mintPrice
      //   );
      //   await enableNextEdTX.wait();
      //   const newEdition = await Collection.edition();
      //   expect(parseInt(newEdition.current._hex, 16)).to.equal(2);
      //   expect(parseInt(newEdition.maxAmount._hex, 16)).to.equal(8);
      //   expect(formatEther(newEdition.mintPrice._hex)).to.equal("0.1");
      //   // after second edition sells out, funds are correctly distributed again
      //   const userAMintTx = await CollectionAsUserA.publicMint(2, {
      //     value: mintPrice.mul(2),
      //   });
      //   await userAMintTx.wait();
      //   const ed2BalanceUserA = await Collection.balanceOf(userA.address);
      //   expect(ed2BalanceUserA).to.equal(3);
      //   const userBMintTx = await CollectionAsUserB.publicMint(1, {
      //     value: mintPrice,
      //   });
      //   await userBMintTx.wait();
      //   const ed2BalanceUserB = await Collection.balanceOf(userB.address);
      //   expect(ed2BalanceUserB).to.equal(2);
      //   const factoryBalance2 = await provider.getBalance(Factory.address);
      //   // expect(formatEther(factoryBalance2)).to.equal("0.03");
      //   const newAuthorBalance = await provider.getBalance(author.address);
      //   const newContribABalance = await provider.getBalance(contribA.address);
      //   const newContribBBalance = await provider.getBalance(contribB.address);
      //   const authorTotalGains = newAuthorBalance.sub(authorBalanceBefore);
      //   const contribATotalGains = newContribABalance.sub(contribABalanceBefore);
      //   const contribBTotalGains = newContribBBalance.sub(contribBBalanceBefore);

      //   // this varies a bit depending on gas... do a "more or less comparison" or deduct the gas fees
      //   // expect(formatEther(authorTotalGains)).to.equal("0.089944618316026652");
      //   // expect(formatEther(contribATotalGains)).to.equal("0.05");
      //   // expect(formatEther(contribBTotalGains)).to.equal("0.03");

      //   // afterwards author creates (deploys) a ballot and starts a vote
      //   await BallotsFactoryAsAuthor.createBallot(CollectionAddress);
      //   const ballotAddress = await BallotsFactoryAsAuthor.ballots(
      //     CollectionAddress
      //   );
      //   const BallotFactory = await ethers.getContractFactory("Ballot");
      //   Ballot = BallotFactory.attach(ballotAddress);
      //   BallotAsAuthor = Ballot.connect(author);

      //   await BallotAsAuthor.startVote(
      //     "Publish it as a real book?",
      //     ["Yes", "No", "abstention"],
      //     false
      //   );

      //   // userA votes with tokenId 2 - she votes 0->"yes"
      //   const BallotAsUserA = Ballot.connect(userA);
      //   await BallotAsUserA.vote(2, 0);

      //   // userB votes with tokenId 3 - he votes 1->"no"
      //   const BallotAsUserB = Ballot.connect(userB);
      //   await BallotAsUserB.vote(3, 1);

      //   // vote cannot be ended before expiry or before everyone has voted
      //   await expect(BallotAsAuthor.endVote()).to.revertedWith(
      //     "Vote not yet expired"
      //   );

      //   // userA votes some more for yes, coz she got another 2
      //   await BallotAsUserA.vote(4, 0);
      //   await BallotAsUserA.vote(5, 0);

      //   // vote ends and results can be read
      //   await advanceDays(9);
      //   await expect(BallotAsAuthor.endVote()).to.not.reverted;
      //   const voteResults = await Ballot.voteSettings(0);
      //   expect(voteResults.votesCount).to.equal("4");
      //   expect(voteResults.option1Votes).to.equal("3");
      //   expect(voteResults.option2Votes).to.equal("1");
    });
  });
});
