import React, { ReactChildren } from 'react';
import styled from 'styled-components';
import { FONT_SERIF_BLACK, MAIN_TEXT_COLOR } from '../themes';

const StyledTitle = styled.h1<TitleTypes>`
  display: inline-block;
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
  font-family: ${FONT_SERIF_BLACK};
  font-size: ${({ size }) => size};
  color: ${({ color }) => color ?? MAIN_TEXT_COLOR};
  margin: ${({ margin }) => margin ?? '0'};
  padding: ${({ padding }) => padding ?? '1rem'};
  width: ${({ width }) => width ?? 'auto'};
  overflow-wrap: break-word;

  @media (max-width: 900px) {
    padding: 0;
    font-size: ${({ size }) => {
      if (size == '72px') {
        return '54px';
      } else if (size === '54px') {
        return '36px';
      } else {
        return size;
      }
    }};
  }
`;

type TitleProps = {
  children: ReactChildren | string | any;
  margin?: string;
  padding?: string;
  width?: string;
  color?: string;
  size?: 'xl' | 'l' | 'm' | 's' | 'xs';
  textAlign?: 'center' | 'left' | 'right';
};

type TitleTypes = {
  margin?: string;
  padding?: string;
  width?: string;
  size: string;
  color?: string;
  textAlign?: 'center' | 'left' | 'right';
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
  textAlign,
}: TitleProps) => {
  switch (size) {
    case 'xl':
      return (
        <StyledTitle
          color={color}
          margin={margin}
          padding={padding}
          size={'72px'}
          textAlign={textAlign}
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
          textAlign={textAlign}
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
          textAlign={textAlign}
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
          textAlign={textAlign}
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
          textAlign={textAlign}
          width={width}
        >
          {children}
        </StyledTitle>
      );
  }
};

export default Title;
