import {
  ContentWrapper,
  CTAWrapper,
  ModalText,
} from '../../pages/projects/[projectId]';
import React, { ChangeEvent, useState } from 'react';
import ActionButton from '../ActionButton';
import BaseModal from '../BaseModal';
import InputField from '../InputField';
import { MAX_MINTABLE_BY_CREATOR } from '../../constants';
import Title from '../Title';

interface StartAuctionsModalProps {
  onClose: () => void;
  onStartAuctions: (authorMintInput: number) => void;
  pending: boolean;
}

const StartAuctionsModal = ({
  onClose,
  onStartAuctions,
  pending,
}: StartAuctionsModalProps) => {
  const [authorMintInput, setAuthorMintInput] = useState<number | undefined>(1);

  const isValidInput = (amount: number) =>
    amount >= 1 && amount <= MAX_MINTABLE_BY_CREATOR;

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <Title size="m">Start Genesis Edition Auctions</Title>
        <ModalText>
          {`You as an author can mint an amount (min 1, max 4) of your project's Genesis
        Edition NFTs for yourself. One will always go to the Moonpage Project.`}
        </ModalText>
        <ModalText>
          <Title size="xs" padding="0">{`You: ${authorMintInput ?? ''}`}</Title>
          <br />
          <Title size="xs" padding="0">
            {'Moonpage: 1'}
          </Title>
        </ModalText>
        <CTAWrapper>
          <InputField
            value={authorMintInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (isValidInput(Number(e.target.value))) {
                setAuthorMintInput(Number(e.target.value));
              } else {
                // to enable the user to delete everything
                setAuthorMintInput(undefined);
              }
            }}
            error={!isValidInput(authorMintInput) && 'Incorrect amount.'}
            type="number"
          />
          <ActionButton
            disabled={pending || !isValidInput(authorMintInput)}
            text="MINT"
            loading={pending}
            margin="0"
            onClick={(e) => {
              e.preventDefault();
              onStartAuctions(Number(authorMintInput));
            }}
            web3Connectable
          />
        </CTAWrapper>
      </ContentWrapper>
    </BaseModal>
  );
};

export default StartAuctionsModal;
