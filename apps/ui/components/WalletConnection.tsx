import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from '../connectors'; 
import BaseModal from './BaseModal';
import { BaseButton } from '../themes';

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
          <>
            <h2>Connect To Your Wallet</h2>
            <BaseButton onClick={handleMetaMaskClick}>METAMASK</BaseButton>
            <BaseButton onClick={handleWalletConnectClick}>WALLETCONNECT</BaseButton>
          </>
        </BaseModal>
      }
    </div>
  );
}

export default WalletConnection