import React from 'react'
import styled from 'styled-components';
import { BG_NORMAL, PINK } from '../themes';
  
interface ProgressBarProps {
  completed: number;
}

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
  padding-inline: .5rem;
  position: relative;
`;

const Progress = styled.div<ProgressBarProps>`
  height: 75%;
  width: ${({completed}) => completed}%;
  background-color: ${PINK};
  transition: width 1s ease-in-out;
  border-radius: inherit;
  text-align: right;
  display: flex;
  justify-content: center;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressTopLayer = styled.div`
  height: 88%;
  width: 98%;
  background-color: #f51651;
  margin: 0 auto;
  border-radius: inherit;
  box-shadow:
    -4px -2px 4px 0px rgb(125 125 125 / 10%),
    4px 2px 8px 0px rgb(0 0 0 / 30%);
`;

const ProgressBar = ({ completed }:ProgressBarProps) => {
  return (
    <Root>
      <Progress completed={completed}>
        <ProgressTopLayer />
      </Progress>
    </Root>
  )
}

export default ProgressBar