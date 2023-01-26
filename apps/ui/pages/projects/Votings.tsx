import styled from 'styled-components';
import useBallot from '../../hooks/useBallot';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Voting from '../../components/Voting';
import { BASE_BORDER_RADIUS } from '../../themes';
import { useTheme } from '../../hooks/theme/useTheme';
import Title from '../../components/Title';
import VotingsCreator from './VotingsCreator';
import { useWeb3React } from '@web3-react/core';
import useContract from '../../hooks/useContract';
import ABI from '../../abis/Ballot.json';

const Root = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  border-radius: ${BASE_BORDER_RADIUS};
`;

const VotingsWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    align-items: center;
    flex-direction: column;
  }
`;

const Votings = ({
  ballotAddress,
  creator,
  projectId,
  onFinishSettingUpBallot,
}) => {
  const { account } = useWeb3React();
  const theme = useTheme();
  const Ballot = useContract({
    address: ballotAddress,
    abi: ABI,
  });
  const { votings, maxNFTCount } = useBallot(ballotAddress, projectId);
  const [firstVote, setFirstVote] = useState(null);
  const isCreator = useMemo(
    () => account?.toLowerCase() === creator?.toLowerCase(),
    [account, creator]
  );

  const refetchData = useCallback(async () => {
    const firstVoteSettings = await Ballot.voteSettings(0);
    if (!firstVoteSettings) return;

    setFirstVote([
      {
        id: 0,
        proposal: firstVoteSettings['proposal'],
        option1: firstVoteSettings['option1Value'],
        option2: firstVoteSettings['option2Value'],
        option3: firstVoteSettings['option3Value'],
        option1Count: firstVoteSettings['option1Votes'],
        option2Count: Number(firstVoteSettings['option2Votes']),
        option3Count: Number(firstVoteSettings['option3Votes']),
        voteStarted: Number(firstVoteSettings['voteStarted']),
        voteEnding: Number(firstVoteSettings['endTime']),
        isVoting: true,
        totalCount: Number(firstVoteSettings['votesCount']),
      },
    ]);
  }, [Ballot]);

  const sortedVotes = useMemo(() => {
    if (votings?.length) {
      return [...votings].reverse().slice(0, 2);
    } else if (firstVote) {
      return firstVote;
    } else {
      return null;
    }
  }, [firstVote, votings]);

  useEffect(() => {
    if (Ballot) {
      refetchData();
    }
  }, [Ballot, refetchData]);

  if (votings?.length == 0 && !isCreator) return null;

  return (
    <Root theme={theme}>
      <Title>Voting</Title>
      <VotingsWrapper>
        {isCreator && (
          <VotingsCreator
            ballotAddress={ballotAddress}
            projectId={projectId}
            votings={votings}
            onFinishSettingUpBallot={onFinishSettingUpBallot}
          />
        )}
        {sortedVotes?.map(
          ({
            id,
            proposal,
            option1,
            option2,
            option3,
            option1Count,
            option2Count,
            option3Count,
            voteStarted,
            voteEnding,
            isVoting,
            totalCount,
          }) => {
            return (
              <Voting
                key={id}
                proposal={proposal}
                option1={option1}
                option2={option2}
                option3={option3}
                option1Count={option1Count}
                option2Count={option2Count}
                option3Count={option3Count}
                voteEnding={voteEnding}
                isVoting={isVoting}
                totalCount={totalCount}
                maxNFTCount={maxNFTCount}
                ballotAddress={ballotAddress}
                projectId={projectId}
              />
            );
          }
        )}
      </VotingsWrapper>
    </Root>
  );
};

export default Votings;
