import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core';
import { Contract, getDefaultProvider } from 'ethers';
import ABI from '../abis/project.json';
import { RPC_URLS } from '../connectors';

const useDaoContract = () => {
  const { account, library } = useWeb3React();
  return (address: string) => {
    const DaoContract = 
      (library && account) ?
      new Contract(
        address,
        ABI,
        library?.getSigner(account)
      )
    : new Contract(
        address,
        ABI,
        // TODO production
        getDefaultProvider(RPC_URLS[80001])
    );
    return DaoContract;
  };
}

export default useDaoContract