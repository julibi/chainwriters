import React, { useCallback, useEffect } from 'react'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { useWeb3React } from '@web3-react/core'
import { RPC_URLS } from '../connectors';

const Profile = () => {
  const { account, chainId } = useWeb3React();
  console.log(RPC_URLS[chainId]);
  
  const test = useCallback(async() => {
    if (RPC_URLS[chainId] && createAlchemyWeb3) {
    // @ts-ignore
    const web3 = createAlchemyWeb3(RPC_URLS[chainId]);
    let nfts;
      try {
        nfts = await web3.alchemy.getNfts({owner: account})
      } catch(e: unknown) {
        console.log({ e });
      }
      // console.log({ nfts });
    }
  }, [account, chainId]);

  useEffect(() => {
    test();
  }, [test]);

  return (
    <div>Profile</div>
  )
}

export default Profile