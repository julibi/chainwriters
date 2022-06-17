import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

interface CursorProps {
  hasCursor: boolean;
}

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
}

const TypeWriter = ({
  cursor = true,
  onFinish,
  pauseLength = 3000,
  shouldErase = true,
  shouldLoop = true,
  speed = 100,
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
      setTypeForward(false);
      setTypedOnce(true);
      onFinish && onFinish();
    }
  }, [currentText, delay, onFinish, text]);

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
      }
      if (!typeForward && shouldErase) {
        erase();
      }
    }, speed);

    return () => {
      console.log('unmounting');
      clearInterval(interval);
    };
  }, [speed, type, erase, shouldErase, shouldLoop, typeForward, typedOnce]);

  return (
    <span>
      {currentText}
      <Cursor hasCursor={cursor}>|</Cursor>
    </span>
  );
};

export default TypeWriter;
