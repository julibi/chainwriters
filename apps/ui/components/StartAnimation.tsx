import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TypeWriter from './TypeWriter';
import BubbleAnimation from './BubbleAnimation';

const Root = styled.div`
  position: relative;
  height: 400px;
  width: 50%;

  @media (max-width: 900px) {
    align-items: flex-start;
    width: 100%;
    flex: 1;
  }
`;

const TypeWriterWrapper = styled.div`
  height: 100%;
  min-height: 500px;
`;

const BubbleWrapper = styled.div`
  position: absolute;
  top: 0;

  @media (max-width: 900px) {
    top: 20%;
    left: 20%;
  }
`;

const StartAnimation = () => {
  const [shouldStart, setShouldStart] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldStart(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Root>
      <TypeWriterWrapper>
        {shouldStart && (
          <TypeWriter
            text={
              'Start a literature movement on the blockchain! Create and collect NFTs.'
            }
            shouldErase={false}
            shouldLoop={false}
          />
        )}
      </TypeWriterWrapper>
      <BubbleWrapper>
        <BubbleAnimation />
      </BubbleWrapper>
    </Root>
  );
};

export default StartAnimation;
