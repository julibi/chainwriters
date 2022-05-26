import React, { useCallback, useMemo, useState } from 'react';
import { BigNumber, Contract } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BaseButton } from '../../themes';
import { StyledPrimaryButton } from '../../pages/projects/[projectAddress]';
import { Title } from '../../pages/projects/[projectAddress]';
import PieChart from '../PieChart';
import ToastLink from '../ToastLink';
import { useWeb3React } from '@web3-react/core';
import Loading from '../Loading';
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
  projectContract: Contract;
  refetch: VoidFunction;
}

const MintSection = ({
  currentEdition,
  totalSupply,
  maxSupply,
  mintPrice,
  projectContract,
  refetch,
}: MintSectionProps) => {
  const [amount, setAmount] = useState<number>(1);
  const [mintPending, setMintPending] = useState<boolean>(false);
  const { account, chainId } = useWeb3React();

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
    if (account && projectContract) {
      try {
        setMintPending(true);
        const tx = await projectContract.mint(amount, { value: price });
        const { hash } = tx;
        toast.info(
          <ToastLink hash={hash} chainId={chainId} message={'Minting...'} />
        );
        projectContract.provider.once(hash, (transaction) => {
          refetch();
          setAmount(1);
          setMintPending(false);
          toast.success(
            <ToastLink hash={hash} chainId={chainId} message={'Successfully minted!'} />
          );
        });
      } catch (e: unknown) {
        setAmount(1);
        // @ts-ignore
        toast.error(e.reason ?? 'Something went wrong.');
        setMintPending(false);
      }
    }
  }, [account, amount, chainId, price, projectContract, refetch]);
  console.log({ totalSupply, maxSupply, currentEdition })
  return (
    <Root>
      <Title>{`MINT - EDITION ${currentEdition}`}</Title>
      <Price>{`Price ${formatEther(
        parseInt(price._hex, 16).toString()
      )} MATIC`}</Price>
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
            (amount === maxSupply - totalSupply) ||
            maxSupply === totalSupply
          }
        >
          +
        </StyledControl>
      </ControlWrapper>
      <BlockSpan>(Max: 10)</BlockSpan>
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
