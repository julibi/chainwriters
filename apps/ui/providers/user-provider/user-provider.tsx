import useGetAllNftsOfAccount from './useGetAllNftsOfAccount';
import { createContext, useMemo } from 'react';
import { UserProviderProps, UserApi } from './user-provider.types';

const defaultContext: UserApi = {
  balance: 0,
  nfts: null,
  isLoading: false,
  groupedNfts: [],
  detailedNfts: [],
};

export const UserContext = createContext(defaultContext);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { balance, nfts, isLoading, detailedNfts, groupedNfts } =
    useGetAllNftsOfAccount();

  const api = useMemo(
    () => ({
      balance,
      nfts,
      isLoading,
      detailedNfts,
      groupedNfts,
    }),
    [balance, nfts, detailedNfts, isLoading, groupedNfts]
  );
  return <UserContext.Provider value={api}>{children}</UserContext.Provider>;
};
