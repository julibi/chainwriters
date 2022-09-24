import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useMoonpageCollection from '../../hooks/useMoonpageCollection';
import { useProjects } from '../../hooks/projects';
import { Project } from '../projects-provider/projects-provider.types';
import { OwnedUserNft } from './user-provider.types';

// make this hook accept address parameter ?-> could be used in the future for "profile page"
const useGetAllNftsOfAccount = () => {
  const { account } = useWeb3React();
  const collection = useMoonpageCollection();
  const { allProjects, areAllProjectsLoading, allProjectsFetchError } =
    useProjects();
  const [balance, setBalance] = useState<number>(0);
  const [nfts, setNfts] = useState<number[]>([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [detailedNfts, setDetailedNfts] = useState<OwnedUserNft[] | null>(null);
  const [groupedNfts, setGroupedNfts] = useState<OwnedUserNft[][] | null>(null);

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
        return {
          tokenId,
          projectId,
          edition: Number(edition.edition),
          title: project.title,
          creator: project.creator,
        };
      } else {
        return null;
      }
    },
    [getProjectIdOfToken]
  );

  const fetchBalance = useCallback(async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
      const nftsWithIdAndEdition = tokens.map((token) =>
        getEditionAndIdOfToken(token, allProjects)
      );
      const groupByProjectId = nftsWithIdAndEdition.reduce((group, product) => {
        const { projectId } = product;
        group[projectId] = group[projectId] ?? [];
        group[projectId].push(product);
        return group;
      }, {});
      const groupedInArray = [];
      for (const [key, value] of Object.entries(groupByProjectId)) {
        groupedInArray.push(value);
      }
      setDetailedNfts(nftsWithIdAndEdition);
      setGroupedNfts(groupedInArray);
      setIsLoading(false);
    } catch (e: unknown) {
      setIsLoading(false);
      console.log({ e });
    }
  }, [account, allProjects, collection, getEditionAndIdOfToken]);

  useEffect(() => {
    if (account && !areAllProjectsLoading && !allProjectsFetchError) {
      fetchBalance();
    }
  }, [account, allProjectsFetchError, areAllProjectsLoading, fetchBalance]);

  return useMemo(
    () => ({
      balance,
      nfts,
      isLoading: loading,
      detailedNfts,
      groupedNfts,
    }),
    [balance, nfts, loading, detailedNfts, groupedNfts]
  );
};

export default useGetAllNftsOfAccount;

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
