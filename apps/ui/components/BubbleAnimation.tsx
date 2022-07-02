import React from 'react';
import styled from 'styled-components';
import { PINK } from '../themes';

const Root = styled.section`
  position: relative;
  min-height: 400px;
  min-width: 400px;

  @media (max-width: 900px) {
    min-height: 200px;
    min-width: 200px;
  }
`;

const BlurLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
`;

const Circle = styled.div`
  position: absolute;
  left: 0;
  height: 400px;
  width: 400px;
  border-radius: 50%;
  filter: blur(1.5rem);
  mix-blend-mode: lighten;

  @media (max-width: 900px) {
    height: 200px;
    width: 200px;
  }
`;

const createAnimation = (period, translateXs, translateYs) => {
  return `
    animation: blob ${period}s infinite;
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      25% {
        transform: translate(${translateXs[0]}px, ${translateYs[0]}px) scale(1.1);
      }
      50% {
        transform: translate(${translateXs[1]}px, ${translateYs[1]}px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
  `;
};

const BubbleOne = styled(Circle)`
  background-color: ${PINK};

  animation: blob 8s infinite;
  ${createAnimation(8, [30, -5], [-20, 20])}
`;

const BubbleTwo = styled(Circle)`
  left: 20%;
  background-color: #260099;
  animation: blob 8s infinite;
  ${createAnimation(10, [-40, -5], [-20, 10])}
`;

const BubbleAnimation = () => {
  return (
    <Root>
      <BlurLayer />
      <BubbleOne />
      <BubbleTwo />
    </Root>
  );
};

export default BubbleAnimation;
