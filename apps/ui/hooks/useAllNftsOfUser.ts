import { useCallback, useEffect, useState } from 'react'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core';
import { Multicall } from 'ethereum-multicall'
import { RPC_URLS, supportedChainMapping } from '../connectors';
import useFactoryContract from './useFactoryContract';
import ABI from '../abis/factory.json';
import { FACTORY as FACTORY_ADDRESS } from '../../constants';


const useAllNftsOfUser = () => {
  const { account, chainId } = useWeb3React();
  const FactoryContract = useFactoryContract();
  
  const [allNftsOfUser, setAllNftsOfUser] = useState(null);
  const [allProjectAddresses, setAllProjectAddresses] = useState<string[] | null>(null);

  const fetchAllProjectAddresses = useCallback(async() => {
    if (FactoryContract) {
      const daosTotal = Number(await FactoryContract.projectDaosLength());
      // TODO chainId - error handling
      const provider = new JsonRpcProvider(
        RPC_URLS[chainId],
        chainId
      );
      const multicall = new Multicall({
        ethersProvider: provider,
        tryAggregate: false
      });
      const callsArray = [...Array(daosTotal).keys()].map((daoId) => {
        return {
          reference: 'projectDaos',
          methodName: 'projectDaos',
          methodParameters: [daoId],
        };
      });
      const myMulticall = {
        reference: "ALL_DAO_ADDRESSES",
        contractAddress: FACTORY_ADDRESS,
        abi: ABI,
        calls: callsArray
      };
      // @ts-ignore
      const multicallResult = await multicall.call(myMulticall);
      const projectAddresses = multicallResult.results.ALL_DAO_ADDRESSES.callsReturnContext.map(item => item.returnValues[0].toLowerCase());
      setAllProjectAddresses(projectAddresses);
    } 
  }, [FactoryContract, chainId]);
  
  const fetchFromAlchemyAPI = useCallback(async() => {
    if (RPC_URLS[chainId] && createAlchemyWeb3 && supportedChainMapping[chainId] && allProjectAddresses) {
    // @ts-ignore
    const web3 = createAlchemyWeb3(RPC_URLS[chainId]);
    let nfts;
    try {
      nfts = await web3.alchemy.getNfts({owner: account})
    } catch(e: unknown) {
      console.log({ e });
    }
    const pepoNfts = nfts.ownedNfts.filter(nft => allProjectAddresses.includes(nft.contract.address.toLowerCase()));
    setAllNftsOfUser(pepoNfts);
    }
  }, [account, chainId, allProjectAddresses]);

  useEffect(() => {
    if (FactoryContract && chainId) {
      fetchAllProjectAddresses();
    }
  }, [FactoryContract, chainId, fetchAllProjectAddresses]);

  useEffect(() => {
    if (account && chainId && allProjectAddresses) {
      fetchFromAlchemyAPI();
    }
  }, [account, chainId, allProjectAddresses, fetchFromAlchemyAPI]);
  
  return { allNftsOfUser, allProjectAddresses };
}

export default useAllNftsOfUser;