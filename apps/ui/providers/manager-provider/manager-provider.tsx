import useMoonpageManager from '../../hooks/useMoonpageManager';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  ConfigureProjectArgs,
  ManagerApi,
  ManagerProviderProps,
  WriteActionStatus,
} from './manager-provider.types';

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
        console.log({ Tx });
        const { hash } = Tx;
        setConfigureStatus('waiting');
        mpManager.provider.once(hash, async (transaction) => {
          setConfigureStatus('success');
          onSuccess(genre, subtitle, imgHash, blurbHash, animationHash);
        });
      } catch (e) {
        setConfigureStatus('success');
        onError(e);
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
