import React from 'react'
import styled from 'styled-components'
import { BASE_BOX_SHADOW, INSET_BASE_BOX_SHADOW } from '../themes';

interface LoadingProps {
  height: number;
  dotHeight?: number;
}

interface DotProps {
  index: number;
  dotHeight: number;
}

const Root = styled.div<LoadingProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${p => p.height}px;
`;

const Dot = styled.span<DotProps>`
  height: ${p => p.dotHeight}px;
  width: ${p => p.dotHeight}px;
  margin: 0 15px;
  border-radius: 40px;
  box-shadow: ${BASE_BOX_SHADOW};
  animation: animate 3s linear infinite;
  animation-delay: calc(0.5s * ${p => p.index});

  @keyframes animate {
    0% {
      box-shadow: ${INSET_BASE_BOX_SHADOW};
    }
    100% {
      box-shadow: ${BASE_BOX_SHADOW};
    }
  }
`;

const Loading = ({height, dotHeight = 40}: LoadingProps) => {
  return (
    <Root height={height} dotHeight={dotHeight}>
      <Dot index={0} dotHeight={dotHeight} />
      <Dot index={1} dotHeight={dotHeight} />
      <Dot index={2} dotHeight={dotHeight} />
    </Root>
  )
}

export default Loading