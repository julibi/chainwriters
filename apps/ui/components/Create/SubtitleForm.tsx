import React, { ChangeEvent } from 'react'
import {
  FlexContainer,
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  SubmitButton,
} from '../../pages/create';
import InputField from '../InputField'

interface SubtitleFormProps {
  subtitle: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNextStep: () => void;
}

const SubtitleForm = ({ onChange, onNextStep, subtitle }: SubtitleFormProps) => {
  return (
    <FadeIn>
    <Wrapper>
      <InputName>SUBTITLE</InputName>
      <InputDescription>
        Does your text have a subtitle?
      </InputDescription>
      <InputField
        error={subtitle.length < 3 && 'At least 3 characters.'}
        // @ts-ignore
        onChange={onChange}
        value={subtitle}
      />
      <FlexContainer>
        <SubmitButton
          style={{marginInlineEnd: '1rem'}}
          onClick={onNextStep}
        >
          {'Skip'}
        </SubmitButton>
        <SubmitButton
          onClick={onNextStep}
          disabled={subtitle.length < 1}
          style={{ minWidth: '182px' }}
        >
          {'Set Subtitle'}
        </SubmitButton>
      </FlexContainer>
    </Wrapper>
  </FadeIn>
  )
}

export default SubtitleForm