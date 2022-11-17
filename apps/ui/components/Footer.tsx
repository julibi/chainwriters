import React, { useMemo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { FONT_SERIF_BOLD, ElementThemeProps } from '../themes';
import { useTheme } from '../hooks/theme';
import LinkWrapper from './LinkWrapper';
import { useDarkMode } from '../hooks/useDarkMode';

const Root = styled.div<ElementThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const SocialMediaLinkWrapper = styled.a<ElementThemeProps>`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
`;

const SocialMediaName = styled.span<ElementThemeProps>`
  font-family: ${FONT_SERIF_BOLD};
  display: inline-block;
  margin-block-start: 1rem;
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const StyledLink = styled.a``;

const Copyright = styled.div<ElementThemeProps>`
  width: 80%;
  margin-block-start: 2rem;
  padding-block-start: 2rem;
  text-align: center;
  border-block-start: 1px ${({ theme }) => theme.MAIN_TEXT_COLOR} solid;
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
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
  line-break: anywhere;
`;

const Footer = () => {
  const theme = useTheme();

  const isDarkMode = useDarkMode();

  const logoPath = useMemo(
    () => (isDarkMode ? '/logo/LogoLight.svg' : '/logo/LogoDark.svg'),
    [isDarkMode]
  );

  return (
    <Root theme={theme}>
      <Content>
        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://mobile.twitter.com/moonpage_nft"
          theme={theme}
        >
          <SocialMediaName theme={theme}>Twitter</SocialMediaName>
        </SocialMediaLinkWrapper>
        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://t.me/moonpagedao"
          theme={theme}
        >
          <SocialMediaName theme={theme}>Telegram</SocialMediaName>
        </SocialMediaLinkWrapper>
        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/moonpage.io/"
          theme={theme}
        >
          <SocialMediaName theme={theme}>Instagram</SocialMediaName>
        </SocialMediaLinkWrapper>

        <SocialMediaLinkWrapper
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.moonpage.io"
          theme={theme}
        >
          <SocialMediaName theme={theme}>Docs</SocialMediaName>
        </SocialMediaLinkWrapper>
        <SocialMediaLinkWrapper
          target="_self"
          rel="noopener noreferrer"
          href="/about#founders"
          theme={theme}
        >
          <SocialMediaName theme={theme}>Team</SocialMediaName>
        </SocialMediaLinkWrapper>
      </Content>
      <Copyright theme={theme}>
        {' '}
        <Image
          height={'90px'}
          width={'90px'}
          src={logoPath}
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
