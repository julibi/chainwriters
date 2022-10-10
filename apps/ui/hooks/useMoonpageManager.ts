import { useMemo } from 'react';
import ABI from '../abis/MoonpageManager.json';
import {
  MOONPAGE_MANAGER_ADDRESS,
  MOONPAGE_MANAGER_ADDRESS_DEV,
} from '../../constants';
import useContract from './useContract';

const useMoonpageManager = () => {
  const address =
    process.env.NX_PUBLIC_ENVIRONMENT === 'PROD'
      ? MOONPAGE_MANAGER_ADDRESS
      : MOONPAGE_MANAGER_ADDRESS_DEV;
  const MoonpageManager = useContract({
    address,
    abi: ABI,
  });

  const MoonpageManagerContract = useMemo(
    () => MoonpageManager,
    [MoonpageManager]
  );

  return MoonpageManagerContract;
};

export default useMoonpageManager;
