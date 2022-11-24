import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {
  BASE_BORDER_RADIUS,
  ElementThemeProps,
  POP,
  StyledLink,
  Theme,
} from '../../themes';
import EmblaCarouselComponent from '../EmblaCarouselComponent';
import Title from '../Title';
import ConceptExplanationSlide from '../HowItWorks/ConceptExplanationSlide';
import { useTheme } from '../../hooks/theme';
import Countdown from '../Countdown';

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
  justify-content: space-between;
`;

const Illustration = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectWrapper = styled.div`
  font-family: monospace;
  width: 100%;
  margin-block-end: 1rem;
`;

const Project = styled.div<ElementThemeProps>`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: ${BASE_BORDER_RADIUS};
  border: 5px ${POP} solid;
  font-size: 24px;

  @media (max-width: 900px) {
    border: 4px ${POP} solid;
    font-size: 14px;
  }
`;

const BlockSpan = styled.span`
  display: inline-block;
`;

const Etc = styled.span`
  display: inline-block;
  height: fit-content;
  font-family: monospace;
  font-size: 24px;

  @media (max-width: 900px) {
    font-size: 14px;
  }
`;

const Ids = styled.span<ElementThemeProps>`
  display: inline-block;
  font-weight: 600;
  height: fit-content;
  color: ${POP};
`;

const LockWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 30%;
  left: 30%;

  @media (max-width: 900px) {
    top: 20%;
    left: 20%;
  }
`;

const TextBackground = styled.span`
  font-family: monospace;
  font-size: 16px;
  filter: blur(1px);

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const ProgressBar = styled.div<ElementThemeProps>`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 50px;
  border: 5px solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
`;

const Bar = styled.div`
  position: absolute;
  top: 5%;
  left: 0;
  width: 33%;
  height: 90%;
  border-radius: 40px;
  background-color: ${POP};
`;

const MarkerList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

interface MarkerListItemProps {
  section: number;
  theme: Theme;
  text: string;
}

const MarkerListItem = styled.li<MarkerListItemProps>`
  position: absolute;
  top: 0;
  left: ${({ section }) => section}%;
  width: 5px;
  height: 100%;
  background-color: ${({ theme }) => theme.MAIN_TEXT_COLOR};

  ::before,
  ::after {
    position: absolute;
    content: '${({ text }) => text}';
    top: 50px;
    left: 0;
    width: 20px;
    height: 20px;
    transform: skew(-20deg, 30deg);
    font-size: 12px;
    font-family: monospace;
    font-weight: bold;
    line-height: 1;
  }
`;

const EditionInfo = styled.div`
  margin-block-start: 80px;
  font-family: monospace;
  font-weight: bold;
  font-size: 16px;

  @media (max-width: 900px) {
    margin-block-start: 60px;
    font-size: 12px;
  }
`;

const EditionInfoList = styled.ul`
  margin: 0 0 1rem 0;

  @media (max-width: 900px) {
    margin: 0;
  }
`;

const DesktopListItem = styled.li`
  display: inline-block;
  list-style: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

const ListItem = styled.li`
  list-style: none;
`;

const GenEdExample = styled.div`
  font-family: monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProjectTitleExample = styled.span`
  display: inline-block;
  font-size: 36px;
  font-weight: bold;

  @media (max-width: 900px) {
    font-size: 24px;
  }
`;

const ProjectExample = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${BASE_BORDER_RADIUS};
  border: 5px solid;
  font-size: 24px;

  @media (max-width: 900px) {
    border: 4px ${POP} solid;
    font-size: 14px;
  }
`;

const TimerExample = styled.div``;
const StartingPrice = styled.div``;
const Chart = styled.div<ElementThemeProps>`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: repeating-conic-gradient(
    from 0deg,
    ${POP} 0deg 270deg,
    ${({ theme }) => theme.BG_NORMAL} 270deg 360deg
  );

  @media (max-width: 900px) {
    width: 80px;
    height: 80px;
  }
`;

