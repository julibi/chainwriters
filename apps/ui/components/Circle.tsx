import React from 'react';
import styled from 'styled-components';
import { POP } from '../themes';

const StyledSVG = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const MyCircle = styled.circle<{ percentage: number }>`
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: 90px;
  stroke-dasharray: 560px;
  stroke-dashoffset: 560px;
  animation: anim 1s ease-in forwards;
  animation-delay: 0.5s;

  @keyframes anim {
    100% {
      stroke-dashoffset: ${({ percentage }) =>
        (560 / 100) * (100 - percentage)}px;
    }
  }
`;

interface CircleProps {
  percentage: number;
  colorStyle?: 'gradient' | 'simple';
}

const Circle = ({ percentage, colorStyle = 'gradient' }: CircleProps) => {
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="280px"
      height="280px"
    >
      <defs>
        <linearGradient id="GradientColor">
          <stop
            offset="0%"
            stopColor={colorStyle === 'gradient' ? '#673ab7' : POP}
          />
          <stop offset="100%" stopColor={POP} />
        </linearGradient>
      </defs>
      <MyCircle cx="140" cy="140" r="85" percentage={percentage} />
    </StyledSVG>
  );
};

export default Circle;
