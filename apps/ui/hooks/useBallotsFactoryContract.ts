import { useMemo } from 'react';
import ABI from '../abis/BallotsFactory.json';
import {
  MOONPAGE_BALLOTS_FACTORY_ADDRESS,
  MOONPAGE_BALLOTS_FACTORY_ADDRESS_DEV,
} from '../../constants';
import useContract from './useContract';

const useBallotsFactoryContract = () => {
  const address =
    process.env.NX_PUBLIC_ENVIRONMENT === 'PROD'
      ? MOONPAGE_BALLOTS_FACTORY_ADDRESS
      : MOONPAGE_BALLOTS_FACTORY_ADDRESS_DEV;
  const BallotsFactory = useContract({
    address,
    abi: ABI,
  });

  const BallotsFactoryContract = useMemo(
    () => BallotsFactory,
    [BallotsFactory]
  );

  return BallotsFactoryContract;
};

export default useBallotsFactoryContract;
