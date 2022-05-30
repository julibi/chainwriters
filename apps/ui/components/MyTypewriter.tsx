import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import styled from 'styled-components'

interface TypewriterTypes {
  cursor: boolean;
  typedText: string[];
  loop?: number;
  deleteSpeed?: number;
  onLoopDone?: VoidFunction;
  fontSize?: number;
}

interface RootProps {
  fontSize: number;
}
const Root = styled.h1<RootProps>`
  font-family: 'Roboto Mono Bold', Serif;
  font-size: ${({ fontSize }) => fontSize}px;
  display: inline-block;

  @media (max-width: 900px) {
    font-size: 42px;
  }
`;

const MyTypewriter = ({ typedText, cursor, loop = 1, deleteSpeed, fontSize = 65, onLoopDone }: TypewriterTypes) => {
  return (
    <Root fontSize={fontSize}>
      <Typewriter
        onLoopDone={onLoopDone}
        loop={loop}
        cursor={cursor}
        cursorStyle='|'
        typeSpeed={70}
        deleteSpeed={deleteSpeed}
        words={typedText}
      />
    </Root>
  )
}

export default MyTypewriter