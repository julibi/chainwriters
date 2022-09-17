import React from 'react';
import { FadeIn, Wrapper, InputName, SubmitButton } from '../../pages/create';
import { StyledInputError } from '../InputField';
import RichText from './RichText';

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

        <RichText onKeyDown={(val) => onKeyDown(val)} />
        <StyledInputError>
          {text.trim().length < 1 ? 'At least 1 character.' : ' '}
        </StyledInputError>
        <SubmitButton onClick={onSubmit} disabled={text.trim().length < 1}>
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );
};

export default TextForm;
