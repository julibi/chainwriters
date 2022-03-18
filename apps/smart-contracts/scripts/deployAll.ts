import { Console } from "console";

const hre = require("hardhat");
export const wait = (seconds:number) => new Promise((resolve, _) => {
  setTimeout(resolve, seconds * 1000)
})

async function deployAll() {
  await hre.run('compile');
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);

  // deploy factory
  const MoonlitFactoryFactory = await hre.ethers.getContractFactory("MoonlitFactory");
  const MoonlitFactory = await MoonlitFactoryFactory.deploy();
  await MoonlitFactory.deployed();
  console.log(`Factory contract deployed to: ${MoonlitFactory.address}`);
  
  // // Dao arguments
  const title = "Test";
  const ipfsLink = "ipfsLink";
  const initialMintPrice = hre.ethers.utils.parseUnits("0.05", 18);
  const firstEditionMax = 4;
  
  // deploy dao
  const tx = await MoonlitFactory.createDao(title, ipfsLink, initialMintPrice, firstEditionMax);
  const receipt = await tx.wait();
  const daoCreationEvent = receipt.events?.find((event:any) => event.event === 'DaoInstantiated');
  const daoAddress = daoCreationEvent.args[1];
  console.log(`Dao contract deployed to: ${daoAddress}`);

  // wait around for a bit
  console.log('Waiting for etherscan/polygonscan once more...')
  await wait(60);

  // verify contract
  console.log('Verifying...')
  await Promise.all([hre.run("verify:verify", {
    address: MoonlitFactory.address,
    constructorArguments: []
  }),
  hre.run("verify:verify", {
    address: daoAddress,
    constructorArguments: [title, deployer.address, ipfsLink, initialMintPrice, firstEditionMax, MoonlitFactory.address],
  })
  ])
}

deployAll().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
