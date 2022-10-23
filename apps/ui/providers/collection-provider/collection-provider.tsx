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
import { getGasMargin } from '../../utils/getGasMargin';

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
        const estimatedGas = await collection.estimateGas.startAuctions(
          projectId,
          amountForCreator,
          discountRate
        );
        const gasLimit = getGasMargin(estimatedGas);
        const Tx = await collection.startAuctions(
          projectId,
          amountForCreator,
          discountRate,
          { gasLimit }
        );
        const { hash } = Tx;
        setStartAuctionsStatus('waiting');
        toast.info(<ToastLink message={'Starting Auctions...'} />);
        collection.provider.once(hash, async (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setStartAuctionsStatus('success');
            toast.info(
              <ToastLink
                message={'Success!'}
                linkText="View your NFTs on Opensea"
              />
            );
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
        const estimatedGas = await collection.estimateGas.buy(projectId, {
          value: currentPrice,
        });
        const gasLimit = getGasMargin(estimatedGas);
        const Tx = await collection.buy(projectId, {
          value: currentPrice,
          gasLimit,
        });
        const { hash } = Tx;
        setBuyStatus('waiting');
        toast.info(<ToastLink message={'Minting...'} />);

        collection.provider.once(hash, (transaction) => {
          setBuyStatus('success');
          toast.success(<ToastLink message={'Success!'} />);
          onSuccess?.();
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
        const estimatedGas = await collection.estimateGas.publicMint(
          projectId,
          amount,
          {
            value: price,
          }
        );
        const gasLimit = getGasMargin(estimatedGas);
        const tx = await collection.publicMint(projectId, amount, {
          value: price,
          gasLimit,
        });
        const { hash } = tx;
        toast.info(<ToastLink message={'Minting...'} />);
        collection.provider.once(hash, (transaction) => {
          setMintStatus('success');
          toast.success(
            <ToastLink
              message={'Success!'}
              linkText="View your NFTs on Opensea"
            />
          );
          onSuccess?.();
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
