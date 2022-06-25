import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LinkWrapperProps {
  children: ReactNode;
  url: string;
}

const Root = styled.a`
  color: inherit;
`;

const LinkWrapper = ({ children, url }: LinkWrapperProps) => {
  return (
    <Root target="_blank" rel="noopener noreferrer" href={url}>
      {children}
    </Root>
  );
};

export default LinkWrapper;
