import { Multicall } from 'ethereum-multicall';
import { JsonRpcProvider } from '@ethersproject/providers';
import { RPC_URLS } from '../../connectors';

const provider = new JsonRpcProvider(RPC_URLS[80001], 80001);
const multicall = new Multicall({
  ethersProvider: provider,
  tryAggregate: false,
});

//   // multicall
//   const addressLow = address.toLowerCase();
//   const multicallContext = {
//     reference: 'PROJECT_DETAILS',
//     contractAddress: addressLow,
//     abi: PROJECT_ABI,
//     calls: [
//       {
//         reference: 'project',
//         methodName: 'project',
//         methodParameters: [],
//       },
//       {
//         reference: 'currentEdition',
//         methodName: 'currentEdition',
//         methodParameters: [],
//       },
//       {
//         reference: 'expiresAt',
//         methodName: 'expiresAt',
//         methodParameters: [],
//       },
//       {
//         reference: 'totalSupplyGenEd',
//         methodName: 'totalSupply',
//         methodParameters: [1],
//       },
//       {
//         reference: 'mintPrice',
//         // it should be getPrice
//         methodName: 'INITIAL_MINT_PRICE',
//         methodParameters: [],
//       },
//       {
//         reference: 'currentEditionMintPrice',
//         methodName: 'currentEditionMintPrice',
//         methodParameters: [],
//       },
//       {
//         reference: 'currentEditionMax',
//         methodName: 'currentEditionMax',
//         methodParameters: [],
//       },
//       {
//         reference: 'auctionsStarted',
//         methodName: 'auctionStarted',
//         methodParameters: [],
//       },
//       {
//         reference: 'auctionsEnded',
//         methodName: 'auctionPhaseFinished',
//         methodParameters: [],
//       },
//       {
//         reference: 'paused',
//         methodName: 'paused',
//         methodParameters: [],
//       },
//       {
//         reference: 'factory',
//         methodName: 'factory',
//         methodParameters: [],
//       },
//     ],
//   };
//   const result = (await multicall.call(multicallContext)).results
//     .PROJECT_DETAILS.callsReturnContext;
//   let premintedByAuthor = result.find((x) => x.reference == 'project')
//     .returnValues[7];
//   let currentEdition = result.find((x) => x.reference == 'currentEdition')
//     .returnValues[0];
//   let totalSupplyGenEd = result.find((x) => x.reference == 'totalSupplyGenEd')
//     .returnValues[0];
//   // these could be fetched from subgraph,
//   //but struggling with updating/refetch issue - hence using this solution for now
//   const auctionsStarted = result.find((x) => x.reference == 'auctionsStarted')
//     .returnValues[0];
//   const auctionsEnded = result.find((x) => x.reference == 'auctionsEnded')
//     .returnValues[0];
//   const expiresAt = parseInt(
//     result
//       .find((x) => x.reference == 'expiresAt')
//       .returnValues[0].hex.toString(),
//     16
//   );
