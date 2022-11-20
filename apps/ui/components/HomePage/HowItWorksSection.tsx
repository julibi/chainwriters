import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useTheme } from '../../hooks/theme';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  FadeInBaseAnimation,
  POP,
  FONT_SERIF_BOLD,
  StyledLink,
  FONT_SERIF_REGULAR,
  ElementThemeProps,
  Theme,
} from '../../themes';
import EmblaCarouselComponent from '../EmblaCarouselComponent';
import Title from '../Title';
import { useDarkMode } from '../../hooks/useDarkMode';

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 6rem 3rem 6rem;
  @media (max-width: 900px) {
    margin: 2rem;
  }
`;

const Content = styled.div`
  width: 100%;
  margin-block-start: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HowItWorksSection = () => {
  const isDarkMode = useDarkMode();
  const theme = useTheme();

  return (
    <Root id="howitworks">
      <Title color={POP}>How does it work?</Title>
      <StyledLink href="https://docs.moonpage.io/moonpage-docs/tutorials">
        <Title size="m">
          {`Step by step guide   `}
          <Image
            height={'34px'}
            width={'30px'}
            src={isDarkMode ? '/DocsLight.svg' : '/DocsDark.svg'}
            alt={'Team'}
            priority
          />
        </Title>
      </StyledLink>
      <Content>
        <EmblaCarouselComponent>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </EmblaCarouselComponent>
      </Content>
    </Root>
  );
};

export default HowItWorksSection;
