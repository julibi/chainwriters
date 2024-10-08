import { ReactChild } from 'react';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';

export type Profile = {
  id: string;
  address: string;
  imgFile?: Blob | null;
  imgBuffer?: Buffer | null;
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

export type ResetProfileArgs = {
  account: string;
  onSuccess?: () => void;
  onError?: (e: any) => void;
};

export type ProfilesApi = {
  configureProfile: (x: ConfigureProfileArgs) => Promise<void>;
  configureProfileStatus: WriteActionStatus;
  resetProfile: (x: ResetProfileArgs) => Promise<void>;
  resetProfileStatus: WriteActionStatus;
  configureSocials: (x: ConfigureSocialsArgs) => Promise<void>;
  configureSocialsStatus: WriteActionStatus;
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
  hasNewDescriptionHash: boolean;
  hasNewImageHash: boolean;
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
