import { useContext } from 'react';
import { AccountsContext } from '../../providers';

export const useAccounts = () => {
  const api = useContext(AccountsContext);
  if (!api) {
    throw new Error('useAuctions must be used within a AuctionsProvider');
  }

  return api;
};
