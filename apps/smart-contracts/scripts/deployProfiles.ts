const hre = require("hardhat");
const upgrades = require("@openzeppelin/upgrades-core");

export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function deployProfiles() {
  await hre.run("compile");
  const [deployer] = await hre.ethers.getSigners();
  const provider = await hre.ethers.provider;

  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy Profiles
  const MoonpageProfilesFactory = await hre.ethers.getContractFactory(
    "MoonpageProfiles"
  );
  const MoonpageProfilesProxy = await hre.upgrades.deployProxy(
    MoonpageProfilesFactory,
    { kind: "uups" }
  );

  await MoonpageProfilesProxy.deployed();

  const ProfilesImplAddress = await upgrades.getImplementationAddress(
    provider,
    MoonpageProfilesProxy.address
  );

  console.log(
    `ProfilesImplAddress contract deployed to: ${ProfilesImplAddress}`
  );

  console.log(
    `MoonpageProfilesProxy contract deployed to: ${MoonpageProfilesProxy.address}`
  );

  // wait around for a bit
  console.log("Waiting for etherscan/polygonscan once more...");
  await wait(30);

  // verify contract
  console.log("Verifying Implementations...");
  await Promise.all([
    hre.run("verify:verify", {
      address: ProfilesImplAddress,
      constructorArguments: [],
    }),
  ]);
}

deployProfiles().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
