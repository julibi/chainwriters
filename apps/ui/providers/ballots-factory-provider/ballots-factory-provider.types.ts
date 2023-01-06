import { ReactChild } from 'react';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';

export type BallotsFactoryApi = {
  createBallot: (x: CreateBallotArgs) => Promise<void>;
  createBallotStatus: WriteActionStatus;
};

export type CreateBallotArgs = {
  projectId: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type BallotsFactoryProviderProps = {
  children: ReactChild;
};
