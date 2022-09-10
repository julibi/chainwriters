import useMoonpageManager from '../../hooks/useMoonpageManager';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  ConfigureProjectArgs,
  ManagerApi,
  ManagerProviderProps,
  WriteActionStatus,
} from './manager-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';

const defaultContext: ManagerApi = {
  configureStatus: 'idle',
  configureProject: async () => undefined,
};

export const ManagerContext = createContext(defaultContext);

export function ManagerProvider({ children }: ManagerProviderProps) {
  const mpManager = useMoonpageManager();
  const [configureStatus, setConfigureStatus] = useState<WriteActionStatus>();

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
      console.log({ projectId,
        imgHash,
        animationHash,
        blurbHash,
        genre,
        subtitle,
        onError,
        onSuccess });
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

  const api = useMemo(
    () => ({
      configureProject,
      configureStatus,
    }),
    [configureProject, configureStatus]
  );
  return (
    <ManagerContext.Provider value={api}>{children}</ManagerContext.Provider>
  );
}
