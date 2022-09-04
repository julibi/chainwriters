import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useMoonpageCollection from '../../hooks/useMoonpageCollection';
import { useProjects } from '../../hooks/projects';
import { Project } from '../projects-provider/projects-provider.types';

const useGetAllNftsOfUser = () => {
  const { account } = useWeb3React();
  const collection = useMoonpageCollection();
  const { allProjects, areAllProjectsLoading, allProjectsFetchError } =
    useProjects();
  const [balance, setBalance] = useState<number>(0);
  const [nfts, setNfts] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProjectIdOfToken = useCallback(
    (tokenId: number, projects: Project[]) => {
      const project = projects.find(
        (project) =>
          tokenId >= Number(project.startId) && tokenId <= Number(project.endId)
      );
      if (project) {
        return project.id;
      } else {
        return null;
      }
    },
    []
  );

  // returns null when a tokenId is valid but not in an edition yet
  const getEditionAndIdOfToken = useCallback(
    (tokenId: number, projects: Project[]) => {
      const projectId = Number(getProjectIdOfToken(tokenId, projects));
      if (projects?.length > 0 && projectId) {
        const project = projects.find(
          (project) => Number(project.id) === projectId
        );
        if (!project) return undefined;
        const edition = project.editions?.find(
          (ed) => tokenId >= Number(ed.startId) && tokenId <= Number(ed.endId)
        );
        if (!edition) return null;
        return { tokenId, projectId, edition: Number(edition.edition) };
      } else {
        return null;
      }
    },
    [getProjectIdOfToken]
  );

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
      const nftsWithIdAndEdition = tokens.map((token) =>
        getEditionAndIdOfToken(token, allProjects)
      );
      const sortedByProjectId = nftsWithIdAndEdition?.sort(
        (a, b) => a.projectId - b.projectId
      );
      console.log({ sortedByProjectId });
    } catch (e: unknown) {
      setLoading(false);
      console.log({ e });
    }
  }, [account, allProjects, collection, getEditionAndIdOfToken]);

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
