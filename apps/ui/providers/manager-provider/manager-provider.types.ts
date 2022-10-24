import { ReactNode } from 'react';
import { Contributor } from '../projects-provider/projects-provider.types';

export interface ManagerProviderProps {
  children: ReactNode;
}

export type WriteActionStatus =
  | 'idle'
  | 'confirming'
  | 'waiting'
  | 'success'
  | 'error';

export type ManagerApi = {
  configureStatus: WriteActionStatus;
  configureProject: (x: ConfigureProjectArgs) => Promise<void>;
  setContributors: (x: SetContributorsArgs) => Promise<void>;
  setContributorsStatus: WriteActionStatus;
  enableNextEdition: (x: EnableNextEditionArgs) => Promise<void>;
  enableNextEditionStatus: WriteActionStatus;
  updateTranslation: (x: UpdateTranslationHashArgs) => Promise<void>;
  updateTranslationStatus: WriteActionStatus;
  updateBlurb: (x: UpdateBlurbHashArgs) => Promise<void>;
  updateBlurbStatus: WriteActionStatus;
};

export type NewConfiguration = {
  imgHash: string;
  animationHash: string;
  blurbHash: string;
  genre: string;
  subtitle: string;
};

export interface ConfigureProjectArgs extends NewConfiguration {
  projectId: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
}

export interface SetContributorsArgs {
  projectId: string;
  contributorsList: Contributor[];
  onSuccess?: () => void;
  onError?: (e: any) => void;
}

export interface UpdateTranslationHashArgs {
  projectId: string;
  translationIpfsHash: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
}

export interface UpdateBlurbHashArgs {
  projectId: string;
  blurbIpfsHash: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
}

export interface EnableNextEditionArgs {
  projectId: string;
  amount: number;
  price: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
}
