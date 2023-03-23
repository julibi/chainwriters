import { useContext } from 'react';
import { ProfilesContext } from '../../providers';

export const useProfiles = () => {
  const api = useContext(ProfilesContext);
  if (!api) {
    throw new Error('useProfiles must be used within a ProfilesManager');
  }

  return api;
};
