import { BigNumber, utils } from 'ethers';
import axios from 'axios';

// add 15%
export const getGasMargin = (value?: any) => {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1500)))
    .div(BigNumber.from(10000));
};

export const fixedGasMargin = async () => {
  // get max fees from gas station
  let maxFeePerGas = BigNumber.from(40000000000); // fallback to 40 gwei
  let maxPriorityFeePerGas = BigNumber.from(40000000000); // fallback to 40 gwei

  const isProd = process.env.NX_PUBLIC_ENVIRONMENT === 'PROD';
  try {
    const { data } = await axios({
      method: 'get',
      url: isProd
        ? 'https://gasstation-mainnet.matic.network/v2'
        : 'https://gasstation-mumbai.matic.today/v2',
    });

    maxFeePerGas = utils.parseUnits(Math.ceil(data.fast.maxFee) + '', 'gwei');
    maxPriorityFeePerGas = utils.parseUnits(
      Math.ceil(data.fast.maxPriorityFee) + '',
      'gwei'
    );

    return {
      maxFeePerGas,
      maxPriorityFeePerGas,
    };
  } catch {
    // ignore
  }
};
