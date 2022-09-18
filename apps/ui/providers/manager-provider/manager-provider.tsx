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
        const Tx = await mpManager.configureProjectDetails(
          projectId,
          imgHash,
          animationHash,
          blurbHash,
          genre,
          subtitle
        );
        const { hash } = Tx;
        setConfigureStatus('waiting');
        toast.info(<ToastLink message={'Configuring...'} />);
        mpManager.provider.once(hash, async (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setConfigureStatus('success');
            toast.info(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 10000);
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
        const Tx = await mpManager.addContributors(
          projectId,
          addressesArray,
          sharesArray,
          rolesArray
        );
        const { hash } = Tx;
        setSetContributorsStatus('waiting');
        toast.info(<ToastLink message={'Adding Contributor(s)...'} />);

        mpManager.provider.once(hash, (transaction) => {
          // we need a timeout, because the graph needs some time
          setTimeout(() => {
            setSetContributorsStatus('success');
            toast.success(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 10000);
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
        const Tx = await mpManager.updateTranslationIpfsHash(
          projectId,
          translationIpfsHash
        );
        const { hash } = Tx;
        setUpdateTranslationStatus('waiting');
        toast.info(<ToastLink message={'Setting Translation...'} />);

        mpManager.provider.once(hash, (transaction) => {
          // we need a timeout, because the graph needs some time
          setTimeout(() => {
            setUpdateTranslationStatus('success');
            toast.success(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 10000);
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
        const Tx = await mpManager.enableNextEdition(
          projectId,
          amount,
          formattedPrice
        );
        const { hash } = Tx;
        setEnableNextEditionStatus('waiting');
        toast.info(<ToastLink message={'Unlocking next edition...'} />);
        mpManager.provider.once(hash, (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setEnableNextEditionStatus('success');
            toast.success(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 10000);
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
