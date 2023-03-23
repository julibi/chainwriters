import { BigNumber, utils } from 'ethers';
import axios from 'axios';
import { isDev } from './isDev';

// add 15%
// export const getGasMargin = (value?: any) => {
//   return value
//     .mul(BigNumber.from(10000).add(BigNumber.from(1500)))
//     .div(BigNumber.from(10000));
// };

export const getGasMargin = async () => {
  // get max fees from gas station
  let maxFeePerGas = BigNumber.from(40000000000); // fallback to 40 gwei
  let maxPriorityFeePerGas = BigNumber.from(40000000000); // fallback to 40 gwei

  try {
    const { data } = await axios({
      method: 'get',
      url: isDev()
        ? 'https://gasstation-mumbai.matic.today/v2'
        : 'https://gasstation-mainnet.matic.network/v2',
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
    return {
      maxFeePerGas,
      maxPriorityFeePerGas,
    };
  }
};
