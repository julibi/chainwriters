const hre = require("hardhat");


const wait = (seconds:number) => new Promise((resolve, _) => {
  setTimeout(resolve, seconds * 1000)
})

async function deployDAO() {
  await hre.run('compile');
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log(`Network: ${hre.ethers.network}`);

  // MoonlitDAO constructor argument
  const Greeting = "Hello I am DAO";

  // MoonlitNFT constructor argument
  const name = "testnftschreiberei";
  const maxNFTs = 10;
  const author = "0x1e1a88bdEf16b1906b85c31c625baEf8EAabBA98";
  const baseUri = "baseURI"

  // deploy DAO contract
  const MoonlitDaoFactory = await hre.ethers.getContractFactory("MoonlitDao");
  const MoonlitDao = await MoonlitDaoFactory.deploy(Greeting);
  await MoonlitDao.deployed();
  console.log(`DAO contract deployed to: ${MoonlitDao.address} at ${hre.ethers.network}`);

   // deploy NFT contract
   const MoonlitNFTFactory = await hre.ethers.getContractFactory("MoonlitNFT");
   const MoonlitNFT = await MoonlitNFTFactory.deploy(MoonlitDao.address, name, maxNFTs, author, baseUri);
   await MoonlitNFT.deployed();
   console.log(`NFT contract deployed to: ${MoonlitNFT.address} at ${hre.ethers.network}`);

  // wait around for a bit
  console.log('Waiting for etherscan/polygonscan once more...')
  await wait(60);

  // verify contract
  console.log('Verifying...')
  await Promise.all([hre.run("verify:verify", {
    address: MoonlitDao.address,
    constructorArguments: [Greeting]
  }),
  hre.run("verify:verify", {
    address: MoonlitNFT.address,
    constructorArguments: [MoonlitDao.address, name, maxNFTs, author, baseUri],
  })
  ])
}

deployDAO().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
