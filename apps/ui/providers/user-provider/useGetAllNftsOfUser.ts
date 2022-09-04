import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useMoonpageCollection from '../../hooks/useMoonpageCollection';

const useGetAllNftsOfUser = () => {
  const { account } = useWeb3React();
  const collection = useMoonpageCollection();
  const [balance, setBalance] = useState<number>(0);
  const [nfts, setNfts] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedBalanceBig = await collection.balanceOf(account);
      const fetchedBalance = Number(fetchedBalanceBig);
      const tokens = [];

      // todo: make a multicall instead
      for (let i = 0; i < fetchedBalance; i++) {
        const nftIdBig = await collection.tokenOfOwnerByIndex(account, i);
        const nftId = Number(nftIdBig);
        tokens.push(nftId);
      }

      setBalance(fetchedBalance);
      setNfts(tokens);
      setLoading(false);
    } catch (e: unknown) {
      setLoading(false);
      console.log({ e });
    }
  }, [account, collection]);

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account, fetchBalance]);

  return useMemo(
    () => ({
      balance,
      nfts,
      loading,
    }),
    [balance, nfts, loading]
  );
};

export default useGetAllNftsOfUser;

// const provider = new JsonRpcProvider(RPC_URLS[80001], 80001);
// const multicall = new Multicall({
//   ethersProvider: provider,
//   tryAggregate: false,
// });

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
