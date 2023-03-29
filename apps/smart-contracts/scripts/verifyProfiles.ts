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
    "0x9daC041339ed137F3d28DB6279CB405A05d4c401"
  );

  const ContractAsDeployer = await contract.connect(deployer);

  const verifyingTX = await ContractAsDeployer.setIsVerified(
    ["0xaD22d0779Da45A7144F49E1A25809cb274b143Ff"],
    [true]
  );
  console.log({ verifyingTX });
}

verifyProfiles().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
