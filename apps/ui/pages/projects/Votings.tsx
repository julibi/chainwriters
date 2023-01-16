import styled from 'styled-components';
import useBallot from '../../hooks/useBallot';
import React, { useMemo } from 'react';
import Voting from '../../components/Voting';
import { BASE_BORDER_RADIUS } from '../../themes';
import { useTheme } from '../../hooks/theme/useTheme';
import Title from '../../components/Title';
import VotingsCreator from './VotingsCreator';
import { useWeb3React } from '@web3-react/core';

const Root = styled.div`
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  border-radius: ${BASE_BORDER_RADIUS};
  animation: fadein 2s;
  margin-block-end: 2rem;
  padding: 2rem;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
  const { votings, maxNFTCount } = useBallot(ballotAddress, projectId);
  const isCreator = useMemo(
    () => account?.toLowerCase() === creator?.toLowerCase(),
    [account, creator]
  );

  const sortedVotes = useMemo(
    () => (votings ? [...votings].reverse().slice(0, 2) : null),
    [votings]
  );

  // TODO: show a ballot creator, if NFTs have been minted and there is no voting running
  if (votings?.length == 0 && !isCreator) return null;
  // console.log({ votings });
  return (
    <Root theme={theme}>
      <Title>Voting</Title>
      <VotingsWrapper>
        <VotingsCreator
          ballotAddress={ballotAddress}
          projectId={projectId}
          votings={votings}
          onFinishSettingUpBallot={onFinishSettingUpBallot}
        />
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
                option2Count={option1Count}
                option3Count={option1Count}
                voteStarted={voteStarted}
                voteEnding={voteEnding}
                isVoting={isVoting}
                totalCount={totalCount}
                maxNFTCount={maxNFTCount}
              />
            );
          }
        )}
      </VotingsWrapper>
    </Root>
  );
};

export default Votings;
