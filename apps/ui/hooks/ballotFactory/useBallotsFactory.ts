import { useContext } from 'react';
import { BallotsFactoryContext } from '../../providers';

export const useBallotsFactory = () => {
  const api = useContext(BallotsFactoryContext);
  if (!api) {
    throw new Error(
      'useBallotsFactory must be used within a BallotsFactoryProvider'
    );
  }

  return api;
};
