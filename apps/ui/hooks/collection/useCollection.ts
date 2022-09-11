import { useContext } from 'react';
import { CollectionContext } from '../../providers';

export const useCollection = () => {
  const api = useContext(CollectionContext);
  if (!api) {
    throw new Error('useCollection must be used within a ManagerProvider');
  }

  return api;
};
