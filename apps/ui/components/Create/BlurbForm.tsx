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
import { StyledInputError } from '../InputField';
import Title from '../Title';
import RichText from './RichText';

const RichTextWrapper = styled.section`
  margin-block-end: 3rem;
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
        <StyledInputError>
          {blurb?.length < 3 ? 'At bit short.' : ' '}
        </StyledInputError>
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
            disabled={!blurb?.length || pending}
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
