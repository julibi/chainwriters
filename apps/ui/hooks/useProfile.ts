import { useCallback, useEffect, useMemo, useState } from 'react';
import { Profile } from '../providers/profiles-provider/profiles-provider.types';
import useProfilesContract from './useProfilesContract';

const useProfile = (profileAddress: string) => {
  const ProfilesContract = useProfilesContract();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const profileData = await ProfilesContract.profiles(profileAddress);
      const {
        address,
        id,
        imageIPFSHash,
        name,
        website,
        descriptionIPFSHash,
        discord,
        instagram,
        paragraphxyz,
        substack,
        twitter,
        youtube,
        isVerified,
      } = profileData;
      profileData &&
        setProfile({
          address,
          id,
          imageIPFSHash,
          name,
          website,
          descriptionIPFSHash,
          discord,
          instagram,
          paragraphxyz,
          substack,
          twitter,
          youtube,
          isVerified,
        });
      setIsLoading(false);
    } catch (e) {
      // do nothing
      setIsLoading(false);
    }
  }, [ProfilesContract, profileAddress]);

  useEffect(() => {
    fetchProfile();

    return () => {
      setProfile(null);
      setIsLoading(false);
    };
  }, [fetchProfile]);

  return useMemo(
    () => ({ profile, isProfileLoading: isLoading, fetchProfile }),
    [profile, isLoading, fetchProfile]
  );
};

export default useProfile;
