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

const BlockSpan = styled.span`
  display: inline-block;
  margin-block: 1rem;
`;

interface MintSectionProps {
  currentEdition: number;
  maxSupply: number;
  totalSupply: number;
  mintPrice: BigNumber;
  refetch: VoidFunction;
}

const MintSection = ({
  currentEdition,
  totalSupply,
  maxSupply,
  mintPrice,
  refetch,
}: MintSectionProps) => {
  console.log({ totalSupply });
  const [amount, setAmount] = useState<number>(1);
  const [mintPending, setMintPending] = useState<boolean>(false);
  const { account, chainId } = useWeb3React();
  const collection = useMoonpageCollection();

  const price = useMemo(() => {
    if (mintPrice) {
      return mintPrice.mul(amount);
    }
  }, [mintPrice, amount]);

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
        const tx = await collection.mint(amount, { value: price });
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
  }, [account, amount, chainId, price, collection, refetch]);

  return (
    <Root>
      <Title>{`MINT - EDITION ${currentEdition}`}</Title>
      <Price>{`Price ${price ? formatEther(price) : 0} MATIC`}</Price>
      <PieChart part={totalSupply ?? 0} whole={maxSupply} />
      <ControlWrapper>
        <StyledControl onClick={handleDecrement} disabled={amount === 1}>
          -
        </StyledControl>
        <StyledFakeInput>{amount}</StyledFakeInput>
        <StyledControl
          onClick={handleIncrement}
          disabled={
            amount === 10 ||
            amount === maxSupply - totalSupply ||
            maxSupply === totalSupply
          }
        >
          +
        </StyledControl>
      </ControlWrapper>
      <StyledPrimaryButton
        disabled={amount > maxSupply - totalSupply}
        onClick={handleMint}
      >
        {mintPending ? <Loading height={20} dotHeight={20} /> : 'MINT'}
      </StyledPrimaryButton>
    </Root>
  );
};

export default MintSection;
