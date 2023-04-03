import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import React, { useCallback, useEffect } from 'react';
import { useGetProfiles } from './useGetProfiles';

export const GET_PROJECTS_OF_CREATOR = `
  query getProjects($account: String!) {
    profiles(where: { creator: $account }) {
      id
      title
    }
  }
`;

const APIURL = 'https://api.studio.thegraph.com/query//<SUBGRAPH_NAME>/';

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

export const useGetWriters = () => {
  const { profiles } = useGetProfiles();
  const fetchBla = useCallback(async () => {
    profiles?.map(async (profile) => {
      try {
        const data = await client.query({
          query: gql(GET_PROJECTS_OF_CREATOR),
          variables: {
            orderBy: 'createdAtTimestamp',
            orderDirection: 'desc',
          },
        });
      } catch (e) {}
    });
  }, [profiles]);

  useEffect(() => {
    fetchBla();
  }, [profiles, fetchBla]);

  return null;
};
