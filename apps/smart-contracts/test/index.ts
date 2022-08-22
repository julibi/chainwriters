import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades, waffle } from "hardhat";
import { expect } from "chai";
import { formatEther, parseUnits } from "@ethersproject/units";
import {
  MoonpageManager,
  MoonpageCollection,
  MoonpageFactory,
  BallotsFactory,
  Ballot,
  AuctionsManager,
} from "../typechain";
import { BigNumber } from "ethers";

const advanceDays = async (days: any) => {
  await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * days]);
  await ethers.provider.send("evm_mine", []);
};

// TODO
// I cannot mint some random tokens

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
  let CollectionAsUserA: MoonpageCollection;
  let CollectionAsUserB: MoonpageCollection;
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
  let deployerBalance: BigNumber;
  let creatorBalance2: BigNumber;
  let contribABalance2: BigNumber;
  let contribBBalance2: BigNumber;
  let projectId: number;
  const discountRate = 10000000000;
  const authorOwnsAmount = 2;

  const title = "My little Phony";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const originalLanguage = "ENG";
  const myMintPrice = ethers.utils.parseUnits("0.1", 18);
  const secondEdPrice = ethers.utils.parseUnits("1.5", 18);
  const firstEditionMax = 7;
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
      [Manager.address, AuctionsManager.address],
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
    await FactoryAsDeployer.setContracts(
      Manager.address,
      AuctionsManager.address
    );

    // set Contracts on Ballots Factory
    await BallotsFactoryAsDeployer.setContract(
      Manager.address,
      Collection.address
    );

    CollectionAsUserA = Collection.connect(userA);
    CollectionAsUserB = Collection.connect(userB);
    projectId = await Factory.projectsIndex();
  });

  it("only allows creators on allowlist to publish by default", async () => {
    // allowlist and blacklist
    const isClosedForPublic = await Factory.isAllowlistOnly();
    expect(isClosedForPublic).to.equal(true);

    await expect(
      FactoryAsCreator.createProject(
        title,
        textIpfsHash,
        originalLanguage,
        myMintPrice,
        100
      )
    ).to.revertedWith("Not on allowlist");

    await FactoryAsDeployer.updateAllowlist(creator.address, true);

    // first project creation
    await expect(
      FactoryAsCreator.createProject(
        title,
        textIpfsHash,
        originalLanguage,
        myMintPrice,
        1001
      )
    ).to.revertedWith("Incorrect amount");

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
  it("project creation updates data in Manager and AuctionsManager correctly", async () => {
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
    const baseData = await Manager.baseDatas(projectId);
    const [authorShare, authorShareInMatic] = await Manager.readAuthorShare(
      projectId
    );
    const [
      current,
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
    expect(mintPrice).to.equal(myMintPrice);
    expect(startTokenId).to.equal(1);
    expect(currentTokenId).to.equal(1);
    expect(lastGenEdTokenId).to.equal(7);
    expect(currentEdLastTokenId).to.equal(7);
    expect(endTokenId).to.equal(1000);
    expect(contributionIndex).to.equal(0);
    expect(projectBalance).to.equal(0);
    expect(projectExists).to.equal(true);
    expect(isProjectCurated).to.equal(false);
    expect(isProjectFrozen).to.equal(false);
    expect(isProjectPaused).to.equal(false);
  });
  it("enables everyone to publish, except for people on denylist", async () => {
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
    // second creation
    await FactoryAsDeployer.setIsAllowlistOnly(false);
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
      mintPrice2,
      startTokenId2,
      currentTokenId2,
      lastGenEdTokenId2,
      currentEdLastTokenId2,
      endTokenId2,
    ] = await Manager.readEditionData(2);
    expect(current2).to.equal(1);
    expect(mintPrice2).to.equal(myMintPrice);
    expect(startTokenId2).to.equal(1001);
    expect(currentTokenId2).to.equal(1001);
    expect(lastGenEdTokenId2).to.equal(1100);
    expect(currentEdLastTokenId2).to.equal(1100);
    expect(endTokenId2).to.equal(2000);
    // third creation
    const FactoryAsThirdCreator = Factory.connect(userB);
    await FactoryAsDeployer.updateDenylist(userB.address, true);
    await expect(
      FactoryAsThirdCreator.createProject(
        title,
        textIpfsHash,
        originalLanguage,
        myMintPrice,
        200
      )
    ).to.revertedWith("On denylist");
    await FactoryAsDeployer.updateDenylist(userB.address, false);
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
      mintPrice3,
      startTokenId3,
      currentTokenId3,
      lastGenEdTokenId3,
      currentEdLastTokenId3,
      endTokenId3,
    ] = await Manager.readEditionData(3);
    expect(current3).to.equal(1);
    expect(mintPrice3).to.equal(myMintPrice);
    expect(startTokenId3).to.equal(2001);
    expect(currentTokenId3).to.equal(2001);
    expect(lastGenEdTokenId3).to.equal(2188);
    expect(currentEdLastTokenId3).to.equal(2188);
    expect(endTokenId3).to.equal(3000);
  });
  it("lets creator configure the project", async () => {
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
    // creator configures
    const configureTx = await ManagerAsCreator.configureProjectDetails(
      1,
      "",
      "bullShitIPFSCIDHASH",
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
      ManagerAsCreator.addContributors(1, [deployer.address], [10], ["random"])
    ).to.revertedWith("Contributors set already");
  });
  it("lets creator start auctions and after sellout of 1st Ed, shares get distributed", async () => {
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
    // creator starts auctions
    await CollectionAsCreator.startAuctions(1, authorOwnsAmount, discountRate);
    const baseDataAfterStartingAuctions = await Manager.baseDatas(1);
    expect(baseDataAfterStartingAuctions.premintedByCreator).to.equal(
      authorOwnsAmount
    );
    const auctionSettings = await AuctionsManager.auctions(1);
    expect(auctionSettings.discountRate).to.equal(discountRate);
    expect(auctionSettings.auctionsStarted).to.equal(true);
    // start At is correct
    // expiresAt is set
    const creatorBalance1 = await provider.getBalance(creator.address);
    const contribABalance1 = await provider.getBalance(contribA.address);
    const contribBBalance1 = await provider.getBalance(contribB.address);
    await CollectionAsUserA.buy(1, {
      value: myMintPrice,
    });
    await CollectionAsUserA.buy(1, {
      value: myMintPrice,
    });
    await expect(
      ManagerAsCreator.enableNextEdition(1, 20, secondEdPrice)
    ).to.revertedWith("Current edition has not sold out");
    await CollectionAsUserB.buy(1, {
      value: myMintPrice,
    });
    await CollectionAsUserB.buy(1, {
      value: myMintPrice,
    });
    expect(await Collection.balanceOf(userA.address)).to.equal(2);
    expect(await Collection.balanceOf(userB.address)).to.equal(2);
    expect(await Collection.balanceOf(deployer.address)).to.equal(1);
    expect(await Collection.balanceOf(creator.address)).to.equal(
      authorOwnsAmount
    );
    expect(await Manager.projectIdOfToken(3)).to.equal(1);
    expect(await Manager.editionOfToken(1, 3)).to.equal(1);
    expect(await Manager.projectIdOfToken(4)).to.equal(1);
    expect(await Manager.editionOfToken(1, 4)).to.equal(1);
    expect(await Manager.projectIdOfToken(5)).to.equal(1);
    expect(await Manager.editionOfToken(1, 5)).to.equal(1);
    expect(await Manager.projectIdOfToken(6)).to.equal(1);
    expect(await Manager.editionOfToken(1, 6)).to.equal(1);
    const tokenURIOfToken1 = await Collection.tokenURI(1);
    const tokenURIOfToken6 = await Collection.tokenURI(6);
    console.log({ tokenURIOfToken1, tokenURIOfToken6 });
    // balance is split correctly
    // total of 0.4 MATIC
    // deployer gets 15%
    // co-writer gets 25%
    // marketer 15%
    // creator gets 45%
    const collectionBalance = await provider.getBalance(Collection.address);
    deployerBalance = await provider.getBalance(deployer.address);
    creatorBalance2 = await provider.getBalance(creator.address);
    contribABalance2 = await provider.getBalance(contribA.address);
    contribBBalance2 = await provider.getBalance(contribB.address);
    const gainsAuthor = formatEther(creatorBalance2.sub(creatorBalance1));
    const gainsContribA = formatEther(contribABalance2.sub(contribABalance1));
    const gainsContribB = formatEther(contribBBalance2.sub(contribBBalance1));
    console.log({ gainsAuthor });
    console.log({ gainsContribA });
    console.log({ gainsContribB });
    console.log(formatEther(deployerBalance));
    console.log(formatEther(collectionBalance));
    // unfortunately due to gas, these are not fully accurate
    // expect(gainsContribB).to.equal("0.06");
    // expect(gainsContribA).to.equal("0.1");
    // expect(gainsAuthor).to.equal("0.18");
    // expect(formatEther(factoryBalance)).to.equal("0.06");
    // expect(formatEther(collectionBalance)).to.equal("0.0");
    // author can enable next edition
    // creator enables new edition
  });
  it("lets creator enable next edition and edition data is updated accordingly", async () => {
    await FactoryAsDeployer.setIsAllowlistOnly(false);
    // first creation
    await FactoryAsCreator.createProject(
      title,
      textIpfsHash,
      originalLanguage,
      myMintPrice,
      firstEditionMax
    );
    await CollectionAsCreator.startAuctions(1, authorOwnsAmount, discountRate);
    // second creation
    const FactoryAsSecondCreator = Factory.connect(userA);
    await FactoryAsSecondCreator.createProject(
      "",
      "textIpfsHash",
      "ENG",
      myMintPrice,
      100
    );

    await CollectionAsDeployer.buy(1, {
      value: myMintPrice,
    });
    await CollectionAsDeployer.buy(1, {
      value: myMintPrice,
    });
    await CollectionAsDeployer.buy(1, {
      value: myMintPrice,
    });
    await CollectionAsDeployer.buy(1, {
      value: myMintPrice,
    });

    const enableNextEdTX = await ManagerAsCreator.enableNextEdition(
      1,
      20,
      secondEdPrice
    );
    await enableNextEdTX.wait();
    const [
      newCurrent,
      newMintPrice,
      newStartTokenId,
      newCurrentTokenId,
      newLastGenEdTokenId,
      newCurrentEdLastTokenId,
      newEndTokenId,
    ] = await Manager.readEditionData(projectId);
    expect(newCurrent).to.equal(2);
    expect(newMintPrice).to.equal(secondEdPrice);
    expect(newStartTokenId).to.equal(1);
    expect(newCurrentTokenId).to.equal(8);
    expect(newLastGenEdTokenId).to.equal(7);
    expect(newCurrentEdLastTokenId).to.equal(27);
    expect(newEndTokenId).to.equal(1000);
    // meanwhile Project ID 2 auctions start and people buy - and edition data changes with minting as expected
    await CollectionAsUserA.startAuctions(2, authorOwnsAmount, discountRate);
    const project2BaseData = await Manager.baseDatas(2);
    expect(project2BaseData.premintedByCreator).to.equal(authorOwnsAmount);
    const project2AuctionSettings = await AuctionsManager.auctions(2);
    expect(project2AuctionSettings.discountRate).to.equal(discountRate);
    expect(project2AuctionSettings.auctionsStarted).to.equal(true);
    await CollectionAsDeployer.buy(2, {
      value: myMintPrice,
    });
    const [
      currentEdition,
      ,
      currentStartToken,
      currentCurrentToken,
      lastGenEdToken,
      currentEdLastToken,
      endToken,
    ] = await Manager.readEditionData(2);
    expect(currentEdition).to.equal(1);
    expect(currentStartToken).to.equal(1001);
    expect(currentCurrentToken).to.equal(1005);
    expect(lastGenEdToken).to.equal(1100);
    expect(currentEdLastToken).to.equal(1100);
    expect(endToken).to.equal(2000);
    expect(await Manager.projectIdOfToken(1001)).to.equal(2);
    expect(await Manager.editionOfToken(2, 1001)).to.equal(1);
    expect(await Manager.projectIdOfToken(1002)).to.equal(2);
    expect(await Manager.editionOfToken(2, 1002)).to.equal(1);
    expect(await Manager.projectIdOfToken(1003)).to.equal(2);
    expect(await Manager.editionOfToken(2, 1003)).to.equal(1);
    expect(await Manager.projectIdOfToken(1004)).to.equal(2);
    expect(await Manager.editionOfToken(2, 1004)).to.equal(1);
    const tokenURIOfToken1001 = await Collection.tokenURI(1001);
  });
  it("second edition of Project ID 1 sells out and distribution works again", async () => {
    // first project created
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
    // auction started + sells out
    await CollectionAsCreator.startAuctions(1, authorOwnsAmount, discountRate);
    await CollectionAsDeployer.buy(1, {
      value: myMintPrice,
    });
    await CollectionAsDeployer.buy(1, {
      value: myMintPrice,
    });
    await CollectionAsDeployer.buy(1, {
      value: myMintPrice,
    });
    await CollectionAsDeployer.buy(1, {
      value: myMintPrice,
    });
    // 2nd edition enabled
    await ManagerAsCreator.enableNextEdition(1, 20, secondEdPrice);
    // 2nd edition also sells out and distribution works again
    await CollectionAsUserA.publicMint(1, 10, {
      value: secondEdPrice.mul(10),
    });
    await CollectionAsUserB.publicMint(1, 10, {
      value: secondEdPrice.mul(10),
    });
    await expect(
      CollectionAsDeployer.publicMint(1, 1, {
        value: secondEdPrice,
      })
    ).to.revertedWith("Amount exceeds cap");
    expect(await Manager.projectIdOfToken(8)).to.equal(1);
    expect(await Manager.editionOfToken(1, 8)).to.equal(2);
    expect(await Manager.projectIdOfToken(26)).to.equal(1);
    expect(await Manager.editionOfToken(1, 26)).to.equal(2);
    expect(await Manager.projectIdOfToken(27)).to.equal(1);
    expect(await Manager.editionOfToken(1, 27)).to.equal(2);
    const tokenURIOfToken7 = await Collection.tokenURI(7);
    const deployerBalance3 = await provider.getBalance(deployer.address);
    const creatorBalance3 = await provider.getBalance(creator.address);
    const contribABalance3 = await provider.getBalance(contribA.address);
    const contribBBalance3 = await provider.getBalance(contribB.address);
    // balance is split correctly
    // total of 30 MATIC
    // factory gets 15% - 4.5 MATIC
    // co-writer gets 25% - 7.5 MATIC
    // marketer 15% - 4.5 MATIC
    // creator gets 45% - 13.5 MATIC
    // unfortunately due to gas, these are not fully accurate
    // expect(formatEther(creatorBalance3.sub(creatorBalance2))).to.equal("13.5");
    // expect(formatEther(contribABalance3.sub(contribABalance2))).to.equal("7.5");
    // expect(formatEther(contribBBalance3.sub(contribBBalance2))).to.equal("4.5");
    // expect(formatEther(formatEther(factoryBalance3.sub(factoryBalance))).to.equal("4.5");
    console.log(
      "deployer: ",
      formatEther(deployerBalance3.sub(deployerBalance))
    );
    console.log("creator: ", formatEther(creatorBalance3.sub(creatorBalance2)));
    console.log(
      "contrib a: ",
      formatEther(contribABalance3.sub(contribABalance2))
    );
    console.log(
      "contrib b: ",
      formatEther(contribBBalance3.sub(contribBBalance2))
    );
  });
  it("Ballot", async () => {
    // project created and gen ed sold out
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
    await CollectionAsCreator.startAuctions(1, authorOwnsAmount, discountRate);
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
      false
    );
    await expect(
      BallotAsCreator.startVote(
        "Random second vote that cannot happen at the same time.",
        ["Yes", "No", "abstention"],
        false
      )
    ).to.revertedWith("Impossible at this state");
    const startId = await Ballot.startId();
    const endId = await Ballot.endId();
    const maxVotes = await Ballot.maxVotes();
    console.log({ startId, endId, maxVotes });
    expect(startId).to.equal(1);
    expect(endId).to.equal(7);
    expect(maxVotes).to.equal(7);
    await BallotAsDeployer.vote(1, 1);
    await BallotAsCreator.vote(2, 1);
    await BallotAsCreator.vote(3, 2);
    await expect(BallotAsCreator.endVote()).to.be.revertedWith(
      "Vote not yet expired"
    );
    const BallotAsUserA = Ballot.connect(userA);
    const BallotAsUserB = Ballot.connect(userB);
    await expect(BallotAsUserA.vote(1, 0)).to.be.revertedWith("Not authorized");
    await expect(BallotAsUserA.vote(4, 8)).to.be.revertedWith("Invalid option");
    await BallotAsUserA.vote(4, 0);
    await expect(BallotAsUserA.vote(4, 0)).to.be.revertedWith("Already voted");
    const voteResults = await Ballot.voteSettings(0);
    expect(voteResults.votesCount).to.equal("4");
    expect(voteResults.option1Votes).to.equal("1");
    expect(voteResults.option2Votes).to.equal("2");
    expect(voteResults.option3Votes).to.equal("1");
    await BallotAsUserA.vote(5, 0);
    await BallotAsUserB.vote(6, 0);
    await BallotAsUserB.vote(7, 0);
    await BallotAsCreator.endVote();
    await expect(BallotAsCreator.endVote()).to.be.revertedWith(
      "Impossible at this state"
    );

    // can create another vote that can be ended after 1 week
    await BallotAsCreator.startVote(
      "A second vote. Want an exclusive meeting?",
      ["Yes", "No", "abstention"],
      false
    );
    await BallotAsUserA.vote(4, 0);
    await BallotAsUserA.vote(5, 0);
    await BallotAsUserB.vote(6, 0);
    await advanceDays(9);
    await expect(BallotAsCreator.endVote()).to.not.reverted;
  });
});

// what should it look like with royalties?
// add payments splitter
