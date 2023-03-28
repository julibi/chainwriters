import React, { useCallback } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import Title from '../Title';
import ActionButton from '../ActionButton';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: 2rem;
  width: 100%;
  height: 300px;
  overflow: scroll;
`;

const Text = styled.p`
  display: inline-block;
  margin-block-end: 2rem;
`;

interface ResetProfileModalProps {
  onClose: () => void;
  onReset: () => void;
  pending: boolean;
}

const ResetProfileModal = ({
  onClose,
  onReset,
  pending,
}: ResetProfileModalProps) => {
  const handleClick = useCallback(async () => {
    try {
      onReset();
    } catch (e: unknown) {
      toast.error(
        'Something went wrong while trying to uplod your data to IPFS.'
      );
    }
  }, [onReset]);

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <FlexColumn>
          <Title size="m" margin="0 0 2rem 0">
            Are you sure?
          </Title>
          <Text>All profile configurations will be lost.</Text>
          <ActionButton
            disabled={pending}
            onClick={handleClick}
            loading={pending}
            width="100%"
            text="Reset"
            web3Connectable
          />
        </FlexColumn>
      </ContentWrapper>
    </BaseModal>
  );
};

export default ResetProfileModal;
