const hre = require("hardhat");
export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function upgrade() {
  await hre.run("compile");
  let proxyAddress = "0x01f9ffE7dB00303AE4f3d42d03a26A5DAD0D1904";
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);

  const DummyV2 = await hre.ethers.getContractFactory("DummyFactoryV2");
  const upgraded = await hre.upgrades.upgradeProxy(proxyAddress, DummyV2);
  console.log(`Upgraded to: ${upgraded.address}`);
}

upgrade().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
