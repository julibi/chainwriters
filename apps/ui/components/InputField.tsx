import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { BaseInput, FONT_SERIF_REGULAR, POP } from '../themes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  display: inline-block;
  margin-block-end: 0.5rem;
  font-family: ${FONT_SERIF_REGULAR};
`;

export const StyledInput = styled(BaseInput)`
  display: inline-block;
  margin-block-end: 1rem;
  font-family: monospace;
`;

export const StyledInputError = styled.span`
  color: ${POP};
  margin-block-end: 1rem;
  text-align: center;
  height: 24px;
`;

interface InputFieldTypes {
  value: string | number;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  placeholder?: string | number;
  style?: any;
  label?: string;
  type?: string;
}

const InputField = ({
  disabled = false,
  value,
  onChange,
  error,
  placeholder = '',
  label,
  style,
  type = 'text',
}: InputFieldTypes) => {
  return (
    <Root>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder.toString()}
        style={style}
      />
      <StyledInputError>{error ?? ' '}</StyledInputError>
    </Root>
  );
};

export default InputField;
