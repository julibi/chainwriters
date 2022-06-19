import { Console } from "console";

const hre = require("hardhat");
export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function deployAll() {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);

  // Dao arguments
  const artist = "0x6A5950eBaf0d84aff792F4D7C03Cb8d645B42310";
  const feeAmount = "10000000000000000";
  // mumbai
  const feeToken = "0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e";

  // deploy testContract
  const TestRoyaltiesFactory = await hre.ethers.getContractFactory(
    "TestRoyalties"
  );
  const TestRoyalties = await TestRoyaltiesFactory.deploy(
    artist,
    feeAmount,
    feeToken
  );
  await TestRoyalties.deployed();
  console.log(`Factory contract deployed to: ${TestRoyalties.address}`);

  // wait around for a bit
  console.log("Waiting for etherscan/polygonscan once more...");
  await wait(60);

  // verify contract
  console.log("Verifying...");
  await Promise.all([
    hre.run("verify:verify", {
      address: TestRoyalties.address,
      constructorArguments: [artist, feeAmount, feeToken],
    }),
  ]);
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
