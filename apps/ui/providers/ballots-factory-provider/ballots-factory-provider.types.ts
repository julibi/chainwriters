import { ReactChild } from 'react';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';
import { Voting } from '../projects-provider/projects-provider.types';

export type BallotsFactoryApi = {
  createBallot: (x: CreateBallotArgs) => Promise<void>;
  createBallotStatus: WriteActionStatus;
  fetchBallotAddress: (x: string) => Promise<string | null>;
  votingsData: Voting[];
  votingsLoading: boolean;
  refetchVotingsData: () => Promise<null>;
};

export type CreateBallotArgs = {
  projectId: string;
  proposal: string;
  options: string[];
  endTime: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type BallotsFactoryProviderProps = {
  children: ReactChild;
};
