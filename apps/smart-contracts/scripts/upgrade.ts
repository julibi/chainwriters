const hre = require("hardhat");
export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function upgrade() {
  await hre.run("compile");
  let proxyAddress = "0x2a1Ab7b335CC94B5ddf99576b775999C68C6A7D7";
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);

  const MoonpageFactoryV2 = await hre.ethers.getContractFactory(
    "MoonpageFactoryV2"
  );
  const upgraded = await hre.upgrades.upgradeProxy(
    proxyAddress,
    MoonpageFactoryV2
  );
  console.log(`Upgraded to: ${upgraded.address}`);
}

upgrade().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
