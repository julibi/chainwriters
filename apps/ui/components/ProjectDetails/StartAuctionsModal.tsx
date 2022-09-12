import { ContentWrapper, CTAWrapper, ModalHeader, ModalText } from '../../pages/projects/[projectId]';
import React, { ChangeEvent, useState } from 'react'
import ActionButton from '../ActionButton';
import BaseModal from '../BaseModal';
import InputField from '../InputField';
import { Project } from '../../providers/projects-provider/projects-provider.types';
import { MAX_MINTABLE_BY_CREATOR } from '../../constants';

interface StartAuctionsModalProps {
    onClose: () => void;
    onStartAuctions: (authorMintInput:number) => void;
    pending: boolean;
    project: Project
} 

const StartAuctionsModal = ({ onClose, onStartAuctions, pending, project }: StartAuctionsModalProps) => {
const [authorMintInput, setAuthorMintInput] = useState<string>('');

// const max = useMemo(() => {
//   if (!project) return 0;
//   const firstEd = project.editions.find(edition => Number(edition.edition) === 1);
//   const amount = Number(firstEd.endId.sub(firstEd.startId));
//   return amount;

// }, [project]);

  return (
    <BaseModal onClose={onClose}>
    <ContentWrapper>
      <ModalHeader>Start Genesis Edition Auctions</ModalHeader>
      <ModalText>
        {`You as an author can mint an amount of your project's Genesis
        Edition NFTs for yourself. MAX: 4`}
      </ModalText>
      <CTAWrapper>
        <InputField
          value={authorMintInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const onlyNumbers = /^[0-9\b]+$/;
            if (
              e.target.value === '' ||
              onlyNumbers.test(e.target.value)
            ) {
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
          text='MINT'
          loading={false}
          margin='0'
          onClick={(e) => {
            e.preventDefault();
            onStartAuctions(Number(authorMintInput));
          }}
        />
      </CTAWrapper>
    </ContentWrapper>
  </BaseModal>
  )
}

export default StartAuctionsModal