import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import {
  MoonpageManager,
  MoonpageCollection,
  MoonpageFactory,
  AuctionsManager,
  TheRetreat,
} from "../typechain";

describe("TheRetreat", function () {
  let deployer: SignerWithAddress;
  let adminA: SignerWithAddress;
  let adminB: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let userC: SignerWithAddress;
  let TR: any;
  let TRAsDeployer: TheRetreat;
  let TRAsAdminA: TheRetreat;
  let TRAsAdminB: TheRetreat;
  let TRAsUserA: TheRetreat;
  let TRAsUserB: TheRetreat;
  let MPCollection: MoonpageCollection;
  let MPCollectionAsDeployer: MoonpageCollection;
  let MPManager: any;
  let MPManagerAsDeployer: MoonpageManager;
  let MPAuctionsManager: any;
  let MPAuctionsManagerAsDeployer: AuctionsManager;
  let MPFactory: any;
  let MPFactoryAsDeployer: MoonpageFactory;
  let MPFactoryAsAdminA: MoonpageFactory;
  const title = "My little Phony";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const originalLanguage = "ENG";
  const myMintPrice = ethers.utils.parseUnits("0.1", 18);
  const firstEditionMax = 7;
  const discountRate = 10000000000;

  const moonpageManagerAddr = "0x5fce69239815e7a409615426e73FDD9909E8a931";
  const moonpageCollectionAddr = "0xa5a234aa62c9411a717d349d4229caf577fa7d19";

  beforeEach(async function () {
    [deployer, adminA, adminB, userA, userB, userC] = await ethers.getSigners();

    // ------------------
    // DEPLOY CONTRACTS
    // -----------------
    // first deploy all contracts needed for Moonpage
    // collection
    const CollectionFactory = await ethers.getContractFactory(
      "MoonpageCollection"
    );
    MPCollection = await CollectionFactory.connect(deployer).deploy();
    MPCollectionAsDeployer = MPCollection.connect(deployer);
    // manager
    const ManagerFactory = await ethers.getContractFactory("MoonpageManager");
    MPManager = await upgrades.deployProxy(ManagerFactory, [], {
      kind: "uups",
    });
    MPManagerAsDeployer = MPManager.connect(deployer);

    // auctionsmanager
    const AuctionsManagerFactory = await ethers.getContractFactory(
      "AuctionsManager"
    );
    MPAuctionsManager = await upgrades.deployProxy(AuctionsManagerFactory, [], {
      kind: "uups",
    });
    MPAuctionsManagerAsDeployer = MPAuctionsManager.connect(deployer);

    // deploy Factory
    const FactoryFactory = await ethers.getContractFactory("MoonpageFactory");
    MPFactory = await upgrades.deployProxy(
      FactoryFactory,
      [MPManager.address, MPAuctionsManager.address, deployer.address],
      {
        kind: "uups",
      }
    );
    MPFactoryAsDeployer = MPFactory.connect(deployer);
    MPFactoryAsAdminA = MPFactory.connect(adminA);

    // set Contract on Moonpage Collection
    await MPCollectionAsDeployer.setAddresses(
      MPManager.address,
      MPAuctionsManager.address,
      deployer.address
    );

    // setFactory on Moonpage Manager
    await MPManagerAsDeployer.setAddresses(
      MPCollection.address,
      MPFactory.address,
      deployer.address
    );
    // set Contracts on Auctions Manager
    await MPAuctionsManagerAsDeployer.setContracts(
      MPManager.address,
      MPFactory.address,
      MPCollection.address
    );

    await MPFactoryAsDeployer.setIsAllowlistOnly(false);

    // project 1 gets created
    await expect(
      MPFactoryAsAdminA.createProject(
        title,
        textIpfsHash,
        originalLanguage,
        myMintPrice,
        firstEditionMax
      )
    ).not.to.reverted;

    // deploy Profiles
    const TRFactory = await ethers.getContractFactory("TheRetreat");
    TR = await upgrades.deployProxy(
      TRFactory,
      [MPCollection.address, MPManager.address, 1],
      {
        kind: "uups",
      }
    );

    TRAsDeployer = TR.connect(deployer);
    TRAsAdminA = TR.connect(adminA);
    TRAsAdminB = TR.connect(adminB);
    TRAsUserA = TR.connect(userA);
    TRAsUserB = TR.connect(userB);
  });

  describe("TR", () => {
    const adminACreates10Characters = async () => {
      await TRAsAdminA.setupCharacter(
        "Justus Jonas",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      await TRAsAdminA.setupCharacter(
        "Peter Shaw",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      await TRAsAdminA.setupCharacter(
        "Bob Andrews",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      await TRAsAdminA.setupCharacter(
        "Morten",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      await TRAsAdminA.setupCharacter(
        "Skinny Norris",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      await TRAsAdminA.setupCharacter(
        "Inspector Reynolds",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      await TRAsAdminA.setupCharacter(
        "Tante Matilda",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      await TRAsAdminA.setupCharacter(
        "Titus Jonas",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      await TRAsAdminA.setupCharacter(
        "Kelly",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      await TRAsAdminA.setupCharacter(
        "Blacky",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );
    };
    it("starts off with right values", async () => {
      const startIndex = await TR.index();
      const characterIndex = await TR.characterIndex();
      const projectId = await TR.projectId();

      expect(startIndex).to.equal(1);
      expect(characterIndex).to.equal(1);
      expect(projectId).to.equal(1);
    });

    it("only deployer can add new admins", async () => {
      // random person cannot make herself admin
      await expect(
        TRAsAdminA.configureAdmins([adminA.address], [true])
      ).to.revertedWith("Not authorized");
      // parameters need to be passed in correctly
      await expect(
        TRAsDeployer.configureAdmins([adminA.address, adminB.address], [true])
      ).to.revertedWith("Addresses and bools must be same length");

      // parameters need to be passed in correctly
      await TRAsDeployer.configureAdmins([adminA.address], [true]);
      await TRAsDeployer.configureAdmins([adminB.address], [true]);
      expect(await TRAsDeployer.admins(adminA.address)).to.equal(true);
      expect(await TRAsDeployer.admins(adminB.address)).to.equal(true);
    });

    it("only admins can setup characters", async () => {
      // deployer sets admins
      await TRAsDeployer.configureAdmins([adminA.address], [true]);
      await TRAsDeployer.configureAdmins([adminB.address], [true]);

      // deployer can't & random person either
      await expect(
        TRAsDeployer.setupCharacter(
          "Justus Jonas",
          "_initialTextIPFSHash",
          "_initialTranslationIPFSHash",
          "_initialImageIPFSHash"
        )
      ).to.revertedWith("Only for admins");
      await expect(
        TRAsUserA.setupCharacter(
          "Justus Jonas",
          "_initialTextIPFSHash",
          "_initialTranslationIPFSHash",
          "_initialImageIPFSHash"
        )
      ).to.revertedWith("Only for admins");

      // works
      await adminACreates10Characters();

      // Max 10 characters can be specified
      await expect(
        TRAsAdminA.setupCharacter(
          "FAKE!",
          "_initialTextIPFSHash",
          "_initialTranslationIPFSHash",
          "_initialImageIPFSHash"
        )
      ).to.revertedWith("All characters already set");
    });

    it("only admins can configure characters", async () => {
      // deployer sets admins
      await TRAsDeployer.configureAdmins([adminA.address], [true]);
      await TRAsDeployer.configureAdmins([adminB.address], [true]);
      await TRAsAdminA.setupCharacter(
        "Justus Jonas",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );
      await TRAsAdminB.setupCharacter(
        "Peter Shaw",
        "_initialTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_initialImageIPFSHash"
      );

      // deployer can't & random person either
      await expect(
        TRAsDeployer.configureCharacter(
          1,
          "_randomTextIPFSHash",
          "_initialTranslationIPFSHash",
          "_randomImageIPFSHash"
        )
      ).to.revertedWith("Only for admins");
      await expect(
        TRAsUserA.configureCharacter(
          1,
          "_randomTextIPFSHash",
          "_initialTranslationIPFSHash",
          "_randomImageIPFSHash"
        )
      ).to.revertedWith("Only for admins");

      await TRAsAdminA.configureCharacter(
        1,
        "_randomTextIPFSHash",
        "_initialTranslationIPFSHash",
        "_randomImageIPFSHash"
      );
    });

    it("characterOfToken returns right characterID", async () => {
      expect(await TR.characterOfToken(12001)).to.equal(1);
      expect(await TR.characterOfToken(999992)).to.equal(2);
      expect(await TR.characterOfToken(13)).to.equal(3);
      expect(await TR.characterOfToken(12004)).to.equal(4);
      expect(await TR.characterOfToken(125)).to.equal(5);
      expect(await TR.characterOfToken(12006)).to.equal(6);
      expect(await TR.characterOfToken(12007)).to.equal(7);
      expect(await TR.characterOfToken(77008)).to.equal(8);
      expect(await TR.characterOfToken(12009)).to.equal(9);
      expect(await TR.characterOfToken(12010)).to.equal(10);
      expect(await TR.characterOfToken(9012481)).to.equal(1);
      expect(await TR.characterOfToken(12012)).to.equal(2);
      expect(await TR.characterOfToken(17604)).to.equal(4);
    });

    // hard to test because dependent on an already deployed contract
    xit("snippetsOfCharacter", async () => {});

    it("writing", async () => {
      // people buy ID 1 - 27
      // admin A has #2,3,4,5
      await MPCollection.connect(adminA).startAuctions(1, 4, discountRate);
      // user A has #6
      await MPCollection.connect(userA).buy(1, {
        value: myMintPrice,
      });
      // use B has #7
      await MPCollection.connect(userB).buy(1, {
        value: myMintPrice,
      });
      await MPManager.connect(adminA).enableNextEdition(1, 20, myMintPrice);
      // admin B has #8 - 27
      await MPCollection.connect(adminB).publicMint(1, 20, {
        value: myMintPrice.mul(20),
      });

      // rough double check if everybody owns the NFTs they should
      expect(await MPCollection.ownerOf(2)).to.equal(adminA.address);
      expect(await MPCollection.ownerOf(5)).to.equal(adminA.address);
      expect(await MPCollection.ownerOf(6)).to.equal(userA.address);
      expect(await MPCollection.ownerOf(7)).to.equal(userB.address);
      expect(await MPCollection.ownerOf(8)).to.equal(adminB.address);
      expect(await MPCollection.ownerOf(27)).to.equal(adminB.address);

      // deployer sets admins & admin creates all characters
      await TRAsDeployer.configureAdmins([adminA.address], [true]);
      await TRAsDeployer.configureAdmins([adminB.address], [true]);
      await adminACreates10Characters();

      const character1 = await TR.characters(1);
      const character2 = await TR.characters(2);
      const character3 = await TR.characters(3);
      const character4 = await TR.characters(4);
      const character5 = await TR.characters(5);
      const character6 = await TR.characters(6);
      const character7 = await TR.characters(7);
      const character8 = await TR.characters(8);
      const character9 = await TR.characters(9);
      const character10 = await TR.characters(10);

      expect(character1.name).to.equal("Justus Jonas");
      expect(character2.name).to.equal("Peter Shaw");
      expect(character3.name).to.equal("Bob Andrews");
      expect(character4.name).to.equal("Morten");
      expect(character5.name).to.equal("Skinny Norris");
      expect(character6.name).to.equal("Inspector Reynolds");
      expect(character7.name).to.equal("Tante Matilda");
      expect(character8.name).to.equal("Titus Jonas");
      expect(character9.name).to.equal("Kelly");
      expect(character10.name).to.equal("Blacky");
      expect(await TR.characterIndex()).to.equal(11);

      // adminB creates another project & mints
      await MPFactory.connect(adminB).createProject(
        title,
        textIpfsHash,
        originalLanguage,
        myMintPrice,
        firstEditionMax
      );
      await MPCollection.connect(adminB).startAuctions(2, 4, discountRate);
      expect(await MPCollection.ownerOf(1002)).to.equal(adminB.address);

      // cannot write with non-TheRetreat NFT from Moonpage
      await expect(
        TRAsAdminB.write("somehash", "_initialTranslationIPFSHash", 1002)
      ).to.revertedWith("Not a TheRetreat NFT");
      // cannot write with an NFT you don't own
      await expect(
        TRAsAdminA.write("somehash", "_initialTranslationIPFSHash", 1)
      ).to.revertedWith("Not authorized");
      // can write with NFT
      await expect(
        TRAsAdminA.write("somehash", "_initialTranslationIPFSHash", 2)
      ).not.to.reverted;
      // cannot use same NFT to write twice
      await expect(
        TRAsAdminA.write("somehash", "_initialTranslationIPFSHash", 2)
      ).to.revertedWith("NFT already used");
      // admin B uses both his 2ish NFTs to continue writing at Peter Shaw
      await expect(
        TRAsAdminB.write("somehash", "_initialTranslationIPFSHash", 12)
      ).not.to.reverted;
      await expect(
        TRAsAdminB.write("somehash", "_initialTranslationIPFSHash", 22)
      ).not.to.reverted;

      // snippets of characters work as expected
      const snippetsOfPeterShaw = await TR.snippetsOfCharacter(2);
      const result1 = snippetsOfPeterShaw.filter(
        (snippet: any) => snippet.written
      );
      expect(result1.length).to.equal(3);

      // userA and adminB write with 6ish NFTs (Inspector Reynolds)
      await expect(
        TRAsUserA.write("somehash", "_initialTranslationIPFSHash", 6)
      ).not.to.reverted;
      await expect(
        TRAsAdminB.write("somehash", "_initialTranslationIPFSHash", 16)
      ).not.to.reverted;
      await expect(
        TRAsAdminB.write("somehash", "_initialTranslationIPFSHash", 26)
      ).not.to.reverted;
      const snippetsOfInspectorReynolds = await TR.snippetsOfCharacter(6);
      const result2 = snippetsOfInspectorReynolds.filter(
        (snippet: any) => snippet.written
      );
      expect(result2.length).to.equal(3);
      const overallIndex = await TR.index();
      expect(overallIndex).to.equal(7);
    });
  });
});
