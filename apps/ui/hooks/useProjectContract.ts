import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract, getDefaultProvider } from 'ethers'
import ABI from '../abis/project.json'
import { RPC_URLS } from '../connectors'

const useProjectContract = (projectAddress: string) => {
  const { account, library } = useWeb3React();

  return useMemo(
    () => {
      if (!projectAddress) {
        return null;
      }

      return (library && account) ?
        new Contract(
          projectAddress,
          ABI,
          library?.getSigner(account)
        )
        : new Contract(
          projectAddress,
          ABI,
          // TODO production
          getDefaultProvider(RPC_URLS[80001])
        )
    },
    [library, account, projectAddress]
  );
}

export default useProjectContract
