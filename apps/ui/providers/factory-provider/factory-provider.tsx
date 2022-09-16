import { createContext, useCallback, useMemo, useState } from 'react';
import { CreateArgs, FactoryApi, FactoryProviderProps } from './factory-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';
import useMoonpageFactoryContract from '../../hooks/useMoonpageFactoryContract';

const defaultContext: FactoryApi = {
  createProject: async () => undefined,
  createProjectStatus: 'idle',
};

export const FactoryContext = createContext(defaultContext);

export function FactoryProvider({ children }: FactoryProviderProps) {
  const factory = useMoonpageFactoryContract();
  const [createProjectStatus, setCreateProjectStatus] = useState<WriteActionStatus>();
  
  const createProject = useCallback(
    async ({
        title,
        textIpfsHash,
        originalLanguage,
        initialMintPrice,
        firstEditionAmount,
        onSuccess,
        onError
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
            console.log({Tx, transaction});
            const receipt = await Tx.wait();
            console.log({receipt})
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setCreateProjectStatus('success');
            toast.info(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 10000);
        });
      } catch (e) {
        console.log({e})
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
        createProjectStatus
    }),
    [createProject, createProjectStatus]
  );

  return (
    <FactoryContext.Provider value={api}>{children}</FactoryContext.Provider>
  );
};
