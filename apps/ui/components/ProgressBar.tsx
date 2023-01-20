import React from 'react';
import styled from 'styled-components';
import { POP, ElementThemeProps } from '../themes';
import { useTheme } from '../hooks/theme';

interface ProgressBarProps {
  completed: number;
  height?: string;
}
type RootProps = {
  theme: ElementThemeProps;
  height: string;
};

const Root = styled.div<RootProps>`
  height: ${({ height }) => height ?? '40px'};
  width: 100%;
  background-color: ${({ theme }) => theme.BG_NORMAL};
  box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding-inline: 0.5rem;
  position: relative;
`;

const Progress = styled.div<{ completed: number }>`
  height: 75%;
  width: ${({ completed }) => completed}%;
  background-color: ${POP};
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
  background-color: ${POP};
  margin: 0 auto;
  border-radius: inherit;
  box-shadow: -4px -2px 4px 0px rgb(125 125 125 / 10%),
    4px 2px 8px 0px rgb(0 0 0 / 30%);
`;

const ProgressBar = ({ completed, height }: ProgressBarProps) => {
  const theme = useTheme();
  return (
    <Root height={height} theme={theme}>
      <Progress completed={completed}>
        <ProgressTopLayer />
      </Progress>
    </Root>
  );
};

export default ProgressBar;
