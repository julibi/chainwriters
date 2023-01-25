import { useMemo } from 'react';
import ABI from '../abis/MoonpageAirdrop.json';
import {
  MOONPAGE_AIRDROP_ADDRESS,
  MOONPAGE_AIRDROP_ADDRESS_DEV,
} from '../../constants';
import useContract from './useContract';

const useMoonpageAirdrop = () => {
  const address =
    process.env.NX_PUBLIC_ENVIRONMENT === 'DEV'
      ? MOONPAGE_AIRDROP_ADDRESS_DEV
      : MOONPAGE_AIRDROP_ADDRESS;
  const MoonpageAirdrop = useContract({
    address,
    abi: ABI,
  });

  const MoonpageAirdropContract = useMemo(
    () => MoonpageAirdrop,
    [MoonpageAirdrop]
  );

  return MoonpageAirdropContract;
};

export default useMoonpageAirdrop;
