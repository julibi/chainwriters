import { createContext, useMemo } from 'react';
import { ProjectProviderProps, ProjectsApi } from './projects-provider.types';
import { useGetAllProjects } from './useGetAllProjects';

const defaultContext: ProjectsApi = {
  allProjects: [],
  areAllProjectsLoading: false,
  allProjectsFetchError: undefined,
  refetchAllProjects: async () => undefined,
};

export const ProjectsContext = createContext(defaultContext);

export const ProjectsProvider = ({ children }: ProjectProviderProps) => {
  const {
    data: allProjects,
    isLoading: areAllProjectsLoading,
    error: allProjectsFetchError,
    refetch: refetchAllProjects,
  } = useGetAllProjects();

  const api = useMemo(
    () => ({
      allProjects,
      areAllProjectsLoading,
      allProjectsFetchError,
      refetchAllProjects,
    }),
    [
      allProjects,
      areAllProjectsLoading,
      allProjectsFetchError,
      refetchAllProjects,
    ]
  );
  return (
    <ProjectsContext.Provider value={api}>{children}</ProjectsContext.Provider>
  );
};
