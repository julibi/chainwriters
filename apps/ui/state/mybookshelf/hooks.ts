import { gql, useQuery } from '@apollo/client'
import { useWeb3React } from '@web3-react/core';

export const GET_CREATED_DAOS_BY_USER = gql`
  query createdDaos($authorAddress: String!) {
    daos(where: { author: $authorAddress }) {
      id
      address
      author
      title
    }
  }
`;

export const GET_DAOS_WHERE_USER_CONTRIBUTED = gql`
  query contributedDaos($contributorAddress: String!) {
    contributions(where: { address: $contributorAddress }) {   
      id
      address
      share
      role
      dao {
        id
        title
      }
    }
  }
`;

export const useFetchCreatedDaos = () => {
  const { account } = useWeb3React();
  const addressLow = account?.toLowerCase();
  const { loading, error, data, refetch } = useQuery(GET_CREATED_DAOS_BY_USER, {
    variables: { authorAddress: addressLow },
  });
  return { loading, error, data, refetch };
};

export const useFetchContributedDaos = () => {
  const { account } = useWeb3React();
  const addressLow = account?.toLowerCase();
  const { loading, error, data, refetch } = useQuery(GET_DAOS_WHERE_USER_CONTRIBUTED, {
    variables: { contributorAddress: addressLow },
  });
  return { loading, error, data, refetch };
};

