import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { ProjectsResult } from '../../providers/projects-provider/projects-provider.types';
import { AccountQueryVar } from '../../providers/user-provider/user-provider.types';
import useAddressInRoute from '../useAddressInRoute';

export const GET_PROJECTS_OF_ACCOUNT = gql`
  query oneProjectQuery($account: String!) {
    projects(where: { creator: $account, isDeleted: null }) {
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
  const { account: loggedInAccount } = useWeb3React();
  const addressInRoute: string | undefined = useAddressInRoute();
  const account = useMemo(
    () => addressInRoute ?? loggedInAccount,

    [addressInRoute, loggedInAccount]
  );
  const { loading, error, data, refetch } = useQuery<
    ProjectsResult,
    AccountQueryVar
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
