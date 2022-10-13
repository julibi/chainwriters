import { RPC_URLS, supportedChainMapping } from '../connectors';

// todo - turn this into a hook

export const switchNetwork = async (
  chainId: number,
  onError: () => void,
  onSuccess: () => void
) => {
  const provider = window?.ethereum;
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      onSuccess();
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: supportedChainMapping[chainId].name,
                rpcUrls: [RPC_URLS[chainId]],
              },
            ],
          });
          onSuccess();
        } catch (addError) {
          console.error('Failed to setup the network in Metamask:', addError);
        }
      } else {
        // if other than 4902
        console.log(switchError);
      }
    }
  } else {
    onError();
  }
};
