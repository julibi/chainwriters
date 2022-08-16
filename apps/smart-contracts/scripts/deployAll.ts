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

  // deploy MoonpageCollection
  const MoonpageCollectionFactory = await hre.ethers.getContractFactory(
    "MoonpageCollection"
  );
  const MoonpageCollection = await MoonpageCollectionFactory.deploy();
  await MoonpageCollection.deployed();
  console.log(
    `MoonpageCollection contract deployed to: ${MoonpageCollection.address}`
  );

  // deploy MoonpageManager
  const MoonpageManagerFactory = await hre.ethers.getContractFactory(
    "MoonpageManager"
  );
  const MoonpageManager = await MoonpageManagerFactory.deploy(
    MoonpageCollection.address
  );
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
    MoonpageManager.address,
    MoonpageCollection.address
  );
  await BallotsFactory.deployed();
  console.log(`BallotFactory contract deployed to: ${BallotsFactory.address}`);

  // set Contract on Moonpage Collection
  await MoonpageCollection.setContracts(
    MoonpageManager.address,
    AuctionsManager.address
  );

  // setFactory on Moonpage Manager
  await MoonpageManager.setContracts(
    MoonpageCollection.address,
    MoonpageFactory.address
  );

  // set Contracts on Auctions Manager
  await AuctionsManager.setContracts(
    MoonpageManager.address,
    MoonpageFactory.address,
    MoonpageCollection.address
  );

  // set Contracts on Factory
  await MoonpageFactory.setContracts(
    MoonpageManager.address,
    AuctionsManager.address
  );

  // set Contracts on Ballots Factory
  await BallotsFactory.setContract(
    MoonpageManager.address,
    MoonpageCollection.address
  );

  // wait around for a bit
  console.log("Waiting for etherscan/polygonscan once more...");
  await wait(60);

  // verify contract
  console.log("Verifying...");
  await Promise.all([
    hre.run("verify:verify", {
      address: MoonpageCollection.address,
      constructorArguments: [],
    }),
    hre.run("verify:verify", {
      address: MoonpageManager.address,
      constructorArguments: [MoonpageCollection.address],
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
      constructorArguments: [
        MoonpageManager.address,
        MoonpageCollection.address,
      ],
    }),
  ]);
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
