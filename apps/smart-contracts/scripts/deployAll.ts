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
  const ProjectDaoFactory = await hre.ethers.getContractFactory("ProjectDao");
  const ProjectDao = await ProjectDaoFactory.deploy();
  await ProjectDao.deployed();
  console.log(`ProjectDao contract deployed to: ${ProjectDao.address}`);

  // deploy ProjectFactory
  const ProjectFactoryFactory = await hre.ethers.getContractFactory(
    "ProjectFactory"
  );
  const ProjectFactory = await ProjectFactoryFactory.deploy(ProjectDao.address);
  await ProjectFactory.deployed();
  console.log(`ProjectFactory contract deployed to: ${ProjectFactory.address}`);

  // // Dao arguments
  const title = "My little Phony";
  const textIpfsHash = "QmTw3pWBQinwuHS57FcWyUGBpvGqLHQZkn1eKjp89XXyFg";
  const initialMintPrice = hre.ethers.utils.parseUnits("0.05", 18);
  const firstEditionMax = 4;

  // setFactory
  await ProjectDao.setFactory(ProjectFactory.address);

  // deploy dao
  const tx = await ProjectFactory.createDao(
    title,
    textIpfsHash,
    initialMintPrice,
    firstEditionMax
  );
  const receipt = await tx.wait();
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
      address: ProjectDao.address,
      constructorArguments: [],
    }),
    hre.run("verify:verify", {
      address: ProjectFactory.address,
      constructorArguments: [ProjectDao.address],
    }),
  ]);
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
