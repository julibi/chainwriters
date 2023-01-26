import useGetAllNftsOfAccount from './useGetAllNftsOfAccount';
import { createContext, useMemo } from 'react';
import { UserProviderProps, UserApi } from './user-provider.types';
import { useWeb3React } from '@web3-react/core';

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
  const { account } = useWeb3React();
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
