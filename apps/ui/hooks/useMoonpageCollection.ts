import { useMemo } from 'react';
import ABI from '../abis/MoonpageCollection.json';
import { MOONPAGE_COLLECTION_ADDRESS } from '../../constants';
import useContract from './useContract';

const useMoonpageCollection = () => {
  const MoonpageCollection = useContract({
    address: MOONPAGE_COLLECTION_ADDRESS,
    abi: ABI,
  });

  const MoonpageCollectionContract = useMemo(
    () => MoonpageCollection,
    [MoonpageCollection]
  );

  return MoonpageCollectionContract;
};

export default useMoonpageCollection;
