import React, { useCallback, useEffect } from 'react'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { useWeb3React } from '@web3-react/core'
import { RPC_URLS } from '../connectors';

const Profile = () => {
  const { account, chainId } = useWeb3React();
  console.log(RPC_URLS[chainId]);
  const alchemyNFTApi = createAlchemyWeb3(RPC_URLS[chainId]);
  
  const test = useCallback(async() => {
    let nfts;
    try {
      nfts = await alchemyNFTApi.alchemy.getNfts({owner: account})
    } catch(e: unknown) {
      console.log({ e });
    }
    console.log({ nfts });
  }, [account, alchemyNFTApi]);

  useEffect(() => {
    test();
  }, [test]);

  return (
    <div>Profile</div>
  )
}

export default Profile