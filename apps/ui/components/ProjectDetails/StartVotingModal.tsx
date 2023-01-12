import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import ActionButton from '../ActionButton';
import BaseModal from '../BaseModal';
import Dropdown from '../Dropdown';
import InputField from '../InputField';
import Title from '../Title';

const ContentWrapper = styled.div`
  padding: 2rem;
  width: 100%;
  height: 600px;
  overflow: scroll;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownWrapper = styled.div`
  margin-block-end: 2rem;
`;

type VoteSetting = {
  proposal: string | null;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  endingTime: string | null;
};

const StartVotingModal = ({ onClose }) => {
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

  const endingTimeOptions = ['1 hour', '1 day', '1 week', '1 month']?.map(
    (item) => ({
      id: item,
      value: item,
      onSelect: () => setVoteSetting({ ...voteSetting, endingTime: item }),
    })
  );

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <div>
          <Title size="m" margin="0 0 2rem 0">
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
                setVoteSetting({ ...voteSetting, option2: e.target.value });
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
            disabled={!isFormSubmittable}
            onClick={() => {}}
            loading={false}
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
