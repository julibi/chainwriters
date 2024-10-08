import { useWeb3React } from '@web3-react/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import useBallot from '../hooks/useBallot';
import { useUser } from '../hooks/user/useUser';
import { BASE_BORDER_RADIUS, FONT_SERIF_BOLD, POP } from '../themes';
import { findDuplicates } from '../utils/findDuplicates';
import ActionButton from './ActionButton';
import Countdown from './Countdown';
import ProgressBar from './ProgressBar';
import Title from './Title';

type VotingProps = {
  proposal: string;
  option1: string;
  option2: string;
  option3: string;
  option1Count: number;
  option2Count: number;
  option3Count: number;
  voteEnding: number;
  isVoting: boolean;
  totalCount: number;
  maxNFTCount: number;
  ballotAddress: string;
  projectId: string;
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
type RadioLabelProps = {
  isWinner: boolean;
};
const StyledRadioLabel = styled.label<RadioLabelProps>`
  color: ${({ isWinner }) => (isWinner ? POP : 'inherit')};
`;

const Voting = ({
  proposal,
  option1,
  option2,
  option3,
  option1Count,
  option2Count,
  option3Count,
  voteEnding,
  totalCount,
  isVoting,
  maxNFTCount,
  ballotAddress,
  projectId,
}: VotingProps) => {
  const { account } = useWeb3React();
  const theme = useTheme();
  const { groupedNfts, fetchBalance } = useUser();
  const {
    Ballot,
    vote,
    voteStatus,
    votingsIndex,
    refetchMintCount,
    refetchVotingData,
  } = useBallot(ballotAddress, projectId);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [votableNFTs, setVotableNFTs] = useState<string[] | null>(null);

  const percentageVoted = useMemo(
    () => Math.round((Number(totalCount) / Number(maxNFTCount)) * 100),
    [maxNFTCount, totalCount]
  );
  const userNFTsOfProject = useMemo(
    () =>
      groupedNfts?.find((group) => group[0].projectId === Number(projectId)),
    [groupedNfts, projectId]
  );
  const hasEnded = useMemo(
    () =>
      !isVoting ||
      Number(new Date()) / 1000 > Number(voteEnding) ||
      Number(totalCount) == 1000,
    [totalCount, isVoting, voteEnding]
  );
  const winningCount = useMemo(() => {
    const highestCount = Math.max(
      Number(option1Count),
      Number(option2Count),
      Number(option3Count)
    );
    const isDraw =
      highestCount ==
      findDuplicates([
        Number(option1Count),
        Number(option2Count),
        Number(option3Count),
      ])?.[0];
    return hasEnded && !isDraw && highestCount;
  }, [hasEnded, option1Count, option2Count, option3Count]);
  const isVotingStatus = useMemo(
    () => ['confirming', 'waiting'].includes(voteStatus),
    [voteStatus]
  );

  const hasVoted = useMemo(() => {
    if (userNFTsOfProject?.length) {
      if (!votableNFTs?.length) {
        return true;
      }
    }
    return false;
  }, [userNFTsOfProject, votableNFTs]);

  const onValueChange = useCallback((event) => {
    setSelectedOption(Number(event.target.value));
  }, []);

  const fetchVotableNFTs = useCallback(async () => {
    if (!userNFTsOfProject) return;

    const result = [];
    try {
      for (let i = 0; i < userNFTsOfProject.length; i++) {
        const test = await Ballot.votings(
          votingsIndex,
          userNFTsOfProject[i].tokenId
        );
        if (!test.voted) {
          result.push(userNFTsOfProject[i].tokenId);
        }
      }
      return result;
    } catch (e) {
      return null;
    }
  }, [Ballot, userNFTsOfProject, votingsIndex]);

  const votableNFTsWrapperCall = useCallback(async () => {
    if (!account || !Ballot) return;
    const nfts = await fetchVotableNFTs();
    setVotableNFTs(nfts?.length ? nfts : null);
  }, [account, Ballot, fetchVotableNFTs]);

  const handleVote = useCallback(async () => {
    if (!votableNFTs?.length) {
      return toast.error('No NFTs of this project or already voted.');
    }

    await vote({
      tokenIds: votableNFTs,
      option: selectedOption,
      onSuccess: undefined,
      onError: undefined,
    });
  }, [selectedOption, votableNFTs, vote]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchMintCount();
      refetchVotingData();
      fetchBalance();
      votableNFTsWrapperCall();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [
    fetchBalance,
    refetchMintCount,
    refetchVotingData,
    votableNFTsWrapperCall,
  ]);

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
            <span>{'Time left: '}</span>
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
          <StyledRadioLabel isWinner={winningCount === Number(option1Count)}>
            <input
              disabled={hasEnded || hasVoted}
              type="radio"
              value={0}
              checked={selectedOption === 0}
              onChange={onValueChange}
            />
            {`a) ${option1}`}
            {hasEnded && ` (${option1Count} Votes)`}
          </StyledRadioLabel>
        </RadioInputWrapper>
        <RadioInputWrapper>
          <StyledRadioLabel isWinner={winningCount === Number(option2Count)}>
            <input
              disabled={hasEnded || hasVoted}
              type="radio"
              value={1}
              checked={selectedOption === 1}
              onChange={onValueChange}
            />
            {`b) ${option2}`}
            {hasEnded && ` (${option2Count} Votes)`}
          </StyledRadioLabel>
        </RadioInputWrapper>
        <RadioInputWrapper>
          <StyledRadioLabel isWinner={winningCount === Number(option3Count)}>
            <input
              disabled={hasEnded || hasVoted}
              type="radio"
              value={2}
              checked={selectedOption === 2}
              onChange={onValueChange}
            />
            {`c) ${option3}`}
            {hasEnded && ` (${option3Count} Votes)`}
          </StyledRadioLabel>
        </RadioInputWrapper>
        <VoteButtonWrapper>
          <ActionButton
            onClick={handleVote}
            text={hasVoted ? 'Voted' : 'Vote'}
            disabled={hasEnded || isVotingStatus || hasVoted || !votableNFTs}
            loading={isVotingStatus}
            margin="2rem 0 0 0"
            web3Connectable
          />
        </VoteButtonWrapper>
      </Choices>
    </Root>
  );
};

export default Voting;
