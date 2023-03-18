import { useCallback, useEffect, useMemo, useState } from 'react';

import { useENS } from './useENS';
import useProfilesContract from './useProfilesContract';

// tries to show custom Moonpage name from contract
// then tries to get eth domain
// if none of the above exist, shows address

export const useName = (address: string) => {
  const { ensName } = useENS(address);
  const ProfilesContract = useProfilesContract();
  const [customName, setCustomName] = useState<string | null>(null);

  const fetchName = useCallback(async () => {
    const profile = await ProfilesContract.profiles(address);

    setCustomName(profile.name.length ? profile.name : null);
  }, [address, ProfilesContract]);

  useEffect(() => {
    fetchName();
  }, [fetchName]);

  return useMemo(
    () => customName ?? ensName ?? address,
    [address, ensName, customName]
  );
};
