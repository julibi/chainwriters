import { ReactNode } from 'react';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { BigNumber } from '@ethersproject/bignumber';

export type ProjectVars = {
  id: string;
};

export interface ProjectProviderProps {
  children: ReactNode;
}

export type ProjectsApi = {
  allProjects: undefined | Project[];
  areAllProjectsLoading: boolean;
  allProjectsFetchError: ApolloError;
  refetchAllProjects: () => Promise<ApolloQueryResult<ProjectsResult>>;
  topProjects: undefined | Project[];
  areTopProjectsLoading: boolean;
  topProjectsFetchError: ApolloError;
  refetchTopProjects: () => Promise<ApolloQueryResult<ProjectsResult>>;
};

export interface Contributor {
  id?: string;
  address: string;
  role: string;
  share?: BigNumber | number;
  sharePercentage?: BigNumber;
  project?: Project;
}

export interface Edition {
  id: string;
  edition: BigNumber;
  startId: BigNumber;
  endId: BigNumber;
  mintPrice: BigNumber;
}

export interface Voting {
  id: string;
  proposal: string;
  option1: string;
  option2: string;
  option3: string;
  option1Count: number;
  option2Count: number;
  option3Count: number;
  isVoting: boolean;
  totalCount: number;
  voteStarted: number;
  voteEnding: number;
  project?: {
    id?: string;
    ballotAddress?: string;
    ballotCreated?: number;
    title: string;
  };
}

export interface Project {
  auctionsEnded: boolean;
  auctionsStarted: boolean;
  balance: BigNumber;
  ballotAddress?: string;
  ballotCreated?: BigNumber;
  votings?: Voting[];
  blurbIpfsHash: string | null;
  contributors: Contributor[] | null;
  createdAt: string;
  creator: string;
  currentAuctionExpiresAt: BigNumber | null;
  currentId: BigNumber;
  editions: Edition[];
  endId: BigNumber;
  genre: string | null;
  id: string;
  imgIpfsHash: string | null;
  initialMintPrice: BigNumber;
  isDeleted?: boolean | null;
  isFrozen: boolean;
  isPaused: boolean;
  mintCount: BigNumber;
  originalLanguage: string;
  paused: boolean;
  premintedByAuthor: BigNumber;
  startId: BigNumber;
  subtitle: string | null;
  textIpfsHash: string | null;
  translationIpfsHash: string | null;
  title: string;
}

export type ProjectResult = {
  project: Project;
};

export type ProjectsResult = {
  projects: Project[];
};

export type VotingsResult = {
  votings: Voting[];
};
