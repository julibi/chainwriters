import { useWeb3React } from '@web3-react/core'
import { toast } from 'react-toastify'
import { Contributor, ContributorsMapping } from 'apps/ui/pages/create';

export const useCreateSetGenre = () => {
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

export const useCreateSetSubtitle = () => {
  const { chainId } = useWeb3React();
  return async (
    daoContract: any,
    subtitle: string,
    loadingFunc: (x: boolean) => void,
    onLoad: (chainId: number, hash: string, message: string) => void,
    onSuccess: (chainId: number, hash: string, message: string) => void
  ) => {
    loadingFunc(true);
    try {
      const Tx = await daoContract.setSubtitle(subtitle);
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

export const useCreateSetAuthorMaxClaimable = () => {
  const { chainId } = useWeb3React();
  return async (
    daoContract: any,
    authorMaxClaimable: number,
    loadingFunc: (x: boolean) => void,
    onLoad: (chainId: number, hash: string, message: string) => void,
    onSuccess: (chainId: number, hash: string, message: string) => void
  ) => {
    loadingFunc(true);
    try {
      const Tx = await daoContract.setMaxGenesisClaimableAuthor(authorMaxClaimable);
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
    contributors: ContributorsMapping,
    loadingFunc: (x: boolean) => void,
    onLoad: (chainId: number, hash: string, message: string) => void,
    onSuccess: (chainId: number, hash: string, message: string) => void
  ) => {
    loadingFunc(true);
    try {
      const Tx = await daoContract.addContributor(contributors[0]);
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
