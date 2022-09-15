import { useContext } from 'react';
import { FactoryContext } from '../../providers';

export const useFactory = () => {
  const api = useContext(FactoryContext);
  if (!api) {
    throw new Error('useFactory must be used within a Factory');
  }

  return api;
};
