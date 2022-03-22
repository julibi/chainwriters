import React from 'react'
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect } from '../connectors'; 

interface WalletConnectionTypes {
  onSuccessfulConnection: () => void;
}

const WalletConnection = ({ onSuccessfulConnection }: WalletConnectionTypes) => {
  const { activate } = useWeb3React();
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
      <h2>WalletConnection</h2>
      <button onClick={handleMetaMaskClick}>CONNECT WITH METAMASK</button>
      <button onClick={handleWalletConnectClick}>CONNECT WITH WALLETCONNECT</button>
    </div>
  );
}

export default WalletConnection