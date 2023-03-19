import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { utils } from 'ethers';
import { useENSName } from 'use-ens-name';
import { useWeb3React } from '@web3-react/core';
import Jazzicon from '@metamask/jazzicon';
import Loading from '../Loading';
import { truncateAddress } from '../WalletIndicator';
import { PINATA_GATE_URI } from '../../constants';
import useProfile from '../../hooks/useProfile';
import { useTheme } from '../../hooks/theme/useTheme';
import { useName } from '../../hooks/useName';
import { ElementThemeProps } from '../../themes';
import AccountAvatar from '../AccountAvatar';

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
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
      // filter: grayscale(100%);
    }
  }

  @media (max-width: 900px) {
    width: 150px;
    height: 150px;
  }
`;
const ProfileInfo = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 900px) {
    width: 170px;
    height: 170px;
  }
`;

const AddressGroup = styled.div``;
const Description = styled.div``;
const Website = styled.div``;

const ProfileSection = () => {
  // is this my profile or someone elses'?
  const ref = useRef(null);
  const theme = useTheme();
  const { account } = useWeb3React();
  const { profile, isProfileLoading } = useProfile(account);
  const name = useName(account);
  const ensName = useENSName(account);
  const [height, setHeight] = useState(150);

  useEffect(() => {
    setHeight(ref?.current?.clientHeight);
  }, [ref]);

  if (isProfileLoading) {
    return <Loading height={200} />;
  }

  return (
    <Root>
      <Frame theme={theme}>
        <ImageWrapper ref={ref as any}>
          {profile?.imageIPFSHash && (
            <Image
              height={'100%'}
              width={'100%'}
              src={`${PINATA_GATE_URI}${profile.imageIPFSHash}`}
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
          <p>{profile?.address ?? account}</p>
        </AddressGroup>
        {profile?.descriptionIPFSHash && (
          <Description>{profile?.descriptionIPFSHash}</Description>
        )}
        {profile?.website && <Website>{profile?.website}</Website>}
      </ProfileInfo>
    </Root>
  );
};

export default ProfileSection;
