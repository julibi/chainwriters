import {
  ContentWrapper,
  CTAWrapper,
  ModalText,
} from '../../pages/projects/[projectId]';
import React, { ChangeEvent, useMemo, useState } from 'react';
import ActionButton from '../ActionButton';
import BaseModal from '../BaseModal';
import InputField from '../InputField';
import { Project } from '../../providers/projects-provider/projects-provider.types';
import Title from '../Title';

interface EnableNextEditionModalProps {
  onClose: () => void;
  onEnableNextEdition: (price: string, amount: number) => void;
  pending: boolean;
  project: Project;
}

const EnableNextEditionModal = ({
  onClose,
  onEnableNextEdition,
  pending,
  project,
}: EnableNextEditionModalProps) => {
  const [nextEditionMaxAmount, setNextEditionMaxAmount] = useState<number>(0);
  const [nextEditionMintPrice, setMextEditionMintPrice] = useState<string>('0');
  const maxPossibleAmount = useMemo(() => {
    if (project.endId && project.currentId) {
      return Number(project.endId.sub(project.currentId));
    }
    return 0;
  }, [project.endId, project.currentId]);

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <Title size="m">{'Unlock Next Edition'}</Title>
        <ModalText>Specify the max amount and price per mint.</ModalText>
        <CTAWrapper>
          <InputField
            label={'Max Amount'}
            value={nextEditionMaxAmount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const onlyNumbers = /^[0-9\b]+$/;
              if (e.target.value === '' || onlyNumbers.test(e.target.value)) {
                setNextEditionMaxAmount(Number(e.target.value));
              }
            }}
            error={
              (Number(nextEditionMaxAmount) < 1 ||
                Number(nextEditionMaxAmount) > maxPossibleAmount) &&
              `Must be between 1 and ${maxPossibleAmount}.`
            }
          />
          <InputField
            label={'Mint Price'}
            value={nextEditionMintPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setMextEditionMintPrice(e.target.value);
            }}
            // TODO: read this from contract -  min price is 1ETH
            error={Number(nextEditionMintPrice) < 1 && 'Price too low.'}
          />
          <ActionButton
            disabled={
              pending ||
              Number(nextEditionMaxAmount) < 1 ||
              Number(nextEditionMaxAmount) > maxPossibleAmount ||
              Number(nextEditionMintPrice) < 0.01
            }
            text="UNLOCK"
            loading={pending}
            onClick={(e) => {
              e.preventDefault();
              onEnableNextEdition(nextEditionMintPrice, nextEditionMaxAmount);
            }}
          />
        </CTAWrapper>
      </ContentWrapper>
    </BaseModal>
  );
};

export default EnableNextEditionModal;
