import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { isDev } from './utils/isDev';

export const RPC_URLS: { [chainId: number]: string } = {
  137: process.env.NEXT_PUBLIC_RPC_URL_POLYGON_MAINNET_INFURA,
  80001: process.env.NEXT_PUBLIC_RPC_URL_POLYGON_MUMBAI_INFURA,
};

export const supportedChainIds = isDev() ? [80001] : [137];
export const injected = new InjectedConnector({ supportedChainIds });

const rpc =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
    ? { 80001: RPC_URLS[80001] }
    : { 137: RPC_URLS[137] };

const coinbaseRPC =
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
    ? RPC_URLS[80001]
    : RPC_URLS[137];

export const walletconnect = new WalletConnectConnector({
  rpc,
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org/',
  chainId: 1,
});

export const coinbaseWallet = new WalletLinkConnector({
  url: coinbaseRPC,
  appName: 'Moonpage',
  supportedChainIds,
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
