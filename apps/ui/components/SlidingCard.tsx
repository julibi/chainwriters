import React, { useEffect, useRef, useState } from 'react';
import InfoCard from './InfoCard';
import useIsInViewport from '../hooks/useIsInViewport';
import styled from 'styled-components';

interface AnimationProps {
  delay?: number;
}

const Root = styled.div``;

const Animation = styled.div<AnimationProps>`
  animation: slideIn 0.8s backwards;
  animation-delay: ${({ delay }) => (delay ? delay / 2 : 0)}s;
  transition-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1);

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(5%, 10%);
    }
    to {
      opacity: 1;
      transform: translate(0%, 0%);
    }
  }
`;

const SlidingCard = ({ delay }) => {
  const refCard = useRef(null);
  const isInViewport = useIsInViewport(refCard);

  return (
    <Root ref={refCard}>
      {isInViewport && (
        <Animation delay={delay}>
          <InfoCard />
        </Animation>
      )}
    </Root>
  );
};

export default SlidingCard;
