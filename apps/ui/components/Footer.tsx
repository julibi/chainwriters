import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { MAIN_TEXT_COLOR, FONT_SERIF_BOLD, DISABLED_WHITE } from '../themes';
import LinkWrapper from './LinkWrapper';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${MAIN_TEXT_COLOR};
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 2rem 1rem;
  }
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
  color: ${MAIN_TEXT_COLOR};
`;

const SocialMediaName = styled.span`
  font-family: ${FONT_SERIF_BOLD};
  display: inline-block;
  margin-block-start: 1rem;
  color: #fff;

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

const GreyWrapper = styled.span`
  margin-block-start: 1rem;
  color: ${DISABLED_WHITE};
  line-break: anywhere;
`;

const Footer = () => {
  return (
    <Root>
      <Content>
        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://mobile.twitter.com/moonpage_nft"
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
          href="https://t.me/moonpagedao"
        >
          <Image
            height={'30px'}
            width={'30px'}
            src={'/Telegram.svg'}
            alt={'Twitter'}
            priority
          />
          <SocialMediaName>Telegram</SocialMediaName>
        </SocialMediaLinkWrapper>
        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/moonpage.io/"
        >
          <Image
            height={'30px'}
            width={'30px'}
            src={'/Instagram.svg'}
            alt={'Instagram'}
            priority
          />
          <SocialMediaName>Instagram</SocialMediaName>
        </SocialMediaLinkWrapper>

        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.moonpage.io"
        >
          <Image
            height={'30px'}
            width={'28px'}
            src={'/Docs.svg'}
            alt={'Twitter'}
            priority
          />
          <SocialMediaName>Docs</SocialMediaName>
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
            priority
          />
          <SocialMediaName>Team</SocialMediaName>
        </SocialMediaLinkWrapper>
      </Content>
      <Copyright>
        {' '}
        <Image
          height={'130px'}
          width={'130px'}
          src={`/logo/Logo.svg`}
          alt="moonpage"
          priority
        />
        <Blockspan>© 2022 Moonpage. All rights reserved.</Blockspan>
        <GreyWrapper>
          <LinkWrapper
            url="https://polygonscan.com/address/0x0eC473B1BD821D386cd7209203Ba6826Fd653B96#code"
            underline={false}
          >
            {'Moonpage Collection: 0x0eC473B1BD821D386cd7209203Ba6826Fd653B96'}
          </LinkWrapper>
        </GreyWrapper>
        <GreyWrapper>
          <LinkWrapper url="https://moonpage.gitbook.io/moonpage-terms-of-service/">
            {'Terms Of Service'}
          </LinkWrapper>
        </GreyWrapper>
      </Copyright>
    </Root>
  );
};

export default Footer;
