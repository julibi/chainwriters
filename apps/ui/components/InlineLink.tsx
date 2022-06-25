import React from 'react';
import styled from 'styled-components';

interface InlineLinkProps {
  text: string;
  url: string;
}

const Root = styled.a`
  color: inherit;
`;

const InlineLink = ({ text, url }: InlineLinkProps) => {
  return (
    <Root target="_blank" rel="noopener noreferrer" href={url}>
      {text}
    </Root>
  );
};

export default InlineLink;
