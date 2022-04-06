import React, { FormEvent } from 'react'
import styled from 'styled-components'
import { BaseInput, PINK } from '../themes';

export const StyledInput = styled(BaseInput)`
  display: inline-block;
  margin-block-end: 1rem;
`;

export const StyledInputError = styled.span`
  color: ${PINK};
  margin-block-end: 1rem;
`;

interface InputFieldTypes {
  value: string | number;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  style?: any;
}

const InputField = ({ disabled = false, value, onChange, error, placeholder = '', style }: InputFieldTypes) => {
  return (
    <>
      <StyledInput
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
      />
      <StyledInputError>{error ?? ' '}</StyledInputError>
    </>
  );
};

export default InputField