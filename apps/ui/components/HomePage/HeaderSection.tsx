import { POP } from '../../themes';
import React from 'react';
import styled from 'styled-components';
import ActionButton from '../ActionButton';
import BubbleAnimation from '../BubbleAnimation';
import Title from '../Title';
import { useRouter } from 'next/router';
import TypeWriter from '../TypeWriter';
import { useTheme } from '../../hooks/theme';

const Root = styled.section`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LandingHeader = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10rem 8rem 8rem 8rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 2rem;
  }
`;

const Buttons = styled.div``;

const LandingAnimationWrapper = styled.section`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;

    display: none;
  }
`;

const LandingAnimation = styled.div`
  width: 500px;
  height: 500px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const HeaderMobile = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

const HeaderDesktop = styled.div`
  display: block;

  @media (max-width: 900px) {
    display: none;
  }
`;

const HeaderSection = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Root>
      <LandingHeader>
        <Title color={POP} size="s" textAlign="left">
          Literary NFT Platform
        </Title>
        <HeaderMobile>
          <Title
            color={POP}
            padding="1rem 1rem 0 1rem"
            size="xl"
            textAlign="left"
          >
            <TypeWriter
              cursor
              shouldErase={false}
              shouldLoop={false}
              text="The web3 literature lab. For the first writers on the moon."
            />
          </Title>
        </HeaderMobile>
        <HeaderDesktop>
          <Title
            color={POP}
            padding="1rem 1rem 0 1rem"
            size="xl"
            textAlign="left"
          >
            The web3 literature lab.
          </Title>
          <Title
            color={POP}
            padding="1rem 1rem 0 1rem"
            size="xl"
            textAlign="left"
          >
            For the first writers on the moon.
          </Title>
        </HeaderDesktop>
        <Title size="s" textAlign="left">
          Moonpage is a free and easy launchpad for turning your text into NFTs.
        </Title>
        <Buttons>
          <ActionButton
            onClick={() => router.push('/create')}
            loading={false}
            text="Create"
            margin="2rem 2rem 2rem 0"
          />
          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=mwo9N8t4G7s"
            rel="noopener noreferrer"
          >
            <ActionButton
              onClick={() => ({})}
              loading={false}
              text="Watch Demo"
              margin="0"
              color={theme.MAIN_TEXT_COLOR}
            />
          </a>
        </Buttons>
      </LandingHeader>
      <LandingAnimationWrapper>
        <LandingAnimation>
          <BubbleAnimation />
        </LandingAnimation>
      </LandingAnimationWrapper>
    </Root>
  );
};

export default HeaderSection;
