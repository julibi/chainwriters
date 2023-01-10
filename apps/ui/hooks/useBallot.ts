import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { gql, useQuery } from '@apollo/client';
import useContract from './useContract';
import ABI from '../abis/Ballot.json';
import { WriteActionStatus } from '../providers/manager-provider/manager-provider.types';
import { getGasMargin } from '../utils/getGasMargin';

export const GET_ALL_BALLOTS_OF_PROJECT = gql`
  query allBallotsOfProjectQuery($id: String!) {
    project(id: $id) {
      id
      votings {
        id
        proposal
        option1
        option2
        option3
        option1Count
        option2Count
        option3Count
        voteStarted
        voteEnding
        isVoting
        totalCount
      }
    }
  }
`;

export const GET_MINTCOUNT_OF_PROJECT = gql`
  query mintcountOfProjectQuery($id: String!) {
    project(id: $id) {
      id
      mintCount
    }
  }
`;

type StartVoteTypes = {
  proposal: string;
  optionValues: [string, string, string];
  end: string;
  onSuccess: () => void;
  onError: (x: any) => void;
};

type VoteTypes = {
  tokenIds: string[];
  option: number;
  onSuccess: () => void;
  onError: (x: any) => void;
};

type EndVoteTypes = {
  onSuccess: () => void;
  onError: (x: any) => void;
};

const useBallot = (ballotAddress: string, projectId: string) => {
  const Ballot = useContract({
    address: ballotAddress,
    abi: ABI,
  });
  const {
    loading: votingDataLoading,
    error: votingDataError,
    data: votingData,
    refetch: refetchData,
  } = useQuery(GET_ALL_BALLOTS_OF_PROJECT, {
    variables: { id: projectId },
  });
  const {
    loading: mintCountDataLoading,
    error: mintCountDataError,
    data: mintCountData,
    refetch: refetchMintCount,
  } = useQuery(GET_MINTCOUNT_OF_PROJECT, {
    variables: { id: projectId },
  });

  const [votingsIndex, setVotingsIndex] = useState<number>(0);
  const [startVoteStatus, setStartVoteStatus] = useState<WriteActionStatus>();
  const [voteStatus, setVoteStatus] = useState<WriteActionStatus>();
  const [endVoteStatus, setEndVoteStatus] = useState<WriteActionStatus>();
  const [voteSettings, setVoteSettings] = useState();

  const startVote = useCallback(
    async ({
      proposal,
      optionValues,
      end,
      onSuccess,
      onError,
    }: StartVoteTypes) => {
      try {
        setStartVoteStatus('confirming');

        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Ballot.createVote(proposal, optionValues, end, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setStartVoteStatus('waiting');
        toast.info('Starting Voting...');
        Ballot.provider.once(hash, async (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setStartVoteStatus('success');
            toast.info('Success! Voting is open.');
            onSuccess?.();
            refetchData();
          }, 10000);
        });
      } catch (e) {
        console.log({ e });
        setStartVoteStatus('error');
        toast.error('Something went wrong!');
        onError?.(e);
      }
    },
    [Ballot, refetchData]
  );

  const vote = useCallback(
    async ({ tokenIds, option, onSuccess, onError }: VoteTypes) => {
      try {
        setVoteStatus('confirming');

        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Ballot.vote(tokenIds, option, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setVoteStatus('waiting');
        toast.info('Casting vote...');
        Ballot.provider.once(hash, async (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setVoteStatus('success');
            toast.info('Vote was cast successfully.');
            onSuccess?.();
            refetchData();
          }, 10000);
        });
      } catch (e) {
        console.log({ e });
        setVoteStatus('error');
        toast.error('Something went wrong!');
        onError?.(e);
      }
    },
    [Ballot, refetchData]
  );

  const endVote = useCallback(
    async ({ onSuccess, onError }: EndVoteTypes) => {
      try {
        setEndVoteStatus('confirming');

        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Ballot.endVote({
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setEndVoteStatus('waiting');
        toast.info('Ending vote...');
        Ballot.provider.once(hash, async (transaction) => {
          // we need a time, because the graph needs some time
          setTimeout(() => {
            setEndVoteStatus('success');
            toast.info('Vote was successfully closed.');
            onSuccess?.();
            refetchData();
          }, 10000);
        });
      } catch (e) {
        console.log({ e });
        setEndVoteStatus('error');
        toast.error('Something went wrong!');
        onError?.(e);
      }
    },
    [Ballot, refetchData]
  );

  // fetch the current voting index from contract
  const fetchVotingsIndex = useCallback(async () => {
    const index = await Ballot.votingsIndex();
    setVotingsIndex(Number(index));
  }, [Ballot]);

  // fetch the current vote settings from contract
  const fetchCurrentVoteSettings = useCallback(async () => {
    const settings = await Ballot.voteSettings(votingsIndex);
    setVoteSettings(settings);
  }, [Ballot, votingsIndex]);

  const votings = useMemo(() => votingData?.project?.votings, [votingData]);
  const maxNFTCount = useMemo(
    () => mintCountData?.project?.mintCount,
    [mintCountData]
  );

  useEffect(() => {
    if (Ballot) {
      fetchVotingsIndex();
      fetchCurrentVoteSettings();
    }
  }, [Ballot, fetchVotingsIndex, fetchCurrentVoteSettings]);

  return useMemo(
    () => ({
      Ballot,
      startVote,
      endVote,
      vote,
      maxNFTCount,
      votings,
      startVoteStatus,
      voteStatus,
      endVoteStatus,
      votingsIndex,
      voteSettings,
    }),
    [
      Ballot,
      startVote,
      endVote,
      vote,
      maxNFTCount,
      votings,
      votingsIndex,
      startVoteStatus,
      voteStatus,
      endVoteStatus,
      voteSettings,
    ]
  );
};

export default useBallot;
