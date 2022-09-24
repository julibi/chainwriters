import { useMemo } from 'react';
import ABI from '../abis/MoonpageManager.json';
import { MOONPAGE_MANAGER_ADDRESS } from '../../constants';
import useContract from './useContract';

const useMoonpageManager = () => {
  const MoonpageManager = useContract({
    address: MOONPAGE_MANAGER_ADDRESS,
    abi: ABI,
  });

  const MoonpageManagerContract = useMemo(
    () => MoonpageManager,
    [MoonpageManager]
  );

  return MoonpageManagerContract;
};

export default useMoonpageManager;
