import styled from 'styled-components';
import useBallot from '../../hooks/useBallot';
import React from 'react';
import Voting from '../../components/Voting';
import { BASE_BORDER_RADIUS } from '../../themes';
import { useTheme } from '../../hooks/theme/useTheme';
import Title from '../../components/Title';

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

const Votings = ({ ballotAddress, projectId }) => {
  const theme = useTheme();
  const { voteSettings, vote, votings, maxNFTCount } = useBallot(
    ballotAddress,
    projectId
  );

  // TODO: show a ballot creator, if NFTs have been minted and there is no voting running

  return (
    <Root theme={theme}>
      <Title>Voting</Title>
      <VotingsWrapper>
        {votings?.map(
          ({
            id,
            proposal,
            option1,
            option2,
            option3,
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
