import React from 'react';
import styled from 'styled-components';
import { POP } from '../../themes';

import SlidingCard from '../SlidingCard';
import Title from '../Title';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 8rem 8rem 8rem;

  @media (max-width: 900px) {
    padding: 0 2rem 2rem 2rem;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
`;

const MainSellingPointsSection = () => {
  return (
    <Root>
      <Title color={POP} margin="1rem 1rem 3rem 1rem" size="l" textAlign="left">
        You deserve a place to unleash your creativity.
      </Title>
      <Cards>
        <SlidingCard delay={0} />
        <SlidingCard delay={1} />
        <SlidingCard delay={2} />
        <SlidingCard delay={3} />
      </Cards>
    </Root>
  );
};

export default MainSellingPointsSection;
