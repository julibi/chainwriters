import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { utils } from 'ethers';
import { useENSName } from 'use-ens-name';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { SocialIcon } from 'react-social-icons';
import ConfigureProfileModal from './ConfigureProfileModal';
import EditButton from '../EditButton';
import Loading from '../Loading';
import { Tooltip } from '../Tooltip';
import { truncateAddress } from '../WalletIndicator';
import {
  DISCORD_BASE_URI,
  INSTAGRAM_BASE_URI,
  IPFS_BASE_URI,
  PARAGRAPHXYZ_BASE_URI,
  PINATA_GATE_URI,
  SUBSTACK_BASE_URI,
  TWITTER_BASE_URI,
  YOUTUBE_BASE_URI,
} from '../../constants';
import { useTheme } from '../../hooks/theme/useTheme';
import useProfile from '../../hooks/useProfile';
import { useName } from '../../hooks/useName';
import { useProfiles } from '../../hooks/profiles';
import { BASE_BORDER_RADIUS, ElementThemeProps, POP } from '../../themes';
import ProfileImage from './ProfileImage';
import ResetProfileModal from './ResetProfileModal';
import DeleteButton from '../DeleteButton';
import { ThemeProviderProps } from '@material-ui/core';
import SocialItem from './SocialItem';
import ConfigureSocialsModal from './ConfigureSocialsModal';

const Root = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin-block-end: 3rem;
`;

const MainProfileData = styled.div`
  width: 100%;
  position: relative;
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
  position: relative;
  flex: 1;
  max-width: 600px;
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
  word-break: break-all;
`;

const SocialsWrapper = styled.div`
  position: relative;
  max-width: 1200px;
`;

const SocialItems = styled.div`
  max-width: 1000px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  position: relative;
`;

const Social = styled.div<SocialProps>`
  width: 150px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme, isConfigured }) =>
    isConfigured ? theme.BASE_BOX_SHADOW : theme.INSET_BASE_BOX_SHADOW};
  padding: 0.5rem;
  margin: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSocialIcon = styled(SocialIcon)`
  width: 30px !important;
  height: 30px !important;
`;

