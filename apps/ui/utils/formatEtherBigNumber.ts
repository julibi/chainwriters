import { BigNumber } from '@ethersproject/bignumber';
import { formatEther, commify } from '@ethersproject/units';

/**
 * This function converts a Bignumber into a string representation with the desired amount of decimals
 * The number is then displayed in american style e.g. 1,000,000.1234
 */
export function formatEtherBigNumber(
  number: BigNumber,
  decimalCount = 2,
  unit = 18
) {
  const decimalLength = BigNumber.from(10).pow(unit - decimalCount);
  const remainder = number.mod(decimalLength);
  let result = commify(formatEther(number.sub(remainder)));
  if (decimalCount === 0) {
    result = result.split('.')[0]; //needed because the helper functions return .0
  }
  return result;
}
