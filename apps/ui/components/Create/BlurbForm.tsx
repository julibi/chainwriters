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
import Title from '../Title';

interface BlurbFormProps {
  blurb: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNextStep: () => void;
  onSubmit: () => void;
  pending: boolean;
  reset: () => void;
}

const BlurbForm = ({
  blurb,
  onChange,
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
            disabled={pending}
            loading={false}
            margin="2rem 0 0 0"
            color="#fff"
          />
          <ActionButton
            onClick={onSubmit}
            disabled={blurb.length < 20 || pending}
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
