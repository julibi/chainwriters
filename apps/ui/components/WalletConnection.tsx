import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import WalletIndicator from './WalletIndicator';
import WalletConnectionModal from './WalletConnectionModal';

const WalletConnection = () => {
  const { account, deactivate } = useWeb3React();
  const [showConnectModal, setShowConnectModal] = useState(false);

  return (
    <div>
      <WalletIndicator
        address={account}
        deactivate={deactivate}
        handleClick={() => setShowConnectModal(true)}
        showLoading={false}
      />
      {showConnectModal && (
        <WalletConnectionModal onClose={() => setShowConnectModal(false)} />
      )}
    </div>
  );
};

export default WalletConnection;
