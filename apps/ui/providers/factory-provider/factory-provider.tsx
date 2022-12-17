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
import { getGasMargin } from '../../utils/getGasMargin';

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
      text,
      textIpfsHash,
      originalLanguage,
      initialMintPrice,
      firstEditionAmount,
      onSuccess,
      onError,
    }: CreateArgs) => {
      try {
        setCreateProjectStatus('confirming');
        // const estimatedGas = await factory.estimateGas.createProject(
        //   title,
        //   textIpfsHash,
        //   originalLanguage,
        //   initialMintPrice,
        //   firstEditionAmount
        // );
        // const gasLimit = getGasMargin(estimatedGas);
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await factory.createProject(
          title,
          textIpfsHash,
          originalLanguage,
          initialMintPrice,
          firstEditionAmount,
          { maxFeePerGas, maxPriorityFeePerGas }
        );
        const { hash } = Tx;
        setCreateProjectStatus('waiting');
        toast.info(<ToastLink message={'Setting up project...'} />);
        factory.provider.once(hash, async (transaction) => {
          const receipt = await Tx.wait();
          const latestProjectId = Number(await factory.projectsIndex()) - 1;
          const CreationEvent = receipt.events?.find(
            (event) => event.event === 'Created'
          );
          // we are fetching a fallback, because configuration fails
          // guessing this is because the CreationEvent does not contain the project Id somehow
          // not sure tho
          const projectId = Number(CreationEvent.args.projectId).toString();
          const project = projectId || latestProjectId?.toString();

          // upload metadata to BE
          try {
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title, mpId: project, text }),
            };
            // fire and forget
            await fetch(
              `${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/projects/${project}`,
              requestOptions
            );
          } catch (e) {
            // do nothing
            console.log({ e });
          }

          // pin metadata with Pinata
          try {
            await pinToPinata(textIpfsHash, project, 'text', title);
          } catch (e) {
            // do nothing
          }
          setCreateProjectStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.(project);
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
