import { ApolloError } from '@apollo/client';
import { ReactNode } from 'react';
import { Project } from '../../state/projects/types';

export interface ProjectProviderProps {
  children: ReactNode;
}

export type ProjectApi = {
  data: Project;
  isLoading: boolean;
  error: ApolloError;
  refetch: () => void;
};
