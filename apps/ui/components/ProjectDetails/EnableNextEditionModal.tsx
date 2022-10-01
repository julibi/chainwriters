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
import { PINK } from '../../themes';

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
    if (project?.endId && project?.currentId) {
      return Number(project.endId.sub(project.currentId));
    }
    return 0;
  }, [project?.endId, project?.currentId]);

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <Title size="m">{'Unlock Next Edition'}</Title>
        <ModalText>Specify the max amount and price per mint.</ModalText>
        <Title size="xs" color={PINK} margin="0 0 2rem 0" width="75%">
          Caution: The matic your project earns by selling the NFTs are only
          distributed after an edition sells out. Make sure you choose an
          appropriate price and amount. If an edition does not sell out, the
          matic earned stays locked inside the contract.
        </Title>
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
            // TODO: read this from contract
            error={Number(nextEditionMintPrice) < 0.1 && 'Price too low.'}
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
