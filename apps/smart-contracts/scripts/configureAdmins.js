const hre = require("hardhat");
const upgrades = require("@openzeppelin/upgrades-core");

async function configureAdmins() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const TCRContract = await hre.ethers.getContractFactory("TheRetreat");
  const contract = TCRContract.attach(
    "0x8F8F4e3cfcd89Dc2020E8d2615d96C8d19383F22"
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
