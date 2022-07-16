import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LinkWrapperProps {
  underline?: boolean;
  flex?: boolean;
  children: ReactNode;
  url: string;
  target?: '_blank' | '_self';
}
type RootProps = {
  underline: LinkWrapperProps['underline'];
  flex: LinkWrapperProps['flex'];
};
const Root = styled.a<RootProps>`
  color: inherit;
  display: ${({ flex }) => (flex ? 'flex' : 'inline-block')};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

const LinkWrapper = ({
  children,
  url,
  target = '_blank',
  underline = true,
  flex = false,
}: LinkWrapperProps) => {
  return (
    <Root
      underline={underline}
      flex={flex}
      target={target}
      rel="noopener noreferrer"
      href={url}
    >
      {children}
    </Root>
  );
};

export default LinkWrapper;
