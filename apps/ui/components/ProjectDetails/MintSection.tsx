import React, { useCallback, useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import styled from 'styled-components';
import { BaseButton } from '../../themes';
import Title from '../Title';
import PieChart from '../PieChart';
import {
  Edition,
  Project,
} from '../../providers/projects-provider/projects-provider.types';
import { useCollection } from '../../hooks/collection';
import ActionButton from '../ActionButton';
import MintLegalModal from './MintLegalModal';

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.h3`
  text-transform: uppercase;
`;

const ControlWrapper = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-block-end: 1rem;
  }
`;

const StyledControl = styled(BaseButton)``;

const StyledFakeInput = styled.span`
  width: 100px;
  display: inline-block;
  margin: 0 1rem;
  text-align: center;
`;

interface MintSectionProps {
  currentEdition: Edition;
  project: Project;
  refetch: VoidFunction;
}

const MintSection = ({
  currentEdition,
  project,
  refetch,
}: MintSectionProps) => {
  const [showLegalModal, setShowLegalModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const { mint, mintStatus } = useCollection();
  const totalSupply = useMemo(() => {
    return project.currentId.sub(currentEdition?.startId);
  }, [project, currentEdition]);

  const maxSupply = useMemo(() => {
    if (currentEdition) {
      const totalOfThisEdition = currentEdition?.endId
        .sub(currentEdition?.startId)
        .add(BigNumber.from('1'));
      return totalOfThisEdition;
    }
    return undefined;
  }, [currentEdition]);

  const edition = useMemo(() => {
    return currentEdition ? Number(currentEdition.edition) : 'Unknown';
  }, [currentEdition]);

  const price = useMemo(() => {
    if (currentEdition?.mintPrice) {
      return currentEdition?.mintPrice.mul(amount);
    }
  }, [currentEdition, amount]);

  const handleIncrement = useCallback(() => {
    setAmount(amount + 1);
  }, [amount]);

  const handleDecrement = useCallback(() => {
    setAmount(amount - 1);
  }, [amount]);

  const handleMint = useCallback(async () => {
    await mint({
      projectId: project.id,
      amount,
      price,
      onSuccess: () => {
        refetch();
        setShowLegalModal(false);
      },
    });
  }, [amount, mint, price, project.id, refetch]);

  return (
    <Root>
      <Title>{`MINT - EDITION ${edition}`}</Title>
      <Price>{`Price ${price ? formatEther(price) : 0} MATIC`}</Price>
      <PieChart part={Number(totalSupply) ?? 0} whole={Number(maxSupply)} />
      <ControlWrapper>
        <StyledControl onClick={handleDecrement} disabled={amount === 1}>
          -
        </StyledControl>
        <StyledFakeInput>{amount}</StyledFakeInput>
        <StyledControl
          onClick={handleIncrement}
          disabled={
            amount === 10 ||
            amount === Number(maxSupply.sub(totalSupply)) ||
            maxSupply === totalSupply
          }
        >
          +
        </StyledControl>
      </ControlWrapper>
      <ActionButton
        disabled={amount > Number(maxSupply.sub(totalSupply))}
        onClick={() => setShowLegalModal(true)}
        text="MINT"
        loading={mintStatus === 'confirming' || mintStatus === 'waiting'}
      />
      {showLegalModal && (
        <MintLegalModal
          handleClick={handleMint}
          onClose={() => setShowLegalModal(false)}
          mintStatus={mintStatus}
          price={price}
        />
      )}
    </Root>
  );
};

export default MintSection;
