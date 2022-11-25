import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import WalletConnection from '../components/WalletConnection';
import {
  StyledLink,
  FONT_SERIF_BOLD,
  FONT_SERIF_BLACK,
  ElementThemeProps,
} from '../themes';
import LinkWrapper from '../components/LinkWrapper';
import { useTheme } from '../hooks/theme';
import { useDarkMode } from '../hooks/useDarkMode';
import { useEagerConnect } from '../hooks/useEagerConnect';
import { useWeb3React } from '@web3-react/core';

const Root = styled.div`
  display: block;

  @media (max-width: 900px) {
    display: none;
  }
  display: flex;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem;
`;

const LogoText = styled.p`
  font-family: ${FONT_SERIF_BLACK};
  font-size: 24px;
  margin-left: 1rem;
`;

const RootMobile = styled(Root)`
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }
  align-items: center;
  margin: 1rem;
`;

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  margin: 2rem;
  align-items: center;
  font-family: ${FONT_SERIF_BOLD};
`;

const NavListItem = styled.li`
  list-style-type: none;
  margin-inline-end: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BurgerButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
`;

const BurgerLine = styled.button<ElementThemeProps>`
  width: 35px;
  height: 4px;
  background: ${({ theme }) => theme.MAIN_TEXT_COLOR};
  border-radius: 5px;
  border: none;
  padding: 0;
  transition: all 0.5s ease-in-out;
`;

// TODO fade in out with styled components - find out how to use props with styled components
const MobileNavMenu = styled.div<ElementThemeProps>`
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.BG_NORMAL} !important;
`;

const MobileNavList = styled.ul`
  margin-block-start: 4rem;
  padding-inline-start: 0;
  font-family: ${FONT_SERIF_BOLD};
`;

const MobileNavListItem = styled.li`
  margin-block-end: 3rem;
  list-style-type: none;
  text-align: center;
`;

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Create', path: '/create' },
  { name: 'Bookshelf', path: '/mybookshelf' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const theme = useTheme();
  const hasTried = useEagerConnect();
  const isDarkMode = useDarkMode();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const logoPath = useMemo(
    () => (isDarkMode ? '/logo/LogoLight.svg' : '/logo/LogoDark.svg'),
    [isDarkMode]
  );
  console.log({ hasTried });

  // TODO WALLET CONNECTION ON MOBILE!
  return (
    <>
      <RootMobile>
        <LinkWrapper url="/" target="_self" flex underline={false}>
          <Image
            height={'50px'}
            width={'50px'}
            src={logoPath}
            alt="moonpage"
            priority
          />
        </LinkWrapper>
        <ActionsWrapper>
          {!isBurgerMenuOpen && <WalletConnection />}
          <BurgerButton onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
            <BurgerLine
              style={
                isBurgerMenuOpen
                  ? {
                      transform: 'rotate(45deg) translate(8px, 8px)',
                    }
                  : {}
              }
              theme={theme}
            />
            <BurgerLine
              style={
                isBurgerMenuOpen
                  ? {
                      transform: 'translateX(-50px)',
                      background: 'transparent',
                    }
                  : {}
              }
              theme={theme}
            />
            <BurgerLine
              style={
                isBurgerMenuOpen
                  ? {
                      transform: 'rotate(-45deg) translate(8px, -8px)',
                    }
                  : {}
              }
              theme={theme}
            />
          </BurgerButton>
        </ActionsWrapper>
        {isBurgerMenuOpen && (
          <MobileNavMenu theme={theme}>
            <MobileNavList>
              {routes.map((route, idx) => (
                <MobileNavListItem
                  key={idx}
                  onClick={() => setIsBurgerMenuOpen(false)}
                >
                  <Link href={route.path} passHref>
                    <StyledLink>{route.name}</StyledLink>
                  </Link>
                </MobileNavListItem>
              ))}
            </MobileNavList>
          </MobileNavMenu>
        )}
      </RootMobile>
      <Root>
        <LinkWrapper url="/" target="_self" flex underline={false}>
          <LogoWrapper>
            <Image
              height={'100px'}
              width={'100px'}
              src={logoPath}
              alt="moonpage"
              priority
            />
            <LogoText>moonpage</LogoText>
          </LogoWrapper>
        </LinkWrapper>
        <NavList>
          {routes.map((route, idx) => (
            <NavListItem key={idx}>
              <Link href={route.path} passHref>
                <StyledLink>{route.name}</StyledLink>
              </Link>
            </NavListItem>
          ))}
          <WalletConnection />
        </NavList>
      </Root>
    </>
  );
};

export default Navbar;