const Hole = styled.div<ElementThemeProps>`
  height: 50px;
  width: 50px;
  font-size: 16px;
  font-weight: bold;

  border-radius: 50%;

  background-color: ${({ theme }) => theme.BG_NORMAL};
`;

const DistributionIllustrationWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CoinLockWrapper = styled.div`
  position: relative;
`;

const CoinsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 35%;
`;

const SettingsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
`;

const ArrowsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 5rem;

  @media (max-width: 900px) {
    display: none;
  }
`;
const ArrowLeft = styled.div<ElementThemeProps>`
  display: block;
  width: 25px;
  height: 25px;
  border-top: 5px solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  border-left: 5px solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  transform: rotate(270deg);

  ::after {
    content: '';
    display: block;
    width: 5px;
    height: 45px;
    background-color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
    transform: rotate(-45deg) translate(15px, 5px);
    left: 0;
    top: 0;
  }
`;

const ArrowDivider = styled.div`
  width: 150px;
`;

const ArrowRight = styled.div<ElementThemeProps>`
  display: block;
  width: 25px;
  height: 25px;
  border-top: 5px solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  border-left: 5px solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  transform: rotate(180deg);

  ::after {
    content: '';
    display: block;
    width: 5px;
    height: 45px;
    background-color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
    transform: rotate(-45deg) translate(15px, 5px);
    left: 0;
    top: 0;
  }
`;

const FundReceiversWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
`;

