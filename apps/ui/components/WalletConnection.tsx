import React, { useState } from 'react'
import Image from 'next/image';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import { injected, walletconnect } from '../connectors'; 
import BaseModal from './BaseModal';
import { BaseButton } from '../themes';

const ContentWrapper = styled.div`
  margin: 2rem;
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

interface WalletConnectionTypes {
  onSuccessfulConnection: () => void;
}

const WalletConnection = ({ onSuccessfulConnection }: WalletConnectionTypes) => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { activate, account } = useWeb3React();
  const handleMetaMaskClick = async() => {
    try {
      await activate(injected, undefined, true);
      onSuccessfulConnection();
    } catch(e) {
      console.log("Whoops, something went wrong trying to connect to Metamask")
    }
  };

  const handleWalletConnectClick = async() => {
    try {
      await activate(walletconnect, undefined, true);
      onSuccessfulConnection();
    } catch(e) {
      console.log("Whoops, something went wrong trying to connect with walletconnect")
    }
  };
  return (
    <div>
        { !account && <BaseButton onClick={() => setShowConnectModal(true)}>Connect</BaseButton>}
        {showConnectModal && 
          <BaseModal onClose={() => setShowConnectModal(false)}>
            <ContentWrapper>
              <h2>Connect To Your Wallet</h2>
              <ConnectionButton onClick={handleMetaMaskClick}>
                <ConnectorName>METAMASK</ConnectorName>
                <div>
                  <Image src={'/MetaMask.png'} width={45} height={45} alt='Metamask icon' />
                </div>
              </ConnectionButton>
              
              <ConnectionButton onClick={handleWalletConnectClick}>
                <ConnectorName>WALLETCONNECT</ConnectorName>
                <div>
                  <Image src={'/WalletConnect.png'} width={50} height={35} alt='Walletconnect icon' />
                </div>
              </ConnectionButton>
            </ContentWrapper>
          </BaseModal>
        }
    </div>
  );
}

export default WalletConnection