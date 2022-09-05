import useMoonpageManager from '../../hooks/useMoonpageManager';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  ConfigureProjectArgs,
  ManagerApi,
  ManagerProviderProps,
  WriteActionStatus,
} from './manager-provider.types';

const defaultContext: ManagerApi = {
  allProjects: [],
  areAllProjectsLoading: false,
  allProjectsFetchError: undefined,
  refetchAllProjects: async () => undefined,
  topProjects: [],
  areTopProjectsLoading: false,
  topProjectsFetchError: undefined,
  refetchTopProjects: async () => undefined,
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
      try {
        setConfigureStatus('pending');
        const Tx = await mpManager.configureProjectDetails(
          projectId,
          imgHash,
          animationHash,
          blurbHash,
          genre,
          subtitle
        );
        const { hash } = Tx;

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
