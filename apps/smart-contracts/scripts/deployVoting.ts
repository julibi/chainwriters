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
    "0xb43D745d330372cF8973294712736003296ea75a";
  const MOONPAGE_COLLECTION_ADDRESS_DEV =
    "0xB82d3442DAdc51399A438a3a394734AA52401C99";
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

  // create a ballot
  // const BallotsFactoryProxy = BallotsFactoryFactory.attach(
  //   "0x525A98329d67F042f76A44d4D91C5Eb4B9ebFcf4"
  // );
  // await BallotsFactoryProxy.createBallot(115);
  // const ballot115Address = await BallotsFactoryProxy.ballots(115);
  // const BallotFactory = await hre.ethers.getContractFactory("Ballot");
  // const Ballot115 = BallotFactory.attach(
  //   "0x2a917D9bB78eC8be577977D3783B7AA15B52F960"
  // );
  // const Ballot115AsCreator = Ballot115.connect(deployer);
  // const inTwelveMinutes = Math.floor(Date.now() / 1000) + 12 * 60;
  // await Ballot115AsCreator.startVote(
  //   "Publish it as a real book?",
  //   ["Yes", "No", "abstention"],
  //   inTwelveMinutes
  // );
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
