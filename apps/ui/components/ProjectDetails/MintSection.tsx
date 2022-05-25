import { formatEther } from 'ethers/lib/utils'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { BaseButton } from '../../themes'
import { StyledPrimaryButton } from '../../pages/projects/[projectAddress]'

const Root = styled.div`

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
// TODO mint section should further check for whether things are even mintable etc.
const MintSection = () => {
  const [mintingAmount, setMintingAmount] = useState<number>(1);
  const handleIncrement = useCallback(() => {
    setMintingAmount(mintingAmount + 1);
  }, [mintingAmount]); 

  const handleDecrement = useCallback(() => {
    setMintingAmount(mintingAmount - 1);
  }, [mintingAmount]); 

  const handleMint = useCallback(() => {
    console.log("handleMint");
  }, [mintingAmount]); 

  return (
    <Root>
      <ControlWrapper>
        <StyledControl onClick={handleDecrement} disabled={mintingAmount === 1}>
          -
        </StyledControl>
        <StyledFakeInput>{mintingAmount}</StyledFakeInput>
        <StyledControl onClick={handleIncrement} disabled={mintingAmount === 5}>
          +
        </StyledControl>
      </ControlWrapper>
    </Root>
  );
}

export default MintSection