const ImageWrapperCircle = styled.div<ThemeProviderProps>`
  background-color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ProfileSectionProps = {
  account: string;
  isMyProfile: boolean;
};

export interface SocialProps extends ElementThemeProps {
  isConfigured: boolean;
}

const ProfileSection = ({ account, isMyProfile }: ProfileSectionProps) => {
  const ref = useRef(null);
  const theme = useTheme();
  const { profile, isProfileLoading, fetchProfile } = useProfile(account);
  const {
    configureProfile,
    resetProfile,
    resetProfileStatus,
    configureSocials,
    configureSocialsStatus,
  } = useProfiles();
  const name = useName(account);
  const ensName = useENSName(account);
  const [height, setHeight] = useState(150);
  const [description, setDescription] = useState<string | null>(null);
  const [showProfileConfigureModal, setShowProfileConfigureModal] =
    useState<boolean>(false);
  const [showProfileResetModal, setShowProfileResetModal] =
    useState<boolean>(false);
  const [isConfiguringProfile, setIsConfiguringProfile] =
    useState<boolean>(false);
  const [showSocialsConfigureModal, setShowSocialsConfigureModal] =
    useState<boolean>(false);

  const isResetting = useMemo(
    () => ['confirming', 'waiting'].includes(resetProfileStatus),
    [resetProfileStatus]
  );

  const isConfiguringSocials = useMemo(
    () => ['confirming', 'waiting'].includes(configureSocialsStatus),
    [configureSocialsStatus]
  );

  const profileSocialsLinks = useMemo(() => {
    if (!profile) return;
    const { discord, instagram, twitter, paragraphxyz, substack, youtube } =
      profile;

    return {
      discord: discord?.length ? `${DISCORD_BASE_URI}/${discord}` : null,
      instagram: instagram?.length
        ? `${INSTAGRAM_BASE_URI}/${instagram}`
        : null,
      twitter: twitter?.length ? `${TWITTER_BASE_URI}/${twitter}` : null,
      paragraphxyz: paragraphxyz?.length
        ? `${PARAGRAPHXYZ_BASE_URI}/${paragraphxyz}`
        : null,
      substack: substack?.length
        ? `https://${substack}.${SUBSTACK_BASE_URI}`
        : null,
      youtube: youtube?.length ? `${YOUTUBE_BASE_URI}/${youtube}` : null,
    };
  }, [profile]);

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
    async ({
      name,
      imageIPFSHash,
      descriptionIPFSHash,
      website,
      hasNewDescriptionHash,
      hasNewImageHash,
    }) => {
      setIsConfiguringProfile(true);
      await configureProfile({
        account,
        name,
        imageIPFSHash,
        descriptionIPFSHash,
        hasNewDescriptionHash,
        hasNewImageHash,
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

  const handleResetProfile = useCallback(async () => {
    setIsConfiguringProfile(true);
    await resetProfile({
      account,
      onSuccess: () => {
        setShowProfileResetModal(false);

        // refetch
        fetchProfile();
      },
    });
  }, [account, resetProfile, fetchProfile]);

  const handleConfigureSocials = useCallback(
    async ({
      discord,
      instagram,
      paragraphxyz,
      substack,
      twitter,
      youtube,
    }) => {
      await configureSocials({
        discord,
        instagram,
        paragraphxyz,
        substack,
        twitter,
        youtube,
        onSuccess: () => {
          setShowSocialsConfigureModal(false);
          // refetch
          fetchProfile();
        },
      });
    },
    [configureSocials, fetchProfile]
  );

  useEffect(() => {
    fetchDescription();
  }, [fetchDescription]);

  useEffect(() => {
    setHeight(ref?.current?.clientHeight);
  }, [ref]);

  const mainTextColor = (theme) => theme.MAIN_TEXT_COLOR;

  if (isProfileLoading) {
    return <Loading height={200} />;
  }

  return (
    <Root>
      <MainProfileData>
        {isMyProfile && (
          <EditButton
            margin="0 1rem 1rem 0"
            disabled={isConfiguringProfile}
            onClick={() => {
              setShowProfileConfigureModal(true);
            }}
            isEditing={showProfileConfigureModal}
            tooltipText="Edit Profile"
          />
        )}
        {isMyProfile && (
          <DeleteButton
            margin="0 1rem 1rem 0"
            disabled={isResetting}
            onClick={() => {
              setShowProfileResetModal(true);
            }}
            isDeleting={showProfileResetModal}
            tooltipText="Reset Profile"
          />
        )}
        <Frame theme={theme}>
          <ImageWrapper ref={ref as any}>
            <ProfileImage
              account={account}
              imageIPFSHash={profile?.imageIPFSHash}
              height={height}
            />
          </ImageWrapper>
        </Frame>
        <ProfileInfo>
          <AddressGroup>
            <h2>
              {utils.isAddress(name) ? truncateAddress(name) : name}
              {profile?.isVerified && (
                <Tooltip content="Verified Member">
                  <CheckCircle htmlColor={POP} />
                </Tooltip>
              )}
            </h2>
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
      <SocialsWrapper>
        {isMyProfile && (
          <EditButton
            margin="1rem 1rem 1rem 0"
            disabled={isConfiguringSocials}
            onClick={() => {
              setShowSocialsConfigureModal(true);
            }}
            isEditing={isConfiguringSocials}
            tooltipText="Edit Socials"
          />
        )}
        <SocialItems>
          <SocialItem
            link={profileSocialsLinks?.discord}
            name="Discord"
            isConfigured={!!profileSocialsLinks?.discord}
          />
          <SocialItem
            link={profileSocialsLinks?.instagram}
            name="Instagram"
            isConfigured={!!profileSocialsLinks?.instagram}
          />
          <Social
            theme={theme}
            isConfigured={!!profileSocialsLinks?.paragraphxyz}
          >
            <Tooltip content="Paragraph.xyz">
              <div>
                <StyledSocialIcon
                  url={profileSocialsLinks?.paragraphxyz}
                  bgColor={mainTextColor(theme)}
                  target="_blank"
                  network="email"
                />
              </div>
            </Tooltip>
            {profileSocialsLinks?.paragraphxyz ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={profileSocialsLinks?.paragraphxyz}
              >
                Paragraph.xyz Newsletter
              </a>
            ) : (
              <span>Not specified</span>
            )}
          </Social>
          <Social theme={theme} isConfigured={!!profileSocialsLinks?.substack}>
            <Tooltip content="Substack Newsletter">
              <ImageWrapperCircle theme={theme}>
                <Image
                  src={'/substack.svg'}
                  width={15}
                  height={15}
                  alt="Substack icon"
                  priority
                />
              </ImageWrapperCircle>
            </Tooltip>
            {profileSocialsLinks?.substack ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={profileSocialsLinks?.substack}
              >
                Substack
              </a>
            ) : (
              <span>Not specified</span>
            )}
          </Social>
          <SocialItem
            link={profileSocialsLinks?.twitter}
            name="Twitter"
            isConfigured={!!profile?.twitter}
          />
          <SocialItem
            link={profileSocialsLinks?.youtube}
            name="Youtube"
            isConfigured={!!profileSocialsLinks?.youtube}
          />
        </SocialItems>
      </SocialsWrapper>
      {showProfileConfigureModal && (
        <ConfigureProfileModal
          currentName={utils.isAddress(name) ? null : name} // if plain address, name is null
          currentDescription={description}
          currentDescriptionIPFSHash={profile?.descriptionIPFSHash}
          currentWebsite={profile?.website}
          currentImageIPFSHash={profile?.imageIPFSHash}
          onClose={() => setShowProfileConfigureModal(false)}
          onConfigure={handleConfigureProfile}
          pending={isConfiguringProfile}
        />
      )}
      {showProfileResetModal && (
        <ResetProfileModal
          onClose={() => setShowProfileResetModal(false)}
          onReset={handleResetProfile}
          pending={isResetting}
        />
      )}
      {showSocialsConfigureModal && (
        <ConfigureSocialsModal
          onConfigureSocials={handleConfigureSocials}
          onClose={() => setShowSocialsConfigureModal(false)}
          currentSocials={{
            discord: profile?.discord ?? null,
            instagram: profile?.instagram ?? null,
            paragraphxyz: profile?.paragraphxyz ?? null,
            substack: profile?.substack ?? null,
            twitter: profile?.twitter ?? null,
            youtube: profile?.youtube ?? null,
          }}
          pending={isConfiguringSocials}
        />
      )}
    </Root>
  );
};

export default ProfileSection;
