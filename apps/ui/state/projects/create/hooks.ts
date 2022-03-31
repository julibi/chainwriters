import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify'

const useCreateSetGenre = () => {
  const { chainId } = useWeb3React();
  return async (
    daoContract: any,
    genre: string,
    loadingFunc: (x: boolean) => void,
    onLoad: (chainId: number, hash: string, message: string) => void,
    onSuccess: (chainId: number, hash: string, message: string) => void
  ) => {
    loadingFunc(true);
    try {
      const Tx = await daoContract.setGenre(genre);
      const { hash } = Tx;
      onLoad(chainId, hash, 'Pending transaction...');

      daoContract.provider.once(hash, (transaction) => {
        onSuccess(chainId, hash, 'Success!');
        loadingFunc(false);
      });
    } catch (e) {
      loadingFunc(false);
      toast.error(e.reason ?? 'Something went wrong.');
    }
  };
};

export default useCreateSetGenre