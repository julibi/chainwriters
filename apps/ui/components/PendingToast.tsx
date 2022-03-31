import { useWeb3React } from '@web3-react/core';
import React from 'react'
import { toast } from 'react-toastify';
import ToastLink from './ToastLink';

const PendingToast = (chainId: number,hash: string, customMessage?: string) => {
  return (
    toast.info(
      <ToastLink
        hash={hash}
        chainId={chainId}
        message={customMessage ?? 'Pending transaction...'}
      />
    )
  )
}

export default PendingToast