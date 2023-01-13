import {
  BASE_BORDER_RADIUS,
  FONT_SERIF_BOLD,
  FONT_SERIF_REGULAR,
} from '../../themes';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/theme';
import Title from '../../components/Title';
import ActionButton from '../../components/ActionButton';
import { useBallotsFactory } from '../../hooks/ballotFactory';
import useBallot from '../../hooks/useBallot';
import StartVotingModal from '../../components/ProjectDetails/StartVotingModal';
import { VOTE_ENDING_TIMES } from '../../constants';

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

const StartVoteWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  font-family: ${FONT_SERIF_REGULAR};
  font-size: 14px;
`;

type VotingsCreatorProps = {
  ballotAddress: string;
  projectId: string;
};

const VotingsCreator = ({
  ballotAddress,
  projectId,
  votings,
}: VotingsCreatorProps) => {
  const theme = useTheme();
  const { createBallot, createBallotStatus } = useBallotsFactory();
  const { isBallotExisting, startVote, startVoteStatus } = useBallot(
    ballotAddress,
    projectId
  );
  const [hasCreatedBallot, setHasCreatedBallot] = useState(false);
  const [showStartVotingModal, setShowStartVotingModal] = useState(false);

  const handleCreateBallot = useCallback(
    async () =>
      await createBallot({
        projectId,
        onSuccess: () => {
          setHasCreatedBallot(true);
        },
      }),
    [projectId, createBallot]
  );

  const getTimestampOfVoteEnding = (ending: string) => {
    const now = new Date();
    let endingTime: number;
    if (ending === VOTE_ENDING_TIMES[0]) {
      endingTime = now.setDate(now.getDate() + 1) / 1000;
    } else if (ending === VOTE_ENDING_TIMES[1]) {
      endingTime = now.setDate(now.getDate() + 7) / 1000;
    } else {
      endingTime = now.setDate(now.getDate() + 30) / 1000;
    }
    return endingTime.toString().split('.')[0];
  };

  const handleStartVote = useCallback(
    async (startVoteProps) => {
      await startVote({
        proposal: startVoteProps.proposal,
        optionValues: [
          startVoteProps.option1,
          startVoteProps.option2,
          startVoteProps.option3,
        ],
        end: getTimestampOfVoteEnding(startVoteProps.endingTime),
        onSuccess: () => {
          setShowStartVotingModal(false);
          // refetch the data...
        },
        onError: (e) => {
          console.log({ e });
          console.log('failure');
        },
      });
    },
    [startVote]
  );

  const handleClose = () => {
    setShowStartVotingModal(false);
  };

  const openStartVotingModal = () => {
    setShowStartVotingModal(true);
  };

  const isCreatingBallot = useMemo(
    () => ['confirming', 'waiting'].includes(createBallotStatus),
    [createBallotStatus]
  );

  const isStartingVote = useMemo(
    () => ['confirming', 'waiting'].includes(startVoteStatus),
    [startVoteStatus]
  );

  const isPossibleToStartVote = useMemo(() => {
    if (!votings?.length) return true;
    console.log(votings);
    const { isVoting, voteEnding, totalCount } = votings[votings.length - 1];
    if (
      isVoting ||
      voteEnding > Math.floor(Date.now() / 1000) ||
      totalCount === 1000
    ) {
      return false;
    } else {
      return true;
    }
  }, [votings]);

  if (!isPossibleToStartVote) return null;
  return (
    <Root theme={theme}>
      {isBallotExisting || hasCreatedBallot ? (
        <StartVoteWrapper>
          <div>
            <Title padding="0" margin="1rem" size="s">
              Start a vote for NFT holders.
            </Title>
          </div>
          <div>
            <Text>
              A project can have one voting at a time. Specify topic of the
              vote, options and deadline.
            </Text>
          </div>
          <ButtonWrapper>
            <ActionButton
              onClick={openStartVotingModal}
              text="Start Vote"
              disabled={isStartingVote}
              loading={isStartingVote}
              margin="2rem 0 0 0 "
            />
          </ButtonWrapper>
        </StartVoteWrapper>
      ) : (
        <>
          <Title padding="0" margin="1rem" size="s">
            Let NFT holders of your project vote
          </Title>
          <Text>
            Create a voting station with one click. You only have to do it once,
            because this voting station will be reused. Afterwards, you will be
            able to start a vote right here.
          </Text>
          <ButtonWrapper>
            <ActionButton
              onClick={handleCreateBallot}
              text="Create Voting Station"
              disabled={isCreatingBallot}
              loading={isCreatingBallot}
              margin="2rem 0"
            />
          </ButtonWrapper>
        </>
      )}
      {showStartVotingModal && (
        <StartVotingModal
          onClose={handleClose}
          onStartVote={handleStartVote}
          isStartingVote={isStartingVote}
        />
      )}
    </Root>
  );
};

export default VotingsCreator;
