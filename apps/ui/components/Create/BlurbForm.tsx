import React, { ChangeEvent } from 'react'
import {
  ButtonsWrapper,
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  SubmitButton,
  TextInput,
} from '../../pages/create';
import { StyledInputError } from '../InputField'

interface BlurbFormProps {
  blurb: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNextStep: () => void;
  onSubmit: () => void;
}

const BlurbForm = ({ blurb, onChange, onNextStep, onSubmit }: BlurbFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <InputName>BLURB</InputName>
        <InputDescription>
          Write a short text to introduce your project and captivate readers! A
          short summary? Or just the first few lines?
        </InputDescription>
        <TextInput
          style={{ height: '200px' }}
          value={blurb}
          // @ts-ignore
          onChange={onChange}
        />
        <StyledInputError>
          {blurb.length < 20 ? 'At least 20 characters.' : ' '}
        </StyledInputError>
        <ButtonsWrapper>
          <SubmitButton onClick={onNextStep}>
            {'Skip'}
          </SubmitButton>
          <SubmitButton
            onClick={onSubmit}
            disabled={blurb.length < 20}
            style={{ minWidth: '182px', marginInlineStart: '1rem' }}
          >
            Set Blurb
          </SubmitButton>
        </ButtonsWrapper>
      </Wrapper>
    </FadeIn>
  );
}

export default BlurbForm