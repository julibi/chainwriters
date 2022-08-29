import { useMemo } from 'react';
import ABI from '../abis/MoonpageFactory.json';
import { MOONPAGE_FACTORY_ADDRESS } from '../../constants';
import useContract from './useContract';

const useMoonpageFactoryContract = () => {
  const Factory = useContract({ address: MOONPAGE_FACTORY_ADDRESS, abi: ABI });

  const FactoryContract = useMemo(() => Factory, [Factory]);

  return FactoryContract;
};

export default useMoonpageFactoryContract;
