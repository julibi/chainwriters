const hre = require("hardhat");
export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function deployUpgradable() {
  await hre.run("compile");

  const [deployer, a, b] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);

  const MoonpageFactoryFactory = await hre.ethers.getContractFactory(
    "MoonpageFactory"
  );

  const Proxy = await hre.upgrades.deployProxy(
    MoonpageFactoryFactory,
    [a.address, b.address],
    {
      kind: "uups",
    }
  );

  await Proxy.deployed();
  console.log(`MoonpageProxy deployed to: ${Proxy.address}`);
}

deployUpgradable().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
