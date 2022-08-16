const hre = require("hardhat");
export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function deployUpgradable() {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);

  const DummyFactoryFactory = await hre.ethers.getContractFactory(
    "DummyFactory"
  );

  const Proxy = await hre.upgrades.deployProxy(
    DummyFactoryFactory,
    ["testname"],
    {
      kind: "uups",
    }
  );

  await Proxy.deployed();
  console.log(`Proxy deployed to: ${Proxy.address}`);
}

deployUpgradable().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
