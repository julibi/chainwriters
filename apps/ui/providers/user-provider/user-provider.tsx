import { createContext, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import useGetAllNftsOfAccount from './useGetAllNftsOfAccount';
import { UserProviderProps, UserApi } from './user-provider.types';
import useAddressInRoute from '../../hooks/useAddressInRoute';

const defaultContext: UserApi = {
  balance: 0,
  nfts: null,
  isLoading: false,
  groupedNfts: [],
  detailedNfts: [],
  fetchBalance: () => null,
};

export const UserContext = createContext(defaultContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { account: loggedInAccount } = useWeb3React();
  const addressInRoute: string | undefined = useAddressInRoute();

  const account = useMemo(
    () => addressInRoute ?? loggedInAccount,

    [addressInRoute, loggedInAccount]
  );

  const { balance, nfts, isLoading, detailedNfts, groupedNfts, fetchBalance } =
    useGetAllNftsOfAccount(account);

  const api = useMemo(
    () => ({
      fetchBalance,
      balance,
      nfts,
      isLoading,
      detailedNfts,
      groupedNfts,
    }),
    [fetchBalance, balance, nfts, detailedNfts, isLoading, groupedNfts]
  );
  return <UserContext.Provider value={api}>{children}</UserContext.Provider>;
};
