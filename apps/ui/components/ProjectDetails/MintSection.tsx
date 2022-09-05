import React, { useCallback, useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BaseButton } from '../../themes';
import { StyledPrimaryButton } from '../../pages/projects/[projectId]';
import { Title } from '../../pages/projects/[projectId]';
import PieChart from '../PieChart';
import ToastLink from '../ToastLink';
import { useWeb3React } from '@web3-react/core';
import Loading from '../Loading';
import useMoonpageCollection from '../../hooks/useMoonpageCollection';
import { Project } from '../../providers/projects-provider/projects-provider.types';

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
  project: Project;
  refetch: VoidFunction;
}

const MintSection = ({ project, refetch }: MintSectionProps) => {
  const [amount, setAmount] = useState<number>(1);
  const [mintPending, setMintPending] = useState<boolean>(false);
  const { account, chainId } = useWeb3React();
  const collection = useMoonpageCollection();

  const currentEdition = useMemo(() => {
    const bla = project.editions.find(
      (edition) => Number(edition.edition) === project.editions.length
    );
    return bla;
  }, [project]);

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

  console.log(currentEdition, Number(totalSupply), Number(maxSupply));
  const price = useMemo(() => {
    if (currentEdition.mintPrice) {
      return currentEdition.mintPrice.mul(amount);
    }
  }, [currentEdition, amount]);

  const handleIncrement = useCallback(() => {
    setAmount(amount + 1);
  }, [amount]);

  const handleDecrement = useCallback(() => {
    setAmount(amount - 1);
  }, [amount]);

  const handleMint = useCallback(async () => {
    if (account && collection) {
      try {
        setMintPending(true);
        const tx = await collection.publicMint(project.id, amount, {
          value: price,
        });
        const { hash } = tx;
        toast.info(
          <ToastLink hash={hash} chainId={chainId} message={'Minting...'} />
        );
        collection.provider.once(hash, (transaction) => {
          refetch();
          setAmount(1);
          setMintPending(false);
          toast.success(
            <ToastLink
              hash={hash}
              chainId={chainId}
              message={'Successfully minted!'}
            />
          );
        });
      } catch (e: unknown) {
        setAmount(1);
        // @ts-ignore
        toast.error(e.reason ?? 'Something went wrong.');
        setMintPending(false);
      }
    }
  }, [account, collection, project.id, amount, price, chainId, refetch]);

  return (
    <Root>
      <Title>{`MINT - EDITION ${Number(currentEdition.edition)}`}</Title>
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
      <StyledPrimaryButton
        disabled={amount > Number(maxSupply.sub(totalSupply))}
        onClick={handleMint}
      >
        {mintPending ? <Loading height={20} dotHeight={20} /> : 'MINT'}
      </StyledPrimaryButton>
    </Root>
  );
};

export default MintSection;
