import React, { ChangeEvent } from 'react';
import {
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  SubmitButton,
} from '../../pages/create';
import InputField from '../InputField';

interface NameFormProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  title: string;
}

// TODO validation - does the title exist already from the same author?
const NameForm = ({ onChange, onSubmit, title }: NameFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <InputName>Title</InputName>
        <InputDescription>What is the title of your project?</InputDescription>
        <InputField
          error={title.length < 1 && 'At least 1 character.'}
          onChange={onChange}
          value={title}
        />
        <SubmitButton onClick={onSubmit} disabled={title.length < 1}>
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );
};

export default NameForm;
