import { useMemo } from 'react';
import ABI from '../abis/AuctionsManager.json';
import { AUCTIONS_MANAGER_ADDRESS } from '../../constants';
import useContract from './useContract';

const useAuctionsManager = () => {
  const AuctionsManager = useContract({
    address: AUCTIONS_MANAGER_ADDRESS,
    abi: ABI,
  });

  const AuctionsManagerContract = useMemo(
    () => AuctionsManager,
    [AuctionsManager]
  );

  return AuctionsManagerContract;
};

export default useAuctionsManager;
