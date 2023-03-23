import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { truncateAddress } from './WalletIndicator';
import useProfile from '../hooks/useProfile';
import { useName } from '../hooks/useName';
import { utils } from 'ethers';

const ProfileSpan = styled.span`
  text-decoration: underline;

  :hover {
    cursor: pointer;
  }
`;

type ProfileLinkProps = { account: string };

const ProfileLink = ({ account }: ProfileLinkProps) => {
  const name = useName(account);
  const router = useRouter();
  const { account: loggedInAccount } = useWeb3React();

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

  return (
    <ProfileSpan onClick={handleClick}>
      {utils.isAddress(name) ? truncateAddress(name) : name}
    </ProfileSpan>
  );
};

export default ProfileLink;
