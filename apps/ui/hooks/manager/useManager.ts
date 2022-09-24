import { useContext } from 'react';
import { ManagerContext } from '../../providers';

export const useManager = () => {
  const api = useContext(ManagerContext);
  if (!api) {
    throw new Error('useUManager must be used within a ManagerProvider');
  }

  return api;
};
