import {
  ContentWrapper,
  CTAWrapper,
  ModalHeader,
  ModalText,
} from '../../pages/projects/[projectId]';
import React, { ChangeEvent, useState } from 'react';
import ActionButton from '../ActionButton';
import BaseModal from '../BaseModal';
import InputField from '../InputField';
import { Project } from '../../providers/projects-provider/projects-provider.types';
import { MAX_MINTABLE_BY_CREATOR } from '../../constants';
import Title from '../Title';

interface StartAuctionsModalProps {
  onClose: () => void;
  onStartAuctions: (authorMintInput: number) => void;
  pending: boolean;
  project: Project;
}

const StartAuctionsModal = ({
  onClose,
  onStartAuctions,
  pending,
  project,
}: StartAuctionsModalProps) => {
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
