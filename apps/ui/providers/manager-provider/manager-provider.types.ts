import { ReactNode } from 'react';

export interface ManagerProviderProps {
  children: ReactNode;
}

export type ManagerApi = {};

export type WriteActionStatus = 'idle' | 'pending' | 'success' | 'error';
export type NewConfiguration = {
  imgHash: string;
  animationHash: string;
  blurbHash: string;
  genre: string;
  subtitle: string;
};
export interface ConfigureProjectArgs extends NewConfiguration {
  projectId: string;
  onSuccess?: (
    genre: string,
    subtitle: string,
    imgHash: string,
    blurbHash: string,
    animationHash: string
  ) => void;
  onError?: (e: any) => void;
}
