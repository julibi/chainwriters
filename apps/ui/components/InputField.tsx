import React, { FormEvent } from 'react'
import styled from 'styled-components'
import { BaseInput, PINK } from '../themes';

export const StyledInput = styled(BaseInput)`
  display: inline-block;
  margin-block-end: 1rem;
`;

const StyledInputError = styled.span`
  color: ${PINK};
  margin-block-end: 1rem;
`;

interface InputFieldTypes {
  value: string | number;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField = ({ value, onChange, error }: InputFieldTypes) => {
  return (
    <>
      <StyledInput value={value} onChange={onChange} />
      <StyledInputError>{error ?? ''}</StyledInputError>
    </>
  );
};

export default InputField