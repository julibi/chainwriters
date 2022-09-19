import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { FadeIn, Wrapper, InputName } from '../../pages/create';
import ActionButton from '../ActionButton';
import InputField from '../InputField';

const InputWrapper = styled.div`
  width: 230px;
`;

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
        <InputWrapper>
          <InputField
            error={title.length < 1 && 'At least 1 character.'}
            onChange={onChange}
            value={title}
          />
        </InputWrapper>
        <ActionButton
          onClick={onSubmit}
          disabled={title.length < 1}
          loading={false}
          text="Continue"
          margin="1rem 0 0 0"
        />
      </Wrapper>
    </FadeIn>
  );
};

export default NameForm;
