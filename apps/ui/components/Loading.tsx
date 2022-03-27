import React from 'react'
import styled from 'styled-components'
import { BASE_BOX_SHADOW, INSET_BASE_BOX_SHADOW } from '../themes';

const Root = styled.div`
  display: flex;
`;

const Dot = styled.span`
  height: 40px;
  width: 40px;
  margin: 0 15px;
  border-radius: 40px;
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  animation: animate 7s linear infinite;

  @keyframes animate {
    0% {
      box-shadow: ${INSET_BASE_BOX_SHADOW};
    }
    100% {
      box-shadow: ${BASE_BOX_SHADOW};
    }
  }
`;

const Loading = () => {
  return (
    <Root>
      <Dot />
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </Root>
  )
}

export default Loading