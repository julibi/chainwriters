import { BigNumber } from 'ethers';
import { formatEther } from '@ethersproject/units';

export const formatNumber = (
  value: number | BigNumber | undefined,
  options: Intl.NumberFormatOptions = {
    maximumFractionDigits: 4,
    minimumFractionDigits: 0
  }
): string => {
  if (value === undefined) {
    return '0';
  }

  const result = typeof value === 'number' ? value : Number(formatEther(value));
  if (result > 0) {
    return new Intl.NumberFormat('en-US', options).format(result);
  }
  return '0';
};