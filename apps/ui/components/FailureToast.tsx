import { useWeb3React } from '@web3-react/core';
import React from 'react'
import { toast } from 'react-toastify';
import ToastLink from './ToastLink';

const FailureToast = (chainId: number,hash: string, customMessage?: string) => {
  return (
    toast.error(
      <ToastLink
        hash={hash}
        chainId={chainId}
        message={customMessage ?? 'Transaction failed...'}
      />
    )
  )
}

export default FailureToast