import React, { ChangeEvent } from 'react'
import { FadeIn, Wrapper, InputName, InputDescription, SubmitButton, TextInput } from '../../pages/create'
import { StyledInputError } from '../InputField'

interface TextFormProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  text: string;
}

// TODO was this text already uploaded?

const TextForm = ({ onChange, onSubmit, text }:TextFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <InputName>TEXT</InputName>
        <InputDescription>
          Type in the main text of your project. The material all this magic is
          about.
        </InputDescription>
        <TextInput
          value={text}
          // @ts-ignore
          onChange={onChange}
        />
        <StyledInputError>
          {text.length < 1 ? 'At least 1 character.' : ' '}
        </StyledInputError>
        <SubmitButton
          onClick={onSubmit}
          disabled={text.length < 1}
        >
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  )
}

export default TextForm