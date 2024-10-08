import { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { BigNumber } from 'ethers';
import {
  ProjectResult,
  ProjectVars,
} from '../../providers/projects-provider/projects-provider.types';

export const GET_ONE_PROJECT = gql`
  query oneProjectQuery($id: String!) {
    project(id: $id) {
      auctionsEnded
      auctionsStarted
      balance
      ballotAddress
      ballotCreated
      votings {
        id
        proposal
        option1
        option2
        option3
        option1Count
        option2Count
        option3Count
        totalCount
        voteStarted
        voteEnding
      }
      blurbIpfsHash
      contributors {
        id
        address
        sharePercentage
        role
      }
      createdAt
      creator
      currentAuctionExpiresAt
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
      isDeleted
      isFrozen
      isPaused
      mintCount
      originalLanguage
      premintedByAuthor
      startId
      subtitle
      textIpfsHash
      translationIpfsHash
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
    if (!project) return;

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
      balance: BigNumber.from(project.balance),
      mintCount: BigNumber.from(project.mintCount),
      startId: BigNumber.from(project.startId),
      endId: BigNumber.from(project.endId),
      currentId: BigNumber.from(project.currentId),
      initialMintPrice: BigNumber.from(project.initialMintPrice),
      premintedByAuthor: BigNumber.from(project.premintedByAuthor),
      contributors: formattedContributors,
      editions: formattedEditions,
      imgIpfsHash: data.project.imgIpfsHash,
    };
  }, [data]);

  return useMemo(
    () => ({
      isLoading: loading,
      error,
      project: formattedData,
      refetch,
    }),
    [loading, error, formattedData, refetch]
  );
}
