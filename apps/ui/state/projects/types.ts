import { BigNumber } from '@ethersproject/bignumber';

export interface Contributor {
  id: string;
  address: string;
  role: string;
  sharePercentage: BigNumber;
}

export interface Edition {
  id: string;
  edition: BigNumber;
  startId: BigNumber;
  endId: BigNumber;
  mintPrice: BigNumber;
}

export interface Project {
  auctionsEnded: boolean;
  auctionsStarted: boolean;
  blurbIpfsHash: string | null;
  contributors: Contributor[] | null;
  createdAt: string;
  creator: string;
  currentId: BigNumber;
  editions: Edition[];
  endId: BigNumber;
  genre: string | null;
  id: string;
  imgIpfsHash: string | null;
  initialMintPrice: BigNumber;
  mintCount: BigNumber;
  paused: boolean;
  premintedByAuthor: BigNumber;
  startId: BigNumber;
  subtitle: string | null;
  textIpfsHash: string | null;
  title: string;
}

export type ProjectResult = {
  project: Project;
};
