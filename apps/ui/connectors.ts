import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.NX_PUBLIC_RPC_URL_ETH_MAINNET,
  42: process.env.NX_PUBLIC_RPC_URL_ETH_RINKEBY,
  137: process.env.NX_PUBLIC_RPC_URL_POLYGON_MAINNET,
  80001: process.env.NX_PUBLIC_RPC_URL_POLYGON_MUMBAI,
};

export const supportedChainIds = [137, 80001];
export const injected = new InjectedConnector({ supportedChainIds });

export const walletconnect = new WalletConnectConnector({
  rpc: { 80001: RPC_URLS[80001] },
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
  // 137: { symbol: "MATIC", name: "Polygon", icon: "PolygonIcon.svg" },
  80001: { symbol: 'MUMBAI', name: 'Mumbai', icon: 'PolygonIcon.svg' },
};
