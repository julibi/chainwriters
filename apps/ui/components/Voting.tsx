import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import { BASE_BORDER_RADIUS, FONT_SERIF_BOLD, POP } from '../themes';
import ActionButton from './ActionButton';
import ProgressBar from './ProgressBar';
import Title from './Title';

type VotingProps = {
  proposal: string;
  option1: string;
  option2: string;
  option3: string;
  voteStarted: string;
  voteEnding: string;
  isVoting: boolean;
  totalCount: number;
  maxNFTCount: number;
};

const Root = styled.div`
  width: 400px;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: right;
  box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};
  border-radius: ${BASE_BORDER_RADIUS};
  font-family: ${FONT_SERIF_BOLD};

  @media (max-width: 900px) {
    width: 270px;
  }
`;

const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Status = styled.div`
  border-radius: ${BASE_BORDER_RADIUS};
  border: 2px solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  margin: 1rem 0;
  padding: 0.2rem 0.5rem;
  width: fit-content;
`;

const Choice = styled.span`
  margin: 0.5rem 0;
`;

const VoteButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Voting = ({
  proposal,
  option1,
  option2,
  option3,
  voteEnding,
  totalCount,
  isVoting,
  maxNFTCount,
}: VotingProps) => {
  const theme = useTheme();
  const hasEnded = useMemo(
    () =>
      !isVoting ||
      Number(new Date()) / 1000 > Number(voteEnding) ||
      totalCount == 1000,
    [totalCount, isVoting, voteEnding]
  );
  console.log({ isVoting, totalCount, maxNFTCount, hasEnded });
  return (
    <Root theme={theme}>
      <Title color={POP} padding="0" margin="1rem" size="xs">
        {proposal}
      </Title>
      <StatusWrapper>
        <Status theme={theme}>{hasEnded ? 'Ended' : 'Still Running'}</Status>
      </StatusWrapper>
      <ProgressBar completed={34} />
      <Choice>{'a) ' + option1}</Choice>
      <Choice>{'b) ' + option2}</Choice>
      <Choice>{'c) ' + option3}</Choice>
      <VoteButtonWrapper>
        <ActionButton
          onClick={() => {
            console.log('first');
          }}
          text="Vote"
          disabled={hasEnded}
          loading={false}
          margin="2rem 0 0 0"
        />
      </VoteButtonWrapper>
    </Root>
  );
};

export default Voting;
