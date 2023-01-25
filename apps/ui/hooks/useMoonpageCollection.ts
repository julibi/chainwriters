import { useMemo } from 'react';
import ABI from '../abis/MoonpageCollection.json';
import {
  MOONPAGE_COLLECTION_ADDRESS,
  MOONPAGE_COLLECTION_ADDRESS_DEV,
} from '../../constants';
import useContract from './useContract';

const useMoonpageCollection = () => {
  const address =
    process.env.NX_PUBLIC_ENVIRONMENT === 'DEV'
      ? MOONPAGE_COLLECTION_ADDRESS_DEV
      : MOONPAGE_COLLECTION_ADDRESS;
  const MoonpageCollection = useContract({
    address,
    abi: ABI,
  });

  const MoonpageCollectionContract = useMemo(
    () => MoonpageCollection,
    [MoonpageCollection]
  );

  return MoonpageCollectionContract;
};

export default useMoonpageCollection;
