import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import styled from 'styled-components';
import {
  injected,
  RPC_URLS,
  supportedChainIds,
  supportedChainMapping,
  walletconnect,
} from '../connectors';
import BaseModal from './BaseModal';
import WalletIndicator from './WalletIndicator';
import { BaseButton, INTER_BOLD } from '../themes';
import Dropdown from './Dropdown';

const ContentWrapper = styled.div`
  margin: 3rem;
`;

const Header = styled.h2`
  font-family: ${INTER_BOLD};
`;

const SubHeader = styled.h3`
  text-align: center;
`;

const DropdownWrapper = styled.div`
  width: 100%;
  margin-block-end: 1.5rem;
`;

const ConnectionButton = styled(BaseButton)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin-block-start: 1.5rem;
  padding: 1rem;
`;

const ConnectorName = styled.span`
  display: inlinel-block;
`;

const setupNetwork = async (chainId: number, onSuccess: () => void) => {
  //@ts-ignore
  const provider = window.ethereum;
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      onSuccess();
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      // @ts-ignore
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: supportedChainMapping[chainId].name,
                rpcUrls: [RPC_URLS[chainId]],
              },
            ],
          });
          onSuccess();
        } catch (addError) {
          console.error('Failed to setup the network in Metamask:', addError);
        }
      } else {
        // if other than 4902
        console.log(switchError);
      }
    }
  } else {
    toast.error('No provider found');
  }
};

const WalletConnection = () => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(80001);
  const { activate, account, chainId } = useWeb3React();
  const handleMetaMaskClick = async () => {
    try {
      await activate(injected, undefined, true);
      setShowConnectModal(false);
    } catch (e) {
      console.log({ e });
      console.log(e.name);
      if (
        e.name === 'UnsupportedChainIdError' ||
        e.message.includes('Unsupported chain id:')
      ) {
        // TODO: close modal on success etc
        setupNetwork(selectedNetwork, async () => {
          // onSuccess reattempt connect and close modal
          await activate(injected, undefined, true);
          setShowConnectModal(false);
        });
      } else {
        toast.error(e.message);
      }
    }
  };

  const handleWalletConnectClick = async () => {
    try {
      await activate(walletconnect, undefined, true);
      setShowConnectModal(false);
    } catch (e) {
      console.log({ e });
      toast.error(e.message);
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
          console.log({ network });
          setSelectedNetwork(network);
        },
      };
    }
  );
  return (
    <div>
      <WalletIndicator
        address={account}
        chain={chainId}
        handleClick={() => setShowConnectModal(true)}
        showLoading={false}
      />
      {showConnectModal && (
        <BaseModal onClose={() => setShowConnectModal(false)}>
          <ContentWrapper>
            <Header>Connect To Your Wallet</Header>
            <SubHeader>Network</SubHeader>
            <DropdownWrapper>
              <Dropdown
                preselected={networkDropdownItems[0]}
                options={networkDropdownItems}
                width={'100%'}
              />
            </DropdownWrapper>
            <SubHeader>Wallets</SubHeader>
            <ConnectionButton onClick={handleMetaMaskClick}>
              <ConnectorName>METAMASK</ConnectorName>
              <div>
                <Image
                  src={'/MetaMask.png'}
                  width={45}
                  height={45}
                  alt="Metamask icon"
                  priority
                />
              </div>
            </ConnectionButton>

            <ConnectionButton onClick={handleWalletConnectClick}>
              <ConnectorName>WALLETCONNECT</ConnectorName>
              <div>
                <Image
                  src={'/WalletConnect.png'}
                  width={50}
                  height={35}
                  alt="Walletconnect icon"
                />
              </div>
            </ConnectionButton>
          </ContentWrapper>
        </BaseModal>
      )}
    </div>
  );
};

export default WalletConnection;
