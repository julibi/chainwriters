import React from 'react';
import { toast } from 'react-toastify';
import ToastLink from './ToastLink';

const PendingToast = (
  chainId: number,
  hash: string,
  customMessage?: string
) => {
  return toast.info(
    <ToastLink message={customMessage ?? 'Pending transaction...'} />
  );
};

export default PendingToast;
