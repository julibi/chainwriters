import React from 'react'
import useTypewriter from 'react-typewriter-hook'
import styled from 'styled-components'

interface TypewriterTypes {
  typedText: string;
}

const Root = styled.h1`
  font-family: 'Roboto Mono Bold', Serif;
  font-size: 65px;
  display: inline-block;

  @media (max-width: 900px) {
    font-size: 42px;
  }
`;

const Typewriter = ({ typedText }: TypewriterTypes) => {
  const typing = useTypewriter(typedText);
  return (
    <Root>{typing}</Root>
  )
}

export default Typewriter