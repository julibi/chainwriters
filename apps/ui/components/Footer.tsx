import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { BG_DARK, PLAIN_WHITE, INTER_BOLD, DISABLED_WHITE } from '../themes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${BG_DARK};
  padding: 3rem;
`;

const Content = styled.div`
  width: 80%;
  display: flex;

  justify-content: space-evenly;
`;

const SocialMediaLinkWrapper = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: ${PLAIN_WHITE};
`;

const SocialMediaName = styled.span`
  font-family: ${INTER_BOLD};
  display: inline-block;
  margin-block-start: 1rem;

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const StyledLink = styled.a``;

const Copyright = styled.div`
  width: 80%;
  margin-block-start: 2rem;
  padding-block-start: 2rem;
  text-align: center;
  border-block-start: 1px ${DISABLED_WHITE} solid;
  color: ${DISABLED_WHITE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Blockspan = styled.span`
  display: inline-block;
`;

const Footer = () => {
  return (
    <Root>
      <Content>
        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://mobile.twitter.com/moonpage"
        >
          <Image
            height={'30px'}
            width={'30px'}
            src={'/Twitter.svg'}
            alt={'Twitter'}
          />
          <SocialMediaName>Twitter</SocialMediaName>
        </SocialMediaLinkWrapper>
        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/polychainmonsters"
        >
          <Image
            height={'30px'}
            width={'30px'}
            src={'/Discord.svg'}
            alt={'Twitter'}
          />
          <SocialMediaName>Discord</SocialMediaName>
        </SocialMediaLinkWrapper>
        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://medium.com/moonpage"
        >
          <Image
            height={'30px'}
            width={'28px'}
            src={'/Medium.svg'}
            alt={'Twitter'}
          />
          <SocialMediaName>Medium</SocialMediaName>
        </SocialMediaLinkWrapper>
        <SocialMediaLinkWrapper
          target="_self"
          rel="noopener noreferrer"
          href="/about#founders"
        >
          <Image
            height={'30px'}
            width={'28px'}
            src={'/Team.svg'}
            alt={'Team'}
          />
          <SocialMediaName>Team</SocialMediaName>
        </SocialMediaLinkWrapper>
      </Content>
      <Copyright>
        {' '}
        <Image
          height={'100px'}
          width={'100px'}
          src={`/logo/Logo.svg`}
          alt="moonpage"
        />
        <Blockspan>Copyright 2022 By Moonpage</Blockspan>
      </Copyright>
    </Root>
  );
};

export default Footer;
