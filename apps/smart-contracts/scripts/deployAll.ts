const hre = require("hardhat");
const upgrades = require("@openzeppelin/upgrades-core");

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

  // deploy MoonpageCollection
  const MoonpageCollectionFactory = await hre.ethers.getContractFactory(
    "MoonpageCollection"
  );
  const MoonpageCollection = await MoonpageCollectionFactory.deploy();
  await MoonpageCollection.deployed();

  console.log(
    `MoonpageCollectionProxy contract deployed to: ${MoonpageCollection.address}`
  );

  // deploy MoonpageManager
  const MoonpageManagerFactory = await hre.ethers.getContractFactory(
    "MoonpageManager"
  );
  const MoonpageManagerProxy = await hre.upgrades.deployProxy(
    MoonpageManagerFactory,
    [MoonpageCollection.address],
    {
      kind: "uups",
    }
  );
  // const MoonpageCollectionImpl = upgrades.getImplementationAddress(
  //   provider, <-- what is this provider?
  //   MoonpageCollection.address
  // );
  console.log(
    `MoonpageManagerProxy contract deployed to: ${MoonpageManagerProxy.address}`
  );

  // deploy AuctionsManager
  const AuctionsManagerFactory = await hre.ethers.getContractFactory(
    "AuctionsManager"
  );
  const AuctionsManagerProxy = await hre.upgrades.deployProxy(
    AuctionsManagerFactory,
    [],
    {
      kind: "uups",
    }
  );
  console.log(
    `AuctionsManagerProxy contract deployed to: ${AuctionsManagerProxy.address}`
  );

  // deploy MoonpageFactory
  const MoonpageFactoryFactory = await hre.ethers.getContractFactory(
    "MoonpageFactory"
  );
  const MoonpageFactoryProxy = await hre.upgrades.deployProxy(
    MoonpageFactoryFactory,
    [MoonpageManagerProxy.address, AuctionsManagerProxy.address],
    { kind: "uups" }
  );

  console.log(
    `MoonpageFactoryProxy contract deployed to: ${MoonpageFactoryProxy.address}`
  );

  // deploy BallotFactory
  const BallotsFactoryFactory = await hre.ethers.getContractFactory(
    "BallotsFactory"
  );
  const BallotsFactoryProxy = await hre.upgrades.deployProxy(
    BallotsFactoryFactory,
    [MoonpageManagerProxy.address, MoonpageCollection.address],
    { kind: "uups" }
  );

  console.log(
    `BallotsFactoryProxy contract deployed to: ${BallotsFactoryProxy.address}`
  );

  // set Contract on Moonpage Collection
  await MoonpageCollection.setContracts(
    MoonpageManagerProxy.address,
    AuctionsManagerProxy.address
  );

  // setFactory on Moonpage Manager
  await MoonpageManagerProxy.setContracts(
    MoonpageCollection.address,
    MoonpageFactoryProxy.address
  );

  // set Contracts on Auctions Manager
  await AuctionsManagerProxy.setContracts(
    MoonpageManagerProxy.address,
    MoonpageFactoryProxy.address,
    MoonpageCollection.address
  );

  // set Contracts on Factory
  await MoonpageFactoryProxy.setContracts(
    MoonpageManagerProxy.address,
    AuctionsManagerProxy.address
  );

  // set Contracts on Ballots Factory
  await BallotsFactoryProxy.setContract(
    MoonpageManagerProxy.address,
    MoonpageCollection.address
  );

  // wait around for a bit
  console.log("Waiting for etherscan/polygonscan once more...");
  await wait(60);

  // // verify contract
  // console.log("Verifying...");
  // await Promise.all([
  //   hre.run("verify:verify", {
  //     address: MoonpageCollection.address,
  //     constructorArguments: [],
  //   }),
  //   hre.run("verify:verify", {
  //     address: MoonpageManager.address,
  //     constructorArguments: [MoonpageCollection.address],
  //   }),
  //   hre.run("verify:verify", {
  //     address: AuctionsManager.address,
  //     constructorArguments: [],
  //   }),
  //   hre.run("verify:verify", {
  //     address: MoonpageFactory.address,
  //     constructorArguments: [MoonpageManager.address, AuctionsManager.address],
  //   }),
  //   hre.run("verify:verify", {
  //     address: BallotsFactory.address,
  //     constructorArguments: [
  //       MoonpageManager.address,
  //       MoonpageCollection.address,
  //     ],
  //   }),
  // ]);
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
