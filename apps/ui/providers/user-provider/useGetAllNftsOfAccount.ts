import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Multicall } from 'ethereum-multicall';
import { JsonRpcProvider } from '@ethersproject/providers';
import useMoonpageCollection from '../../hooks/useMoonpageCollection';
import { useProjects } from '../../hooks/projects';
import { Project } from '../projects-provider/projects-provider.types';
import { OwnedUserNft } from './user-provider.types';
import { RPC_URLS } from '../../connectors';
import { loop } from '../../utils/loop';
import {
  MOONPAGE_COLLECTION_ADDRESS,
  MOONPAGE_COLLECTION_ADDRESS_DEV,
} from '../../../constants';
import ABI from '../../abis/MoonpageCollection.json';
import { BigNumber } from '@ethersproject/bignumber';

const useGetAllNftsOfAccount = (account: string) => {
  const { chainId } = useWeb3React();
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
    const provider = new JsonRpcProvider(RPC_URLS[chainId], chainId);
    const multicall = new Multicall({
      ethersProvider: provider,
      tryAggregate: false,
    });

    try {
      setIsLoading(true);
      // fetch the balance
      const fetchedBalanceBig = await collection.balanceOf(account);
      const fetchedBalance = Number(fetchedBalanceBig);
      const callsForMulticalls = [];
      let tokens = [];
      // prepare multicall
      loop(fetchedBalance, (i: number) => {
        callsForMulticalls.push({
          reference: 'tokenOfOwnerByIndex',
          methodName: 'tokenOfOwnerByIndex',
          methodParameters: [account, i],
        });
      });

      const multicallContext = {
        reference: 'NFTS_OF_USER',
        contractAddress:
          process.env.NX_PUBLIC_ENVIRONMENT === 'DEV'
            ? MOONPAGE_COLLECTION_ADDRESS_DEV
            : MOONPAGE_COLLECTION_ADDRESS,
        abi: ABI,
        calls: callsForMulticalls,
      };

      const result = (
        await multicall.call(multicallContext)
      ).results.NFTS_OF_USER.callsReturnContext.filter(
        (returnElement) => returnElement.success
      );

      // get all token Ids of user
      tokens = result.map((el) =>
        Number(BigNumber.from(el.returnValues[0].hex))
      );

      setBalance(fetchedBalance);
      setNfts(tokens);
      setIsLoading(false);
      const nftsWithIdAndEdition = tokens.map((token) =>
        getEditionAndIdOfToken(token, allProjects)
      );
      console.log(nftsWithIdAndEdition);
      const groupByProjectId = nftsWithIdAndEdition.reduce((group, product) => {
        console.log({ group, product });
        const { projectId } = product;
        group[projectId] = group[projectId] ?? [];
        group[projectId].push(product);
        console.log({ group });
        return group;
      }, {});
      console.log(groupByProjectId);
      const groupedInArray = [];
      for (const [key, value] of Object.entries(groupByProjectId)) {
        groupedInArray.push(value);
      }
      console.log(groupedInArray);
      setDetailedNfts(nftsWithIdAndEdition);
      setGroupedNfts(groupedInArray);
      setIsLoading(false);
    } catch (e: unknown) {
      console.log({ e });
      setIsLoading(false);
    }
  }, [account, allProjects, chainId, collection, getEditionAndIdOfToken]);

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
