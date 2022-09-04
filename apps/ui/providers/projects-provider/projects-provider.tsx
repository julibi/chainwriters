import { createContext, useMemo } from 'react';
import { ProjectProviderProps, ProjectsApi } from './projects-provider.types';
import { useGetAllProjects } from './useGetAllProjects';
import { useGetTopProjects } from './useGetTopProjects';

const defaultContext: ProjectsApi = {
  allProjects: [],
  areAllProjectsLoading: false,
  allProjectsFetchError: undefined,
  refetchAllProjects: async () => undefined,
  topProjects: [],
  areTopProjectsLoading: false,
  topProjectsFetchError: undefined,
  refetchTopProjects: async () => undefined,
};

export const ProjectsContext = createContext(defaultContext);

export const ProjectsProvider = ({ children }: ProjectProviderProps) => {
  const {
    data: allProjects,
    isLoading: areAllProjectsLoading,
    error: allProjectsFetchError,
    refetch: refetchAllProjects,
  } = useGetAllProjects();
  const {
    data: topProjects,
    isLoading: areTopProjectsLoading,
    error: topProjectsFetchError,
    refetch: refetchTopProjects,
  } = useGetTopProjects();

  const api = useMemo(
    () => ({
      // all projects
      allProjects,
      areAllProjectsLoading,
      allProjectsFetchError,
      refetchAllProjects,
      // top projects
      topProjects,
      areTopProjectsLoading,
      topProjectsFetchError,
      refetchTopProjects,
    }),
    [
      allProjects,
      areAllProjectsLoading,
      allProjectsFetchError,
      refetchAllProjects,
      topProjects,
      areTopProjectsLoading,
      topProjectsFetchError,
      refetchTopProjects,
    ]
  );
  return (
    <ProjectsContext.Provider value={api}>{children}</ProjectsContext.Provider>
  );
};
