import React, { ReactChild } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

type NextLinkProps = {
  href: string;
  name: ReactChild;
  underline?: boolean;
  color?: string;
};

type RootProps = {
  underline?: NextLinkProps['underline'];
  color?: NextLinkProps['color'];
};
const Root = styled.a<RootProps>`
  color: ${({ color }) => color ?? '#fff'};
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

const NextLink = ({ href, name, underline = true }: NextLinkProps) => {
  return (
    <span>
      {' '}
      <Link href={href} passHref>
        <Root target="_blank" rel="noopener noreferrer" underline>
          {name}
        </Root>
      </Link>{' '}
    </span>
  );
};

export default NextLink;
