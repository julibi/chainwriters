import useMoonpageManager from '../../hooks/useMoonpageManager';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  ConfigureProjectArgs,
  ManagerApi,
  ManagerProviderProps,
  SetContributorsArgs,
  WriteActionStatus,
} from './manager-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { Contributor } from '../projects-provider/projects-provider.types';
import { BigNumber } from 'ethers';

const defaultContext: ManagerApi = {
  configureStatus: 'idle',
  configureProject: async () => undefined,
  setContributors: async () => undefined,
  setContributorsStatus: 'idle'
};

export const ManagerContext = createContext(defaultContext);

export function ManagerProvider({ children }: ManagerProviderProps) {
  const mpManager = useMoonpageManager();
  const [configureStatus, setConfigureStatus] = useState<WriteActionStatus>();
  const [setContributorsStatus, setSetContributorsStatus] = useState<WriteActionStatus>();

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

  const setContributors = useCallback(async({
    projectId,
    contributorsList,
    onError,
    onSuccess,
  }: SetContributorsArgs) => {
     const addressesArray = [];
     const sharesArray = [];
     const rolesArray = [];
     console.log({projectId, contributorsList, onError})
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
        toast.info(<ToastLink message={'Adding Contributor(s)...'}/>);
   
        mpManager.provider.once(hash, (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setSetContributorsStatus('success');
            toast.info(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 10000);
        });
      } catch (e) {
        console.log({e})
        setSetContributorsStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
  }, [mpManager]);
  
  const api = useMemo(
    () => ({
      configureProject,
      configureStatus,
      setContributors,
      setContributorsStatus
    }),
    [configureProject, configureStatus, setContributors, setContributorsStatus]
  );

  return (
    <ManagerContext.Provider value={api}>{children}</ManagerContext.Provider>
  );
};
