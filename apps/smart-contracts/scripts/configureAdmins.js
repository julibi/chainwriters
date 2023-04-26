const hre = require("hardhat");
const upgrades = require("@openzeppelin/upgrades-core");

async function configureAdmins() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const TCRContract = await hre.ethers.getContractFactory("TCR");
  const contract = TCRContract.attach(
    "0x5e3f3Df0AF40E7625470c4dE693E06F2d249b903"
  );

  const ContractAsDeployer = contract.connect(deployer);

  const verifyingTX = await ContractAsDeployer.configureAdmins(
    ["0xc5F490B1629f6D6580F33bF53CEe23eF52cEF89C"],
    [true]
  );
  console.log({ verifyingTX });
}

configureAdmins().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
