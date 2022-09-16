import React from 'react'
import styled from 'styled-components'
import Loading from '../Loading'
import { FadeIn, ReviewItem } from '../../pages/create';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Waiting = () => {
  return (
    <FadeIn>
    <LoadingWrapper>
      <Loading height={200} />
      <ReviewItem>
        {`We're creating the project for you.
          This takes a minute. Be patient and don't refresh the page plz :)`}
      </ReviewItem>
    </LoadingWrapper>
  </FadeIn>
  )
}

export default Waiting