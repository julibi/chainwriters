import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import { Tooltip } from './Tooltip';

const Root = styled.div`
  height: 24px;
  width: 24px;
  z-index: 1;
  background-color: #364165;
  border-radius: 50%;

  margin-inline-start: 6px;
  display: flex;
  justify-content: center;
`;

const IconWrapper = styled.div`
  font-size: 18px;
  height: 18px;
`;

interface TooltippedIndicatorProps {
  tooltipContent: string;
  icon: ReactNode;
}

const TooltippedIndicator = ({
  tooltipContent,
  icon,
}: TooltippedIndicatorProps) => {
  const theme = useTheme();
  return (
    <Root>
      <Tooltip content={tooltipContent} theme={theme}>
        <IconWrapper>{icon}</IconWrapper>
      </Tooltip>
    </Root>
  );
};

export default TooltippedIndicator;
