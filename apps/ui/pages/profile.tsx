import React, { useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import useAllNftsOfUser from '../hooks/useAllNftsOfUser';

const Profile = () => {
  const { account, chainId } = useWeb3React();
  const { allNftsOfUser } = useAllNftsOfUser();

  console.log({ allNftsOfUser });
  return (
    <div>Profile</div>
  )
}

export default Profile