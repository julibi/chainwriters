import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const RPC_URLS: { [chainId: number]: string } = {
  // TODO key into env file
  137: "",
  80001: "https://polygon-mumbai.g.alchemy.com/v2/qDySFLl1Qjz8TO4sYO16cguTRQqUxt6s",
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
}

interface supportedChainMapping {
  [index: number]: supportedChain;
}

export const supportedChainMapping: supportedChainMapping = {
  137: { symbol: "MATIC", name: "Polygon Mainnet" },
  80001: { symbol: "MUMBAI", name: "Mumbai" },
};
