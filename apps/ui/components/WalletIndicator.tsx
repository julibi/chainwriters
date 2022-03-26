import React, { ReactElement } from 'react'
import styled from 'styled-components'
import AccountAvatar from './AccountAvatar'
import { supportedChainIds, supportedChainMapping } from '../connectors'
import { PrimaryButton } from '../themes'

const Root = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 320px;
  `;
  
const ConnectionModalOpener = styled(PrimaryButton)`
  font-family: 'Roboto Mono Bold';
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin-inline-end: 1rem;
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
}: WalletIndicatorProps) => {

  const getNetwork = (chain): ReactElement => {
    if (chain) {
      if (supportedChainIds.includes(chain)) {
        return <Item>{supportedChainMapping[chain]?.name}</Item>;
      } else {
        return <Item>{'False Network'}</Item>;
      }
    } else {
      return (
        <ConnectionModalOpener
          data-testid={'modal-opener'}
          onClick={handleClick}
        >
          Connect to wallet
        </ConnectionModalOpener>
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
          {address &&
            chain &&
            supportedChainIds.includes(chain) &&
            <Item>{truncateAddress(address)}</Item>
          }
          {chain && supportedChainIds.includes(chain) && (
            <AccountAvatar address={address} />
          )}
        </>
      )}
    </Root>
  );
};

export default WalletIndicator;
