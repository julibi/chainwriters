import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { POP, StyledLink } from '../../themes';
import EmblaCarouselComponent from '../EmblaCarouselComponent';
import Title from '../Title';
import { useDarkMode } from '../../hooks/useDarkMode';

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;
  @media (max-width: 900px) {
    margin: 2rem 0;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HowItWorksSection = () => {
  const isDarkMode = useDarkMode();

  return (
    <Root id="howitworks">
      <Title color={POP}>How does it work?</Title>
      {/* <StyledLink href="https://docs.moonpage.io/moonpage-docs/tutorials">
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
      </StyledLink> */}
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
