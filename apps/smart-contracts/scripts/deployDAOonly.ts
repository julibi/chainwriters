const hre = require("hardhat");
import { wait } from './deployAll';

async function deployDAOonly() {
  await hre.run('compile');
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);


  // MoonlitNFT constructor argument
  const name = "testdao";
  const description = "description";
  const author_address = "0x1e1a88bdEf16b1906b85c31c625baEf8EAabBA98";
  const author_name = "0xAuthor";
  const ipfsLink = "ipfsLink";
  const editor = "0xc5F490B1629f6D6580F33bF53CEe23eF52cEF89C";

  // deploy DAO contract
  const MoonlitDaoFactory = await hre.ethers.getContractFactory("MoonlitDao");
  const MoonlitDao = await MoonlitDaoFactory.deploy(name, description, author_address, author_name, ipfsLink, editor);
  await MoonlitDao.deployed();
  console.log(`DAO contract deployed to: ${MoonlitDao.address} at ${hre.ethers.network}`);

  // wait around for a bit
  console.log('Waiting for etherscan/polygonscan once more...')
  await wait(60);

  // verify contract
  console.log('Verifying...')
  await Promise.all([hre.run("verify:verify", {
    address: MoonlitDao.address,
    constructorArguments: [name, description, author_address, author_name, ipfsLink, editor]
  })
  ])
}

deployDAOonly().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
