import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import { Tooltip } from './Tooltip';

interface RootProps {
  backgroundColor?: string;
}

const Root = styled.div<RootProps>`
  height: 24px;
  width: 24px;
  z-index: 1;
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#364165'};
  border-radius: 50%;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
`;

const IconWrapper = styled.div`
  font-size: 18px;
  height: 18px;
`;

interface TooltippedIndicatorProps {
  backgroundColor?: string;
  tooltipContent: string;
  icon: ReactNode;
}

const TooltippedIndicator = ({
  backgroundColor,
  tooltipContent,
  icon,
}: TooltippedIndicatorProps) => {
  const theme = useTheme();
  return (
    <Root backgroundColor={backgroundColor}>
      <Tooltip content={tooltipContent} theme={theme}>
        <IconWrapper>{icon}</IconWrapper>
      </Tooltip>
    </Root>
  );
};

export default TooltippedIndicator;
