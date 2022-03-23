import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import WalletConnection from '../components/WalletConnection'
import { useDeviceDetect } from '../hooks/useDeviceDetect'
import { useEagerConnect } from '../hooks/useEagerConnect'

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NavList = styled.ul`
  list-style-type: none;
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

const routes = [
  {name: 'Home', path: '/'},
  {name: 'Create', path: '/create'},
  {name: 'Profile', path: '/profile'}
];

const Navbar = () => {
  const hasTried = useEagerConnect();
  const isMobile = useDeviceDetect();
  if (isMobile) {
    return (
      <div>Mobile Navbar</div>
    )
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