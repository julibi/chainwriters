const hre = require("hardhat");

export const wait = (seconds: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, seconds * 1000);
  });

async function deployAll() {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  const dropperAdd = 0xc5f490b1629f6d6580f33bf53cee23ef52cef89c;
  // 103001 - 104000
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
// on list
// 0xf41eec0a18747d0e0737fba72f6c70b6c3d1fb83 - claimed
// 0x61a2ef03e18a78b8337cd7409c02b61d694f28c0 - claimed
// 0x6a5950ebaf0d84aff792f4d7c03cb8d645b42310 - NOT claimed
// NOT on list
// 0x43dc305551f9d4dfaf26a72d7ad56a9552bb1d90;
// 0x3269a7ebe0faeddb5028c90be247e2d39d5c72c5;
