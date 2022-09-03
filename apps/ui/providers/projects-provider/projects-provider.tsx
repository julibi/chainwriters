import { createContext, useMemo } from 'react';
import { useGetProject } from '../../hooks/projects/useGetProject';
import { ProjectApi, ProjectProviderProps } from './projects-provider.types';

const defaultContext: ProjectApi = {
  data: undefined,
  isLoading: false,
  error: undefined,
  refetch: () => undefined,
};

export const ProjectsContext = createContext(defaultContext);

export const ProjectsProvider = ({ children }: ProjectProviderProps) => {
  // TODO where to get the id?
  const projectId = '2';
  const { project, isLoading, error, refetch } = useGetProject(projectId);
  // TODO distinguish between actual Project type and the ProjectData Type
  // TODO set on hook/provider structure and where the types should go

  const api = useMemo<ProjectApi>(
    () => ({
      isLoading,
      data: project,
      error,
      refetch,
    }),
    [project, isLoading, error, refetch]
  );

  return (
    <ProjectsContext.Provider value={api}>{children}</ProjectsContext.Provider>
  );
};
