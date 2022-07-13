import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { BG_DARK, PLAIN_WHITE, INTER_BOLD } from '../themes';
const Root = styled.div`
  display: flex;
  justify-content: center;
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
`;

const StyledLink = styled.a``;

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
      </Content>
    </Root>
  );
};

export default Footer;
