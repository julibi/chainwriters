import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract, ContractInterface, getDefaultProvider } from 'ethers';
import { RPC_URLS } from '../connectors';
interface UseContractProps {
  address: string;
  abi: ContractInterface;
}
const useContract = ({ address, abi }: UseContractProps) => {
  const { account, library } = useWeb3React();

  return useMemo(() => {
    return library && account
      ? new Contract(address, abi, library?.getSigner(account))
      : new Contract(address, abi, getDefaultProvider(RPC_URLS[137]));
  }, [library, account, address, abi]);
};

export default useContract;
