import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toastify'
import { Contributor } from '../../../pages/create';


export const useCreateSetConfiguration = () => {
  const { chainId } = useWeb3React();
  return async (
    daoContract: any,
    coverImgCID: string,
    blurbCID: string,
    genre: string,
    subtitle: string,
    loadingFunc: (x: boolean) => void,
    onLoad: (chainId: number, hash: string, message: string) => void,
    onSuccess: (chainId: number, hash: string, message: string) => void
  ) => {
    loadingFunc(true);
    try {
      const Tx = await daoContract.configureProjectDetails(
        coverImgCID,
        blurbCID,
        genre,
        subtitle
      );
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

export const useCreateAuthorMint = () => {
  const { chainId } = useWeb3React();
  return async (
    daoContract: any,
    authorMintAmount: number,
    loadingFunc: (x: boolean) => void,
    onLoad: (chainId: number, hash: string, message: string) => void,
    onSuccess: (chainId: number, hash: string, message: string) => void
  ) => {
    loadingFunc(true);
    try {
      const Tx = await daoContract.authorMint(authorMintAmount);
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

export const useCreateSetContributors = () => {
  const { chainId } = useWeb3React();
  return async (
    daoContract: any,
    contributor: Contributor,
    loadingFunc: (x: boolean) => void,
    onLoad: (chainId: number, hash: string, message: string) => void,
    onSuccess: (chainId: number, hash: string, message: string) => void,
    onError?: (chainId: number, hash: string, message: string) => void
  ) => {
    loadingFunc(true);

    try {
      // TODO: multicall?
      const Tx = await daoContract.addContributor(contributor.address, contributor.share);
      const { hash } = Tx;
      onLoad(chainId, hash, 'Pending transaction...');

      daoContract.provider.once(hash, (transaction) => {
        onSuccess(chainId, hash, 'Success!');
        loadingFunc(false);
      });
    } catch (e) {
      loadingFunc(false);
      // TODO: error is too big for toast - do error mapping
      onError ?? toast.error(e.data.message ?? 'Something went wrong.');
    }
  };
};
