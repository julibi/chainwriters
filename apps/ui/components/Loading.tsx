import React from 'react';
import styled from 'styled-components';
import { Theme } from '../themes';
import { useTheme } from '../hooks/theme';

interface LoadingProps {
  height: number;
  dotHeight?: number;
  short?: boolean;
}

interface DotProps {
  index: number;
  dotHeight: number;
  theme: Theme;
}

const Root = styled.div<LoadingProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(p) => p.height}px;
`;

const Dot = styled.span<DotProps>`
  height: ${(p) => p.dotHeight}px;
  width: ${(p) => p.dotHeight}px;
  margin: 0 15px;
  border-radius: 40px;
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  animation: animate 3s linear infinite;
  animation-delay: calc(0.5s * ${(p) => p.index});

  @keyframes animate {
    0% {
      box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};
    }
    100% {
      box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
    }
  }
`;

const Loading = ({ height, dotHeight = 40, short = false }: LoadingProps) => {
  const theme = useTheme();
  return (
    <Root height={height} dotHeight={dotHeight}>
      {!short && <Dot index={0} dotHeight={dotHeight} theme={theme} />}
      <Dot index={1} dotHeight={dotHeight} theme={theme} />
      <Dot index={2} dotHeight={dotHeight} theme={theme} />
    </Root>
  );
};

export default Loading;
