import React from 'react';
import styled from 'styled-components';
import { Node } from 'slate';
import {
  ButtonsWrapper,
  FadeIn,
  Wrapper,
  InputDescription,
} from '../../pages/create';
import ActionButton from '../ActionButton';
import Title from '../Title';
import RichText from './RichText';

const RichTextWrapper = styled.section`
  margin-block-end: 3rem;
  width: 90%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

interface BlurbFormProps {
  blurb: Node[];
  onKeyDown: (val: Node[]) => void;
  onNextStep: () => void;
  onSubmit: () => void;
  pending: boolean;
  reset: () => void;
}

const BlurbForm = ({
  blurb,
  onKeyDown,
  onNextStep,
  onSubmit,
  pending,
  reset,
}: BlurbFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <Title size="m">Blurb</Title>
        <InputDescription>
          E.G. short introduction to your project, a summary, the first few
          lines or description of the utility of your NFT.
        </InputDescription>
        <RichTextWrapper>
          <RichText onKeyDown={onKeyDown} />
        </RichTextWrapper>
        <ButtonsWrapper>
          <ActionButton
            onClick={() => {
              reset();
              onNextStep();
            }}
            text="Skip"
            disabled={pending}
            loading={false}
            margin="2rem 0 0 0"
            color="#fff"
          />
          <ActionButton
            onClick={onSubmit}
            // @ts-expect-error type does not exist on Node or Descendant
            disabled={!blurb || !blurb[0]?.children[0].text.length || pending}
            loading={pending}
            margin="2rem 0 0 1rem"
            text="Set Blurb"
          />
        </ButtonsWrapper>
      </Wrapper>
    </FadeIn>
  );
};

export default BlurbForm;
