import React from 'react';
import Confetti from 'react-dom-confetti';

type ConfettiCanonProps = {
  show?: boolean;
};

const ConfettiCanon = ({ show = false }: ConfettiCanonProps) => {
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '370px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };
  return <Confetti active={show} config={config} />;
};

export default ConfettiCanon;
