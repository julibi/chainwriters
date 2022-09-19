import React from 'react';
import styled from 'styled-components';
import { FadeIn, Wrapper, InputName } from '../../pages/create';
import ActionButton from '../ActionButton';
import { StyledInputError } from '../InputField';
import RichText from './RichText';

const RichTextWrapper = styled.section`
  margin-block-end: 3rem;
`;

interface TextFormProps {
  onSubmit: () => void;
  onKeyDown: (val: string) => void;
  text: string;
}

const TextForm = ({ onSubmit, onKeyDown, text }: TextFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <InputName>TEXT</InputName>
        <RichTextWrapper>
          <RichText onKeyDown={(val) => onKeyDown(val)} />
        </RichTextWrapper>
        <StyledInputError>
          {text.trim().length < 1 ? 'At least 1 character.' : ' '}
        </StyledInputError>
        <ActionButton
          onClick={onSubmit}
          disabled={text.trim().length < 1}
          loading={false}
          text="Continue"
          margin="1rem 0 0 0 "
        />
      </Wrapper>
    </FadeIn>
  );
};

export default TextForm;
