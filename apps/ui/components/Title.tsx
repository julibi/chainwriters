import React, { ReactChildren } from 'react';
import styled from 'styled-components';
import { INTER_BLACK, PLAIN_WHITE } from '../themes';

const StyledTitle = styled.h1<TitleTypes>`
  display: inline-block;
  text-align: center;
  font-family: ${INTER_BLACK};
  font-size: ${({ size }) => size};
  color: ${({ color }) => color ?? PLAIN_WHITE};
  margin: ${({ margin }) => margin ?? '0'};
  padding: ${({ padding }) => padding ?? '1rem'};
  width: ${({ width }) => width ?? 'auto'};
  overflow-wrap: break-word;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

type TitleProps = {
  children: ReactChildren | string | any;
  margin?: string;
  padding?: string;
  width?: string;
  color?: string;
  size?: 'xl' | 'l' | 'm' | 's' | 'xs';
};

type TitleTypes = {
  margin?: string;
  padding?: string;
  width?: string;
  size: string;
  color?: string;
};

// render differen ones depending on size
// make them smaller on smallscreen
const Title = ({
  children,
  color,
  margin,
  padding,
  size = 'l',
  width,
}: TitleProps) => {
  switch (size) {
    case 'xl':
      return (
        <StyledTitle
          color={color}
          margin={margin}
          padding={padding}
          size={'72px'}
          width={width}
        >
          {children}
        </StyledTitle>
      );
    case 'l':
      return (
        <StyledTitle
          color={color}
          margin={margin}
          padding={padding}
          size={'54px'}
          width={width}
        >
          {children}
        </StyledTitle>
      );
    case 'm':
      return (
        <StyledTitle
          color={color}
          margin={margin}
          padding={padding}
          size={'36px'}
          width={width}
        >
          {children}
        </StyledTitle>
      );
    case 's':
      return (
        <StyledTitle
          color={color}
          margin={margin}
          padding={padding}
          size={'24px'}
          width={width}
        >
          {children}
        </StyledTitle>
      );
    case 'xs':
      return (
        <StyledTitle
          color={color}
          margin={margin}
          padding={padding}
          size={'16px'}
          width={width}
        >
          {children}
        </StyledTitle>
      );
  }
};

export default Title;
