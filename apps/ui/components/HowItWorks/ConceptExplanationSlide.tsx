import React, { ReactChild } from 'react';
import styled from 'styled-components';
import { FONT_SERIF_BOLD } from '../../themes';
import Title from '../Title';

const Root = styled.div`
  height: 500px;
  padding: 3rem;
  display: flex;

  @media (max-width: 900px) {
    padding: 1rem;
    flex-direction: column;
  }
`;

const TextSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  margin-inline-end: 2rem;

  @media (max-width: 900px) {
    margin-inline-end: 0;
  }
`;

const Text = styled.span`
  font-family: ${FONT_SERIF_BOLD};
  font-size: 16px;
`;

const IllustrationSide = styled.div`
  flex: 1;
`;

interface ConceptExplanationSlideProps {
  title: string;
  text: string;
  children: ReactChild;
}

const ConceptExplanationSlide = ({
  title,
  text,
  children,
}: ConceptExplanationSlideProps) => {
  return (
    <Root>
      <TextSide>
        <Title textAlign="left" padding="0" margin="0 0 1rem 0">
          {title}
        </Title>
        <Text>{text}</Text>
      </TextSide>
      <IllustrationSide>{children}</IllustrationSide>
    </Root>
  );
};

export default ConceptExplanationSlide;
