const hre = require("hardhat");
const upgrades = require("@openzeppelin/upgrades-core");

export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function deployAll() {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  const provider = await hre.ethers.provider;
  const MOONPAGE_MANAGER_ADDRESS_DEV =
    "0x0ffab0dE416A0ED309dF1E492a9D6aF8EDE2b9cD";
  const MOONPAGE_COLLECTION_ADDRESS_DEV =
    "0xc0702467e7f4160AD747cA59E80DFC9FedA87D1b";
  console.log("Deployer account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy MoonpageCollection
  const MoonpageCollectionFactory = await hre.ethers.getContractFactory(
    "MoonpageCollection"
  );
  const MoonpageCollection = MoonpageCollectionFactory.attach(
    MOONPAGE_COLLECTION_ADDRESS_DEV
  );

  console.log(`MoonpageCollection address: ${MoonpageCollection.address}`);
  // deploy MoonpageManager
  const MoonpageManagerFactory = await hre.ethers.getContractFactory(
    "MoonpageManager"
  );
  const MoonpageManager = await MoonpageManagerFactory.attach(
    MOONPAGE_MANAGER_ADDRESS_DEV
  );

  console.log(`MoonpageManager address: ${MoonpageManager.address}`);
  // deploy AuctionsManager
  const AuctionsManagerFactory = await hre.ethers.getContractFactory(
    "AuctionsManager"
  );

  // deploy BallotFactory
  const BallotsFactoryFactory = await hre.ethers.getContractFactory(
    "BallotsFactory"
  );
  const BallotsFactoryProxy = await hre.upgrades.deployProxy(
    BallotsFactoryFactory,
    [MoonpageManager.address, MoonpageCollection.address],
    { kind: "uups" }
  );

  await BallotsFactoryProxy.deployed();

  const BallotsFactoryImplAddress = await upgrades.getImplementationAddress(
    provider,
    BallotsFactoryProxy.address
  );

  console.log(
    `BallotsFactoryImpl contract deployed to: ${BallotsFactoryImplAddress}`
  );

  console.log(
    `BallotsFactoryProxy contract deployed to: ${BallotsFactoryProxy.address}`
  );

  // wait around for a bit
  console.log("Waiting for etherscan/polygonscan once more...");
  await wait(30);

  // verify contract
  console.log("Verifying Implementations...");
  await Promise.all([
    hre.run("verify:verify", {
      address: BallotsFactoryImplAddress,
      constructorArguments: [],
    }),
  ]);
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
