import React, { ReactElement } from 'react';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import styled from 'styled-components';
import AccountAvatar from './AccountAvatar';
import { supportedChainIds, supportedChainMapping } from '../connectors';
import { PrimaryButton, FONT_SERIF_BOLD } from '../themes';
import { Tooltip } from './Tooltip';

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
    margin-inline: 0 1rem;
  }
`;

const OnlyOnDesktop = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

const Item = styled.div`
  margin-inline-end: 1rem;
`;

export interface WalletIndicatorProps {
  address: string | undefined | null;
  chain: number | undefined | null;
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
  chain,
  handleClick,
  showLoading = false,
  deactivate,
}: WalletIndicatorProps) => {
  const getNetwork = (chain): ReactElement => {
    if (chain) {
      if (supportedChainIds.includes(chain)) {
        return (
          <OnlyOnDesktop>
            <Item>{supportedChainMapping[chain]?.name}</Item>
          </OnlyOnDesktop>
        );
      } else {
        return <Item>{'False Network'}</Item>;
      }
    } else {
      return (
        <CTAButton data-testid={'modal-opener'} onClick={handleClick}>
          Connect to wallet
        </CTAButton>
      );
    }
  };

  return (
    <Root>
      {showLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <div>{getNetwork(chain)}</div>
          {address && chain && supportedChainIds.includes(chain) && (
            <Item>{truncateAddress(address)}</Item>
          )}

          {chain && supportedChainIds.includes(chain) && (
            <AccountAvatar address={address} />
          )}
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
