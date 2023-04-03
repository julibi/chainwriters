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

// export const GET_CONTRIBUTIONS_OF_ACCOUNT = gql`
//   query contributionsQuery($account: String!) {
//     contributors(where: { address: $account }) {
//       sharePercentage
//       address
//       role
//       project {
//         id
//         title
//         creator
//       }
//     }
//   }
// `;

// export function useGetContributionsOfAccount() {
//   const { account: loggedInAccount } = useWeb3React();
//   const addressInRoute: string | undefined = useAddressInRoute();
//   const account = useMemo(
//     () => addressInRoute ?? loggedInAccount,

//     [addressInRoute, loggedInAccount]
//   );
//   const { loading, error, data, refetch } = useQuery<
//     { contributors: Contributor[] },
//     AccountQueryVar
//   >(GET_CONTRIBUTIONS_OF_ACCOUNT, {
//     variables: { account },
//   });

//   return useMemo(
//     () => ({
//       isLoading: loading,
//       error,
//       contributions: data && data.contributors,
//       refetch,
//     }),
//     [loading, error, data, refetch]
//   );
// }
