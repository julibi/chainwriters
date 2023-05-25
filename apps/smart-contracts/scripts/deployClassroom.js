const hre = require("hardhat");
const upgrades = require("@openzeppelin/upgrades-core");

async function deployClassroom() {
  await hre.run("compile");

  const [deployer] = await hre.ethers.getSigners();
  const moonpageManagerAddr = "0xb506f8587cdb61ce205fa88bdcccfbd90c588a6e";
  const moonpageCollectionAddr = "0x0eC473B1BD821D386cd7209203Ba6826Fd653B96";
  const provider = hre.ethers.provider;
  console.log("Deployer account:", deployer.address);
  console.log("MP Manager account:", moonpageManagerAddr);
  console.log("MP Collection account:", moonpageCollectionAddr);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy MoonpageManager
  const TCRFactory = await hre.ethers.getContractFactory("TheRetreat");
  const TCRProxy = await hre.upgrades.deployProxy(
    TCRFactory,
    [moonpageCollectionAddr, moonpageManagerAddr, 37],
    {
      kind: "uups",
    }
  );
  await TCRProxy.deployed();

  const TCRImplAddress = await upgrades.getImplementationAddress(
    provider,
    TCRProxy.address
  );

  console.log(`TCRProxy: ${TCRProxy.address}`);

  console.log(`TCRImplAddress: ${TCRImplAddress}`);

  // verify contract
  console.log("Verifying Implementation...");
  await Promise.all([
    hre.run("verify:verify", {
      address: TCRImplAddress,
      constructorArguments: [],
    }),
  ]);
}

deployClassroom().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
