import React, { useState, useEffect, useCallback, ReactChild } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  ElementThemeProps,
  Theme,
} from '../themes';

const Embla = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-block-end: 3rem;
`;

const Viewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  will-change: transform;
`;

interface SlideProps {
  height?: string;
  width?: string;
  theme: Theme;
}

const Slide = styled.div<SlideProps>`
  flex: 0 0 auto;
  height: ${({ height }) => height ?? 'auto'};
  width: ${({ width }) => width ?? '80%'};
  max-width: 1200px;
  position: relative;
  padding-inline-start: 1.5rem;
  margin-block: 1.5rem;
  counter-increment: embla;
`;

const SlideInner = styled.div<ElementThemeProps>`
  position: relative;
  border-radius: ${BASE_BORDER_RADIUS};
  height: 100%;
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
  active?: boolean;
  onClick: () => void;
  theme: Theme;
  children?: ReactChild;
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

const Arrows = styled.div`
  display: flex;
  list-style: none;
  padding-left: 0;
  justify-content: center;
  margin-block-start: 2rem;
`;

const ArrowButton = styled(BaseButton)`
  position: relative;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  border: 0;
  display: flex;
  align-items: center;
  border-radius: 50%;
  box-shadow: ${({ active, theme }) => active && theme.INSET_BASE_BOX_SHADOW};
`;

const LeftArrowIcon = styled.i<ElementThemeProps>`
  border: solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 5px;

  transform: rotateZ(130deg);
  transition: all 0.4s ease-in-out;
`;

const RightArrowIcon = styled.i<ElementThemeProps>`
  border: solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 5px;

  transform: rotateZ(310deg);
  transition: all 0.4s ease-in-out;
`;

const DotButton = ({ selected, onClick }) => {
  const theme = useTheme();
  return <Dot active={selected} onClick={onClick} theme={theme} />;
};

interface EmblaCarouselComponentProps {
  children: ReactChild[] | any[];
  controls?: 'Drops' | 'Arrows';
  preselectedIndex?: number;
  slideHeight?: string;
  slideWidth?: string;
}

const EmblaCarouselComponent = ({
  children,
  controls = 'Drops',
  preselectedIndex = 0,
  slideHeight = 'auto',
  slideWidth = '80%',
}: EmblaCarouselComponentProps) => {
  const theme = useTheme();
  const [viewport, embla] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(preselectedIndex);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback((index) => embla.scrollTo(index), [embla]);

  useEffect(() => {
    if (embla && preselectedIndex) {
      embla.scrollTo(preselectedIndex);
    }
  }, [embla, preselectedIndex]);

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
            <Slide key={index} height={slideHeight} width={slideWidth}>
              <SlideInner theme={theme}>{Child}</SlideInner>
            </Slide>
          ))}
        </Container>
      </Viewport>
      {controls === 'Drops' && (
        <Dots>
          {scrollSnaps.map((snap, index) => (
            <DotButton
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
              key={index}
            />
          ))}
        </Dots>
      )}
      {controls === 'Arrows' && (
        <Arrows>
          <ArrowButton onClick={() => embla.scrollPrev()} theme={theme}>
            <LeftArrowIcon theme={theme} />
          </ArrowButton>
          <ArrowButton onClick={() => embla.scrollNext()}>
            <RightArrowIcon theme={theme} />
          </ArrowButton>
        </Arrows>
      )}
    </Embla>
  );
};

export default EmblaCarouselComponent;
