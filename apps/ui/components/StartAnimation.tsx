import React, { useState } from 'react';
import TypeWriter from './TypeWriter';
import SecondAnimation from './SecondAnimation';

const StartAnimation = () => {
  const [shouldShowTyped, setShouldShowTyped] = useState<boolean>(true);
  return (
    <>
      {shouldShowTyped && (
        <TypeWriter
          text={
            'Start a literature movement on the blockchain now! Create and collect NFTs.'
          }
          onFinish={() => {
            setShouldShowTyped(false);
          }}
          shouldErase={false}
          shouldLoop={false}
        />
      )}
      {!shouldShowTyped && <SecondAnimation />}
    </>
  );
};

export default StartAnimation;
