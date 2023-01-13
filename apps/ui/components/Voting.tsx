import { BigNumber } from '@ethersproject/bignumber';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import { BASE_BORDER_RADIUS, FONT_SERIF_BOLD, POP } from '../themes';
import ActionButton from './ActionButton';
import Checkbox from './Checkbox';
import Countdown from './Countdown';
import ProgressBar from './ProgressBar';
import RadioButton from './RadioButton';
import Title from './Title';

type VotingProps = {
  proposal: string;
  option1: string;
  option2: string;
  option3: string;
  voteStarted: BigNumber;
  voteEnding: BigNumber;
  isVoting: boolean;
  totalCount: BigNumber;
  maxNFTCount: BigNumber;
};

const Root = styled.div`
  width: 400px;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: space-between;
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
  justify-content: flex-start;
`;

const Status = styled.div`
  border-radius: ${BASE_BORDER_RADIUS};
  border: 2px solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  margin: 1rem 0;
  padding: 0.2rem 0.5rem;
  width: fit-content;
  font-size: 10px;
`;

const VotingNumbers = styled.span`
  font-size: 10px;
  margin-block-start: 0.1rem;
  color: ${POP};
`;

const Choices = styled.div`
  margin-block-start: 1rem;
  display: flex;
  flex-direction: column;
`;

const RadioInputWrapper = styled.div`
  margin-block-end: 1rem;
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
      Number(totalCount) == 1000,
    [totalCount, isVoting, voteEnding]
  );
  const percentageVoted = useMemo(
    () => Math.round((Number(totalCount) / Number(maxNFTCount)) * 100),
    [maxNFTCount, totalCount]
  );
  const [selectedOption, setSelectedOption] = useState<null | number>(null);
  const onValueChange = useCallback((event) => {
    setSelectedOption(Number(event.target.value));
  }, []);

  const formSubmit = useCallback(() => {}, []);
  return (
    <Root theme={theme}>
      <Title color={POP} padding="0" margin="0 1rem" size="s">
        {proposal}
      </Title>
      <StatusWrapper>
        {hasEnded ? (
          <Status theme={theme}>{'Ended'}</Status>
        ) : (
          <Status theme={theme}>
            <span>{'Time left:'}</span>
            <Countdown end={Number(voteEnding)} />
          </Status>
        )}
      </StatusWrapper>
      <ProgressBar completed={percentageVoted} height="24px" />
      <VotingNumbers>{`${Number(totalCount)} / ${Number(
        maxNFTCount
      )} Voted`}</VotingNumbers>
      <Choices>
        <RadioInputWrapper>
          <label>
            <input
              type="radio"
              value={0}
              checked={selectedOption === 0}
              onChange={onValueChange}
            />
            {`a) ${option1}`}
          </label>
        </RadioInputWrapper>
        <RadioInputWrapper>
          <label>
            <input
              type="radio"
              value={1}
              checked={selectedOption === 1}
              onChange={onValueChange}
            />
            {`b) ${option2}`}
          </label>
        </RadioInputWrapper>
        <RadioInputWrapper>
          <label>
            <input
              type="radio"
              value={2}
              checked={selectedOption === 2}
              onChange={onValueChange}
            />
            {`3) ${option3}`}
          </label>
        </RadioInputWrapper>
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
      </Choices>
    </Root>
  );
};

export default Voting;
