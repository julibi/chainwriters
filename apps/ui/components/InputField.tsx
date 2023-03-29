import React, { FormEvent, ReactElement } from 'react';
import styled from 'styled-components';
import InfoRounded from '@material-ui/icons/InfoRounded';
import {
  BaseInput,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW_DARKMODE,
  BASE_BOX_SHADOW_LIGHTMODE,
  BG_NORMAL_DARKMODE,
  BG_NORMAL_LIGHTMODE,
  ElementThemeProps,
  FONT_SERIF_REGULAR,
  MAIN_TEXT_COLOR_DARKMODE,
  MAIN_TEXT_COLOR_LIGHTMODE,
  POP,
} from '../themes';
import { Tooltip } from './Tooltip';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelWrapper = styled.div`
  display: flex;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const StyledLabel = styled.label`
  display: inline-block;
  margin: 0 0.5rem 0.5rem 0;
  font-family: ${FONT_SERIF_REGULAR};
`;
interface TestProps extends ElementThemeProps {
  leftHardCodedValue?: string;
  rightHardCodedValue?: string;
}

const HardCodedBlockLeft = styled.div`
  margin-block-end: 1rem;
  padding: 1rem;
  border-radius: ${BASE_BORDER_RADIUS};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-family: ${FONT_SERIF_REGULAR};

  @media (prefers-color-scheme: dark) {
    background-color: ${BG_NORMAL_DARKMODE};
    color: ${MAIN_TEXT_COLOR_DARKMODE};
    box-shadow: ${BASE_BOX_SHADOW_DARKMODE};
  }

  @media (prefers-color-scheme: light) {
    background-color: ${BG_NORMAL_LIGHTMODE};
    color: ${MAIN_TEXT_COLOR_LIGHTMODE};
    box-shadow: ${BASE_BOX_SHADOW_LIGHTMODE};
  }

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const HardCodedBlockRight = styled.div`
  margin-block-end: 1rem;
  padding: 1rem;
  border-radius: ${BASE_BORDER_RADIUS};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-family: ${FONT_SERIF_REGULAR};

  @media (prefers-color-scheme: dark) {
    background-color: ${BG_NORMAL_DARKMODE};
    color: ${MAIN_TEXT_COLOR_DARKMODE};
    box-shadow: ${BASE_BOX_SHADOW_DARKMODE};
  }

  @media (prefers-color-scheme: light) {
    background-color: ${BG_NORMAL_LIGHTMODE};
    color: ${MAIN_TEXT_COLOR_LIGHTMODE};
    box-shadow: ${BASE_BOX_SHADOW_LIGHTMODE};
  }

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

export const StyledInput = styled(BaseInput)<TestProps>`
  width: 100%;
  display: inline-block;
  margin-block-end: 1rem;
  font-family: monospace;
  border-top-left-radius: ${({ leftHardCodedValue }) =>
    leftHardCodedValue ? '0' : BASE_BORDER_RADIUS};
  border-bottom-left-radius: ${({ leftHardCodedValue }) =>
    leftHardCodedValue ? '0' : BASE_BORDER_RADIUS};

  border-top-right-radius: ${({ rightHardCodedValue }) =>
    rightHardCodedValue ? '0' : BASE_BORDER_RADIUS};
  border-bottom-right-radius: ${({ rightHardCodedValue }) =>
    rightHardCodedValue ? '0' : BASE_BORDER_RADIUS};
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
  tooltipText?: string | ReactElement;
  leftHardCodedValue?: string;
  rightHardCodedValue?: string;
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
  leftHardCodedValue,
  rightHardCodedValue,
}: InputFieldTypes) => {
  return (
    <Root>
      <LabelWrapper>
        <StyledLabel>{label}</StyledLabel>
        {tooltipText && (
          <Tooltip content={tooltipText}>
            <InfoRounded />
          </Tooltip>
        )}
      </LabelWrapper>
      <FlexWrapper>
        {leftHardCodedValue && (
          <HardCodedBlockLeft>{leftHardCodedValue}</HardCodedBlockLeft>
        )}
        <StyledInput
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder.toString()}
          style={style}
          leftHardCodedValue={leftHardCodedValue}
          rightHardCodedValue={rightHardCodedValue}
        />
        {rightHardCodedValue && (
          <HardCodedBlockRight>{rightHardCodedValue}</HardCodedBlockRight>
        )}
      </FlexWrapper>

      {isErrorPossible && <StyledInputError>{error ?? ' '}</StyledInputError>}
    </Root>
  );
};

export default InputField;
