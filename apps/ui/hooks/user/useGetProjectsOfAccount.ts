import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { gql, useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import {
  Project,
  ProjectsResult,
} from '../../providers/projects-provider/projects-provider.types';
import { GetAccountProjectsVars } from '../../providers/user-provider/user-provider.types';

export const GET_PROJECTS_OF_ACCOUNT = gql`
  query oneProjectQuery($account: String!) {
    projects(where: { creator: $account }) {
      auctionsEnded
      auctionsStarted
      blurbIpfsHash
      contributors {
        id
        address
        sharePercentage
        role
      }
      createdAt
      creator
      currentId
      editions {
        id
        edition
        startId
        endId
        mintPrice
      }
      endId
      genre
      id
      imgIpfsHash
      initialMintPrice
      mintCount
      premintedByAuthor
      startId
      subtitle
      textIpfsHash
      title
    }
  }
`;

export function useGetProjectsOfAccount() {
  const { account } = useWeb3React();
  const { loading, error, data, refetch } = useQuery<
    ProjectsResult,
    GetAccountProjectsVars
  >(GET_PROJECTS_OF_ACCOUNT, {
    variables: { account },
  });

  return useMemo(
    () => ({
      isLoading: loading,
      error,
      projects: data && data.projects,
      refetch,
    }),
    [loading, error, data, refetch]
  );
}
