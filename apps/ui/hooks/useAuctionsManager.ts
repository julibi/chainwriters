import { useMemo } from 'react';
import ABI from '../abis/AuctionsManager.json';
import {
  AUCTIONS_MANAGER_ADDRESS,
  AUCTIONS_MANAGER_ADDRESS_DEV,
} from '../../constants';
import useContract from './useContract';

const useAuctionsManager = () => {
  const address =
    process.env.NX_PUBLIC_ENVIRONMENT === 'PROD'
      ? AUCTIONS_MANAGER_ADDRESS
      : AUCTIONS_MANAGER_ADDRESS_DEV;
  const AuctionsManager = useContract({
    address,
    abi: ABI,
  });

  const AuctionsManagerContract = useMemo(
    () => AuctionsManager,
    [AuctionsManager]
  );

  return AuctionsManagerContract;
};

export default useAuctionsManager;
