import { ReactChild } from 'react';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';
import { Voting } from '../projects-provider/projects-provider.types';

export type BallotsFactoryApi = {
  createBallot: (x: CreateBallotArgs) => Promise<void>;
  createBallotStatus: WriteActionStatus;
  fetchBallotAddress: (x: string) => Promise<void>;
  votingsData: Voting[];
  votingsLoading: WriteActionStatus;
  refetchVotingsData: () => null;
};

export type CreateBallotArgs = {
  projectId: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type BallotsFactoryProviderProps = {
  children: ReactChild;
};
