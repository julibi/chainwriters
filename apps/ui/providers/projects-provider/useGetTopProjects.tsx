import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import { ProjectsResult } from '../../providers/projects-provider/projects-provider.types';

export const GET_TOP_PROJECTS = gql`
  query topProjectsQuery {
    projects(orderBy: mintCount, orderDirection: desc) {
      auctionsEnded
      auctionsStarted
      createdAt
      creator
      editions {
        id
      }
      genre
      id
      imgIpfsHash
      isCurated
      isPaused
      mintCount
      originalLanguage
      subtitle
      title
      mintCount
      startId
      endId
      currentId
      initialMintPrice
      premintedByAuthor
    }
  }
`;

export function useGetTopProjects() {
  const { loading, error, data, refetch } =
    useQuery<ProjectsResult>(GET_TOP_PROJECTS);

  const formattedData = useMemo(() => {
    if (!data) return;
    const { projects } = data;
    const formatted = projects?.map((project) => ({
      ...project,
      mintCount: BigNumber.from(project.mintCount),
      startId: BigNumber.from(project.startId),
      endId: BigNumber.from(project.currentId),
      currentId: BigNumber.from(project.currentId),
      initialMintPrice: BigNumber.from(project.initialMintPrice),
      premintedByAuthor: BigNumber.from(project.premintedByAuthor),
    }));
    return formatted;
  }, [data]);

  return useMemo(
    () => ({
      isLoading: loading,
      error,
      data: formattedData,
      refetch,
    }),
    [loading, error, refetch, formattedData]
  );
}
