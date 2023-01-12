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

const Root = styled.div`
  width: 500px;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  font-family: ${FONT_SERIF_REGULAR};
  font-size: 14px;
`;

const VotingsCreator = ({ ballotAddress, projectId }) => {
  const theme = useTheme();
  const { createBallot, createBallotStatus } = useBallotsFactory();
  const { isBallotExisting } = useBallot(ballotAddress, projectId);
  const [hasCreatedBallot, setHasCreatedBallot] = useState(false);
  const [showStartVotingModal, setShowStartVotingModal] = useState(false);
  const handleCreateBallot = useCallback(
    async () =>
      await createBallot({
        projectId,
        onError: () => {},
        onSuccess: () => {
          setHasCreatedBallot(true);
        },
      }),
    [projectId, createBallot]
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

  return (
    <Root theme={theme}>
      {isBallotExisting || hasCreatedBallot ? (
        <>
          <Title padding="0" margin="1rem" size="s">
            Start a vote for NFT holders.
          </Title>
          <Text>
            A project can have one voting at a time. Specify topic of the vote,
            options and deadline.
          </Text>
          <ButtonWrapper>
            <ActionButton
              onClick={openStartVotingModal}
              text="Start Vote"
              disabled={false}
              loading={false}
              margin="2rem 0"
            />
          </ButtonWrapper>
        </>
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

      {showStartVotingModal && <StartVotingModal onClose={handleClose} />}
    </Root>
  );
};

export default VotingsCreator;
