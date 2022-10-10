import { useMemo } from 'react';
import ABI from '../abis/MoonpageFactory.json';
import {
  MOONPAGE_FACTORY_ADDRESS,
  MOONPAGE_FACTORY_ADDRESS_DEV,
} from '../../constants';
import useContract from './useContract';

const useMoonpageFactoryContract = () => {
  const address =
    process.env.NX_PUBLIC_ENVIRONMENT === 'PROD'
      ? MOONPAGE_FACTORY_ADDRESS
      : MOONPAGE_FACTORY_ADDRESS_DEV;
  const Factory = useContract({ address, abi: ABI });

  const FactoryContract = useMemo(() => Factory, [Factory]);

  return FactoryContract;
};

export default useMoonpageFactoryContract;
