import React from 'react';
import styled from 'styled-components';
import EmblaCarouselComponent from '../EmblaCarouselComponent';
import {
  BASE_BORDER_RADIUS,
  ElementThemeProps,
  FONT_SERIF_REGULAR,
  POP,
} from '../../themes';
import Title from '../Title';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;
  @media (max-width: 900px) {
    margin: 2rem 0;
  }
`;

const RoadBlock = styled.div<ElementThemeProps>`
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  font-family: ${FONT_SERIF_REGULAR};

  @media (max-width: 900px) {
    height: 300px;
  }
`;

const RoadBlockText = styled.span`
  display: inline-block;
  font-size: 14px;
`;

const RoadBlockDate = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  margin-block: 2rem 0;
`;

const Roadmap = () => {
  const isMobile = useDeviceDetect();
  return (
    <Root id="roadmap">
      <Title color={POP}>Roadmap</Title>
      <EmblaCarouselComponent
        controls="Arrows"
        preselectedIndex={2}
        slideWidth={isMobile ? '270px' : '400px'}
        slideHeight="330px"
      >
        <RoadBlock>
          <Title size="m" padding="0 0 2rem 0 !important">
            Prototype Launch
          </Title>
          <RoadBlockText>
            Launch Prototype to Polygon Mainnet and gather first feedback
          </RoadBlockText>
          <RoadBlockDate>October 17th 2022</RoadBlockDate>
        </RoadBlock>
        <RoadBlock>
          <Title size="m" padding="0 0 2rem 0 !important">
            New Website
          </Title>
          <RoadBlockText>
            New Website contains Lightmode and Darkmode, Explanatory and
            Onboarding Elements
          </RoadBlockText>
          <RoadBlockDate>November 23th 2022</RoadBlockDate>
        </RoadBlock>
        <RoadBlock>
          <Title size="m" padding="0 0 2rem 0 !important">
            Voting
          </Title>
          <RoadBlockText>
            Allow writers to launch voting ballots regarding their project
          </RoadBlockText>
          <RoadBlockDate>January 2023</RoadBlockDate>
        </RoadBlock>
        <RoadBlock>
          <Title size="m" padding="0 0 2rem 0 !important">
            Funding
          </Title>
          <RoadBlockText>Raise Funding through Grants and VC</RoadBlockText>
          <RoadBlockDate>January 2023</RoadBlockDate>
        </RoadBlock>
      </EmblaCarouselComponent>
    </Root>
  );
};

export default Roadmap;
