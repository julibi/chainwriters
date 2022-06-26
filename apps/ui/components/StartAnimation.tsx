import React from 'react';
import TypeWriter from './TypeWriter';

const StartAnimation = () => {
  return (
    <TypeWriter
      fontSize={54}
      text={
        'Start a literature movement on the blockchain now! Create and collect NFTs.'
      }
      shouldErase={false}
      shouldLoop={false}
    />
  );
};

export default StartAnimation;
