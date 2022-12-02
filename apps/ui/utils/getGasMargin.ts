import { BigNumber } from 'ethers';

// add 20%
export const getGasMargin = (value: any) => {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(2000)))
    .div(BigNumber.from(10000));
};
