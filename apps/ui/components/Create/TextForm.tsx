import React from 'react';
import { FadeIn, Wrapper, InputName, SubmitButton } from '../../pages/create';
import { StyledInputError } from '../InputField';
import RichText from './RichText';

interface TextFormProps {
  onSubmit: () => void;
  onKeyDown: (val: string) => void;
  text: string;
}

// TODO was this text already uploaded?

const TextForm = ({ onSubmit, onKeyDown, text }: TextFormProps) => {
  console.log({ text });
  return (
    <FadeIn>
      <Wrapper>
        <InputName>TEXT</InputName>
        {/* <TextInput
          value={text}
          // @ts-ignore
          onChange={onChange}
  /> */}
        <RichText onKeyDown={(val) => onKeyDown(val)} />
        <StyledInputError>
          {text.trim().length < 1 ? 'At least 1 character.' : ' '}
        </StyledInputError>

        <SubmitButton onClick={onSubmit} disabled={text.length < 1}>
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );
};

export default TextForm;
