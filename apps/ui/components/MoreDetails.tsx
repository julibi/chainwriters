import React, { ReactChild, useState } from 'react';
import styled from 'styled-components';
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  INSET_BASE_BOX_SHADOW,
  PLAIN_WHITE,
} from '../themes';
import CSS from 'csstype';

const Root = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  box-shadow: ${BASE_BOX_SHADOW};
  border-radius: ${BASE_BORDER_RADIUS};

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

const Title = styled.h3`
  display: inline-block;
  font-family: 'Roboto Mono Bold', Serif;
  font-size: 13px;
  color: ${PLAIN_WHITE};
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

const ArrowWrapper = styled.button`
  background-color: ${BG_NORMAL};
  box-shadow: ${BASE_BOX_SHADOW};
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
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }
`;

interface ArrowProps {
  up: boolean;
}

const Arrow = styled.i<ArrowProps>`
  border: solid ${PLAIN_WHITE};
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
  const [up, setUp] = useState(open ? false : true);

  return (
    <Root style={styles}>
      <Header>
        <Title>{title}</Title>
        {!up && <Content>{children}</Content>}
      </Header>
      <div>
        <ArrowWrapper onClick={() => setUp(!up)}>
          <Arrow className="arrow" up={up} />
        </ArrowWrapper>
      </div>
    </Root>
  );
};

export default MoreDetails;
