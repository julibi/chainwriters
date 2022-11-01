import { useWeb3React } from '@web3-react/core';
import { createContext, useEffect, useMemo, useState } from 'react';
import { AccountsApi, AccountsProviderProps } from './accounts-provider.types';

const defaultContext: AccountsApi = {
  evmAddress: null,
  solanaAddress: null,
};

export const AccountsContext = createContext(defaultContext);

export function AccountsProvider({ children }: AccountsProviderProps) {
  const { account: evmAddress } = useWeb3React();
  const [solanaAddress, setSolanaAddress] = useState();

  const api = useMemo(
    () => ({
      evmAddress,
      solanaAddress,
    }),
    [evmAddress, solanaAddress]
  );

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      const response = await window.solana.connect({ onlyIfTrusted: true });
      console.log('Connected with Public Key:', response.publicKey.toString());
      setSolanaAddress(response.publicKey.toString());
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // there is no other way to detect an account change on solana
  // https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
  useEffect(() => {
    const walletChangeInterval = setInterval(() => {
      const solana = window?.solana;

      if (solana.publicKey) {
        if (solana.publicKey?.toBase58() !== solanaAddress) {
          //Need to overwrite style setting from Solana connection manually to enable scrolling
          document.body.style.overflow = 'initial';

          setSolanaAddress(solana.publicKey.toBase58());
        }
      } else {
        setSolanaAddress(undefined);
      }

      // when connection through a web wallet (like Solflare), the window.solana object is not set,
      // but anchorWallet gets set upon connection
      //   else if (anchorWallet && anchorWallet.publicKey.toBase58() !== currentWallet?.publicKey.toBase58()) {
      //   document.body.style.overflow = 'initial';
      //   setCurrentWallet(anchorWallet);
      // }
    }, 1000);

    return () => {
      clearInterval(walletChangeInterval);
    };
  }, [solanaAddress]);

  return (
    <AccountsContext.Provider value={api}>{children}</AccountsContext.Provider>
  );
}
