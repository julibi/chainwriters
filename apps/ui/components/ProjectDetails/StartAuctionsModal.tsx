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
  const [authorMintInput, setAuthorMintInput] = useState<string>('');

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <Title size="m">Start Genesis Edition Auctions</Title>
        <ModalText>
          {`You as an author can mint an amount (min 1, max 4) of your project's Genesis
        Edition NFTs for yourself. One will always go to the Moonpage Project.`}
        </ModalText>
        <CTAWrapper>
          <InputField
            value={authorMintInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const onlyNumbers = /^[0-9\b]+$/;
              if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
                setAuthorMintInput(e.target.value);
              }
            }}
            error={
              (Number(authorMintInput) < 1 ||
                Number(authorMintInput) > MAX_MINTABLE_BY_CREATOR) &&
              'Incorrect amount.'
            }
          />
          <ActionButton
            disabled={
              pending ||
              Number(authorMintInput) < 1 ||
              Number(authorMintInput) > MAX_MINTABLE_BY_CREATOR
            }
            text="MINT"
            loading={pending}
            margin="0"
            onClick={(e) => {
              e.preventDefault();
              onStartAuctions(Number(authorMintInput));
            }}
          />
        </CTAWrapper>
      </ContentWrapper>
    </BaseModal>
  );
};

export default StartAuctionsModal;
