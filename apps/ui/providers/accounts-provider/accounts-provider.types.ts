import { ReactChild } from 'react';

export type AccountsApi = {
  evmAddress: string | undefined;
  solanaAddress: string | undefined;
};

export type AccountsProviderProps = {
  children: ReactChild;
};
