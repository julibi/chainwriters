import React from 'react';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import styled from 'styled-components';
import { PrimaryButton, FONT_SERIF_BOLD } from '../themes';
import { Tooltip } from './Tooltip';
import ProfileLink from './ProfileLink';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 320px;
  font-family: ${FONT_SERIF_BOLD};
`;

const CTAButton = styled(PrimaryButton)`
  font-family: ${FONT_SERIF_BOLD};
  margin-inline-start: 1rem;
  padding: 1rem;

  @media (max-width: 900px) {
    padding: 0.5rem;
    margin-inline: 0 1rem;
  }
`;

const LogoutButton = styled(PrimaryButton)`
  font-family: ${FONT_SERIF_BOLD};
  margin-inline-start: 1rem;
  padding: 0.3rem;

  @media (max-width: 900px) {
    margin-inline: 1rem;
  }
`;

export interface WalletIndicatorProps {
  address: string | undefined | null;
  handleClick: () => void;
  showLoading: boolean;
  deactivate: () => void;
}

export const truncateAddress = (address: string) => {
  if (address) {
    const addressStart = address.substring(0, 6);
    const addressLength = address.length;
    const cut = addressLength - 5;
    const addressEnd = address.substring(addressLength, cut);
    return `${addressStart}...${addressEnd}`;
  }
  return;
};

const WalletIndicator = ({
  address,
  handleClick,
  showLoading = false,
  deactivate,
}: WalletIndicatorProps) => {
  return (
    <Root>
      {showLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {!address && (
            <CTAButton data-testid={'modal-opener'} onClick={handleClick}>
              Connect wallet
            </CTAButton>
          )}
          {address && <ProfileLink account={address} />}
          {address && (
            <Tooltip content="Disconnect wallet">
              <LogoutButton onClick={deactivate}>
                <PowerSettingsNewIcon />
              </LogoutButton>
            </Tooltip>
          )}
        </>
      )}
    </Root>
  );
};

export default WalletIndicator;
