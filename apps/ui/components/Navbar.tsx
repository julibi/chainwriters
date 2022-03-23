import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
`;

const NavListItem = styled.li`
  list-style-type: none;
  display: inline-block;
  margin-inline-end: 1rem;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  > a {
    color: white;
    text-decoration: none;
  }
`;

const routes = [
  {name: 'Home', path: '/'},
  {name: 'Create', path: '/create'},
  {name: 'Profile', path: '/profile'}
];

const Navbar = () => {
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
            <StyledLink href={route.path} passHref>
                {route.name}
            </StyledLink>
          </NavListItem>
        )}
      </NavList>
    </Root>
  );
}

export default Navbar