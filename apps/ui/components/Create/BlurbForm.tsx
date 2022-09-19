import React, { ChangeEvent } from 'react';
import {
  ButtonsWrapper,
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  TextInput,
} from '../../pages/create';
import ActionButton from '../ActionButton';
import { StyledInputError } from '../InputField';

interface BlurbFormProps {
  blurb: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNextStep: () => void;
  onSubmit: () => void;
  reset: () => void;
}

const BlurbForm = ({
  blurb,
  onChange,
  onNextStep,
  onSubmit,
  reset,
}: BlurbFormProps) => {
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
          <ActionButton
            onClick={() => {
              reset();
              onNextStep();
            }}
            text="Skip"
            disabled={false}
            loading={false}
            margin="0"
            color="#fff"
          />
          <ActionButton
            onClick={onSubmit}
            disabled={blurb.length < 20}
            loading={false}
            margin="0 0 0 1rem"
            text="Set Blurb"
          />
        </ButtonsWrapper>
      </Wrapper>
    </FadeIn>
  );
};

export default BlurbForm;
