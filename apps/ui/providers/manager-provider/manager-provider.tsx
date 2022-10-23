import useMoonpageManager from '../../hooks/useMoonpageManager';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  ConfigureProjectArgs,
  EnableNextEditionArgs,
  ManagerApi,
  ManagerProviderProps,
  SetContributorsArgs,
  UpdateTranslationHashArgs,
  WriteActionStatus,
} from './manager-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { Contributor } from '../projects-provider/projects-provider.types';
import { BigNumber } from 'ethers';
import { DEFAULT_COVER_IMAGE_IPFS_HASH } from '../../constants';
import pinToPinata from '../../utils/pinToPinata';
import { getGasMargin } from '../../utils/getGasMargin';

const defaultContext: ManagerApi = {
  configureProject: async () => undefined,
  configureStatus: 'idle',
  setContributors: async () => undefined,
  setContributorsStatus: 'idle',
  enableNextEdition: async () => undefined,
  enableNextEditionStatus: 'idle',
  updateTranslation: async () => undefined,
  updateTranslationStatus: 'idle',
};

export const ManagerContext = createContext(defaultContext);

export function ManagerProvider({ children }: ManagerProviderProps) {
  const mpManager = useMoonpageManager();
  const [configureStatus, setConfigureStatus] = useState<WriteActionStatus>();
  const [setContributorsStatus, setSetContributorsStatus] =
    useState<WriteActionStatus>();
  const [updateTranslationStatus, setUpdateTranslationStatus] =
    useState<WriteActionStatus>();
  const [enableNextEditionStatus, setEnableNextEditionStatus] =
    useState<WriteActionStatus>();

  const configureProject = useCallback(
    async ({
      projectId,
      imgHash,
      animationHash,
      blurbHash,
      genre,
      subtitle,
      onError,
      onSuccess,
    }: ConfigureProjectArgs) => {
      try {
        setConfigureStatus('confirming');

        imgHash = imgHash.length ? imgHash : DEFAULT_COVER_IMAGE_IPFS_HASH;
        const estimatedGas =
          await mpManager.estimateGas.configureProjectDetails(
            projectId,
            imgHash,
            animationHash,
            blurbHash,
            genre,
            subtitle
          );
        const gasLimit = getGasMargin(estimatedGas);
        const Tx = await mpManager.configureProjectDetails(
          projectId,
          imgHash,
          animationHash,
          blurbHash,
          genre,
          subtitle,
          { gasLimit }
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
        const estimatedGas = await mpManager.estimateGas.addContributors(
          projectId,
          addressesArray,
          sharesArray,
          rolesArray
        );
        const gasLimit = getGasMargin(estimatedGas);
        const Tx = await mpManager.addContributors(
          projectId,
          addressesArray,
          sharesArray,
          rolesArray,
          { gasLimit }
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
      translationIpfsHash,
      onError,
      onSuccess,
    }: UpdateTranslationHashArgs) => {
      try {
        setUpdateTranslationStatus('confirming');
        const estimatedGas =
          await mpManager.estimateGas.updateTranslationIpfsHash(
            projectId,
            translationIpfsHash
          );
        const gasLimit = getGasMargin(estimatedGas);
        const Tx = await mpManager.updateTranslationIpfsHash(
          projectId,
          translationIpfsHash,
          { gasLimit }
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
        const estimatedGas = await mpManager.estimateGas.enableNextEdition(
          projectId,
          amount,
          formattedPrice
        );
        const gasLimit = getGasMargin(estimatedGas);
        const Tx = await mpManager.enableNextEdition(
          projectId,
          amount,
          formattedPrice,
          { gasLimit }
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
    ]
  );

  return (
    <ManagerContext.Provider value={api}>{children}</ManagerContext.Provider>
  );
}
