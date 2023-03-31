import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import {
  MOONPAGE_COLLECTION_ADDRESS,
  MOONPAGE_COLLECTION_ADDRESS_DEV,
} from '../../constants';
import { Multicall } from 'ethereum-multicall';
import { useCallback, useEffect, useState } from 'react';
import { RPC_URLS } from '../connectors';
import ABI from '../abis/MoonpageCollection.json';
import useMoonpageManager from './useMoonpageManager';

const loop = (start, times, callback) => {
  for (let i = start; i < start + times; i++) {
    callback(i);
  }
};

export const useGetOwners = (projectId: string) => {
  const { chainId } = useWeb3React();
  const [owners, setOwners] = useState<string[] | null>(null);
  const mpManager = useMoonpageManager();

  const fetchStuff = useCallback(async () => {
    try {
      // get ids of project
      const edition = await mpManager.editions(projectId);
      const firstId = Number(edition?.startTokenId) + 1; // we don't count "our" NFT
      const endId = Math.min(firstId + 10, Number(edition?.currentTokenId)); // fetching max first 10 owners
      const numberOfCalls = endId - firstId;
      if (numberOfCalls < 1) return;

      // prepare multicall
      const provider = new JsonRpcProvider(RPC_URLS[chainId], chainId);
      const multicall = new Multicall({
        ethersProvider: provider,
        tryAggregate: false,
      });
      const callsForMulticalls = [];
      loop(firstId, numberOfCalls, (i: number) => {
        callsForMulticalls.push({
          reference: 'ownerOf',
          methodName: 'ownerOf',
          methodParameters: [i],
        });
      });
      const multicallContext = {
        reference: 'NFT_OWNERS',
        contractAddress:
          process.env.NX_PUBLIC_ENVIRONMENT === 'DEV'
            ? MOONPAGE_COLLECTION_ADDRESS_DEV
            : MOONPAGE_COLLECTION_ADDRESS,
        abi: ABI,
        calls: callsForMulticalls,
      };

      // multicall
      const result = (
        await multicall.call(multicallContext)
      ).results.NFT_OWNERS.callsReturnContext.filter(
        (returnElement) => returnElement.success
      );
      const ownerAddresses = result?.map((owner) => owner.returnValues[0]);
      const uniqueOwnerAdrresses = [...new Set(ownerAddresses)];

      setOwners(uniqueOwnerAdrresses);
    } catch (e) {
      console.log({ e });
    }
  }, [chainId, mpManager, projectId]);

  useEffect(() => {
    fetchStuff();
  }, [fetchStuff]);

  return owners;
};
