import useMoonpageManager from '../../hooks/useMoonpageManager';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  ConfigureProjectArgs,
  EnableNextEditionArgs,
  ManagerApi,
  ManagerProviderProps,
  SetContributorsArgs,
  UpdateTranslationHashArgs,
  UpdateBlurbHashArgs,
  UpdateTextHashArgs,
  WriteActionStatus,
} from './manager-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { Contributor } from '../projects-provider/projects-provider.types';
import { BigNumber } from 'ethers';
import { DEFAULT_COVER_IMAGE_IPFS_HASH } from '../../constants';
import pinToPinata from '../../utils/pinToPinata';
import { getGasMargin } from '../../utils/getGasMargin';
import unpinFromPinata from '../../utils/unpinFromPinata';

const defaultContext: ManagerApi = {
  configureProject: async () => undefined,
  configureStatus: 'idle',
  setContributors: async () => undefined,
  setContributorsStatus: 'idle',
  enableNextEdition: async () => undefined,
  enableNextEditionStatus: 'idle',
  updateTranslation: async () => undefined,
  updateTranslationStatus: 'idle',
  updateBlurb: async () => undefined,
  updateBlurbStatus: 'idle',
  updateText: async () => undefined,
  updateTextStatus: 'idle',
};

export const ManagerContext = createContext(defaultContext);

