import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core'
import Image from 'next/image'
import styled from 'styled-components'
import { injected, RPC_URLS, supportedChainIds, supportedChainMapping, walletconnect } from '../connectors'
import BaseModal from './BaseModal'
import WalletIndicator from './WalletIndicator'
import { BaseButton } from '../themes'

const ContentWrapper = styled.div`
  margin: 3rem;
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

const setupNetwork = async (chainId: number) => {
  //@ts-ignore
  const provider = window.ethereum;
  // if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
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
          return true;
        } catch (addError) {
          console.error(
            'Failed to setup the network in Metamask:',
            addError
          );
          return false;
        }
      }
      // handle other "switch" errors
      return false;
    }
  // } else {
  //   console.error(
  //     "Can't setup the network on metamask because window.ethereum is undefined"
  //   );
  //   return false;
  // }
};

const WalletConnection = () => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { activate, account, chainId } = useWeb3React();
  const handleMetaMaskClick = async() => {
    try {
      await activate(injected, undefined, true);
      setShowConnectModal(false);
    } catch(e) {
      //@ts-ignore
      const provider = window.ethereum;
      if (provider && e.name === 'UnsupportedChainIdError') {
        // TODO: close modal on success etc
        setupNetwork(80001);
      } else {
        toast.error(e.message);
      }
    }
  };

  const handleWalletConnectClick = async() => {
    try {
      await activate(walletconnect, undefined, true);
      setShowConnectModal(false);
    } catch(e) {
      console.log({ e });
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (chainId) {
      console.log({ chainId });
      const isSupported = supportedChainIds.includes(chainId);
      if (!isSupported) {
        toast.error('Wrong chain. Please connect to a supported network!');
      }
    }
  }, [chainId]);

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
            <h2>Connect To Your Wallet</h2>
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
}

export default WalletConnection