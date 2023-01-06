import useBallotsFactory from '../../hooks/useBallotsFactory';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  BallotsFactoryApi,
  CreateBallotArgs,
  BallotsFactoryProviderProps,
} from './ballots-factory-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { getGasMargin } from '../../utils/getGasMargin';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';

const defaultContext: BallotsFactoryApi = {
  createBallot: async () => undefined,
  createBallotStatus: 'idle',
};

export const BallotsFactoryContext = createContext(defaultContext);

export function BallotsFactoryProvider({
  children,
}: BallotsFactoryProviderProps) {
  const ballotsFactory = useBallotsFactory();
  const [createBallotStatus, setCreateBallotStatus] =
    useState<WriteActionStatus>();

  const createBallot = useCallback(
    async ({
      projectId,

      onSuccess,
      onError,
    }: CreateBallotArgs) => {
      try {
        setCreateBallotStatus('confirming');

        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await ballotsFactory.createBallot(projectId, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setCreateBallotStatus('waiting');
        toast.info(<ToastLink message={'Starting Auctions...'} />);
        ballotsFactory.provider.once(hash, async (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setCreateBallotStatus('success');
            toast.info(
              <ToastLink
                message={'Success!'}
                linkText="Ballot for Votings was created!"
              />
            );
            onSuccess?.();
          }, 10000);
        });
      } catch (e) {
        console.log({ e });
        setCreateBallotStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [ballotsFactory]
  );

  const api = useMemo(
    () => ({
      createBallot,
      createBallotStatus,
    }),
    [createBallot, createBallotStatus]
  );

  return (
    <BallotsFactoryContext.Provider value={api}>
      {children}
    </BallotsFactoryContext.Provider>
  );
}
