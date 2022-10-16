import { createContext, useCallback, useMemo, useState } from 'react';
import {
  CreateArgs,
  FactoryApi,
  FactoryProviderProps,
} from './factory-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';
import useMoonpageFactoryContract from '../../hooks/useMoonpageFactoryContract';
import pinToPinata from '../../utils/pinToPinata';

const defaultContext: FactoryApi = {
  createProject: async () => undefined,
  createProjectStatus: 'idle',
};

export const FactoryContext = createContext(defaultContext);

export function FactoryProvider({ children }: FactoryProviderProps) {
  const factory = useMoonpageFactoryContract();
  const [createProjectStatus, setCreateProjectStatus] =
    useState<WriteActionStatus>();

  const createProject = useCallback(
    async ({
      title,
      textIpfsHash,
      originalLanguage,
      initialMintPrice,
      firstEditionAmount,
      onSuccess,
      onError,
    }: CreateArgs) => {
      try {
        setCreateProjectStatus('confirming');
        const Tx = await factory.createProject(
          title,
          textIpfsHash,
          originalLanguage,
          initialMintPrice,
          firstEditionAmount
        );
        const { hash } = Tx;
        setCreateProjectStatus('waiting');
        toast.info(<ToastLink message={'Setting up project...'} />);
        factory.provider.once(hash, async (transaction) => {
          const receipt = await Tx.wait();
          const CreationEvent = receipt.events?.find(
            (event) => event.event === 'Created'
          );
          const projectId = Number(CreationEvent.args.projectId).toString();

          try {
            await pinToPinata(textIpfsHash, projectId, 'text', title);
          } catch (e) {
            // do nothing
          }
          setCreateProjectStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.(projectId);
        });
      } catch (e) {
        console.log({ e });
        setCreateProjectStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [factory]
  );

  const api = useMemo(
    () => ({
      createProject,
      createProjectStatus,
    }),
    [createProject, createProjectStatus]
  );

  return (
    <FactoryContext.Provider value={api}>{children}</FactoryContext.Provider>
  );
}
