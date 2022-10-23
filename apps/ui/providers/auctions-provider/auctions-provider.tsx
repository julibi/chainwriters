import { createContext, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';
import useAuctionsManager from '../../hooks/useAuctionsManager';
import {
  AuctionsApi,
  AuctionsProviderProps,
  RetriggerAuctionArgs,
} from './auctions-provider.types';
import { BigNumber } from 'ethers';
import { getGasMargin } from '../../utils/getGasMargin';

const defaultContext: AuctionsApi = {
  retriggerAuction: async () => undefined,
  retriggerAuctionStatus: 'idle',
};

export const AuctionsContext = createContext(defaultContext);

export function AuctionsProvider({ children }: AuctionsProviderProps) {
  const auctionsManager = useAuctionsManager();
  const [retriggerAuctionStatus, setRetriggerAuctionStatus] =
    useState<WriteActionStatus>();

  const retriggerAuction = useCallback(
    async ({ projectId, onSuccess, onError }: RetriggerAuctionArgs) => {
      try {
        setRetriggerAuctionStatus('confirming');
        const estimatedGas = await auctionsManager.estimateGas.retriggerAuction(
          BigNumber.from(projectId)
        );
        const gasLimit = getGasMargin(estimatedGas);
        const Tx = await auctionsManager.retriggerAuction(
          BigNumber.from(projectId),
          { gasLimit }
        );
        const { hash } = Tx;
        setRetriggerAuctionStatus('waiting');
        toast.info(<ToastLink message={'Retriggering...'} />);
        auctionsManager.provider.once(hash, (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setRetriggerAuctionStatus('success');
            toast.info(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 10000);
        });
      } catch (e: unknown) {
        setRetriggerAuctionStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [auctionsManager]
  );

  const api = useMemo(
    () => ({
      retriggerAuction,
      retriggerAuctionStatus,
    }),
    [retriggerAuction, retriggerAuctionStatus]
  );

  return (
    <AuctionsContext.Provider value={api}>{children}</AuctionsContext.Provider>
  );
}
