import React, { ReactChild, useState } from 'react';
import styled from 'styled-components';
import {
  BASE_BORDER_RADIUS,
  FONT_SERIF_BOLD,
  ElementThemeProps,
  Theme,
} from '../themes';
import { useTheme } from '../hooks/theme';

import CSS from 'csstype';

const Root = styled.div<ElementThemeProps>`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  border-radius: ${BASE_BORDER_RADIUS};
  font-family: ${FONT_SERIF_BOLD};

  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3<ElementThemeProps>`
  display: inline-block;
  font-size: 16px;
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
`;

const Content = styled.div`
  margin-block-start: 1rem;
  animation: fadein 1s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ArrowWrapper = styled.button<ElementThemeProps>`
  background-color: ${({ theme }) => theme.BG_NORMAL};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  border-radius: 50%;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }

  :disabled {
    :hover {
      cursor: default;
    }
  }

  :active {
    box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};
  }
`;

interface ArrowProps {
  up: boolean;
  theme: Theme;
}

export const Arrow = styled.i<ArrowProps>`
  border: solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 3px;

  transform: ${({ up }) => (up ? 'rotateZ(225deg)' : 'rotate(45deg)')};
  transition: all 0.4s ease-in-out;
`;

interface MoreDetailsProps {
  active?: boolean;
  children: ReactChild;
  styles?: CSS.Properties;
  title: string | ReactChild;
  open?: boolean;
}

const MoreDetails = ({ children, styles, title, open }: MoreDetailsProps) => {
  const theme = useTheme();
  const [up, setUp] = useState(open ? false : true);

  return (
    <Root style={styles} theme={theme}>
      <Header>
        <Title theme={theme}>{title}</Title>
        {!up && <Content>{children}</Content>}
      </Header>
      <div>
        <ArrowWrapper onClick={() => setUp(!up)} theme={theme}>
          <Arrow className="arrow" up={!up} theme={theme} />
        </ArrowWrapper>
      </div>
    </Root>
  );
};

export default MoreDetails;
