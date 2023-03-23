import { deploy } from "@openzeppelin/hardhat-upgrades/dist/utils";

const hre = require("hardhat");

export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function verifyProfiles() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ProfilesContract = await hre.ethers.getContractFactory(
    "MoonpageProfiles"
  );
  const contract = await ProfilesContract.attach(
    "0xf2BFBd1ac95c3303642fCD06DB4b100d418D92d8"
  );

  const ContractAsDeployer = await contract.connect(deployer);

  const verifyingTX = await ContractAsDeployer.setIsVerified(
    ["0xc5F490B1629f6D6580F33bF53CEe23eF52cEF89C"],
    [true]
  );
  console.log({ verifyingTX });
}

verifyProfiles().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
