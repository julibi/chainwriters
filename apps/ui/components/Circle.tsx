import React from 'react'
import styled from 'styled-components'
import { PINK } from '../themes'

const StyledSVG = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const MyCircle = styled.circle<{ percentage: number }>`
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: 70px;
  stroke-dasharray: 502px;
  stroke-dashoffset: 502px;
  animation: anim 1s ease-in forwards;
  animation-delay: 0.5s;

  @keyframes anim {
    100% {
      stroke-dashoffset: ${({ percentage }) => (502/100)*(100 - percentage)}px;
    }
  }
`;

interface CircleProps {
  percentage: number;
}

const Circle = ({ percentage }: CircleProps) => {
  console.log({percentage});
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="240px"
      height="240px"
      >
      <defs>
        <linearGradient id="GradientColor">
          <stop offset="0%" stopColor="#673ab7" />
          <stop offset="100%" stopColor={PINK} />
        </linearGradient>
      </defs>
      <MyCircle cx="120" cy="120" r="80" percentage={percentage} />
    </StyledSVG>
  );
}

export default Circle