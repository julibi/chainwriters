import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract, ContractInterface, getDefaultProvider } from 'ethers';
import { RPC_URLS } from '../connectors';

const RPC_URL =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
    ? RPC_URLS[80001]
    : RPC_URLS[137];

interface UseContractProps {
  address: string | undefined;
  abi: ContractInterface;
}
const useContract = ({ address, abi }: UseContractProps) => {
  const { account, library } = useWeb3React();

  return useMemo(() => {
    if (!address) return null;
    return library && account
      ? new Contract(address, abi, library?.getSigner(account))
      : new Contract(address, abi, getDefaultProvider(RPC_URL));
  }, [library, account, address, abi]);
};

export default useContract;
