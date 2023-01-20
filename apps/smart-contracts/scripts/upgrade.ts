const hre = require("hardhat");
export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function upgrade() {
  await hre.run("compile");
  // testnet let proxyAddress = "0x5fce69239815e7a409615426e73FDD9909E8a931";
  let proxyAddress = "0xb506F8587cdb61CE205FA88BdCCcfBd90c588A6e";
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(hre.config.networks);

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
