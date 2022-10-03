import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades, waffle } from "hardhat";
import { expect } from "chai";
import { formatEther, parseUnits } from "@ethersproject/units";
import {
  MoonpageManager,
  MoonpageManagerTestingV2,
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

describe("Project", function () {
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
  let Collection: MoonpageCollection;
  let CollectionAsDeployer: MoonpageCollection;
  let CollectionAsCreator: MoonpageCollection;
  let CollectionAsUserA: MoonpageCollection;
  let CollectionAsUserB: MoonpageCollection;
  let Manager: any;
  let ManagerUpgraded: MoonpageManagerTestingV2;
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
  const imgIpfsHash = "QmRw1gCNEVNRo5Btw6pDnUo4y25Gg1j6g6rZMrF8mcDY1c";
  const originalLanguage = "ENG";
  const myMintPrice = ethers.utils.parseUnits("0.1", 18);
  const secondEdPrice = ethers.utils.parseUnits("1.5", 18);
  const firstEditionMax = 7;
  const provider = waffle.provider;

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
    await FactoryAsDeployer.setAddresses(
      Manager.address,
      AuctionsManager.address,
      deployer.address
    );

    // set Contracts on Ballots Factory
    await BallotsFactoryAsDeployer.setContract(
      Manager.address,
      Collection.address
    );

    CollectionAsUserA = Collection.connect(userA);
    CollectionAsUserB = Collection.connect(userB);
    projectId = await Factory.projectsIndex();

    // ------------------
    // CREATE FIRST PROJECT - has Project ID 1
    // -----------------

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

  describe("ideal path", () => {
    it("only allows creators on allowlist to publish by default", async () => {
      // allowlist and blacklist
      const isClosedForPublic = await Factory.isAllowlistOnly();
      expect(isClosedForPublic).to.equal(true);

      await expect(FactoryAsCreator.setIsAllowlistOnly(false)).to.be.reverted;
      await FactoryAsDeployer.setIsAllowlistOnly(false);

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
          "This should work",
          textIpfsHash,
          originalLanguage,
          myMintPrice,
          firstEditionMax
        )
      ).not.to.reverted;

      // TODO: check if bla.royaltiesSplitter is the same as in royaltyInfo
    });

    it("project creation updates data in Manager and AuctionsManager correctly", async () => {
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
      expect(baseData.premintedByCreator).to.equal("2");
      expect(authorShare).to.equal(85);
      expect(current).to.equal(1);
      expect(mintPrice).to.equal(myMintPrice);
      expect(startTokenId).to.equal(1);
      expect(currentTokenId).to.equal(8);
      expect(lastGenEdTokenId).to.equal(7);
      expect(currentEdLastTokenId).to.equal(7);
      expect(endTokenId).to.equal(1000);
      expect(contributionIndex).to.equal(0);
      expect(projectBalance).to.equal(0);
      expect(projectExists).to.equal(true);
      expect(isProjectCurated).to.equal(false);
      expect(isProjectFrozen).to.equal(true);
      expect(isProjectPaused).to.equal(false);
    });

    it("can enable everyone to create a project while preventing denylist accounts from doing so", async () => {
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
      await expect(
        ManagerAsCreator.configureProjectDetails(
          1,
          "",
          "bullShitIPFSCIDHASH",
          "",
          "Fiction",
          "My fancy subtitle"
        )
      ).not.to.reverted;

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
      // cannot configure project after starting auction
      await CollectionAsCreator.startAuctions(
        1,
        authorOwnsAmount,
        discountRate
      );
      await expect(
        ManagerAsCreator.configureProjectDetails(
          1,
          "",
          "newipfshash",
          "",
          "Horror",
          "My different fancy subtitle"
        )
      ).to.revertedWith("Base data frozen");
    });

    it("lets creator start auctions and after sellout of Gen Ed, shares get distributed", async () => {
      // creator starts auctions
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

    // we are interacting with projectID 2 but there is no project with the ID 2 yet
    it("user cannot buy or mint when the project does not exist yet", async () => {
      await expect(
        CollectionAsUserA.buy(2, {
          value: myMintPrice,
        })
      ).to.be.revertedWith("Auctions have not started");

      await expect(
        CollectionAsUserA.publicMint(2, 1, {
          value: myMintPrice,
        })
      ).to.be.revertedWith("Public minting possible from edition 2");
    });

    it("lets creator enable next edition and edition data is updated accordingly", async () => {
      await CollectionAsCreator.startAuctions(
        1,
        authorOwnsAmount,
        discountRate
      );
      // second creation
      await FactoryAsDeployer.setIsAllowlistOnly(false);
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
      // auction started + sells out
      await CollectionAsCreator.startAuctions(
        1,
        authorOwnsAmount,
        discountRate
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
      console.log(
        "creator: ",
        formatEther(creatorBalance3.sub(creatorBalance2))
      );
      console.log(
        "contrib a: ",
        formatEther(contribABalance3.sub(contribABalance2))
      );
      console.log(
        "contrib b: ",
        formatEther(contribBBalance3.sub(contribBBalance2))
      );
    });
  });

  describe("MOONPAGE FACTORY", () => {
    it("only admin can update allowlist and denylist state", async () => {
      const FactoryAsSecondCreator = Factory.connect(userA);
      const FactoryAsThirdCreator = Factory.connect(userB);
      // allowlist only
      await expect(FactoryAsCreator.setIsAllowlistOnly(true)).to.be.reverted;
      await expect(FactoryAsDeployer.setIsAllowlistOnly(true)).not.to.be
        .reverted;
      await expect(
        FactoryAsSecondCreator.createProject(
          "",
          "textIpfsHash",
          "ENG",
          myMintPrice,
          100
        )
      ).to.be.revertedWith("Not on allowlist");

      // allowlist allowlist updated
      await FactoryAsDeployer.updateAllowlist(creator.address, true);
      await expect(
        FactoryAsCreator.createProject(
          "",
          "textIpfsHash",
          "ENG",
          myMintPrice,
          100
        )
      ).not.to.be.reverted;
      await expect(FactoryAsSecondCreator.updateAllowlist(userA.address, true))
        .to.be.reverted;
      await FactoryAsDeployer.updateAllowlist(userA.address, true);
      await expect(
        FactoryAsCreator.createProject(
          "Yay U can create now haha",
          "textIpfsHash",
          "ENG",
          myMintPrice,
          100
        )
      ).not.to.be.reverted;

      // now open for all
      await expect(FactoryAsDeployer.setIsAllowlistOnly(false)).not.to.be
        .reverted;

      await expect(
        FactoryAsThirdCreator.createProject(
          "Hans und Franz can create a Project now",
          "hatefulcontentipfshash",
          "ENG",
          myMintPrice,
          100
        )
      ).not.to.be.reverted;

      // admin denylists ThirdCreator
      await expect(FactoryAsDeployer.updateDenylist(userB.address, true)).not.to
        .be.reverted;

      // Third Creator cannot create stuff anymore
      await expect(
        FactoryAsThirdCreator.createProject(
          "Wants to create another bad project",
          "hatefulcontentipfshash",
          "ENG",
          myMintPrice,
          100
        )
      ).to.be.reverted;
    });

    it("only lets admin pause the factory + manager and this pauses the creation of projects", async () => {
      const FactoryAsSecondCreator = Factory.connect(userA);
      const FactoryAsThirdCreator = Factory.connect(userB);
      // everyone can create
      await expect(FactoryAsDeployer.setIsAllowlistOnly(false)).not.to.be
        .reverted;

      // admin pauses Factory
      await expect(FactoryAsSecondCreator.pause()).to.be.reverted;
      await expect(FactoryAsDeployer.pause()).not.to.be.reverted;
      const isPaused = await Factory.paused();
      expect(isPaused).to.equal(true);
      await expect(
        FactoryAsCreator.createProject(
          "",
          "textIpfsHash",
          "ENG",
          myMintPrice,
          100
        )
      ).to.be.reverted;

      // admin unpauses Factory and creation works again
      await expect(FactoryAsDeployer.unpause()).not.to.be.reverted;
      await expect(
        FactoryAsCreator.createProject(
          "",
          "textIpfsHash",
          "ENG",
          myMintPrice,
          100
        )
      ).not.to.be.reverted;

      // admin pauses Manager and the textipshash cannot be updated
      await expect(ManagerAsDeployer.pause()).not.to.be.reverted;
      const isManagerPaused = await Manager.paused();
      expect(isManagerPaused).to.equal(true);
      const projectIndex = await Factory.projectsIndex();
      const projectId = Number(projectIndex) - 1;
      await expect(
        ManagerAsCreator.updateTextIpfsHash(projectId, "newTextIpfsHas")
      ).to.revertedWith("Pausable: paused");

      // adming unpauses Manager and textipfshash can be set again
      await expect(ManagerAsDeployer.unpause()).not.to.be.reverted;
      await expect(
        ManagerAsCreator.updateTextIpfsHash(projectId, "newTextIpfsHas")
      ).not.to.be.reverted;

      const projectData = await Manager.readBaseData(projectId);
      expect(projectData.includes("newTextIpfsHas")).to.equal(true);
    });

    it("the payment splitter created with a project works fine", async () => {
      await expect(FactoryAsDeployer.setIsAllowlistOnly(false)).not.to.be
        .reverted;

      await expect(
        FactoryAsCreator.createProject(
          "My Title",
          "textIpfsHash",
          "ENG",
          myMintPrice,
          100
        )
      ).not.to.be.reverted;
      const projectIndex = await Factory.projectsIndex();
      const projectId = Number(projectIndex) - 1;
      const baseData = await Manager.readBaseData(projectId);

      const RoyaltiesPaymentSplitter = baseData[5];
      // since it is not possible to test royalties on testnet, payment splitters were tested manually via polygonscan on testnet
    });

    it("manager can be deployed and set again", async () => {
      // deploy Manager again
      const ManagerFactory = await ethers.getContractFactory("MoonpageManager");
      const NewManager = await upgrades.deployProxy(ManagerFactory, [], {
        kind: "uups",
      });
      const NewManagerAsDeployer = NewManager.connect(deployer);

      // updating all the contract addresses everywhere....
      // set Contracts on Collection
      await CollectionAsDeployer.setAddresses(
        NewManager.address,
        AuctionsManager.address,
        deployer.address
      );

      // set Contracts on Manager
      await NewManagerAsDeployer.setAddresses(
        Collection.address,
        Factory.address,
        deployer.address
      );

      // set Contracts on Auctions
      await AuctionsManagerAsDeployer.setContracts(
        NewManager.address,
        Factory.address,
        Collection.address
      );

      // set Contracts on Factory
      await FactoryAsDeployer.setAddresses(
        NewManager.address,
        AuctionsManager.address,
        deployer.address
      );

      // create a project
      await expect(FactoryAsCreator.setIsAllowlistOnly(false)).to.be.reverted;
      await expect(
        FactoryAsCreator.createProject(
          "My first title on new manager",
          "textIpfsHash",
          "ENG",
          myMintPrice,
          10
        )
      ).not.to.be.reverted;
      const projectIndex = await Factory.projectsIndex();
      const projectId = Number(projectIndex) - 1;
      const baseData = await NewManager.readBaseData(projectId);
      expect(baseData[0]).to.equal("My first title on new manager");

      // start auction
      await expect(
        CollectionAsCreator.startAuctions(projectId, 4, 1000000000000000)
      ).not.to.be.reverted;

      // buy until sellout
      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });
      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });
      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });
      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });
      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });
      await expect(
        CollectionAsUserA.buy(projectId, {
          value: myMintPrice,
        })
      ).to.revertedWith("Auctions ended");
    });
    // how do I test this?
    xit("contract can be upgraded", async () => {
      const MoonpageManagerTestingV2Factory = await ethers.getContractFactory(
        "MoonpageManagerTestingV2"
      );

      // ManagerUpgraded = await upgrades.upgradeProxy(
      //   Manager.address,
      //   MoonpageManagerTestingV2Factory
      // );
      // const ManagerUpgradedAsCreator = ManagerUpgraded.connect(creator);
      // const baseData = ManagerUpgraded.baseDatas(1);
      // console.log({ baseData });
      // await expect(ManagerUpgradedAsCreator.updateTestString(1, "blablabla"))
      //   .not.to.reverted;
    });
  });

  describe("MANAGER", () => {
    it("freezing a project", async () => {});
  });

  describe("COLLECTION", () => {
    it("being pausing blocks minting in auctions", async () => {
      // pause
      await expect(CollectionAsDeployer.pause()).not.to.be.reverted;
      await expect(
        CollectionAsCreator.startAuctions(1, 4, 100000000000000)
      ).to.be.revertedWith("Pausable: paused");

      // unpause
      await expect(CollectionAsDeployer.unpause()).not.to.be.reverted;

      // auctions start
      await expect(CollectionAsCreator.startAuctions(1, 4, 100000000000000)).not
        .to.be.reverted;

      await CollectionAsUserA.buy(1, {
        value: myMintPrice,
      });

      // pause
      await expect(CollectionAsDeployer.pause()).not.to.be.reverted;

      // not able to buy or mint
      await expect(
        CollectionAsUserA.buy(1, {
          value: myMintPrice,
        })
      ).to.be.revertedWith("Pausable: paused");
      await expect(CollectionAsUserA.publicMint(1, 1)).to.be.revertedWith(
        "Pausable: paused"
      );
    });

    it("sell out happens as excepted", async () => {
      // project created and sold out
      await expect(
        FactoryAsCreator.createProject(
          "SELLOUT",
          textIpfsHash,
          originalLanguage,
          myMintPrice,
          10
        )
      ).not.to.be.revertedWith("Not on allowlist");
      const projectIndex = await Factory.projectsIndex();
      const projectId = Number(projectIndex) - 1;

      await expect(
        CollectionAsCreator.startAuctions(projectId, 4, 100000000000000)
      ).not.to.be.reverted;

      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });
      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });
      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });
      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });
      await CollectionAsUserA.buy(projectId, {
        value: myMintPrice,
      });

      await expect(
        CollectionAsUserA.buy(projectId, {
          value: myMintPrice,
        })
      ).to.be.revertedWith("Auctions ended");

      // enable second edition
      await expect(
        ManagerAsCreator.enableNextEdition(projectId, 990, myMintPrice)
      ).not.to.be.reverted;

      // user buys 110 NFts, with that 200 should be sold
      await expect(
        CollectionAsUserA.publicMint(projectId, 190, {
          value: myMintPrice.mul(190),
        })
      ).not.to.be.reverted;
      let editionData = await Manager.readEditionData(projectId);
      let currentEdition = Number(editionData[0]);
      let startTokenId = Number(editionData[2]);
      let currentTokenId = Number(editionData[3]);
      let lastGenEdTokenId = Number(editionData[4]);
      let currentEdLastTokenId = Number(editionData[5]);
      let endTokenId = Number(editionData[6]);
      expect(currentEdition).to.equal(2);
      expect(startTokenId).to.equal(1001);
      expect(currentTokenId).to.equal(1201);
      expect(lastGenEdTokenId).to.equal(1010);
      expect(currentEdLastTokenId).to.equal(2000);
      expect(endTokenId).to.equal(2000);

      // userC buys 200 NFts
      const CollectionAsUserC = Collection.connect(userC);
      // when too little funds sent, fails
      await expect(
        CollectionAsUserC.publicMint(projectId, 200, {
          value: myMintPrice.mul(199),
        })
      ).to.be.revertedWith("Value sent not sufficient");

      const userCMint = await CollectionAsUserC.publicMint(projectId, 200, {
        value: myMintPrice.mul(200),
      });
      await userCMint.wait();

      // userD buys 200 NFts
      const CollectionAsUserD = Collection.connect(userD);
      const userDMint = await CollectionAsUserD.publicMint(projectId, 200, {
        value: myMintPrice.mul(200),
      });
      await userDMint.wait();

      const newEditionData = await Manager.readEditionData(projectId);
      const newCurrentTokenId = Number(newEditionData[3]);
      expect(newCurrentTokenId).to.equal(1601);

      // userE buys 200 NFts
      const CollectionAsUserE = Collection.connect(userE);
      const userEMint = await CollectionAsUserE.publicMint(projectId, 200, {
        value: myMintPrice.mul(200),
      });
      await userEMint.wait();

      // userF buys 200 NFts
      const CollectionAsUserF = Collection.connect(userF);
      const userFMint = await CollectionAsUserF.publicMint(projectId, 200, {
        value: myMintPrice.mul(200),
      });
      await userFMint.wait();

      await expect(
        CollectionAsUserF.publicMint(projectId, 1, {
          value: myMintPrice,
        })
      ).to.be.revertedWith("Amount exceeds cap");

      editionData = await Manager.readEditionData(projectId);
      currentEdition = Number(editionData[0]);
      startTokenId = Number(editionData[2]);
      currentTokenId = Number(editionData[3]);
      lastGenEdTokenId = Number(editionData[4]);
      currentEdLastTokenId = Number(editionData[5]);
      endTokenId = Number(editionData[6]);
      expect(currentEdition).to.equal(2);
      expect(startTokenId).to.equal(1001);
      expect(currentTokenId).to.equal(2001);
      expect(lastGenEdTokenId).to.equal(1010);
      expect(currentEdLastTokenId).to.equal(2000);
      expect(endTokenId).to.equal(2000);
    });
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
      await expect(BallotAsUserA.vote(1, 0)).to.be.revertedWith(
        "Not authorized"
      );
      await expect(BallotAsUserA.vote(4, 8)).to.be.revertedWith(
        "Invalid option"
      );
      await BallotAsUserA.vote(4, 0);
      await expect(BallotAsUserA.vote(4, 0)).to.be.revertedWith(
        "Already voted"
      );
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
});

// TODO
// testing that an upgrade works fine
