import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AccountAvatar from './AccountAvatar';
import { supportedChainIds, supportedChainMapping } from '../connectors';
import { PrimaryButton, INTER_BOLD } from '../themes';
import { useAccounts } from '../hooks/accounts';

const Root = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 320px;
  font-family: ${INTER_BOLD};
`;

const ConnectionModalOpener = styled(PrimaryButton)`
  font-family: ${INTER_BOLD};
  padding: 1rem;

  @media (max-width: 900px) {
    padding: 0.5rem;
    margin-inline-end: 1rem;
  }
`;

const Connections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EVMConnection = styled.div`
  display: flex;
`;
const SolanaConnection = styled.div`
  display: flex;
`;
const Item = styled.div`
  margin-inline: 1rem;
`;

export interface WalletIndicatorProps {
  chain: number | undefined | null;
  handleClickGenericConnection: () => void;
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
  chain,
  handleClickGenericConnection,
}: WalletIndicatorProps) => {
  const { evmAddress, solanaAddress } = useAccounts();
  const getEVMNetwork = (chain): ReactElement => {
    if (chain) {
      if (supportedChainIds.includes(chain)) {
        return <Item>{supportedChainMapping[chain]?.name}</Item>;
      } else {
        return <Item>{'False Network'}</Item>;
      }
    }
  };

  return (
    <Root>
      {(evmAddress || solanaAddress) && (
        <Connections>
          {evmAddress && (
            <EVMConnection>
              <span>{getEVMNetwork(chain)}</span>
              {chain && supportedChainIds.includes(chain) && (
                <Item>{truncateAddress(evmAddress)}</Item>
              )}
              {chain && supportedChainIds.includes(chain) && (
                <AccountAvatar address={evmAddress} />
              )}
            </EVMConnection>
          )}
          {solanaAddress && (
            <SolanaConnection>
              <span>{'Solana'}</span>
              <Item>{truncateAddress(solanaAddress)}</Item>
            </SolanaConnection>
          )}
        </Connections>
      )}
      {!evmAddress && !solanaAddress && (
        <ConnectionModalOpener
          data-testid={'modal-opener'}
          onClick={handleClickGenericConnection}
        >
          Connect to wallet
        </ConnectionModalOpener>
      )}
      {evmAddress && !solanaAddress && (
        <ConnectionModalOpener
          data-testid={'modal-opener'}
          onClick={handleClickGenericConnection}
        >
          Solana
        </ConnectionModalOpener>
      )}
      {!evmAddress && solanaAddress && (
        <ConnectionModalOpener
          data-testid={'modal-opener'}
          onClick={handleClickGenericConnection}
        >
          EVM
        </ConnectionModalOpener>
      )}
    </Root>
  );
};

export default WalletIndicator;
