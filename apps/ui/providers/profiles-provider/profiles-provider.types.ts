import { ReactChild } from 'react';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';

export type Profile = {
  id: string;
  address: string;
  imageIPFSHash: string;
  name: string;
  descriptionIPFSHash: string;
  website: string;
  discord: string;
  instagram: string;
  paragraphxyz: string;
  substack: string;
  twitter: string;
  youtube: string;
  isVerified: boolean;
};

export type ProfilesApi = {
  configureProfile: (x: ConfigureProfileArgs) => Promise<void>;
  configureProfileStatus: WriteActionStatus;
};

export type ProfilesProviderProps = {
  children: ReactChild;
};

export type ConfigureProfileArgs = {
  account: string;
  name: string;
  imageIPFSHash: string;
  descriptionIPFSHash: string;
  website: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type ConfigureSocialsArgs = {
  discord: string;
  instagram: string;
  paragraphxyz: string;
  substack: string;
  twitter: string;
  youtube: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type ResetProfileArgs = {
  account: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type ConfigureDiscordArgs = {
  discord: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type ConfigureInstagramArgs = {
  instagram: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type ConfigureParagraphxyzArgs = {
  paragraphxyz: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type ConfigureSubstackArgs = {
  substack: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type ConfigureTwitterArgs = {
  twitter: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type ConfigureYoutubeArgs = {
  youtube: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};
