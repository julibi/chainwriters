import { ReactChild } from 'react';

export type NftWithTechData = {
  projectId: number;
  editions: number;
  tokenId: number;
  title: string;
  creator: string;
};

export type OwnedUserNft = {
  tokenId?: number;
  projectId: number;
  edition?: number;
  title: string;
  creator?: string;
  contributionRole?: string;
  contributionSharePercentage?: number;
};

export type AccountQueryVar = {
  account: string;
};

export type UserApi = {
  balance: number;
  nfts: number[];
  isLoading: boolean;
  groupedNfts: OwnedUserNft[][];
  detailedNfts: OwnedUserNft[];
  fetchBalance: () => void;
};

export type UserProviderProps = {
  children: ReactChild;
};
