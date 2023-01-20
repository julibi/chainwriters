import { POP } from '../../themes';
import React, { ChangeEvent, useMemo, useState } from 'react';
import styled from 'styled-components';
import ActionButton from '../ActionButton';
import BaseModal from '../BaseModal';
import Dropdown from '../Dropdown';
import InputField from '../InputField';
import Title from '../Title';
import { VOTE_ENDING_TIMES } from '../../constants';

const ContentWrapper = styled.div`
  padding: 2rem;
  width: 450px;
  height: 600px;
  overflow: scroll;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownWrapper = styled.div`
  margin-block-end: 1rem;
`;

const EndingTimeError = styled.span`
  color: ${POP};
  text-align: center;
  margin-block-end: 1rem;
`;

type VoteSetting = {
  proposal: string | null;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  endingTime: string | null;
};

type StartVotingModalProps = {
  onClose: () => void;
  onStartVote: (x: VoteSetting) => void;
  isStartingVote: boolean;
};

const StartVotingModal = ({
  onClose,
  onStartVote,
  isStartingVote,
}: StartVotingModalProps) => {
  const [voteSetting, setVoteSetting] = useState<VoteSetting>({
    proposal: null,
    option1: null,
    option2: null,
    option3: null,
    endingTime: null,
  });

  const isOptionValid = (value: string) => {
    if (!value) return false;
    return value.trim().length > 1;
  };

  const isProposalValid = (value: string) => {
    if (!value) return false;
    return value.trim().length > 20;
  };

  const isFormSubmittable = useMemo(() => {
    // check all values
    if (
      isProposalValid(voteSetting.proposal) &&
      isOptionValid(voteSetting.option1) &&
      isOptionValid(voteSetting.option2) &&
      isOptionValid(voteSetting.option3) &&
      voteSetting.endingTime
    )
      return true;
    return false;
  }, [voteSetting]);

  // when submitting, get the ending time

  const endingTimeOptions = VOTE_ENDING_TIMES.map((item) => ({
    id: item,
    value: item,
    onSelect: () => setVoteSetting({ ...voteSetting, endingTime: item }),
  }));

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <div>
          <Title size="m" textAlign="center" margin="0 0 2rem 0">
            Start a Vote
          </Title>
          <FlexColumn>
            <DropdownWrapper>
              <Dropdown
                options={endingTimeOptions}
                placeholder="Ending Time"
                width="100%"
              />
            </DropdownWrapper>
            <EndingTimeError>
              {!voteSetting?.endingTime ? 'Please set a time' : ''}
            </EndingTimeError>
            <InputField
              error={
                !isProposalValid(voteSetting.proposal) &&
                'Minimum 20 characters.'
              }
              isErrorPossible
              label={'Proposal: '}
              value={voteSetting.proposal}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setVoteSetting({ ...voteSetting, proposal: e.target.value });
              }}
            />
            <InputField
              error={!isOptionValid(voteSetting.option1) && 'Not long enough.'}
              isErrorPossible
              label={'Option 1: '}
              value={voteSetting.option1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setVoteSetting({ ...voteSetting, option1: e.target.value });
              }}
            />
            <InputField
              error={!isOptionValid(voteSetting.option2) && 'Not long enough.'}
              isErrorPossible
              label={'Option 2: '}
              value={voteSetting.option2}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setVoteSetting({ ...voteSetting, option2: e.target.value });
              }}
            />
            <InputField
              error={!isOptionValid(voteSetting.option3) && 'Not long enough.'}
              isErrorPossible
              label={'Option 3: '}
              value={voteSetting.option3}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setVoteSetting({ ...voteSetting, option3: e.target.value });
              }}
            />
          </FlexColumn>
          <ActionButton
            disabled={!isFormSubmittable || isStartingVote}
            onClick={() => onStartVote(voteSetting)}
            loading={isStartingVote}
            width="100%"
            text="Configure"
            web3Connectable
          />
        </div>
      </ContentWrapper>
    </BaseModal>
  );
};

export default StartVotingModal;
