import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { Contributor } from '../../providers/projects-provider/projects-provider.types';
import { AccountQueryVar } from '../../providers/user-provider/user-provider.types';
import useAddressInRoute from '../useAddressInRoute';

export const GET_CONTRIBUTIONS_OF_ACCOUNT = gql`
  query contributionsQuery($account: String!) {
    contributors(where: { address: $account }) {
      sharePercentage
      address
      role
      project {
        id
        title
        creator
      }
    }
  }
`;

export function useGetContributionsOfAccount() {
  const { account: loggedInAccount } = useWeb3React();
  const addressInRoute: string | undefined = useAddressInRoute();
  const account = useMemo(
    () => addressInRoute ?? loggedInAccount,

    [addressInRoute, loggedInAccount]
  );
  const { loading, error, data, refetch } = useQuery<
    { contributors: Contributor[] },
    AccountQueryVar
  >(GET_CONTRIBUTIONS_OF_ACCOUNT, {
    variables: { account },
  });

  return useMemo(
    () => ({
      isLoading: loading,
      error,
      contributions: data && data.contributors,
      refetch,
    }),
    [loading, error, data, refetch]
  );
}
