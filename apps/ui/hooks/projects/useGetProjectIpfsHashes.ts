import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  ProjectResult,
  ProjectVars,
} from '../../providers/projects-provider/projects-provider.types';

export const GET_PROJECT_HASHES = gql`
  query oneProjectQuery($id: String!) {
    project(id: $id) {
      animationIpfsHash
      blurbIpfsHash
      imgIpfsHash
      textIpfsHash
      translationIpfsHash
    }
  }
`;

export function useGetProjectIpfsHashes(projectId: string) {
  const { loading, error, data, refetch } = useQuery<
    ProjectResult,
    ProjectVars
  >(GET_PROJECT_HASHES, {
    variables: { id: projectId },
  });

  const project = useMemo(() => {
    if (!data) return;
    const { project } = data;
    if (!project) return;

    return {
      ...data.project,
    };
  }, [data]);

  return useMemo(
    () => ({
      isLoading: loading,
      error,
      project,
      refetch,
    }),
    [loading, error, project, refetch]
  );
}
