import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import { ProjectsResult } from '../../providers/projects-provider/projects-provider.types';

export const GET_ALL_PROJECTS = gql`
  query allProjects {
    projects(
      orderBy: createdAt
      orderDirection: desc
      where: { isDeleted: null, id_not: 13 }
    ) {
      auctionsEnded
      auctionsStarted
      balance
      createdAt
      creator
      editions {
        id
        edition
        startId
        endId
      }
      genre
      id
      imgIpfsHash
      isCurated
      isDeleted
      isFrozen
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

export function useGetAllProjects() {
  const { loading, error, data, refetch } =
    useQuery<ProjectsResult>(GET_ALL_PROJECTS);
  console.log({ data });

  const formattedData = useMemo(() => {
    if (!data) return;
    const { projects } = data;
    const formatted = projects?.map((project) => ({
      ...project,
      balance: BigNumber.from(project.balance),
      mintCount: BigNumber.from(project.mintCount),
      startId: BigNumber.from(project.startId),
      endId: BigNumber.from(project.endId),
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
