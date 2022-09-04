import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useMoonpageCollection from './useMoonpageCollection';
import useMoonpageManager from './useMoonpageManager';

export interface ReadData {
  creator: string;
  title: string;
  subtitle?: string;
  genre?: string;
  textIpfsHash: string;
  createdAt: string;
}

const useProjectBalanceOfUser = (projectId: string) => {
  const { account } = useWeb3React();
  const collection = useMoonpageCollection();
  const mpManager = useMoonpageManager();
  const [balance, setBalance] = useState<number>(0);
  const [tokens, setTokens] = useState<number[]>([]);
  const [tokensOfProject, setTokensOfProject] = useState<number[]>([]);

  const fetchBalance = useCallback(async () => {
    try {
      const fetchedBalanceBig = await collection.balanceOf(account);
      const fetchedBalance = Number(fetchedBalanceBig);
      const fetchedEditions = await mpManager.editions(projectId);
      const startId = Number(fetchedEditions[2]);
      const endId = Number(fetchedEditions[6]);
      const nfts = [];
      const nftsInThisProject = [];
      for (let i = 0; i < fetchedBalance; i++) {
        const nftIdBig = await collection.tokenOfOwnerByIndex(account, i);
        const nftId = Number(nftIdBig);
        nfts.push(nftId);
        if (nftId >= startId && nftId <= endId) {
          nftsInThisProject.push(nftId);
        }
      }

      setBalance(fetchedBalance);
      setTokens(nfts);
      setTokensOfProject(nftsInThisProject);
    } catch (e: unknown) {
      console.log({ e });
    }
  }, [account, collection, mpManager, projectId]);

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account, fetchBalance]);

  return { balance, tokens, tokensOfProject };
};

export default useProjectBalanceOfUser;
