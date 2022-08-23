# Moonpage DAO Smart Contract Architecture

Moonpage DAO is an NFT launchpad that allows creators to publish their text as NFT project and sell it. Users can buy these NFTs and get access to the text with it.
Thechically, Moonpage DAO is ONE ERC721 collection in which the same amount of tokenIDs are reserved for each project. When the first user creates a project the tokenIds 1 - 1000 are reserved for her project, the next project will be for IDs 1001 - 2000 etc. ...

## Royalties

We aim to take 7% royalties. 70% of those 7% go to the creator, 30% goes to Moonpage. Because marketplaces have not settled on one standard to deal with royalties, we are following two approaches at the same time.
a) Opensea: we will be setting the royalty fee in the UI of Opensea and set an address as receiver. After the launch, we will setup a service to query all secondary sales to know who should get what about of royalties. We will deploy a contract from which all creators can claim their share of Opensea royalties with the signature they get from our BE service.
b) ERC2981: whenever a project gets created we deploy a payment splitter that splits shares 70/30, the receivers are the creator address and a Moonpage dev fund address. The splitter contract address is saved for each project inside the MoonpageManager. The `royaltyInfo` function inside the MoonpageCollection returns the splitter and the royaltyAmount. Of course, both vary depending on the project.

# Moonpage DAO Smart Contract Architecture

The Moonpage DAO consists of 6 contracts:

- MoonpageCollection
  - Non-Upgradable
  - ERC721 (+Enumerable, +URIStorage)
  - Ownable
  - Pausable
  - ERC2981
  - This contract is the main NFT contract. Minting happens directly through this contract and the creator triggers the minting though it. It reads and writes data mainly to the MoonpageManager. Royalties for Opensea will be set over the Webapp, other than that the MoonpageCollection implements the ERC2981 interface. Metadata for each token is stored as base64 directly in the contract.
- MoonpageManager
  - Upgradable
  - AccessControl
  - Pausable
  - This contract is the main control center, into which all relevant data about a project is being set: who the creator is, what the title is, behind which IPFS cid the text hidden, who is getting what shares and which edition a project is in, if a project is being paused etc. All other contract act depending on what is saved in here. When creating a project, configuring it, or enabling the next edition, a creator is interacting with this contract directly. Also when an edition is sold out, the distribution of shares is being handled by this contract.
- MoonpageFactory
  - Upgradable
  - AccessControl
  - Pausable
  - This contract is the factory of the Moonpage DAO. A user creates a project by calling the "createProject" function. "createProject" deploys a Payment Splitter for splitting the royalties of a project (7% royalties – 70% of it go to the creator, 30% to Moonpage), writes the basic data to the MoonpageManager sets up the auction in the AuctionsManager. Through the MoonpageFactory the deployer ("admin") controls if only accounts on the allowlist can create projects, or if the product goes public. The deployer can also blacklist accounts and prevent them from creating a project.
- AuctionsManager
  - Upgradable
  - AccessControl
  - Pausable
  - This contract handles the auctions of each project's Genesis Edition. Every Genesis Edition is being sold in a dutch auction. One NFT at a time, it starts with the starting price and the price goes down to 0 within 24 hours. If no one buys, the auction needs to be retriggered by the next interested person. If the token is bought, the next token is sold in the same way until all Genesis Edition tokens are sold out. The AuctionsManager returns the current price of a token, depending on the starting price and the time elapsed.
- BallotsFactory
  - Upgradeable
  - AccessControl
  - Pausable
  - This contract allows creators to deploy a Ballot for a project.
- Ballot
  - AccessControl
    Each project can have one ballot and a ballot can be used to hold multiple votes, one at a time. Only Genesis Edition holders of the according project are allowed to vote. Each token can be used to vote once.

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
npx hardhat run --network mumbai scripts/deployAll.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

# Tips

When you run into an error like this:

```
[Error: ENOENT: no such file or directory, open '/Users/hyun-kyungyi/elbstack/chainwriters/apps/smart-contracts/artifacts/build-info/ea17654ae42ed5600238694dff0706ba.json'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/Users/hyun-kyungyi/elbstack/chainwriters/apps/smart-contracts/artifacts/build-info/ea17654ae42ed5600238694dff0706ba.json'
}
```

run `npx hardhat clean`

For generating Interfaces

run `npx hardhat gen-interface <contractname>`
