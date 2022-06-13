import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core';
import { Contract, getDefaultProvider } from 'ethers';
import ABI from '../abis/factory.json';
import { RPC_URLS } from '../connectors';
import { FACTORY } from '../../constants';

const useFactoryContract = () => {
  const { account, chainId, library } = useWeb3React();

  const FactoryContract = useMemo(
    () => (library && account) ?
        new Contract(
          FACTORY,
          ABI,
          library?.getSigner(account)
        )
      : new Contract(
          FACTORY,
          ABI,
          // TODO production
          RPC_URLS[chainId] ? getDefaultProvider(RPC_URLS[chainId]) : getDefaultProvider(RPC_URLS[80001])
        ),
    [library, account, chainId]
  );

  return FactoryContract;
}

export default useFactoryContract