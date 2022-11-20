import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import { BaseButton, BASE_BORDER_RADIUS, ElementThemeProps } from '../themes';
import { Theme } from '@material-ui/core';

const Embla = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Viewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  will-change: transform;
`;

const Slide = styled.div`
  flex: 0 0 auto;
  width: 80%;
  max-width: 1200px;
  position: relative;
  padding-inline-start: 1.5rem;
  margin-block: 1.5rem;
  counter-increment: embla;
`;

const SlideInner = styled.div<ElementThemeProps>`
  position: relative;
  border-radius: ${BASE_BORDER_RADIUS};
  min-height: 200px;
  font-size: 5rem;
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
`;

const Dots = styled.div`
  display: flex;
  list-style: none;
  padding-left: 0;
  justify-content: center;
  margin-block-start: 2rem;
`;

interface DotButtonProps {
  active: boolean;
  onClick: () => void;
  theme: Theme;
}

const Dot = styled(BaseButton)<DotButtonProps>`
  position: relative;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  border: 0;
  display: flex;
  align-items: center;
  border-radius: 50%;
  box-shadow: ${({ active, theme }) => active && theme.INSET_BASE_BOX_SHADOW};
`;

const DotButton = ({ selected, onClick }) => {
  const theme = useTheme();
  return <Dot active={selected} onClick={onClick} theme={theme} />;
};

const EmblaCarouselComponent = ({ children }) => {
  const theme = useTheme();
  const [viewport, embla] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback((index) => embla.scrollTo(index), [embla]);

  useEffect(() => {
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
    };
    if (embla) {
      setScrollSnaps(embla.scrollSnapList());
      embla.on('select', onSelect);
      onSelect();
    }
  }, [embla]);

  return (
    <Embla>
      <Viewport ref={viewport}>
        <Container>
          {children.map((Child, index) => (
            <Slide key={index}>
              <SlideInner theme={theme}>{Child}</SlideInner>
            </Slide>
          ))}
        </Container>
      </Viewport>
      <Dots>
        {scrollSnaps.map((snap, index) => (
          <DotButton
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
            key={index}
          />
        ))}
      </Dots>
    </Embla>
  );
};

export default EmblaCarouselComponent;
