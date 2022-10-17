import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TypeWriter from './TypeWriter';
import BubbleAnimation from './BubbleAnimation';

const Root = styled.div`
  position: relative;
  height: 400px;
  width: 50%;
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    align-items: flex-start;
    width: 100%;
    flex: 1;
  }
`;

const TypeWriterWrapper = styled.div`
  height: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    min-height: 300px;
  }
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
            text={'Enter the future of text. Create and collect text NFTs.'}
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
