import { useContext } from 'react';
import { ProjectsContext } from '../providers';

export const useProjects = () => {
  const api = useContext(ProjectsContext);

  if (!api) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }

  return api;
};
