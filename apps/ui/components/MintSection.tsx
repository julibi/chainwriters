import { formatEther } from 'ethers/lib/utils'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { BaseButton } from '../themes'
import { StyledPrimaryButton } from '../pages/projects/[projectAddress]'

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

const MintSection = () => {
  const [mintingAmount, setMintingAmount] = useState<number>(1);
  const handleIncrement = useCallback(() => {
    setMintingAmount(mintingAmount + 1);
  }, [mintingAmount]); 

  const handleDecrement = useCallback(() => {
    setMintingAmount(mintingAmount - 1);
  }, [mintingAmount]); 

  const handleDeposit = useCallback(() => {
    console.log("handleDeposit");
  }, [mintingAmount]); 

  return (
    <div>
      <ControlWrapper>
        <StyledControl onClick={handleDecrement} disabled={mintingAmount === 1}>
          -
        </StyledControl>
        <StyledFakeInput>{mintingAmount}</StyledFakeInput>
        <StyledControl onClick={handleIncrement} disabled={mintingAmount === 5}>
          +
        </StyledControl>
      </ControlWrapper>
      <StyledPrimaryButton onClick={handleDeposit}>
        {`Deposit For ${formatEther(500000000000000000 * mintingAmount).toString()}`}
      </StyledPrimaryButton>
    </div>
  );
}

export default MintSection