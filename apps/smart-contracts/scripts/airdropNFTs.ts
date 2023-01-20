const hre = require("hardhat");

export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function airdropAll() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const AirdropContract = await hre.ethers.getContractFactory("NFTAirdrop");
  const contract = await AirdropContract.attach(
    "0x0eC473B1BD821D386cd7209203Ba6826Fd653B96"
  );

  const testresponse = await contract.dropperAddress();
  console.log({ testresponse });
}

airdropAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