export function ManagerProvider({ children }: ManagerProviderProps) {
  const mpManager = useMoonpageManager();
  const [configureStatus, setConfigureStatus] = useState<WriteActionStatus>();
  const [setContributorsStatus, setSetContributorsStatus] =
    useState<WriteActionStatus>();
  const [updateTranslationStatus, setUpdateTranslationStatus] =
    useState<WriteActionStatus>();
  const [updateBlurbStatus, setUpdateBlurbStatus] =
    useState<WriteActionStatus>();
  const [updateTextStatus, setUpdateTextStatus] = useState<WriteActionStatus>();
  const [enableNextEditionStatus, setEnableNextEditionStatus] =
    useState<WriteActionStatus>();

  const configureProject = useCallback(
    async ({
      projectId,
      imgFile,
      imgHash,
      animationHash,
      blurb,
      blurbHash,
      genre,
      subtitle,
      onError,
      onSuccess,
    }: ConfigureProjectArgs) => {
      try {
        setConfigureStatus('confirming');

        imgHash = imgHash.length ? imgHash : DEFAULT_COVER_IMAGE_IPFS_HASH;
        // const estimatedGas =
        //   await mpManager.estimateGas.configureProjectDetails(
        //     projectId,
        //     imgHash,
        //     animationHash,
        //     blurbHash,
        //     genre,
        //     subtitle
        //   );
        // const gasLimit = getGasMargin(estimatedGas);
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await mpManager.configureProjectDetails(
          projectId,
          imgHash,
          animationHash,
          blurbHash,
          genre,
          subtitle,
          { maxFeePerGas, maxPriorityFeePerGas }
        );
        const { hash } = Tx;
        setConfigureStatus('waiting');
        toast.info(<ToastLink message={'Configuring...'} />);
        const handleSuccess = () => {
          setConfigureStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        };
        mpManager.provider.once(hash, async (transaction) => {
          if (blurb) {
            // upload blurb metadata to BE
            try {
              const blurbRequestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blurb }),
              };
              // fire and forget
              await fetch(
                `${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/projects/blurb/${projectId}`,
                blurbRequestOptions
              );
            } catch (e) {
              // do nothing
            }
          }

          if (imgFile) {
            // upload cover image metadata to BE
            try {
              const formData = new FormData();
              formData.append('file', imgFile);
              const imgRequestOptions = {
                method: 'POST',
                body: formData,
              };
              // fire and forget
              await fetch(
                `${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/image-upload/${projectId}`,
                imgRequestOptions
              );
            } catch (e) {
              // do nothing
            }
          }

          // pin metadata to IPFS
          try {
            await pinToPinata(imgHash, projectId, 'image');
            await pinToPinata(blurbHash, projectId, 'blurb');
          } catch (e) {
            // do nothing
          }
          handleSuccess();
        });
      } catch (e) {
        setConfigureStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [mpManager]
  );

  const setContributors = useCallback(
    async ({
      projectId,
      contributorsList,
      onError,
      onSuccess,
    }: SetContributorsArgs) => {
      const addressesArray = [];
      const sharesArray = [];
      const rolesArray = [];

      contributorsList?.forEach((contrib: Contributor) => {
        addressesArray.push(contrib.address);
        sharesArray.push(contrib.share);
        rolesArray.push(contrib.role);
      });
      try {
        setSetContributorsStatus('confirming');
        // const estimatedGas = await mpManager.estimateGas.addContributors(
        //   projectId,
        //   addressesArray,
        //   sharesArray,
        //   rolesArray
        // );
        // const gasLimit = getGasMargin(estimatedGas);
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await mpManager.addContributors(
          projectId,
          addressesArray,
          sharesArray,
          rolesArray,
          { maxFeePerGas, maxPriorityFeePerGas }
        );
        const { hash } = Tx;
        setSetContributorsStatus('waiting');
        toast.info(<ToastLink message={'Adding Contributor(s)...'} />);
        const handleSuccess = () => {
          setSetContributorsStatus('success');
          toast.success(<ToastLink message={'Success!'} />);
          onSuccess?.();
        };
        mpManager.provider.once(hash, (transaction) => {
          handleSuccess();
        });
      } catch (e) {
        setSetContributorsStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [mpManager]
  );

  const updateTranslation = useCallback(
    async ({
      projectId,
      translation,
      translationIpfsHash,
      onError,
      onSuccess,
    }: UpdateTranslationHashArgs) => {
      try {
        setUpdateTranslationStatus('confirming');
        // const estimatedGas =
        //   await mpManager.estimateGas.updateTranslationIpfsHash(
        //     projectId,
        //     translationIpfsHash
        //   );
        // const gasLimit = getGasMargin(estimatedGas);
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await mpManager.updateTranslationIpfsHash(
          projectId,
          translationIpfsHash,
          { maxFeePerGas, maxPriorityFeePerGas }
        );
        const { hash } = Tx;
        setUpdateTranslationStatus('waiting');
        toast.info(<ToastLink message={'Setting Translation...'} />);
        const handleSuccess = () => {
          setUpdateTranslationStatus('success');
          toast.success(<ToastLink message={'Success!'} />);
          onSuccess?.();
        };
        mpManager.provider.once(hash, async (transaction) => {
          // save update in BE
          try {
            const translationUpdateOptions = {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ translation }),
            };
            const metadataUrl = `${process.env.NX_PUBLIC_MOONPAGE_METADATA_API}/projects/translation/${projectId}`;
            await fetch(metadataUrl, translationUpdateOptions);
          } catch (e) {
            // do nothing
          }

          // then pin it with Pinata
          try {
            await pinToPinata(translationIpfsHash, projectId, 'translation');
          } catch (e) {
            // do nothing
          }
          handleSuccess();
        });
      } catch (e) {
        setUpdateTranslationStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [mpManager]
  );

  const updateBlurb = useCallback(
    async ({
      projectId,
      blurb,
      blurbIpfsHash,
      oldBlurbIpfsHash,
      onError,
      onSuccess,
    }: UpdateBlurbHashArgs) => {
      try {
        setUpdateBlurbStatus('confirming');
        // const estimatedGas = await mpManager.estimateGas.updateBlurbIpfsHash(
        //   projectId,
        //   blurbIpfsHash
        // );
        // const gasLimit = getGasMargin(estimatedGas);
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await mpManager.updateBlurbIpfsHash(
          projectId,
          blurbIpfsHash,
          { maxFeePerGas, maxPriorityFeePerGas }
        );
        const { hash } = Tx;
        setUpdateBlurbStatus('waiting');
        toast.info(<ToastLink message={'Updating Blurb...'} />);
        const handleSuccess = () => {
          setUpdateBlurbStatus('success');
          toast.success(<ToastLink message={'Success!'} />);
          onSuccess?.();
        };
        mpManager.provider.once(hash, async (transaction) => {
          // save update in BE
          try {
            const blurbUpdateOptions = {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ blurb }),
            };
            const metadataUrl = `${process.env.NX_PUBLIC_MOONPAGE_METADATA_API}/projects/blurb/${projectId}`;
            await fetch(metadataUrl, blurbUpdateOptions);
          } catch (e) {
            // do nothing
          }

          // then pin it with Pinata
          try {
            // TODO: find a way to only unpin the first all other than the last one.
            // Because we want to show the user the latest change made.
            // await unpinFromPinata(oldBlurbIpfsHash);
            await pinToPinata(blurbIpfsHash, projectId, 'blurb');
          } catch (e) {
            // do nothing
          }
          handleSuccess();
        });
      } catch (e) {
        setUpdateBlurbStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [mpManager]
  );

  const updateText = useCallback(
    async ({
      projectId,
      text,
      textIpfsHash,
      oldTextIpfsHash,
      onError,
      onSuccess,
    }: UpdateTextHashArgs) => {
      try {
        setUpdateTextStatus('confirming');
        // const estimatedGas = await mpManager.estimateGas.updateTextIpfsHash(
        //   projectId,
        //   textIpfsHash
        // );
        // const gasLimit = getGasMargin(estimatedGas);
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await mpManager.updateTextIpfsHash(projectId, textIpfsHash, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setUpdateTextStatus('waiting');
        toast.info(<ToastLink message={'Updating Text...'} />);
        const handleSuccess = () => {
          setUpdateTextStatus('success');
          toast.success(<ToastLink message={'Success!'} />);
          onSuccess?.();
        };
        mpManager.provider.once(hash, async (transaction) => {
          // save update in BE
          try {
            const textUpdateOptions = {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text }),
            };
            const metadataUrl = `${process.env.NX_PUBLIC_MOONPAGE_METADATA_API}/projects/text/${projectId}`;
            await fetch(metadataUrl, textUpdateOptions);
          } catch (e) {
            // do nothing
          }

          // then pin it with Pinata
          try {
            // TODO: find a way to only unpin the first all other than the last one.
            // Because we want to show the user the latest change made.
            // await unpinFromPinata(oldTextIpfsHash);
            await pinToPinata(textIpfsHash, projectId, 'text');
          } catch (e) {
            // do nothing
          }
          handleSuccess();
        });
      } catch (e) {
        setUpdateTextStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [mpManager]
  );

  const enableNextEdition = useCallback(
    async ({
      projectId,
      price,
      amount,
      onError,
      onSuccess,
    }: EnableNextEditionArgs) => {
      try {
        setEnableNextEditionStatus('confirming');
        const formattedPrice = BigNumber.from(
          (Number(price) * 1e18).toString()
        );
        // const estimatedGas = await mpManager.estimateGas.enableNextEdition(
        //   projectId,
        //   amount,
        //   formattedPrice
        // );
        // const gasLimit = getGasMargin(estimatedGas);
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await mpManager.enableNextEdition(
          projectId,
          amount,
          formattedPrice,
          { maxFeePerGas, maxPriorityFeePerGas }
        );
        const { hash } = Tx;
        setEnableNextEditionStatus('waiting');
        toast.info(<ToastLink message={'Unlocking next edition...'} />);
        mpManager.provider.once(hash, (transaction) => {
          setEnableNextEditionStatus('success');
          toast.success(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e: unknown) {
        setEnableNextEditionStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [mpManager]
  );

  const api = useMemo(
    () => ({
      configureProject,
      configureStatus,
      setContributors,
      setContributorsStatus,
      enableNextEdition,
      enableNextEditionStatus,
      updateTranslation,
      updateTranslationStatus,
      updateBlurb,
      updateBlurbStatus,
      updateText,
      updateTextStatus,
    }),
    [
      configureProject,
      configureStatus,
      enableNextEdition,
      enableNextEditionStatus,
      setContributors,
      setContributorsStatus,
      updateTranslation,
      updateTranslationStatus,
      updateBlurb,
      updateBlurbStatus,
      updateText,
      updateTextStatus,
    ]
  );

  return (
    <ManagerContext.Provider value={api}>{children}</ManagerContext.Provider>
  );
}
