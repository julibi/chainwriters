import React, { useState } from 'react'
import styled from 'styled-components'
import { BG_NORMAL } from '../../themes';

const Wrapper = styled.div`
  display: flex;
  margin: 8px 0;
`;

const RadioInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 1e-5;
  pointer-events: none;
`;

interface LabelProps {
  readonly: boolean;
}

const Label = styled.label<LabelProps>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ readonly }) => readonly ? 'default' : 'pointer'};
  color: #394a56;
`;

interface IndicatorProps {
  checked: boolean;
}

const Indicator = styled.div<IndicatorProps>`
    position: relative;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    box-shadow:
      -8px -4px 8px 0px rgba(125,125,125,0.1),
      8px 4px 12px 0px rgba(0,0,0,0.7);
    overflow: hidden;

    ::before,
    ::after {
      content: '';
      position: absolute;
      top: 9%;
      left: 10%;
      height: 80%;
      width: 80%;
      border-radius: 50%;
    }

    ::after {
      background-color: ${BG_NORMAL};
      box-shadow:
        -4px -2px 4px 0px rgba(125,125,125,0.1),
        4px 2px 8px 0px rgba(0,0,0,0.7);
      transform: ${({ checked }) => checked ?  'scale3d(1, 1, 1)' : 'scale3d(.975, .975, 1) translate3d(0, 5%, 0)' };
      transition: opacity .25s ease-in-out, transform .25s ease-in-out;
      opacity:  ${({ checked }) => checked ? '0' : '1' };
    }

    ::before {
      box-shadow:
        -4px -2px 4px 0px rgba(0,0,0,0.7),
        4px 2px 8px 0px rgba(125,125,125,0.1);
    }
`;

interface NeumorphicCheckboxProps {
  readonly?: boolean;
  check: boolean;
  label?: string;
}

const NeumorphicCheckbox = ({ readonly, check, label }: NeumorphicCheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(check);
  return (
    <Wrapper>
      <Label readonly={readonly}>
        <RadioInput
          disabled={readonly}
          type="checkbox"
          onChange={() => !readonly && setChecked(!checked)}
          checked={checked}
        />
        <Indicator checked={checked} />
        {label}
      </Label>
    </Wrapper>
  );
}

export default NeumorphicCheckbox