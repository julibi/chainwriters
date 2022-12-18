import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import upgrades from "@openzeppelin/upgrades-core";
import { expect } from "chai";
import { ExampleNFT, NFTAirdrop } from "../typechain";

describe("NFTAirdrop", async () => {
  let deployer: SignerWithAddress;
  let userA: SignerWithAddress;
  let userB: SignerWithAddress;
  let userC: SignerWithAddress;
  let userD: SignerWithAddress;
  let userE: SignerWithAddress;
  let nonEligible: SignerWithAddress;
  let userF: SignerWithAddress;
  let userG: SignerWithAddress;
  let userH: SignerWithAddress;
  let userI: SignerWithAddress;
  let ExampleNFTContract: ExampleNFT;
  let SecondNFTContract: ExampleNFT;
  let AirdropContract: NFTAirdrop;
  beforeEach(async () => {
    [
      deployer,
      userA,
      userB,
      userC,
      userD,
      userE,
      nonEligible,
      userF,
      userG,
      userH,
      userI,
    ] = await ethers.getSigners();

    // deploy NFT Contract
    const ExampleNFTFactory = await ethers.getContractFactory("ExampleNFT");
    ExampleNFTContract = await ExampleNFTFactory.deploy();

    // deploy Airdrop Contract
    const NFTAirdropFactory = await ethers.getContractFactory("NFTAirdrop");
    AirdropContract = await NFTAirdropFactory.deploy();
    // AirdropContract = await NFTAirdropFactory.deploy();
  });

  it("deployer ownly can add nfts to this contract", async () => {
    // deployer is owner of NFTS
    expect((await ExampleNFTContract.ownerOf(0)) == deployer.address);
    expect((await ExampleNFTContract.ownerOf(1)) == deployer.address);
    expect((await ExampleNFTContract.ownerOf(2)) == deployer.address);
    expect((await ExampleNFTContract.ownerOf(3)) == deployer.address);
    expect((await ExampleNFTContract.ownerOf(4)) == deployer.address);

    // approveForAll
    const nftContract = ExampleNFTContract.address;
    await ExampleNFTContract.connect(deployer).setApprovalForAll(
      AirdropContract.address,
      true
    );

    // random dudess trying to add airdrop Items
    await expect(
      AirdropContract.connect(userA).addAirdropItems([
        { nft: nftContract, id: 0 },
        { nft: nftContract, id: 1 },
        { nft: nftContract, id: 2 },
      ])
    ).to.revertedWith("not authorized");

    // admin can though
    await AirdropContract.connect(deployer).addAirdropItems([
      { nft: nftContract, id: 0 },
      { nft: nftContract, id: 1 },
      { nft: nftContract, id: 2 },
    ]);

    // admin can add more
    await AirdropContract.connect(deployer).addAirdropItems([
      { nft: nftContract, id: 3 },
      { nft: nftContract, id: 4 },
    ]);

    // now contract is owner of all NFTS
    expect((await ExampleNFTContract.ownerOf(0)) == AirdropContract.address);
    expect((await ExampleNFTContract.ownerOf(1)) == AirdropContract.address);
    expect((await ExampleNFTContract.ownerOf(2)) == AirdropContract.address);
    expect((await ExampleNFTContract.ownerOf(3)) == AirdropContract.address);
    expect((await ExampleNFTContract.ownerOf(4)) == AirdropContract.address);
  });

  it("deployer only can add and remove recipients", async () => {
    // random dudess trying to add recipients
    await expect(
      AirdropContract.connect(userA).addRecipients([
        userA.address,
        userB.address,
        userC.address,
      ])
    ).to.revertedWith("not authorized");

    // admin can add recipients though
    await AirdropContract.connect(deployer).addRecipients([
      userA.address,
      userB.address,
      userC.address,
    ]);

    // admin can add recipients though
    await AirdropContract.connect(deployer).removeRecipients([
      userA.address,
      userB.address,
      userC.address,
    ]);
  });

  it("only lets people from recipients list claim and only once", async () => {
    // approveForAll
    const nftContract = ExampleNFTContract.address;
    await ExampleNFTContract.connect(deployer).setApprovalForAll(
      AirdropContract.address,
      true
    );

    // admin can though
    await AirdropContract.connect(deployer).addAirdropItems([
      { nft: nftContract, id: 0 },
      { nft: nftContract, id: 1 },
      { nft: nftContract, id: 2 },
      { nft: nftContract, id: 3 },
      { nft: nftContract, id: 4 },
    ]);

    // admin can add recipients though
    await AirdropContract.connect(deployer).addRecipients([
      userA.address,
      userB.address,
      userC.address,
      userD.address,
      userE.address,
    ]);

    // users not on recipients list cannot claim
    await expect(AirdropContract.connect(nonEligible).claim()).to.revertedWith(
      "recipient not registered"
    );

    // users on recipients can claim
    await AirdropContract.connect(userA).claim();
    await AirdropContract.connect(userB).claim();
    await AirdropContract.connect(userC).claim();

    expect((await ExampleNFTContract.ownerOf(0)) == userA.address);
    expect((await ExampleNFTContract.ownerOf(1)) == userB.address);
    expect((await ExampleNFTContract.ownerOf(2)) == userC.address);

    // users on recipients can claim but NOT twice
    await expect(AirdropContract.connect(userA).claim()).to.revertedWith(
      "recipient not registered"
    );
  });

  it("lets admin clear an airdrop and start a whole new one", async () => {
    // ------------------
    // The first NFT Airdrop
    // -----------------

    // approveForAll
    const nftContract = ExampleNFTContract.address;
    await ExampleNFTContract.connect(deployer).setApprovalForAll(
      AirdropContract.address,
      true
    );

    // add airdrop items
    await AirdropContract.connect(deployer).addAirdropItems([
      { nft: nftContract, id: 0 },
      { nft: nftContract, id: 1 },
      { nft: nftContract, id: 2 },
      { nft: nftContract, id: 3 },
      { nft: nftContract, id: 4 },
    ]);

    // add recipients though
    await AirdropContract.connect(deployer).addRecipients([
      userA.address,
      userB.address,
      userC.address,
      userD.address,
      userE.address,
    ]);

    // users on recipients can claim
    await AirdropContract.connect(userA).claim();
    await AirdropContract.connect(userB).claim();
    await AirdropContract.connect(userC).claim();

    expect((await ExampleNFTContract.ownerOf(0)) == userA.address);
    expect((await ExampleNFTContract.ownerOf(1)) == userB.address);
    expect((await ExampleNFTContract.ownerOf(2)) == userC.address);

    // admin only closes an airdrop
    // when closing, admin needs to give the exact list of all addresses that have not claimed
    await expect(
      AirdropContract.connect(userA).closeAirdrop([
        userD.address,
        userE.address,
      ])
    ).to.revertedWith("not authorized");
    await expect(
      AirdropContract.connect(deployer).closeAirdrop([userD.address])
    ).to.revertedWith("include all addresses to reset");

    await AirdropContract.connect(deployer).closeAirdrop([
      userD.address,
      userE.address,
    ]);
    expect(await AirdropContract.nextAirdropId()).to.equal(0);
    expect(await AirdropContract.airdropItemsIndex()).to.equal(0);
    expect(await AirdropContract.recipientsIndex()).to.equal(0);

    // now addresses that were on the recipientslist cannot claim their NFT anymore
    await expect(AirdropContract.connect(userD).claim()).to.revertedWith(
      "recipient not registered"
    );
    await expect(AirdropContract.connect(userE).claim()).to.revertedWith(
      "recipient not registered"
    );

    // ------------------
    // The second NFT Airdrop
    // -----------------

    // deploy another NFT Contract
    const SecondNFTFactory = await ethers.getContractFactory("ExampleNFT");
    SecondNFTContract = await SecondNFTFactory.deploy();

    // approveForAll again for new Contract
    const secondContract = SecondNFTContract.address;
    await SecondNFTContract.connect(deployer).setApprovalForAll(
      AirdropContract.address,
      true
    );

    // add airdrop items again
    await AirdropContract.connect(deployer).addAirdropItems([
      { nft: secondContract, id: 0 },
      { nft: secondContract, id: 1 },
      { nft: secondContract, id: 2 },
      { nft: secondContract, id: 3 },
      { nft: secondContract, id: 4 },
    ]);

    // add recipients again
    await AirdropContract.connect(deployer).addRecipients([
      userF.address,
      userG.address,
      userH.address,
      userI.address,
      userD.address,
    ]);

    // recipients can claim agalin
    await AirdropContract.connect(userF).claim();
    await AirdropContract.connect(userG).claim();
    await AirdropContract.connect(userH).claim();
    await AirdropContract.connect(userD).claim();

    // the one from the previous airdrop cannot claim
    await expect(AirdropContract.connect(userA).claim()).to.revertedWith(
      "recipient not registered"
    );
    await expect(AirdropContract.connect(userB).claim()).to.revertedWith(
      "recipient not registered"
    );
    await expect(AirdropContract.connect(userE).claim()).to.revertedWith(
      "recipient not registered"
    );

    expect((await ExampleNFTContract.ownerOf(0)) == userF.address);
    expect((await ExampleNFTContract.ownerOf(1)) == userG.address);
    expect((await ExampleNFTContract.ownerOf(2)) == userH.address);
    expect((await ExampleNFTContract.ownerOf(3)) == userD.address);

    // this airdrop too can be closed
    await AirdropContract.connect(deployer).closeAirdrop([userI.address]);
    expect(await AirdropContract.nextAirdropId()).to.equal(0);
    expect(await AirdropContract.airdropItemsIndex()).to.equal(0);
    expect(await AirdropContract.recipientsIndex()).to.equal(0);
  });

  it("bulk transaction", async () => {
    // deploy another NFT Contract
    const RandomNFTFactory = await ethers.getContractFactory("ExampleNFT");
    const RandomNFTContract = await RandomNFTFactory.deploy();

    // approveForAll
    await RandomNFTContract.connect(deployer).setApprovalForAll(
      AirdropContract.address,
      true
    );

    // only admin can bulkTransfer
    await expect(
      AirdropContract.connect(userA).bulkTransfer(
        RandomNFTContract.address,
        deployer.address,
        [userA.address, userB.address, userC.address],
        [0, 1, 2]
      )
    ).to.revertedWith("not authorized");

    await expect(
      AirdropContract.connect(deployer).bulkTransfer(
        RandomNFTContract.address,
        deployer.address,
        [userA.address, userB.address, userC.address],
        [0, 1]
      )
    ).to.revertedWith("receivers and IDs are different length");

    await AirdropContract.connect(deployer).bulkTransfer(
      RandomNFTContract.address,
      deployer.address,
      [userA.address, userB.address, userC.address],
      [0, 1, 2]
    );
  });
});
