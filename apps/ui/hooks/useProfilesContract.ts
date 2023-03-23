import { useMemo } from 'react';
import ABI from '../abis/MoonpageProfiles.json';
import {
  MOONPAGE_PROFILES_ADDRESS,
  MOONPAGE_PROFILES_ADDRESS_DEV,
} from '../../constants';
import useContract from './useContract';

const useProfilesContract = () => {
  const address =
    process.env.NX_PUBLIC_ENVIRONMENT === 'DEV'
      ? MOONPAGE_PROFILES_ADDRESS_DEV
      : MOONPAGE_PROFILES_ADDRESS;
  const Profiles = useContract({
    address,
    abi: ABI,
  });

  const ProfilesContract = useMemo(() => Profiles, [Profiles]);

  return ProfilesContract;
};

export default useProfilesContract;
