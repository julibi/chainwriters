import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const useENS = (address: string) => {
  const [ensName, setENSName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const resolveENS = async () => {
      setLoading(true);
      if (address && ethers.utils.isAddress(address)) {
        try {
          const provider = ethers.providers.getDefaultProvider();
          const ensName = await provider.lookupAddress(address);
          setENSName(ensName);
        } finally {
          setLoading(false);
        }
      }
    };
    resolveENS();
  }, [address]);

  return { ensName, loading };
};