const AvatarWrapper = styled.div``;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
`;

const LogoWrapper = styled.div``;

const HowItWorksSection = () => {
  const theme = useTheme();
  const TwentyFourHoursFromNow = Math.floor(
    (new Date().getTime() + 24 * 60 * 60 * 1000) / 1000
  );

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
            title="1000 NFTs for each project"
            text="On Moonpage, everyone with a wallet can sell their work as NFTs. You just need to create a project. For each project 1000 NFTs are reserved. To create a project, simply click on create in the top navigation. We guide you through the process. It's a breeze."
          >
            <Illustration>
              <ProjectWrapper>
                <Project theme={theme}>
                  <BlockSpan>My little Phony</BlockSpan>

                  <Ids>NFTs 1 - 1000</Ids>
                </Project>
              </ProjectWrapper>
              <ProjectWrapper>
                <Project theme={theme}>
                  <BlockSpan>Harry Clutter</BlockSpan>
                  <Ids>NFTs 1001 - 2000</Ids>
                </Project>
              </ProjectWrapper>
              <ProjectWrapper>
                <Project theme={theme}>
                  <BlockSpan>Your Project</BlockSpan>
                  <Ids>NFTs 2001 - 3000</Ids>
                </Project>
              </ProjectWrapper>
              <Etc>And so on...</Etc>
            </Illustration>
          </ConceptExplanationSlide>
          <ConceptExplanationSlide
            title="Unlock text with NFT"
            text="When you own an NFT, you can unlock the text. Go to a project's page. You see a READ button on the top left corner of the cover image – not visible without NFT. Or, you go to the Bookshelf tab and see a list of all your NFTs. Click on READ there."
          >
            <>
              <TextBackground>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
                hendrerit in vulputate velit esse molestie consequat, vel illum
                dolore eu
              </TextBackground>
              <LockWrapper>
                <Image
                  height={'128px'}
                  width={'128px'}
                  src={'/LockIcon.svg'}
                  alt={'Lock Icon'}
                />
              </LockWrapper>
            </>
          </ConceptExplanationSlide>
          <ConceptExplanationSlide
            title="Selling in Editions"
            text="Each project is sold in editions. You as the writer determine the amount and price of the NFTs for each edition. So it is up to you, how many editions there will be. As mentioned, the maximum amount of NFTs per project is 1000."
          >
            <div>
              <ProgressBar theme={theme}>
                <Bar theme={theme} />
                <MarkerList>
                  <MarkerListItem section={2} text="Gen Ed" theme={theme} />
                  <MarkerListItem section={25} text="2nd Ed" theme={theme} />
                  <MarkerListItem section={60} text="3rd Ed" theme={theme} />
                </MarkerList>
              </ProgressBar>
              <EditionInfo>
                Genesis Edition
                <EditionInfoList>
                  <DesktopListItem>Starting Price: 5 Matic</DesktopListItem>
                  <ListItem>10/10 Sold</ListItem>
                </EditionInfoList>
                2nd Edition
                <EditionInfoList>
                  <DesktopListItem>Price: 12 Matic</DesktopListItem>
                  <ListItem>200/200 Sold</ListItem>
                </EditionInfoList>
                3rd Edition
                <EditionInfoList>
                  <DesktopListItem>Price: 20 Matic</DesktopListItem>
                  <ListItem>73/270 Sold</ListItem>
                </EditionInfoList>
              </EditionInfo>
            </div>
          </ConceptExplanationSlide>
          <ConceptExplanationSlide
            title="Genesis Edition"
            text="The first edition of each project is called Genesis Edition. In a Genesis Edition 1 NFT at a time is sold in a reverse auction. Every NFT starts at the starting price set by the writer and goes down to 0 within 24 hours. All following editions of a project are sold with a fixed price. No auctions. People can buy multiple NFTs at once."
          >
            <GenEdExample>
              <ProjectTitleExample>Harry Clutter</ProjectTitleExample>
              <ProjectExample>
                <TimerExample>
                  Auction ends in <Countdown end={TwentyFourHoursFromNow} />
                </TimerExample>
                <Chart theme={theme}>
                  <Hole theme={theme}>7/10 Minted</Hole>
                </Chart>
                <StartingPrice>Starting Price: 5 Matic</StartingPrice>
              </ProjectExample>
            </GenEdExample>
          </ConceptExplanationSlide>
          <ConceptExplanationSlide
            title="Funds distribution on edition sell out"
            text="The funds collected from minting are locked inside a smart contract and get automatically distributed once an edition sells out. 85% to the author, 15% to Moonpage. 
            And only then, can you unlock the next edition. Again for the next edition: You as the author determine the amount & price."
          >
            <DistributionIllustrationWrapper>
              <CoinLockWrapper>
                <CoinsWrapper>
                  <Image
                    height={'90px'}
                    width={'90px'}
                    src={'/Coins.svg'}
                    alt={'Team'}
                    priority
                  />
                </CoinsWrapper>
                <SettingsWrapper>
                  <Image
                    height={'90px'}
                    width={'90px'}
                    src={'/Settings.svg'}
                    alt={'Team'}
                    priority
                  />
                </SettingsWrapper>
              </CoinLockWrapper>
              <ArrowsWrapper>
                <ArrowLeft theme={theme} />
                <ArrowDivider />
                <ArrowRight theme={theme} />
              </ArrowsWrapper>
              <FundReceiversWrapper>
                <Avatar>
                  <AvatarWrapper>
                    <Image
                      height={'80px'}
                      width={'80px'}
                      src={'/Avatar.svg'}
                      alt={'Avatar'}
                      priority
                    />
                  </AvatarWrapper>
                  <BlockSpan>85%</BlockSpan>
                </Avatar>
                <Logo>
                  <LogoWrapper>
                    <Image
                      height={'80px'}
                      width={'80px'}
                      src={'/logo/LogoPop.svg'}
                      alt={'Logo Pop'}
                      priority
                    />
                  </LogoWrapper>
                  <BlockSpan>15%</BlockSpan>
                </Logo>
              </FundReceiversWrapper>
            </DistributionIllustrationWrapper>
          </ConceptExplanationSlide>
        </EmblaCarouselComponent>
      </Content>
    </Root>
  );
};

export default HowItWorksSection;
