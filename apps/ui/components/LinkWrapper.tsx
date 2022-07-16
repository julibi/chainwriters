import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LinkWrapperProps {
  children: ReactNode;
  url: string;
  target?: '_blank' | '_self';
}

const Root = styled.a`
  color: inherit;
  text-decoration: none;
  display: flex;
`;

const LinkWrapper = ({
  children,
  url,
  target = '_blank',
}: LinkWrapperProps) => {
  return (
    <Root target={target} rel="noopener noreferrer" href={url}>
      {children}
    </Root>
  );
};

export default LinkWrapper;
