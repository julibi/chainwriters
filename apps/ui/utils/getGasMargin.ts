import { BigNumber } from 'ethers';

// add 15%
export const getGasMargin = (value: any) => {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1500)))
    .div(BigNumber.from(10000));
};
