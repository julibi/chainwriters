import React from 'react';
import styled from 'styled-components';
import Title from '../components/Title';

const Root = styled.div`
  min-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FourOhFour = () => {
  return (
    <Root>
      <Title size="xl">Oops, there is nothing here!</Title>
    </Root>
  );
};

export default FourOhFour;
