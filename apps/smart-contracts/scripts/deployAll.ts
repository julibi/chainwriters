import { Console } from "console";

const hre = require("hardhat");
export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function deployAll() {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);

  // deploy DaoManager
  const ManagerFactory = await hre.ethers.getContractFactory("MoonpageManager");
  const Manager = await ManagerFactory.deploy();
  await Manager.deployed();
  console.log(`Manager contract deployed to: ${Manager.address}`);

  // deploy ProjectFactory
  const FactoryFactory = await hre.ethers.getContractFactory("MoonpageFactory");
  const Factory = await FactoryFactory.deploy(Manager.address);
  await Factory.deployed();
  console.log(`Factory contract deployed to: ${Factory.address}`);

  // deploy BallotFactory
  const BallotsFactoryFactory = await hre.ethers.getContractFactory(
    "BallotsFactory"
  );
  const BallotsFactory = await BallotsFactoryFactory.deploy(Manager.address);
  await BallotsFactory.deployed();
  console.log(`BallotFactory contract deployed to: ${BallotsFactory.address}`);

  // // Collection arguments
  const title = "My little Phony";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const initialMintPrice = hre.ethers.utils.parseUnits("0.05", 18);
  const firstEditionMax = 4;

  // setFactory
  await Manager.setFactory(Factory.address);

  // deploy dao
  const createDaoTX = await Factory.createDao(
    title,
    textIpfsHash,
    initialMintPrice,
    firstEditionMax
  );
  await createDaoTX.wait();

  const firstCollection = await Factory.collections(0);

  // create Ballot/Deploy Ballot
  const createBallotTX = await BallotsFactory.createBallot(firstCollection);
  await createBallotTX.wait();
  const firstBallot = await BallotsFactory.ballots(firstCollection);
  // const daoCreationEvent = receipt.events?.find(
  //   (event: any) => event.event === "DaoCreated"
  // );
  // const daoAddress = daoCreationEvent.args[1];
  // console.log(`Dao contract deployed to: ${daoAddress}`);

  // wait around for a bit
  console.log("Waiting for etherscan/polygonscan once more...");
  await wait(60);

  // verify contract
  console.log("Verifying...");
  await Promise.all([
    hre.run("verify:verify", {
      address: Manager.address,
      constructorArguments: [],
    }),
    hre.run("verify:verify", {
      address: Factory.address,
      constructorArguments: [Manager.address],
    }),
    hre.run("verify:verify", {
      address: firstCollection,
      constructorArguments: [
        deployer.address,
        Manager.address,
        initialMintPrice,
        firstEditionMax,
      ],
    }),
    hre.run("verify:verify", {
      address: BallotsFactory.address,
      constructorArguments: [Manager.address],
    }),
    hre.run("verify:verify", {
      address: firstBallot,
      constructorArguments: [firstCollection, deployer.address],
    }),
  ]);
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
