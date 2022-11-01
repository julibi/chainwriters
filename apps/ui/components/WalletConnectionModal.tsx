import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import styled from 'styled-components';
import {
  injected,
  supportedChainIds,
  supportedChainMapping,
  walletconnect,
} from '../connectors';
import BaseModal from './BaseModal';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  INSET_BASE_BOX_SHADOW,
} from '../themes';
import Dropdown from './Dropdown';
import Title from './Title';
import { switchNetwork } from '../utils/switchNetwork';
import Checkbox from './Checkbox';
import NextLink from './NextLink';
import { useAccounts } from '../hooks/accounts';

type WalletConnectionModalProps = {
  onClose: () => void;
};

const ContentWrapper = styled.div`
  margin: 3rem;

  @media (max-width: 900px) {
    margin: 1rem;
  }
`;

const SubHeader = styled.h3`
  text-align: center;
`;

const DropdownWrapper = styled.div`
  width: 100%;
  margin-block-end: 1.5rem;
`;

const TermsOfService = styled.div`
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  margin-block-end: 1rem;
  padding: 1rem;

  :disabled {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
    pointer-events: none;
  }
`;

const ConnectionButton = styled(BaseButton)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin-block-start: 1.5rem;
  padding: 1rem;

  :disabled {
    opacity: 0.5;
  }
`;

const ConnectorName = styled.span`
  display: inlinel-block;
`;

const WalletConnectionModal = ({ onClose }: WalletConnectionModalProps) => {
  const isProd = process.env.NX_PUBLIC_ENVIRONMENT === 'PROD';
  const { evmAddress, solanaAddress } = useAccounts();
  const [selectedNetwork, setSelectedNetwork] = useState<number | string>(
    isProd ? 137 : 80001
  );
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { activate, chainId } = useWeb3React();

  const toggleTermsAccepted = useCallback(() => {
    setIsTermsAccepted(!isTermsAccepted);
  }, [isTermsAccepted]);

  const handleMetaMaskClick = async () => {
    try {
      await activate(injected, undefined, true);
      onClose();
    } catch (e) {
      if (
        e.name === 'UnsupportedChainIdError' ||
        e.message.includes('Unsupported chain id:')
      ) {
        // TODO: close modal on success etc
        switchNetwork(
          selectedNetwork,
          () => toast.error('Switching Network failed.'),
          async () => {
            // onSuccess reattempt connect and close modal
            await activate(injected, undefined, true);
            onClose();
          }
        );
      } else {
        toast.error(e.message);
      }
    }
  };

  const handleWalletConnectClick = async () => {
    try {
      await activate(walletconnect, undefined, true);
      onClose();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handlePhantomWalletClick = async () => {
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        onClose();
      } catch (e) {
        toast.error(e.message);
      }
    }
  };

  useEffect(() => {
    if (chainId) {
      const isSupported = supportedChainIds.includes(chainId);
      if (!isSupported) {
        toast.error('Wrong chain. Please connect to a supported network!');
      }
    }
  }, [chainId]);

  const networkDropdownItems = Object.values(supportedChainMapping).map(
    (chain, idx) => {
      return {
        id: Number(Object.keys(supportedChainMapping)[idx]),
        value: chain.name,
        img: chain.icon,
        onSelect: (network: number) => {
          setSelectedNetwork(network);
        },
      };
    }
  );

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <Title size="m">Connect To Your Wallet</Title>
        <TermsOfService>
          <Checkbox
            onChange={toggleTermsAccepted}
            check={isTermsAccepted}
            readonly={false}
          >
            <span>
              By connecting your wallet and using the Moonpage website, you
              agree to our
              <NextLink href="/termsofservice" name="Terms of Service." />
            </span>
          </Checkbox>
        </TermsOfService>
        <DropdownWrapper>
          <Dropdown
            preselected={networkDropdownItems[isProd ? 0 : 1]}
            options={[
              networkDropdownItems[isProd ? 0 : 1],
              {
                id: 'SOLANA',
                value: 'Solana',
                img: 'Solana.svg',
                onSelect: () => {
                  setSelectedNetwork('Solana');
                },
              },
            ]}
            width={'100%'}
          />
        </DropdownWrapper>
        <SubHeader>Wallets</SubHeader>
        {window?.ethereum && (
          <ConnectionButton
            disabled={
              !isTermsAccepted ||
              ![137, 80001].includes(selectedNetwork as number)
            }
            onClick={handleMetaMaskClick}
          >
            <ConnectorName>METAMASK</ConnectorName>
            <div>
              <Image
                src={'/MetaMask.png'}
                width={36}
                height={36}
                alt="Metamask icon"
                priority
              />
            </div>
          </ConnectionButton>
        )}
        <ConnectionButton
          disabled={
            !isTermsAccepted ||
            ![137, 80001].includes(selectedNetwork as number)
          }
          onClick={handleWalletConnectClick}
        >
          <ConnectorName>WALLETCONNECT</ConnectorName>
          <div>
            <Image
              src={'/WalletConnect.png'}
              width={40}
              height={25}
              alt="Walletconnect icon"
              priority
            />
          </div>
        </ConnectionButton>
        <ConnectionButton
          disabled={!isTermsAccepted || selectedNetwork !== 'Solana'}
          onClick={handlePhantomWalletClick}
        >
          <ConnectorName>Phantom Wallet</ConnectorName>
          <div>
            <Image
              src={'/Phantom.svg'}
              width={40}
              height={25}
              alt="Phantom icon"
              priority
            />
          </div>
        </ConnectionButton>
      </ContentWrapper>
    </BaseModal>
  );
};

export default WalletConnectionModal;
