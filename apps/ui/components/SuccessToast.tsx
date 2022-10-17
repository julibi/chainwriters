import React from 'react';
import { toast } from 'react-toastify';
import ToastLink from './ToastLink';

const SuccessToast = (
  chainId: number,
  hash: string,
  customMessage?: string
) => {
  return toast.info(<ToastLink message={customMessage ?? 'Success!'} />);
};

export default SuccessToast;
