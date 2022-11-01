import { useContext } from 'react';
import { AccountsContext } from '../../providers';

export const useAccounts = () => {
  const api = useContext(AccountsContext);
  if (!api) {
    throw new Error('useAccounts must be used within AccountsProvider');
  }

  return api;
};
