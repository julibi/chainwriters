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

  // deploy MoonpageManager
  const MoonpageManagerFactory = await hre.ethers.getContractFactory(
    "MoonpageManager"
  );
  const MoonpageManager = await MoonpageManagerFactory.deploy();
  await MoonpageManager.deployed();
  console.log(`Manager contract deployed to: ${MoonpageManager.address}`);

  // deploy AuctionsManager
  const AuctionsManagerFactory = await hre.ethers.getContractFactory(
    "AuctionsManager"
  );
  const AuctionsManager = await AuctionsManagerFactory.deploy();
  await AuctionsManager.deployed();
  console.log(
    `AuctionsManager contract deployed to: ${AuctionsManager.address}`
  );

  // deploy MoonpageFactory
  const MoonpageFactoryFactory = await hre.ethers.getContractFactory(
    "MoonpageFactory"
  );
  const MoonpageFactory = await MoonpageFactoryFactory.deploy(
    MoonpageManager.address,
    AuctionsManager.address
  );
  await MoonpageFactory.deployed();
  console.log(`Factory contract deployed to: ${MoonpageFactory.address}`);

  // deploy BallotFactory
  const BallotsFactoryFactory = await hre.ethers.getContractFactory(
    "BallotsFactory"
  );
  const BallotsFactory = await BallotsFactoryFactory.deploy(
    MoonpageManager.address
  );
  await BallotsFactory.deployed();
  console.log(`BallotFactory contract deployed to: ${BallotsFactory.address}`);

  // // Collection arguments
  const title = "My little Phony";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const initialMintPrice = hre.ethers.utils.parseUnits("0.05", 18);
  const firstEditionMax = 4;

  // setFactory on Moonpage Manager
  await MoonpageManager.setFactory(MoonpageFactory.address);
  // set Contracts on Auctions Manager
  await AuctionsManager.setContracts(
    MoonpageManager.address,
    MoonpageFactory.address
  );

  // deploy dao
  // const createDaoTX = await Factory.createDao(
  //   title,
  //   textIpfsHash,
  //   initialMintPrice,
  //   firstEditionMax
  // );
  // await createDaoTX.wait();

  // const firstCollection = await Factory.collections(0);

  // create Ballot/Deploy Ballot
  // const createBallotTX = await BallotsFactory.createBallot(firstCollection);
  // await createBallotTX.wait();
  // const firstBallot = await BallotsFactory.ballots(firstCollection);
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
      address: MoonpageManager.address,
      constructorArguments: [],
    }),
    hre.run("verify:verify", {
      address: AuctionsManager.address,
      constructorArguments: [],
    }),
    hre.run("verify:verify", {
      address: MoonpageFactory.address,
      constructorArguments: [MoonpageManager.address, AuctionsManager.address],
    }),
    hre.run("verify:verify", {
      address: BallotsFactory.address,
      constructorArguments: [MoonpageManager.address],
    }),
  ]);
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
