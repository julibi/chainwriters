import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import useBallot from '../hooks/useBallot';
import {
  BASE_BORDER_RADIUS,
  ElementThemeProps,
  FONT_SERIF_REGULAR,
  POP,
} from '../themes';
import Countdown from './Countdown';
import LinkWrapper from './LinkWrapper';
import ProgressBar from './ProgressBar';
import Title from './Title';

type VotingTeaserBoxProps = {
  ballotAddress: string;
  projectId: string;
  proposal: string;
  title: string;
  totalCount: number;
  voteEnding: number;
};

const Root = styled.div<ElementThemeProps>`
  height: 270px;
  width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};

  :hover {
    cursor: pointer;
  }
`;

const Status = styled.div<ElementThemeProps>`
  border-radius: ${BASE_BORDER_RADIUS};
  border: 2px solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  margin: 1rem 0;
  padding: 0.2rem 0.5rem;
  width: fit-content;
  font-size: 10px;
  font-family: ${FONT_SERIF_REGULAR};
`;

const VotingNumbers = styled.span`
  font-size: 10px;
  margin-block-start: 0.1rem;
  color: ${POP};
  font-family: ${FONT_SERIF_REGULAR};
`;

const VotingTeaserBox = ({
  ballotAddress,
  projectId,
  proposal,
  title,
  totalCount,
  voteEnding,
}: VotingTeaserBoxProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { maxNFTCount } = useBallot(ballotAddress, projectId);
  const percentageVoted = useMemo(
    () => Math.round((Number(totalCount) / Number(maxNFTCount)) * 100),
    [maxNFTCount, totalCount]
  );

  const handleClickVoting = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/projects/${projectId}#votings`);
    },
    [projectId, router]
  );
  return (
    <Root theme={theme} onClick={handleClickVoting}>
      <Title padding="0" size="s" textAlign="left">
        {title}
      </Title>
      <Title color={POP} padding="0" size="xs" textAlign="left">
        {proposal}
      </Title>
      <Status theme={theme}>
        <Countdown end={Number(voteEnding)} />
      </Status>
      <div>
        <ProgressBar completed={percentageVoted} height="18px" />
        <VotingNumbers>{`${Number(totalCount)} / ${Number(
          maxNFTCount
        )} Voted`}</VotingNumbers>
      </div>
    </Root>
  );
};

export default VotingTeaserBox;
