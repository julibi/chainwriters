import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { truncateAddress } from './WalletIndicator';
import useProfile from '../hooks/useProfile';
import { useName } from '../hooks/useName';
import { utils } from 'ethers';
import ProfileImage from './Profile/ProfileImage';

const Root = styled.div`
  display: flex;
`;

const ProfileSpan = styled.span`
  text-decoration: underline;

  :hover {
    cursor: pointer;
  }
`;

const ImageWrapper = styled.div`
  margin-inline-start: 10px;
  width: 25px;
  height: 25px;
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
    width: 20px;
    height: 20px;
  }
`;

type ProfileLinkProps = { account: string };

const ProfileLink = ({ account }: ProfileLinkProps) => {
  const ref = useRef(null);
  const name = useName(account);
  const router = useRouter();
  const { profile } = useProfile(account);
  const { account: loggedInAccount } = useWeb3React();
  const [height, setHeight] = useState(150);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      if (loggedInAccount.toLowerCase() === account.toLowerCase()) {
        router.push(`/myprofile`);
      } else {
        router.push(`/profile/${account}`);
      }
    },
    [account, loggedInAccount, router]
  );

  useEffect(() => {
    setHeight(ref?.current?.clientHeight);
  }, [ref]);

  return (
    <Root>
      <ProfileSpan onClick={handleClick}>
        {utils.isAddress(name) ? truncateAddress(name) : name}
      </ProfileSpan>
      <ImageWrapper ref={ref as any}>
        <ProfileImage
          account={account}
          imageIPFSHash={profile?.imageIPFSHash}
          height={height}
        />
      </ImageWrapper>
    </Root>
  );
};

export default ProfileLink;
