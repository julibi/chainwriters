import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import { ProjectVars } from './project.types';
import { ProjectResult } from '../../state/projects/types';

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

  const formattedData = useMemo(() => {
    if (!data) return;
    const { project } = data;
    const formattedContributors = project.contributors?.map((contributor) => ({
      ...contributor,
      ['sharePercentage']: BigNumber.from(contributor.sharePercentage),
    }));
    const formattedEditions = project.editions?.map((edition) => ({
      ...edition,
      ['edition']: BigNumber.from(edition.edition),
      ['startId']: BigNumber.from(edition.startId),
      ['endId']: BigNumber.from(edition.endId),
      ['mintPrice']: BigNumber.from(edition.mintPrice),
    }));
    return {
      ...data.project,
      mintCount: BigNumber.from(project.mintCount),
      startId: BigNumber.from(project.startId),
      endId: BigNumber.from(project.currentId),
      currentId: BigNumber.from(project.currentId),
      initialMintPrice: BigNumber.from(project.initialMintPrice),
      premintedByAuthor: BigNumber.from(project.premintedByAuthor),
      contributors: formattedContributors,
      editions: formattedEditions,
    };
  }, [data]);

  return { isLoading: loading, error, project: formattedData, refetch };
}
