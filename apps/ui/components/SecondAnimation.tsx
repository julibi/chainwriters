import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PINK, PLAIN_WHITE } from '../themes';

const FadeOut = styled.span`
  display: inline-block;
  animation: fadeOut ease 3s forwards;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Shrink = styled.span`
  animation: shrink ease 3s forwards;
  animation-delay: 3s;

  @keyframes shrink {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`;

const Stress = styled.span`
  display: inline-block;
  animation: stress ease 3s forwards;

  @keyframes stress {
    0% {
      color: ${PLAIN_WHITE};
      font-size: 16px;
    }
    100% {
      color: ${PINK};
      font-size: 32px;
    }
  }
`;

const SecondAnimation = () => {
  return (
    <span>
      <FadeOut>{'Start a '}&nbsp;</FadeOut>
      <Stress>{`literature `}&nbsp;</Stress>
      <FadeOut>
        <Shrink>
          {' movement on the blockchain now by creating and collecting '}&nbsp;
        </Shrink>
      </FadeOut>
      <Stress>NFTs</Stress>
    </span>
  );
};

export default SecondAnimation;
