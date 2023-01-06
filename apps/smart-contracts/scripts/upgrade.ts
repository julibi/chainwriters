const hre = require("hardhat");
export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function upgrade() {
  await hre.run("compile");
  let proxyAddress = "0x0ffab0dE416A0ED309dF1E492a9D6aF8EDE2b9cD";
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);

  const MoonpageManagerV2 = await hre.ethers.getContractFactory(
    "MoonpageManagerV2"
  );
  const options = {
    unsafeAllowRenames: false,
    unsafeSkipStorageCheck: false,
    kind: "uups",
  };
  const upgraded = await hre.upgrades.upgradeProxy(
    proxyAddress,
    MoonpageManagerV2,
    options
  );
  console.log(`Upgraded to: ${upgraded.address}`);
}

upgrade().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
