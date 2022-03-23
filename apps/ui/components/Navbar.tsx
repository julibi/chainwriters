import React, { useState } from 'react'
import Link from 'next/link'
import styled, { ThemeProvider } from 'styled-components'
import WalletConnection from '../components/WalletConnection'
import { useDeviceDetect } from '../hooks/useDeviceDetect'
import { useEagerConnect } from '../hooks/useEagerConnect'
import { BG_NORMAL } from '../themes'

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RootMobile = styled(Root)`
  margin: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  margin: 2rem;
  align-items: center;
`;

const NavListItem = styled.li`
  list-style-type: none;
  margin-inline-end: 1rem;
  text-transform: uppercase;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
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

const BurgerLine = styled.button`
  width: 35px;
  height: 4px;
  background: #fff;
  border-radius: 5px;
  border: none;
  padding: 0;
  transition: all 0.5s ease-in-out;
`;

// TODO fade in out with styled components - find out how to use props with styled components
const MobileNavMenu = styled.div`
  position: absolute;
  top: 50px;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: ${BG_NORMAL};
`;

const MobileNavList = styled.ul`
  margin-block-start: 4rem;
`;

const MobileNavListItem = styled.li`
  margin-block-end: 3rem;
  list-style-type: none;
  text-align: center;
`;

const routes = [
  {name: 'Home', path: '/'},
  {name: 'Create', path: '/create'},
  {name: 'Profile', path: '/profile'}
];

const Navbar = () => {
  const hasTried = useEagerConnect();
  const isMobile = useDeviceDetect();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  if (isMobile) {
    return (
      <RootMobile>
        <BurgerButton onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>
          <BurgerLine
            style={
              isBurgerMenuOpen
                ? {
                    transform: 'rotate(45deg) translate(8px, 8px)',
                  }
                : {}
            }
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
          />
          <BurgerLine
            style={
              isBurgerMenuOpen
                ? {
                    transform: 'rotate(-45deg) translate(8px, -8px)',
                  }
                : {}
            }
          />
        </BurgerButton>
        {isBurgerMenuOpen &&
          <MobileNavMenu>
            <MobileNavList>
              {routes.map((route, idx) => (
                <MobileNavListItem key={idx} onClick={() => setIsBurgerMenuOpen(false)}>
                  <Link href={route.path} passHref>
                    <StyledLink>{route.name}</StyledLink>
                  </Link>
                </MobileNavListItem>
              ))}
            </MobileNavList>
          </MobileNavMenu>
        }
      </RootMobile>
    );
  }
  return (
    <Root>
      <NavList>
        {routes.map((route, idx) =>
          <NavListItem key={idx}>
            <Link href={route.path} passHref>
              <StyledLink>{route.name}</StyledLink>
            </Link>
          </NavListItem>
        )}
        <WalletConnection />
      </NavList>
    </Root>
  );
}

export default Navbar