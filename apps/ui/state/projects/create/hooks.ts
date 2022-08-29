import { useWeb3React } from '@web3-react/core';
import { Contract } from 'ethers';
import { toast } from 'react-toastify';
import { Contributor } from '../../../pages/create';

export const useCreateSetConfiguration = () => {
  const { chainId } = useWeb3React();
  return async (
    contract: Contract,
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
      const Tx = await contract.configureProjectDetails(
        coverImgCID,
        blurbCID,
        genre,
        subtitle
      );
      const { hash } = Tx;
      onLoad(chainId, hash, 'Pending transaction...');

      contract.provider.once(hash, (transaction) => {
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
    contract: Contract,
    authorMintAmount: number,
    metadataCID: string,
    loadingFunc: (x: boolean) => void,
    onLoad: (chainId: number, hash: string, message: string) => void,
    onSuccess: (chainId: number, hash: string, message: string) => void
  ) => {
    loadingFunc(true);
    try {
      const Tx = await contract.authorMint(authorMintAmount, metadataCID);
      const { hash } = Tx;
      onLoad(chainId, hash, 'Pending transaction...');

      contract.provider.once(hash, (transaction) => {
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
    contract: Contract,
    contributorList: Contributor[],
    loadingFunc: (x: boolean) => void,
    onLoad: (chainId: number, hash: string, message: string) => void,
    onSuccess: (chainId: number, hash: string, message: string) => void,
    onError?: (chainId: number, hash: string, message: string) => void
  ) => {
    loadingFunc(true);
    const addressesArray = [];
    const sharesArray = [];
    const rolesArray = [];
    contributorList.map((contrib: Contributor) => {
      addressesArray.push(contrib.address);
      sharesArray.push(contrib.share);
      rolesArray.push(contrib.role);
    });

    try {
      const Tx = await contract.addContributors(
        addressesArray,
        sharesArray,
        rolesArray
      );
      const { hash } = Tx;
      onLoad(chainId, hash, 'Pending transaction...');

      contract.provider.once(hash, (transaction) => {
        onSuccess(chainId, hash, 'Success!');
        loadingFunc(false);
      });
    } catch (e) {
      console.log({ e });
      loadingFunc(false);
      // TODO: error is too big for toast - do error mapping
      onError ?? toast.error(e.data.message ?? 'Something went wrong.');
    }
  };
};
