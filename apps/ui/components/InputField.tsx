import React, { FormEvent } from 'react'
import styled from 'styled-components'
import { BaseInput, PINK } from '../themes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  display: inline-block;
  margin-block-end: .5rem;
`;

export const StyledInput = styled(BaseInput)`
  display: inline-block;
  margin-block-end: 1rem;
`;

export const StyledInputError = styled.span`
  color: ${PINK};
  margin-block-end: 1rem;
  text-align: center;
`;

interface InputFieldTypes {
  value: string | number;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  style?: any;
  label?: string;
}

const InputField = ({ disabled = false, value, onChange, error, placeholder = '', label, style }: InputFieldTypes) => {
  return (
    <Root>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
      />
      <StyledInputError>{error ?? ' '}</StyledInputError>
    </Root>
  );
};

export default InputField