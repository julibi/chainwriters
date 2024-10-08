import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import { ProjectsResult } from '../../providers/projects-provider/projects-provider.types';

export const GET_SEARCHED_PROJECTS = gql`
  query searchedProjectsQuery($searchTerm: String!) {
    projects(where: { title: $searchTerm, isDeleted: null }) {
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
      currentAuctionExpiresAt
      currentId
      initialMintPrice
      premintedByAuthor
    }
  }
`;

// TODO: searchTerm changes dynamically, how to make it work?
export function useGetSearchedProjects(searchTerm: string) {
  const { loading, error, data, refetch } = useQuery<ProjectsResult>(
    GET_SEARCHED_PROJECTS,
    {
      variables: { searchTerm },
    }
  );

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
      imgIpfsHash: project.imgIpfsHash,
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
