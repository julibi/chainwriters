import React from 'react'
import styled from 'styled-components'
import { BG_DARK, PINK } from '../themes';

const Root = styled.div`
  display: flex;
  width: 90%;
  max-width:1200px;
  height: 30px;
  flex-wrap: wrap;
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
  min-width: 30px;
`;

const Inside = styled.div`
  height: 85%;
  width: 97%;
  background-color: ${PINK};
  border-radius: .8rem; 
  box-shadow: 0px 0px 50px 4px ${PINK};
`;

interface CreateProgressBarProps {
  currentStep: number;
}

const CreateProgressBar = ({currentStep}: CreateProgressBarProps) => {
  return (
    <Root>
      <Fill>{currentStep >= 0 && <Inside />}</Fill>
      <Fill>{currentStep >= 1 && <Inside />}</Fill>
      <Fill>{currentStep >= 2 && <Inside />}</Fill>
      <Fill>{currentStep >= 3 && <Inside />}</Fill>
      <Fill>{currentStep >= 4 && <Inside />}</Fill>
      <Fill>{currentStep >= 5 && <Inside />}</Fill>
      <Fill>{currentStep >= 6 && <Inside />}</Fill>
      <Fill>{currentStep >= 7 && <Inside />}</Fill>
      <Fill>{currentStep >= 8 && <Inside />}</Fill>
      <Fill>{currentStep >= 9 && <Inside />}</Fill>
      <Fill>{currentStep >= 10 && <Inside />}</Fill>
      <Fill>{currentStep >= 11 && <Inside />}</Fill>
      <Fill>{currentStep >= 12 && <Inside />}</Fill>
      <Fill>{currentStep >= 13 && <Inside />}</Fill>
    </Root>
  )
}

export default CreateProgressBar