import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FONT_SERIF_BLACK, FONT_SERIF_BOLD } from '../themes';

interface CursorProps {
  hasCursor: boolean;
}

interface RootProps {
  fontSizeDesktop: number;
  fontSizeMobile: number;
}

const Root = styled.span<RootProps>`
  font-family: ${FONT_SERIF_BLACK};
  font-size: ${({ fontSizeDesktop }) => fontSizeDesktop}px;

  @media (max-width: 900px) {
    font-size: ${({ fontSizeMobile }) => fontSizeMobile}px;
  }
`;

const Cursor = styled.span<CursorProps>`
  display: inline-block;
  color: ${({ hasCursor }) => (hasCursor ? 'currentColor' : 'transparent')};
  animation: blink 0.5s ease-in-out 0s infinite alternate;
  margin-inline-start: 3px;

  @keyframes blink {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

interface TypeWriterProps {
  cursor?: boolean;
  onFinish?: () => void;
  pauseLength?: number;
  shouldErase?: boolean;
  shouldLoop?: boolean;
  speed?: number;
  text: string;
  fontSizeDesktop?: number;
  fontSizeMobile?: number;
}

const TypeWriter = ({
  cursor = true,
  onFinish,
  pauseLength = 3000,
  shouldErase = true,
  shouldLoop = true,
  speed = 100,
  fontSizeDesktop = 72,
  fontSizeMobile = 54,
  text,
}: TypeWriterProps) => {
  const [currentText, setCurrentText] = useState<string>('');
  const [typeForward, setTypeForward] = useState<boolean>(true);
  const [typedOnce, setTypedOnce] = useState<boolean>(false);
  const delay = useCallback(
    () => new Promise((res) => setTimeout(res, pauseLength)),
    [pauseLength]
  );
  const type = useCallback(async () => {
    if (currentText.length < text.length) {
      const displayText = text.substring(0, currentText.length + 1);
      setCurrentText(displayText);
    } else {
      await delay();
      if (shouldErase) {
        setTypeForward(false);
      }
      setTypedOnce(true);
      onFinish && onFinish();
    }
  }, [currentText, delay, onFinish, shouldErase, text]);

  const erase = useCallback(async () => {
    if (currentText.length) {
      const displayText = text.substring(0, currentText.length - 1);
      setCurrentText(displayText);
    } else {
      await delay();
      setTypeForward(true);
    }
  }, [currentText, delay, text]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeForward) {
        if (typedOnce && !shouldLoop) return;
        type();
      } else {
        if (shouldErase) {
          erase();
        }
      }
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [speed, type, erase, shouldErase, shouldLoop, typeForward, typedOnce]);

  return (
    <Root fontSizeDesktop={fontSizeDesktop} fontSizeMobile={fontSizeMobile}>
      {currentText}
      <Cursor hasCursor={cursor}>|</Cursor>
    </Root>
  );
};

export default TypeWriter;
