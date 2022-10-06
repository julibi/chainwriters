import useMoonpageCollection from '../../hooks/useMoonpageCollection';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  BuyArgs,
  CollectionApi,
  CollectionProviderProps,
  MintArgs,
  StartAuctionsArgs,
} from './collection-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';
import useAuctionsManager from '../../hooks/useAuctionsManager';

const defaultContext: CollectionApi = {
  startAuctions: async () => undefined,
  startAuctionsStatus: 'idle',
  buy: async () => undefined,
  buyStatus: 'idle',
  mint: async () => undefined,
  mintStatus: 'idle',
};

export const CollectionContext = createContext(defaultContext);

export function CollectionProvider({ children }: CollectionProviderProps) {
  const collection = useMoonpageCollection();
  const auctionsManager = useAuctionsManager();
  const [startAuctionsStatus, setStartAuctionsStatus] =
    useState<WriteActionStatus>();
  const [buyStatus, setBuyStatus] = useState<WriteActionStatus>();
  const [mintStatus, setMintStatus] = useState<WriteActionStatus>();

  const startAuctions = useCallback(
    async ({
      projectId,
      amountForCreator,
      initialMintPrice,
      onSuccess,
      onError,
    }: StartAuctionsArgs) => {
      try {
        setStartAuctionsStatus('confirming');

        const discountRate = Number(initialMintPrice.div(60 * 60 * 24));
        const Tx = await collection.startAuctions(
          projectId,
          amountForCreator,
          discountRate
        );
        const { hash } = Tx;
        setStartAuctionsStatus('waiting');
        toast.info(<ToastLink message={'Starting Auctions...'} />);
        collection.provider.once(hash, async (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setStartAuctionsStatus('success');
            toast.info(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 10000);
        });
      } catch (e) {
        setStartAuctionsStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [collection]
  );

  const buy = useCallback(
    async ({ projectId, initialMintPrice, onSuccess, onError }: BuyArgs) => {
      try {
        setBuyStatus('confirming');
        const currentPrice = await auctionsManager.getPrice(
          projectId,
          initialMintPrice
        );
        const Tx = await collection.buy(projectId, { value: currentPrice });
        const { hash } = Tx;
        setBuyStatus('waiting');
        toast.info(<ToastLink message={'Minting...'} />);

        collection.provider.once(hash, (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setBuyStatus('success');
            toast.success(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 10000);
        });
      } catch (e: unknown) {
        setBuyStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [auctionsManager, collection]
  );

  const mint = useCallback(
    async ({ projectId, amount, price, onSuccess, onError }: MintArgs) => {
      try {
        setMintStatus('confirming');
        const tx = await collection.publicMint(projectId, amount, {
          value: price,
        });
        const { hash } = tx;
        toast.info(<ToastLink message={'Minting...'} />);
        collection.provider.once(hash, (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setMintStatus('success');
            toast.success(<ToastLink message={'Success!'} />);
            onSuccess?.();
          }, 13000);
        });
      } catch (e: unknown) {
        setMintStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [collection]
  );

  const api = useMemo(
    () => ({
      startAuctions,
      startAuctionsStatus,
      buy,
      buyStatus,
      mint,
      mintStatus,
    }),
    [buy, buyStatus, mint, mintStatus, startAuctions, startAuctionsStatus]
  );

  return (
    <CollectionContext.Provider value={api}>
      {children}
    </CollectionContext.Provider>
  );
}
