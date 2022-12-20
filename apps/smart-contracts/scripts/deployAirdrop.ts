const hre = require("hardhat");

export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function deployAll() {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy NFTAirdrop Contract
  const NFTAirdropFactory = await hre.ethers.getContractFactory("NFTAirdrop");
  const NFTAirdropContract = await NFTAirdropFactory.deploy();
  await NFTAirdropContract.deployed();
  console.log(`NFTAirdropContract deployed to: ${NFTAirdropContract.address}`);

  // wait around for a bit
  console.log("Waiting for etherscan/polygonscan once more...");
  await wait(30);

  // verify contract
  console.log("Verifying Implementations...");
  await Promise.all([
    hre.run("verify:verify", {
      address: NFTAirdropContract.address,
      constructorArguments: [],
    }),
  ]);
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
