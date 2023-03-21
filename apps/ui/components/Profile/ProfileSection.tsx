import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { utils } from 'ethers';
import { useENSName } from 'use-ens-name';
import { useWeb3React } from '@web3-react/core';
import Loading from '../Loading';
import { truncateAddress } from '../WalletIndicator';
import { IPFS_BASE_URI, PINATA_GATE_URI } from '../../constants';
import useProfile from '../../hooks/useProfile';
import { useTheme } from '../../hooks/theme/useTheme';
import { useName } from '../../hooks/useName';
import { BASE_BORDER_RADIUS, ElementThemeProps } from '../../themes';
import AccountAvatar from '../AccountAvatar';
import Link from 'next/link';
import EditButton from '../EditButton';
import ConfigureProfileModal from './ConfigureProfileModal';
import { useProfiles } from '../../hooks/profiles';

const Root = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-block-end: 3rem;
`;

const MainProfileData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-block-end: 3rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Frame = styled.div<ElementThemeProps>`
  border-radius: 50%;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  margin-inline-end: 3rem;

  @media (max-width: 900px) {
    width: 170px;
    height: 170px;
    margin: 0 0 2rem 0;
  }
`;

const ImageWrapper = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;

  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: cover;
    }
  }

  @media (max-width: 900px) {
    width: 150px;
    height: 150px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  height: 300px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    height: 170px;
  }
`;

const AddressGroup = styled.div`
  margin-block-end: 1rem;
`;
const Description = styled.div`
  max-width: 1000px;
`;
const Website = styled.div`
  margin-block-end: 1rem;
`;

const SocialsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Social = styled.div<ElementThemeProps>`
  width: 150px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};
  padding: 0.5rem;
`;

type ProfileSectionProps = {
  isMyProfile: boolean;
};

const ProfileSection = ({ isMyProfile }: ProfileSectionProps) => {
  // is this my profile or someone elses'?

  const ref = useRef(null);
  const theme = useTheme();
  const { account } = useWeb3React();
  const { profile, isProfileLoading, fetchProfile } = useProfile(account);
  const { configureProfile } = useProfiles();
  const name = useName(account);
  const ensName = useENSName(account);
  const [height, setHeight] = useState(150);
  const [description, setDescription] = useState<string | null>(null);
  const [fallbackImageUrl, setFallbackImageUrl] = useState<string | null>(null);
  const [showProfileConfigureModal, setShowProfileConfigureModal] =
    useState<boolean>(false);
  const [isConfiguringProfile, setIsConfiguringProfile] =
    useState<boolean>(false);

  const fetchDescription = useCallback(async () => {
    if (!profile?.descriptionIPFSHash) return;

    try {
      const responseIpfs = await fetch(
        `${PINATA_GATE_URI}${profile.descriptionIPFSHash}`
      );
      if (responseIpfs.ok) {
        const fetchedDescription = await responseIpfs.text();

        setDescription(fetchedDescription);
      } else {
        // try fetching from general IPFS, not pinata
        const responseIpfs = await fetch(
          `${IPFS_BASE_URI}${profile.descriptionIPFSHash}`
        );
        if (responseIpfs.ok) {
          const fetchedDescription = await responseIpfs.text();
          setDescription(fetchedDescription);
        }
      }
    } catch (e) {
      // do nothing
    }
  }, [profile?.descriptionIPFSHash]);

  const handleConfigureProfile = useCallback(
    async ({ name, imageIPFSHash, descriptionIPFSHash, website }) => {
      setIsConfiguringProfile(true);
      await configureProfile({
        account,
        name,
        imageIPFSHash,
        descriptionIPFSHash,
        website,
        onError: () => {
          setIsConfiguringProfile(false);
        },
        onSuccess: () => {
          setShowProfileConfigureModal(false);
          setIsConfiguringProfile(false);
          // refetch
          fetchProfile();
        },
      });
    },
    [account, configureProfile, fetchProfile]
  );

  useEffect(() => {
    setHeight(ref?.current?.clientHeight);
  }, [ref]);

  useEffect(() => {
    fetchDescription();
  }, [fetchDescription]);

  if (isProfileLoading) {
    return <Loading height={200} />;
  }

  return (
    <Root>
      {isMyProfile && (
        <EditButton
          disabled={isConfiguringProfile}
          onClick={() => {
            setShowProfileConfigureModal(true);
          }}
          isEditing={false}
        />
      )}
      <MainProfileData>
        <Frame theme={theme}>
          <ImageWrapper ref={ref as any}>
            {profile?.imageIPFSHash && (
              <Image
                onError={() => {
                  setFallbackImageUrl(
                    `${IPFS_BASE_URI}${profile.imageIPFSHash}`
                  );
                }}
                height={'100%'}
                width={'100%'}
                src={
                  fallbackImageUrl ??
                  `${PINATA_GATE_URI}${profile.imageIPFSHash}`
                }
                alt={`Image of ${profile?.name}`}
                priority
                layout="responsive"
              />
            )}
            {!profile?.imageIPFSHash && account && (
              <AccountAvatar address={account} size={height} />
            )}
            {!profile?.imageIPFSHash && !account && (
              <Image
                height={'100%'}
                width={'100%'}
                src="./ImagePlaceholder.png"
                alt={`Placeholder Image`}
                priority
                layout="responsive"
              />
            )}
          </ImageWrapper>
        </Frame>
        <ProfileInfo>
          <AddressGroup>
            <h2>{utils.isAddress(name) ? truncateAddress(name) : name}</h2>
            <p>{ensName}</p>
            <p>
              {profile?.address
                ? truncateAddress(profile?.address)
                : truncateAddress(account)}
            </p>
          </AddressGroup>
          {profile?.website && (
            <Website>
              <Link href={profile?.website} passHref={true}>
                <a target="_blank" rel="noopener noreferrer">
                  {profile?.website}
                </a>
              </Link>
            </Website>
          )}
          {description && <Description>{description}</Description>}
        </ProfileInfo>
      </MainProfileData>
      {/* <SocialsWrapper>
        <Social theme={theme}>Discord</Social>
        <Social theme={theme}>Discord</Social>
        <Social theme={theme}>Discord</Social>
        <Social theme={theme}>Discord</Social>
        <Social theme={theme}>Discord</Social>
        <Social theme={theme}>Discord</Social>
      </SocialsWrapper> */}

      {showProfileConfigureModal && (
        <ConfigureProfileModal
          currentName={utils.isAddress(name) ? null : name} // if plain address, name is null
          currentDescription={description}
          currentWebsite={profile?.website}
          currentImageIPFSHash={profile?.imageIPFSHash}
          onClose={() => setShowProfileConfigureModal(false)}
          onConfigure={handleConfigureProfile}
          pending={isConfiguringProfile}
        />
      )}
    </Root>
  );
};

export default ProfileSection;
