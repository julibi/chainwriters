import React from 'react';
import TypeWriter from './TypeWriter';

const StartAnimation = () => {
  return (
    <TypeWriter
      text={
        'Start a literature movement on the blockchain! Create and collect NFTs.'
      }
      shouldErase={false}
      shouldLoop={false}
    />
  );
};

export default StartAnimation;
