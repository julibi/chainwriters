const hre = require("hardhat");
const upgrades = require("@openzeppelin/upgrades-core");

export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function deployAll() {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  const moonpageDev = "0xb849DE17AB1d9D6d96c5146b4C1d19a953135A0B";
  const royaltiesReceiver = "0x0afF32d090190b254D3eC5Aa4487db2C98c17a23";
  const provider = await hre.ethers.provider;
  console.log("Deployer account:", deployer.address);
  console.log("MP Dev account:", moonpageDev);
  console.log("RoyaltiesReceiver account:", royaltiesReceiver);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy MoonpageCollection
  const MoonpageCollectionFactory = await hre.ethers.getContractFactory(
    "MoonpageCollection"
  );

  const MoonpageCollection = await MoonpageCollectionFactory.deploy();
  // await MoonpageCollection.deployed();

  console.log(MoonpageCollection.address);
  console.log(
    `MoonpageCollection contract deployed to: ${MoonpageCollection.address}`
  );

  // deploy MoonpageManager
  const MoonpageManagerFactory = await hre.ethers.getContractFactory(
    "MoonpageManager"
  );
  const MoonpageManagerProxy = await hre.upgrades.deployProxy(
    MoonpageManagerFactory,
    [],
    {
      kind: "uups",
    }
  );
  await MoonpageManagerProxy.deployed();

  const MoonpageManagerImplAddress = await upgrades.getImplementationAddress(
    provider,
    MoonpageManagerProxy.address
  );

  console.log(
    `MoonpageManagerProxy contract deployed to: ${MoonpageManagerProxy.address}`
  );

  console.log(
    `MoonpageManagerImpl contract deployed to: ${MoonpageManagerImplAddress}`
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
  await AuctionsManagerProxy.deployed();

  const AuctionsManagerImplAddress = await upgrades.getImplementationAddress(
    provider,
    AuctionsManagerProxy.address
  );

  console.log(
    `AuctionsManagerProxy contract deployed to: ${AuctionsManagerProxy.address}`
  );

  console.log(
    `AuctionsManagerImpl contract deployed to: ${AuctionsManagerImplAddress}`
  );

  // deploy MoonpageFactory
  const MoonpageFactoryFactory = await hre.ethers.getContractFactory(
    "MoonpageFactory"
  );
  const MoonpageFactoryProxy = await hre.upgrades.deployProxy(
    MoonpageFactoryFactory,
    [
      MoonpageManagerProxy.address,
      AuctionsManagerProxy.address,
      royaltiesReceiver,
    ],
    { kind: "uups" }
  );

  await MoonpageFactoryProxy.deployed();

  const MoonpageFactoryImplAddress = await upgrades.getImplementationAddress(
    provider,
    MoonpageFactoryProxy.address
  );

  console.log(
    `MoonpageFactoryImpl contract deployed to: ${MoonpageFactoryImplAddress}`
  );

  console.log(
    `MoonpageFactoryProxy contract deployed to: ${MoonpageFactoryProxy.address}`
  );

  // deploy BallotFactory
  // const BallotsFactoryFactory = await hre.ethers.getContractFactory(
  //   "BallotsFactory"
  // );
  // const BallotsFactoryProxy = await hre.upgrades.deployProxy(
  //   BallotsFactoryFactory,
  //   [MoonpageManagerProxy.address, MoonpageCollection.address],
  //   { kind: "uups" }
  // );

  // await BallotsFactoryProxy.deployed();

  // const BallotsFactoryImplAddress = await upgrades.getImplementationAddress(
  //   provider,
  //   BallotsFactoryProxy.address
  // );

  // console.log(
  //   `BallotsFactoryImpl contract deployed to: ${BallotsFactoryImplAddress}`
  // );

  // console.log(
  //   `BallotsFactoryProxy contract deployed to: ${BallotsFactoryProxy.address}`
  // );

  // set Contract on Moonpage Collection
  await MoonpageCollection.setAddresses(
    MoonpageManagerProxy.address,
    AuctionsManagerProxy.address,
    moonpageDev
  );

  // setFactory on Moonpage Manager
  await MoonpageManagerProxy.setAddresses(
    MoonpageCollection.address,
    MoonpageFactoryProxy.address,
    moonpageDev
  );

  // set Contracts on Auctions Manager
  await AuctionsManagerProxy.setContracts(
    MoonpageManagerProxy.address,
    MoonpageFactoryProxy.address,
    MoonpageCollection.address
  );

  // set Contracts on Factory
  // await MoonpageFactoryProxy.setAddresses(
  //   MoonpageManagerProxy.address,
  //   AuctionsManagerProxy.address,
  //   royaltiesReceiver
  // );

  // set Contracts on Ballots Factory
  // await BallotsFactoryProxy.setContract(
  //   MoonpageManagerProxy.address,
  //   MoonpageCollection.address
  // );

  // wait around for a bit
  console.log("Waiting for etherscan/polygonscan once more...");
  await wait(30);

  // verify contract
  console.log("Verifying Implementations...");
  await Promise.all([
    hre.run("verify:verify", {
      address: MoonpageCollection.address,
      constructorArguments: [],
    }),
    hre.run("verify:verify", {
      address: MoonpageManagerImplAddress,
      constructorArguments: [],
    }),
    hre.run("verify:verify", {
      address: AuctionsManagerImplAddress,
      constructorArguments: [],
    }),
    hre.run("verify:verify", {
      address: MoonpageFactoryImplAddress,
      constructorArguments: [],
    }),
    // hre.run("verify:verify", {
    //   address: BallotsFactoryImplAddress,
    //   constructorArguments: [],
    // }),
    // necessary to verify all proxies? also as constructor arguments I pass the
    // implementation addresses or the proxy addresses? :P
    // hre.run("verify:verify", {
    //   address: MoonpageManagerProxy.address
    //   constructorArguments: [MoonpageCollection.address],
    // }),
    // hre.run("verify:verify", {
    //   address: AuctionsManagerProxy.address,
    //   constructorArguments: [],
    // }),
    // hre.run("verify:verify", {
    //   address: MoonpageFactoryProxy.address,
    //   constructorArguments: [
    //     MoonpageManagerImplAddress,
    //     AuctionsManagerImplAddress,
    //   ],
    // }),
    // hre.run("verify:verify", {
    //   address: BallotsFactoryProxy.address,
    //   constructorArguments: [
    //     MoonpageManagerImplAddress,
    //     MoonpageCollection.address,
    //   ],
    // }),
  ]);
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
