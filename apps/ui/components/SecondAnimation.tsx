import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface FadeTypes {
  hide: boolean;
}

const Fade = styled.span<FadeTypes>`
  visibility: ${({ hide }) => (hide ? 'hidden' : 'visible')};
  animation: fadeOut ease 3s;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Remain = styled.span`
  display: inline-block;
`;

const SecondAnimation = () => {
  const [shouldHide, setShouldHide] = useState<boolean>(false);

  useEffect(() => {
    const interval = setTimeout(() => {
      setShouldHide(true);
    }, 3000);

    return () => clearTimeout(interval);
  }, []);

  return (
    <span>
      <Fade hide={shouldHide}>{'Start a '}</Fade>
      <Remain>{`literature `}&nbsp;</Remain>
      <Fade hide={shouldHide}>
        {' movement on the blockchain now by creating and collecting '}
      </Fade>
      <Remain>NFTs</Remain>
    </span>
  );
};

export default SecondAnimation;
