import { AnchorWallet } from '@solana/wallet-adapter-react/src/useAnchorWallet';

declare global {
  interface Window {
    solana?: AnchorWallet;
    ethereum?: any;
  }
}

export {};
