import React, { FormEvent } from 'react';
import styled from 'styled-components';
import InfoRounded from '@material-ui/icons/InfoRounded';
import { BaseInput, FONT_SERIF_REGULAR, POP } from '../themes';
import { Tooltip } from './Tooltip';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelWrapper = styled.div`
  display: flex;
`;

const StyledLabel = styled.label`
  display: inline-block;
  margin: 0 0.5rem 0.5rem 0;
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
  isErrorPossible?: boolean;
  tooltipText?: string;
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
  isErrorPossible = true,
  tooltipText,
}: InputFieldTypes) => {
  return (
    <Root>
      <LabelWrapper>
        <StyledLabel>{label}</StyledLabel>
        {tooltipText?.length && (
          <Tooltip content={tooltipText}>
            <InfoRounded />
          </Tooltip>
        )}
      </LabelWrapper>
      <StyledInput
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder.toString()}
        style={style}
      />
      {isErrorPossible && <StyledInputError>{error ?? ' '}</StyledInputError>}
    </Root>
  );
};

export default InputField;
