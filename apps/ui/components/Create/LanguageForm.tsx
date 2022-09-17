import React from 'react';
import { FadeIn, Wrapper, InputName, SubmitButton, InputDescription } from '../../pages/create';
import { StyledInputError } from '../InputField';
import { detectLanguage } from '../../utils/detectLanguage';



interface LanguageFormProps {
  onSubmit: () => void;
  onKeyDown: (val: string) => void;
  language: string;
  text: string;
}

const LanguageForm = ({ onSubmit, onKeyDown, language, text }: LanguageFormProps) => {
  console.log(detectLanguage(text))
  return (
    <FadeIn>
      <Wrapper>
        <InputName>Language</InputName>
        <InputDescription>{`The original Language of your text is ${detectLanguage(text)[0]}`}</InputDescription>
        
        <StyledInputError>
          {language?.trim().length < 1 ? 'At least 1 character.' : ' '}
        </StyledInputError>

        <SubmitButton onClick={onSubmit} disabled={language?.length < 1}>
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );
};

export default LanguageForm;
