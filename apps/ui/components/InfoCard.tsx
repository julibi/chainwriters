import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import { Theme } from '../themes';
import { BASE_BORDER_RADIUS, FONT_SERIF_REGULAR } from '../themes';
import Title from './Title';

interface RootTypes {
  theme: Theme;
}

const Root = styled.div<RootTypes>`
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  width: fit-content;
  max-width: 280px;
  font-family: ${FONT_SERIF_REGULAR};
  padding: 2rem;

  @media (max-width: 900px) {
    max-width: none;
  }
`;

const InfoCard = () => {
  const theme = useTheme();
  return (
    <Root theme={theme}>
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
