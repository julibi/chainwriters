import { gql, useQuery } from '@apollo/client';
import { ProjectResult } from '../../state/projects/types';
import { ProjectVars } from './project.types';

export const GET_ONE_PROJECT = gql`
  query oneProjectQuery($id: String!) {
    project(id: $id) {
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

export function useGetProject(projectId: string) {
  const { loading, error, data, refetch } = useQuery<
    ProjectResult,
    ProjectVars
  >(GET_ONE_PROJECT, {
    variables: { id: projectId },
  });

  return { isLoading: loading, error, data, refetch };
}
