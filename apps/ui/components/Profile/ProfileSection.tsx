import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useWeb3React } from '@web3-react/core';
import useProfile from '../../hooks/useProfile';
import { ElementThemeProps } from '../../themes';
import { useTheme } from '../../hooks/theme/useTheme';
import { useName } from '../../hooks/useName';
import { useENS } from '../../hooks/useENS';

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

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
  flex: 1;
  disply: flex;
  flex-direction: column;
`;

const ProfileSection = () => {
  // is this my profile or someone elses?
  const theme = useTheme();
  const { account } = useWeb3React();

  const { profile, isProfileLoading } = useProfile(account);
  const name = useName(account);
  const { ensName } = useENS(account);

  return (
    <Root>
      <Frame theme={theme}>
        <ImageWrapper>
          <Image
            height={'100%'}
            width={'100%'}
            src="/Juli.jpg"
            alt="Testimage"
            priority
            layout="responsive"
          />
        </ImageWrapper>
      </Frame>
      <ProfileInfo>
        <h2>{name}</h2>
        <p>{ensName}</p>
        <p>{account}</p>
        <p>{'description'}</p>
        <p>{'website'}</p>
      </ProfileInfo>
    </Root>
  );
};

export default ProfileSection;
