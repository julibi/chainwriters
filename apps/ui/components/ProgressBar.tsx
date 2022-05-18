import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { BG_NORMAL, INSET_BASE_BOX_SHADOW, PINK, PLAIN_WHITE } from '../themes';
  
const Root = styled.div`
  height: 40px;
  width: 100%;
  background-color: ${BG_NORMAL};
  box-shadow:
    inset -4px -2px 4px 0px rgb(125 125 125 / 10%),
    inset 4px 2px 8px 0px rgb(0 0 0 / 70%);
  border-radius: 50px;
  display: flex;
  align-items: center;
  margin: 50px;
  padding-inline: .5rem;
  position: relative;
`;

interface ProgressProps {
  completed: number;
  bgColor: string;
}

const Progress = styled.div<ProgressProps>`
  height: 70%;
  width: ${({completed}) => completed}%;
  background-color: ${({bgColor}) => bgColor};
  transition: width 1s ease-in-out;
  border-radius: inherit;
  text-align: right;
  display: flex;
  justify-content: center;
  
`;

const Label = styled.span`
  display: inline-block;
  color: ${PLAIN_WHITE};
  fontWeight: bold;
`;
interface ProgressBarProps {
  bgColor: string;
  completed?: number;
}
const ProgressBar = ({ bgColor }:ProgressBarProps) => {
  const [completed, setCompleted] = useState(30);
  useEffect(() => {
    setInterval(() => setCompleted(Math.floor(Math.random() * 100) + 1), 2000);
  }, []);
  return (
    <Root>
      <Progress bgColor={bgColor} completed={completed}>
        <Label>{`${completed}%`}</Label>
      </Progress>
    </Root>
  )
}

export default ProgressBar