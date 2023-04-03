import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Profile } from '../../providers/profiles-provider/profiles-provider.types';

export const GET_PROFILES = gql`
  query getProfiles {
    profiles {
      name
      address
      descriptionIPFSHash
      imageIPFSHash
      website
      isVerified
    }
  }
`;

export const useGetProfiles = () => {
  const { loading, error, data, refetch } =
    useQuery<{ profiles: Profile[] }>(GET_PROFILES);

  return useMemo(
    () => ({
      isLoading: loading,
      error,
      profiles: data?.profiles,
      refetch,
    }),
    [loading, error, data?.profiles, refetch]
  );
};
