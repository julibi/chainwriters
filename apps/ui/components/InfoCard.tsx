import React from 'react';
import styled from 'styled-components';
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  FONT_SERIF_REGULAR,
} from '../themes';
import Title from './Title';

const Root = styled.div`
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  width: fit-content;
  max-width: 280px;
  font-family: ${FONT_SERIF_REGULAR};
  padding: 2rem;

  @media (max-width: 900px) {
    max-width: none;
  }
`;

const InfoCard = () => {
  return (
    <Root>
      <Title margin="0 1rem 1rem 0" padding="0" size="s" textAlign="left">
        Simple and flexible
      </Title>
      <p>
        You're in charge! Determine the price and the amount of NFTs. Customize
        everything in the way that you want
      </p>
    </Root>
  );
};

export default InfoCard;
