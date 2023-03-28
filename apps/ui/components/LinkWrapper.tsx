import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import { Theme } from '../themes';

interface LinkWrapperProps {
  color?: string;
  underline?: boolean;
  flex?: boolean;
  children: ReactNode;
  url: string;
  target?: '_blank' | '_self';
  passHref?: boolean;
}
type RootProps = {
  underline: LinkWrapperProps['underline'];
  flex: LinkWrapperProps['flex'];
  theme: Theme;
  passHref?: boolean;
};
const Root = styled.a<RootProps>`
  color: ${({ theme, color }) => (color ? color : theme.MAIN_TEXT_COLOR)};
  display: ${({ flex }) => (flex ? 'flex' : 'inline-block')};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

const LinkWrapper = ({
  children,
  url,
  target = '_blank',
  underline = true,
  flex = false,
  passHref = false,
  color,
}: LinkWrapperProps) => {
  const theme = useTheme();

  return (
    <Root
      color={color}
      underline={underline}
      flex={flex}
      target={target}
      rel="noopener noreferrer"
      href={url}
      theme={theme}
      passHref={passHref}
    >
      {children}
    </Root>
  );
};

export default LinkWrapper;
