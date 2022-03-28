import React from 'react'
import styled from 'styled-components'
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW, BG_DARK, INSET_BASE_BOX_SHADOW, PINK } from '../themes';

const Root = styled.div`
  display: flex;
  width: 90%;
  max-width:1200px;
  height: 30px;
`;

const Fill = styled.div`
  flex: 1;
  height: 100%;
  background-color: ${BG_DARK};
  border-radius: .8rem; 
  margin: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inside = styled.div`
  height: 70%;
  width: 98%;
  background-color: ${PINK};
  border-radius: .8rem; 
  box-shadow: 0px 0px 50px 4px ${PINK};
`;

interface CreateProgressBarProps {
  currentStep: number;
}

const CreateProgressBar = ({currentStep}: CreateProgressBarProps) => {
  console.log({currentStep});

  return (
    <Root>
      <Fill>{currentStep === 1 && <Inside />}</Fill>
      <Fill>{currentStep === 2 && <Inside />}</Fill>
      <Fill>{currentStep === 3 && <Inside />}</Fill>
      <Fill>{currentStep === 4 && <Inside />}</Fill>
    </Root>
  )
}

export default CreateProgressBar