import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.NEXT_PUBLIC_ETHEREUM_RPC,
  42: process.env.NEXT_PUBLIC_RINKEBY_RPC,
  137: process.env.NEXT_PUBLIC_POLYGON_RPC,
  80001: process.env.NEXT_PUBLIC_MUMBAI_RPC,
};

export const supportedChainIds = [137, 80001];
export const injected = new InjectedConnector({ supportedChainIds });

const rpc =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
    ? { 80001: RPC_URLS[80001] }
    : { 137: RPC_URLS[137] };

export const walletconnect = new WalletConnectConnector({
  rpc,
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org/',
  chainId: 1,
});

interface supportedChain {
  symbol: string;
  name: string;
  icon?: string;
}

interface supportedChainMapping {
  [index: number]: supportedChain;
}

export const supportedChainMapping: supportedChainMapping = {
  137: { symbol: 'MATIC', name: 'Polygon', icon: 'PolygonIcon.svg' },
  80001: { symbol: 'MUMBAI', name: 'Mumbai', icon: 'PolygonIcon.svg' },
};
