import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useContract from './useContract';
import ABI from '../abis/Ballot.json';
import { WriteActionStatus } from '../providers/manager-provider/manager-provider.types';
import { getGasMargin } from '../utils/getGasMargin';

// export const GET_PROJECT = gql`
//   query oneProjectQuery($id: String!) {
//     project(id: $id) {
//       contributors {
//         address
//       }
//       createdAt
//       creator
//       genre
//       id
//       isDeleted
//       originalLanguage
//       subtitle
//       textIpfsHash
//       translationIpfsHash
//       title
//     }
//   }
// `;

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

const useBallot = (ballotAddress: string) => {
  const Ballot = useContract({
    address: ballotAddress,
    abi: ABI,
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
          }, 10000);
        });
      } catch (e) {
        console.log({ e });
        setStartVoteStatus('error');
        toast.error('Something went wrong!');
        onError?.(e);
      }
    },
    [Ballot]
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
          }, 10000);
        });
      } catch (e) {
        console.log({ e });
        setVoteStatus('error');
        toast.error('Something went wrong!');
        onError?.(e);
      }
    },
    [Ballot]
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
          }, 10000);
        });
      } catch (e) {
        console.log({ e });
        setEndVoteStatus('error');
        toast.error('Something went wrong!');
        onError?.(e);
      }
    },
    [Ballot]
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
      votingsIndex,
      startVoteStatus,
      voteStatus,
      endVoteStatus,
      voteSettings,
    ]
  );
};

export default useBallot;
