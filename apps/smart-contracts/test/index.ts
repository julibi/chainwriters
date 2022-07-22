import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { formatEther } from "@ethersproject/units";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ProjectDao, ProjectCollection, ProjectFactory } from "../typechain";

// const wait = (seconds: number) =>
//   new Promise((resolve, _) => {
//     setTimeout(resolve, seconds * 1000);
//   });
// const advanceDays = async (hours: any) => {
//   await ethers.provider.send("evm_increaseTime", [60 * 60 * hours]);
//   await ethers.provider.send("evm_mine", []);
// };

describe("Project", function () {
  let factory: SignerWithAddress;
  let author: SignerWithAddress;
  let contribA: SignerWithAddress;
  let contribB: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let ProjectDaoAsAuthor: ProjectDao;
  let ProjectDao: ProjectDao;
  let ProjectFactory: ProjectFactory;
  let ProjectFactoryAsAuthor: ProjectFactory;
  let ProjectCollection: ProjectCollection;
  let ProjectCollectionAsAuthor: ProjectCollection;
  let CollectionAddress: string;
  const title = "My little Phony";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const initialMintPrice = ethers.utils.parseUnits("0.05", 18);
  const ed2MintPrice = ethers.utils.parseUnits("0.1", 18);
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
    const setFactoryTx = await ProjectDao.setFactory(ProjectFactory.address);
    await setFactoryTx.wait();

    // author deploys own collection
    const createDaoTx = await ProjectFactoryAsAuthor.createDao(
      title,
      textIpfsHash,
      initialMintPrice,
      firstEditionMax
    );

    await createDaoTx.wait();

    CollectionAddress = await ProjectFactory.collections(0);
    const ProjectCollectionFactory = await ethers.getContractFactory(
      "ProjectCollection"
    );
    ProjectCollection = ProjectCollectionFactory.attach(CollectionAddress);

    //connect to Collection as author
    ProjectCollectionAsAuthor = ProjectCollection.connect(author);
  });

  describe("happy path", async () => {
    it("from configuration to sellout of genEd and gen2", async () => {
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

      //and data is reflected in Collection, too
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
      expect(formatEther(collectionBalance)).to.equal("0.0");

      // author can enable next edition
      const enableNextEdTX = await ProjectDaoAsAuthor.enableNextEdition(
        ProjectCollection.address,
        3,
        ed2MintPrice
      );
      await enableNextEdTX.wait();

      const newEdition = await ProjectDao.editions(ProjectCollection.address);
      expect(parseInt(newEdition.currentEdition._hex, 16)).to.equal(2);
      expect(parseInt(newEdition.currentEditionMax._hex, 16)).to.equal(3);
      expect(formatEther(newEdition.currentEditionMintPrice)).to.equal("0.1");

      // after second edition sells out, funds are correctly distributed again
      const userAMintTx = await ProjectCollectionAsUserA.mint(2, {
        value: ed2MintPrice.mul(2),
      });
      await userAMintTx.wait();
      const ed2BalanceUserA = await ProjectCollection.balanceOf(
        userA.address,
        2
      );
      expect(ed2BalanceUserA).to.equal(2);
      const userBMintTx = await ProjectCollectionAsUserB.mint(1, {
        value: ed2MintPrice,
      });
      await userBMintTx.wait();
      const ed2BalanceUserB = await ProjectCollection.balanceOf(
        userB.address,
        2
      );
      expect(ed2BalanceUserB).to.equal(1);

      const factoryBalance2 = await provider.getBalance(ProjectFactory.address);
      expect(formatEther(factoryBalance2)).to.equal("0.06");
      const authorBalanceAfter2 = await provider.getBalance(author.address);
      const contribABalanceAfter2 = await provider.getBalance(contribA.address);
      const contribBBalanceAfter2 = await provider.getBalance(contribB.address);
      const gainsAuthor2 = formatEther(
        authorBalanceAfter2.sub(authorBalanceAfter)
      );
      const gainsContribA2 = formatEther(
        contribABalanceAfter2.sub(contribABalanceAfter)
      );
      const gainsContribB2 = formatEther(
        contribBBalanceAfter2.sub(contribBBalanceAfter)
      );
      expect(formatEther(gainsAuthor2)).to.equal("0.13493661446035821");
      expect(formatEther(gainsContribA2)).to.equal("0.075");
      expect(formatEther(gainsContribB2)).to.equal("0.045");
    });
  });
});

// TODO - test all around the auction e.g. correct discount rate!
// TODO all unhappy cases and requires!
// TODO - the roles are not correct. Make sure the deployer can access all funds and set Factory etc.
// royalties - only to
// votes
// Gen Ed can vote erc1155
// weight is the same for everyone
// timelock of 1 week or 1 month
// (yes or no or Enthaltung) OR options up to three with enthaltung
// when more than 50% of the total votes cast
// proxy

// events everywhere
// emergencywithdraw everywhere
// everything upgradable
