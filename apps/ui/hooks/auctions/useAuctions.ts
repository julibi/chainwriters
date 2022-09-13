import { useContext } from 'react';
import { AuctionsContext } from '../../providers';

export const useAuctions = () => {
  const api = useContext(AuctionsContext);
  if (!api) {
    throw new Error('useAuctions must be used within a AuctionsProvider');
  }

  return api;
};
