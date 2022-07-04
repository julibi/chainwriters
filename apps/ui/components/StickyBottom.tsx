import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Cross, FadeInBaseAnimation, PINK } from '../themes';

const Root = styled.div`
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${PINK};
  padding: 1rem;

  ${FadeInBaseAnimation};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.1rem;
  background-color: ${PINK};

  :hover {
    cursor: pointer;
  }
`;

const CloseCross = styled(Cross)`
  opacity: 1;
  margin-left: 0;

  :before,
  :after {
    left: 10px;
  }
`;

interface StickyBottomProps {
  text: string;
}

const StickyBottom = ({ text }: StickyBottomProps) => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (show) {
    return (
      <Root>
        {text}
        <CloseButton onClick={() => setShow(false)}>
          <CloseCross />
        </CloseButton>
      </Root>
    );
  } else {
    return null;
  }
};

export default StickyBottom;
