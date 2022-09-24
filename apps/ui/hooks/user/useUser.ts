import { useContext } from 'react';
import { UserContext } from '../../providers';

export const useUser = () => {
  const api = useContext(UserContext);
  if (!api) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return api;
};
