import useBallotsFactoryContract from '../../hooks/useBallotsFactoryContract';
import { createContext, useCallback, useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  BallotsFactoryApi,
  CreateBallotArgs,
  BallotsFactoryProviderProps,
} from './ballots-factory-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { getGasMargin } from '../../utils/getGasMargin';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';
import { VotingsResult } from '../../providers/projects-provider/projects-provider.types';

export const GET_RECENT_VOTINGS = gql`
  query recentVotes {
    votings(orderBy: voteStarted, orderDirection: desc, first: 3) {
      id
      proposal
      option1
      option2
      option3
      option1Count
      option2Count
      option3Count
      isVoting
      totalCount
      voteStarted
      voteEnding
      project {
        ballotAddress
        id
        title
      }
    }
  }
`;

const defaultContext: BallotsFactoryApi = {
  createBallot: async () => undefined,
  createBallotStatus: 'idle',
  fetchBallotAddress: async () => null,
  votingsData: null,
  votingsLoading: false,
  refetchVotingsData: async () => null,
};

export const BallotsFactoryContext = createContext(defaultContext);

export function BallotsFactoryProvider({
  children,
}: BallotsFactoryProviderProps) {
  const ballotsFactory = useBallotsFactoryContract();
  const [createBallotStatus, setCreateBallotStatus] =
    useState<WriteActionStatus>();
  const {
    loading: votingsLoading,
    data: votingsData,
    refetch: refetchVotingsData,
  } = useQuery<VotingsResult>(GET_RECENT_VOTINGS);

  const createBallot = useCallback(
    async ({
      projectId,
      proposal,
      options,
      endTime,
      onSuccess,
      onError,
    }: CreateBallotArgs) => {
      try {
        setCreateBallotStatus('confirming');

        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await ballotsFactory.createBallot(
          projectId,
          [proposal, ...options],
          endTime,
          {
            maxFeePerGas,
            maxPriorityFeePerGas,
          }
        );
        const { hash } = Tx;
        setCreateBallotStatus('waiting');
        toast.info(<ToastLink message={'Create Voting Station...'} />);
        ballotsFactory.provider.once(hash, async (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setCreateBallotStatus('success');
            toast.info(
              <ToastLink
                message={'Success!'}
                linkText="Voting Station was created!"
              />
            );
            onSuccess?.();
          }, 10000);
        });
      } catch (e) {
        setCreateBallotStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [ballotsFactory]
  );

  const fetchBallotAddress = useCallback(
    async (projectId: string) => {
      try {
        const address = await ballotsFactory.ballots(projectId);
        return address;
      } catch (e) {
        return null;
      }
    },
    [ballotsFactory]
  );

  const api = useMemo(
    () => ({
      createBallot,
      createBallotStatus,
      fetchBallotAddress,
      votingsLoading,
      votingsData: votingsData?.votings,
      refetchVotingsData,
    }),
    [
      createBallot,
      createBallotStatus,
      fetchBallotAddress,
      refetchVotingsData,
      votingsData,
      votingsLoading,
    ]
  );

  return (
    // @ts-ignore
    <BallotsFactoryContext.Provider value={api}>
      {children}
    </BallotsFactoryContext.Provider>
  );
}
