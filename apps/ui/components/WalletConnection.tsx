import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import WalletIndicator from './WalletIndicator';
import WalletConnectionModal from './WalletConnectionModal';

const WalletConnection = () => {
  const { chainId } = useWeb3React();
  const [showConnectModal, setShowConnectModal] = useState(false);

  return (
    <div>
      <WalletIndicator
        chain={chainId}
        handleClickGenericConnection={() => setShowConnectModal(true)}
      />
      {showConnectModal && (
        <WalletConnectionModal onClose={() => setShowConnectModal(false)} />
      )}
    </div>
  );
};

export default WalletConnection;
