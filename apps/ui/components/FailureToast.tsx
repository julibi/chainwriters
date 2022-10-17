import React from 'react';
import { toast } from 'react-toastify';
import ToastLink from './ToastLink';

const FailureToast = (
  chainId: number,
  hash: string,
  customMessage?: string
) => {
  return toast.error(
    <ToastLink message={customMessage ?? 'Transaction failed...'} />
  );
};

export default FailureToast;
