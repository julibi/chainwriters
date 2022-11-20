import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {
  BASE_BORDER_RADIUS,
  ElementThemeProps,
  FONT_SERIF_BOLD,
  MAIN_TEXT_COLOR_DARKMODE,
  POP,
  StyledLink,
} from '../../themes';
import EmblaCarouselComponent from '../EmblaCarouselComponent';
import Title from '../Title';
import { useDarkMode } from '../../hooks/useDarkMode';
import ConceptExplanationSlide from '../HowItWorks/ConceptExplanationSlide';
import { useTheme } from '../../hooks/theme';

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

const ProjectWrapper = styled.div`
  font-family: monospace;
  width: 100%;
  height: 120px;
`;

const Project = styled.div<ElementThemeProps>`
  width: 100%;
  height: 100px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${BASE_BORDER_RADIUS};
  background-color: ${POP};
  color: ${({ theme }) => theme.BG_NORMAL};
  font-size: 24px;
`;

const BlockSpan = styled.span`
  display: inline-block;
`;

const MetaSpan = styled.span`
  font-size: 14px;
`;

const Ids = styled.span<ElementThemeProps>`
  display: inline-block;
  font-weight: 600;
  height: fit-content;
`;

const HowItWorksSection = () => {
  const isDarkMode = useDarkMode();
  const theme = useTheme();

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
          <ConceptExplanationSlide
            title="1000 NFTs reserved for each project"
            text="To sell your work as NFTs on Moonpage, you need to create a project. For each project 1000 NFTs are reserved.  (Everyone can create a project.)"
          >
            <div>
              <ProjectWrapper>
                <Project theme={theme}>
                  <BlockSpan>
                    My little Phony <MetaSpan>by 0xdAC1f...a1ec7</MetaSpan>
                  </BlockSpan>

                  <Ids>NFTS 1 - 1000</Ids>
                </Project>
              </ProjectWrapper>
              <ProjectWrapper>
                <Project theme={theme}>
                  <BlockSpan>
                    The great Gatsby <MetaSpan>by 0xdAC1f...a1ec7</MetaSpan>
                  </BlockSpan>
                  <Ids>NFTS 1001 - 2000</Ids>
                </Project>
              </ProjectWrapper>
            </div>
          </ConceptExplanationSlide>
          <ConceptExplanationSlide title="" text="">
            <div>My great illustration</div>
          </ConceptExplanationSlide>
          <ConceptExplanationSlide title="" text="">
            <div>My great illustration</div>
          </ConceptExplanationSlide>
        </EmblaCarouselComponent>
      </Content>
    </Root>
  );
};

export default HowItWorksSection;
