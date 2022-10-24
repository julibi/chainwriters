import { useWeb3React } from '@web3-react/core';
import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { injected, supportedChainIds } from '../connectors';
import {
  BaseButton,
  BG_NORMAL,
  DISABLED_WHITE,
  INTER_BOLD,
  PINK,
} from '../themes';
import { isProd } from '../utils/isProd';
import { switchNetwork } from '../utils/switchNetwork';
import Loading from './Loading';
import WalletConnectionModal from './WalletConnectionModal';

interface ActionButtonTypes {
  disabled?: boolean;
  loading: boolean;
  onClick?: (e?: FormEvent<HTMLButtonElement>) => void;
  text: string;
  margin?: string;
  width?: string;
  color?: string;
  web3Connectable?: boolean;
}

interface ButtonTypes {
  disabled: boolean;
  margin?: string;
  width?: string;
  color?: string;
}

const RootButton = styled(BaseButton)<ButtonTypes>`
  background-color: ${BG_NORMAL};
  color: ${({ color, disabled }) =>
    disabled ? DISABLED_WHITE : color ?? PINK};
  font-family: ${INTER_BOLD};
  width: ${({ width }) => width ?? '230px'};
  margin: ${({ margin }) => margin ?? '1rem 1rem 0 0'};
  padding: 1rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ActionButton = ({
  disabled = false,
  onClick,
  loading = false,
  text,
  margin,
  width,
  color,
  web3Connectable,
}: ActionButtonTypes) => {
  const { activate, account, chainId } = useWeb3React();
  const [showConnectModal, setShowConnectModal] = useState(false);

  if (web3Connectable && !account) {
    return (
      <>
        <RootButton
          color={color}
          onClick={() => setShowConnectModal(true)}
          disabled={false}
          margin={margin}
          width={width}
        >
          {`Connect to ${text}`}
        </RootButton>
        {showConnectModal && (
          <WalletConnectionModal onClose={() => setShowConnectModal(false)} />
        )}
      </>
    );
  } else if (
    web3Connectable &&
    account &&
    window?.ethereum &&
    !supportedChainIds.includes(chainId)
  ) {
    return (
      <RootButton
        color={color}
        onClick={() =>
          switchNetwork(
            isProd() ? 137 : 80001,
            () => toast.error('Switching Network failed.'),
            async () => {
              // onSuccess reattempt connect and close modal
              await activate(injected, undefined, true);
            }
          )
        }
        disabled={disabled}
        margin={margin}
        width={width}
      >
        {'Switch network'}
      </RootButton>
    );
  } else {
    return (
      <RootButton
        color={color}
        onClick={onClick}
        disabled={disabled}
        margin={margin}
        width={width}
      >
        {loading ? <Loading height={20} dotHeight={20} /> : text}
      </RootButton>
    );
  }
};

export default ActionButton;
