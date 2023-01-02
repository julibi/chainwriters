import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";

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

describe("Voting", function () {
  let deployer: SignerWithAddress;
  let creator: SignerWithAddress;
  let contribA: SignerWithAddress;
  let contribB: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let userC: SignerWithAddress;
  let userD: SignerWithAddress;
  let userE: SignerWithAddress;
  let userF: SignerWithAddress;
  let royaltiesReceiver: SignerWithAddress;
  let Collection: MoonpageCollection;
  let CollectionAsDeployer: MoonpageCollection;
  let CollectionAsCreator: MoonpageCollection;
  let CollectionAsUserA: MoonpageCollection;
  let CollectionAsUserB: MoonpageCollection;
  let CollectionAsUserC: MoonpageCollection;
  let Manager: any;

  let ManagerAsDeployer: MoonpageManager;
  let ManagerAsCreator: any;
  let AuctionsManager: any;
  let AuctionsManagerAsDeployer: AuctionsManager;
  let Factory: any;
  let FactoryAsDeployer: MoonpageFactory;
  let FactoryAsCreator: MoonpageFactory;
  let BallotsFactory: any;
  let BallotsFactoryAsDeployer: BallotsFactory;
  let BallotsFactoryAsCreator: BallotsFactory;
  let Ballot: Ballot;
  let BallotAsCreator: Ballot;
  let BallotAsDeployer: Ballot;

  const discountRate = 10000000000;
  const authorOwnsAmount = 2;
  const title = "My little Phony";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const originalLanguage = "ENG";
  const myMintPrice = ethers.utils.parseUnits("0.1", 18);
  const firstEditionMax = 10;

  beforeEach(async function () {
    [
      deployer,
      creator,
      contribA,
      contribB,
      userA,
      userB,
      userC,
      userD,
      userE,
      userF,
      royaltiesReceiver,
    ] = await ethers.getSigners();

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
    Manager = await upgrades.deployProxy(ManagerFactory, [], {
      kind: "uups",
    });

    ManagerAsDeployer = Manager.connect(deployer);
    ManagerAsCreator = Manager.connect(creator);

    // deploy AuctionsManager
    const AuctionsManagerFactory = await ethers.getContractFactory(
      "AuctionsManager"
    );
    AuctionsManager = await upgrades.deployProxy(AuctionsManagerFactory, [], {
      kind: "uups",
    });
    AuctionsManagerAsDeployer = AuctionsManager.connect(deployer);

    // deploy Factory
    const FactoryFactory = await ethers.getContractFactory("MoonpageFactory");
    Factory = await upgrades.deployProxy(
      FactoryFactory,
      [Manager.address, AuctionsManager.address, royaltiesReceiver.address],
      {
        kind: "uups",
      }
    );
    FactoryAsDeployer = Factory.connect(deployer);
    FactoryAsCreator = Factory.connect(creator);

    // deploy BallotFactory
    const BallotsFactoryFactory = await ethers.getContractFactory(
      "BallotsFactory"
    );
    BallotsFactory = await upgrades.deployProxy(
      BallotsFactoryFactory,
      [Manager.address, Collection.address],
      {
        kind: "uups",
      }
    );
    BallotsFactoryAsDeployer = BallotsFactory.connect(deployer);
    BallotsFactoryAsCreator = BallotsFactory.connect(creator);

    // ------------------
    // SET OTHER CONTRACTS IN CONTRACTS
    // -----------------

    // set Contracts on Collection
    await CollectionAsDeployer.setAddresses(
      Manager.address,
      AuctionsManager.address,
      deployer.address
    );

    // set Contracts on Manager
    await ManagerAsDeployer.setAddresses(
      Collection.address,
      Factory.address,
      deployer.address
    );

    // set Contracts on Auctions
    await AuctionsManagerAsDeployer.setContracts(
      Manager.address,
      Factory.address,
      Collection.address
    );

    // set Contracts on Factory
    await FactoryAsDeployer.setAddresses(
      Manager.address,
      AuctionsManager.address,
      royaltiesReceiver.address
    );

    // set Contracts on Ballots Factory
    await BallotsFactoryAsDeployer.setContract(
      Manager.address,
      Collection.address
    );

    CollectionAsUserA = Collection.connect(userA);
    CollectionAsUserB = Collection.connect(userB);
    CollectionAsUserC = Collection.connect(userC);
    const projectId = await Factory.projectsIndex();

    // ------------------
    // CREATE FIRST PROJECT - has Project ID 1
    // -----------------

    await FactoryAsDeployer.updateAllowlist(creator.address, true);
    await expect(
      FactoryAsCreator.createProject(
        title,
        textIpfsHash,
        originalLanguage,
        myMintPrice,
        firstEditionMax
      )
    ).to.not.reverted;
  });

  describe("BALLOTS", () => {
    it("Ballots work as expected", async () => {
      // auctions start and Gen Ed Sells out
      await CollectionAsCreator.startAuctions(
        1,
        authorOwnsAmount,
        discountRate
      );
      await CollectionAsUserA.buy(1, {
        value: myMintPrice,
      });
      await CollectionAsUserA.buy(1, {
        value: myMintPrice,
      });
      await CollectionAsUserB.buy(1, {
        value: myMintPrice,
      });
      await CollectionAsUserB.buy(1, {
        value: myMintPrice,
      });
      await CollectionAsUserB.buy(1, {
        value: myMintPrice,
      });
      await CollectionAsUserB.buy(1, {
        value: myMintPrice,
      });
      // project creator - and creator only – can deploy a ballot
      await expect(BallotsFactoryAsDeployer.createBallot(1)).to.revertedWith(
        "Not authorized"
      );
      await expect(BallotsFactoryAsCreator.createBallot(100)).to.revertedWith(
        "No collection"
      );
      await BallotsFactoryAsCreator.createBallot(1);
      await expect(BallotsFactoryAsCreator.createBallot(1)).to.revertedWith(
        "Ballot already exists"
      );
      const ballotAddress = await BallotsFactory.ballots(1);
      expect(await BallotsFactory.ballotsLength()).to.equal(1);
      const BallotFactory = await ethers.getContractFactory("Ballot");
      Ballot = BallotFactory.attach(ballotAddress);
      BallotAsCreator = Ballot.connect(creator);
      BallotAsDeployer = Ballot.connect(deployer);
      // voting from start to finish - only Gen Ed token owners can vote
      // in this case tokenId 1 - 6 (incl)
      await BallotAsCreator.startVote(
        "Publish it as a real book?",
        ["Yes", "No", "abstention"],
        1
      );
      await expect(
        BallotAsCreator.startVote(
          "Random second vote that cannot happen at the same time.",
          ["Yes", "No", "abstention"],
          1
        )
      ).to.revertedWith("Impossible at this state");
      const startId = await Ballot.startId();
      const endId = await Ballot.endId();
      const maxVotes = await Ballot.maxVotes();

      expect(startId).to.equal(1);
      expect(endId).to.equal(1000);
      expect(maxVotes).to.equal(1000);
      await BallotAsDeployer.vote([1], 1);
      await BallotAsCreator.vote([2], 1);
      await BallotAsCreator.vote([3], 2);
      await expect(BallotAsCreator.endVote()).to.be.revertedWith(
        "Vote not yet expired"
      );
      const BallotAsUserA = Ballot.connect(userA);
      const BallotAsUserB = Ballot.connect(userB);
      await expect(BallotAsUserA.vote([1], 0)).to.be.revertedWith(
        "Not authorized"
      );
      await expect(BallotAsUserA.vote([4], 8)).to.be.revertedWith(
        "Invalid option"
      );
      await BallotAsUserA.vote([4], 0);
      await expect(BallotAsUserA.vote([4], 0)).to.be.revertedWith(
        "Already voted"
      );

      await BallotAsUserA.vote([5], 0);
      await BallotAsUserB.vote([6, 7], 1);
      await BallotAsUserB.vote([8], 1);
      await BallotAsUserB.vote([9], 0);
      await expect(BallotAsUserB.vote([6, 7, 8, 9], 0)).to.be.revertedWith(
        "Already voted"
      );
      await expect(BallotAsUserB.vote([6, 7], 0)).to.be.revertedWith(
        "Already voted"
      );
      await advanceDays(1);
      await BallotAsCreator.endVote();
      await expect(BallotAsCreator.endVote()).to.be.revertedWith(
        "Impossible at this state"
      );
      const voteResults = await Ballot.voteSettings(0);
      expect(voteResults.votesCount).to.equal("9");
      expect(voteResults.option1Votes).to.equal("3");
      expect(voteResults.option2Votes).to.equal("5");
      expect(voteResults.option3Votes).to.equal("1");

      // can create another vote that can be ended after 1 week
      await BallotAsCreator.startVote(
        "A second vote. Want an exclusive meeting?",
        ["Yes", "No", "abstention"],
        1
      );
      await BallotAsUserA.vote([4], 0);
      await BallotAsUserA.vote([5], 0);
      await BallotAsUserB.vote([6], 0);
      await advanceDays(9);
      await expect(BallotAsCreator.endVote()).to.not.reverted;

      const nextVoteResults = await Ballot.voteSettings(1);
      expect(nextVoteResults.votesCount).to.equal("3");
      expect(nextVoteResults.option1Votes).to.equal("3");
      expect(nextVoteResults.option2Votes).to.equal("0");
      expect(nextVoteResults.option3Votes).to.equal("0");
    });
  });
});
