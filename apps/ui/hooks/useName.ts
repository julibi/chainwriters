import { useCallback, useEffect, useState } from 'react';
import { useENSName } from 'use-ens-name';
import useProfilesContract from './useProfilesContract';

// tries to show custom Moonpage name from contract
// then tries to get eth domain
// if none of the above exist, shows plain address

export const useName = (address: string) => {
  const ensName = useENSName(address);
  const ProfilesContract = useProfilesContract();
  const [customName, setCustomName] = useState<string | null>(null);

  const fetchName = useCallback(async () => {
    if (!address || !ProfilesContract) return;
    const profile = await ProfilesContract.profiles(address);

    setCustomName(profile.name.length ? profile.name : null);
  }, [address, ProfilesContract]);

  useEffect(() => {
    fetchName();
  }, [fetchName]);

  return customName ?? ensName ?? address;
};
