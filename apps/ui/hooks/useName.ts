import { useENSName } from 'use-ens-name';
import useProfile from './useProfile';

// tries to show custom Moonpage name from contract
// then tries to get eth domain
// if none of the above exist, shows plain address

export const useName = (address: string) => {
  const ensName = useENSName(address);
  const { profile } = useProfile(address);

  return profile?.name?.length ? profile.name : ensName ?? address;
};
