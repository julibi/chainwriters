import React, { useState } from 'react';
import styled from 'styled-components';
import { BG_NORMAL } from '../themes';

const Wrapper = styled.div`
  display: flex;
  margin: 1rem;
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
  cursor: ${({ readonly }) => (readonly ? 'default' : 'pointer')};
`;

interface IndicatorProps {
  checked: boolean;
}

const Indicator = styled.div<IndicatorProps>`
  position: relative;
  border-radius: 50%;
  min-height: 40px;
  min-width: 40px;
  box-shadow: -4px -2px 4px 0px rgba(125, 125, 125, 0.1),
    4px 2px 8px 0px rgba(0, 0, 0, 0.7);
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
    // with next line and the same in before or without? unsure
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    background-color: ${BG_NORMAL};
    box-shadow: -4px -2px 4px 0px rgba(125, 125, 125, 0.1),
      4px 2px 8px 0px rgba(0, 0, 0, 0.7);
    transform: ${({ checked }) =>
      checked
        ? 'scale3d(1, 1, 1)'
        : 'scale3d(.975, .975, 1) translate3d(0, 5%, 0)'};
    transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
    opacity: ${({ checked }) => (checked ? '0' : '1')};
  }

  ::before {
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    box-shadow: -4px -2px 4px 0px rgba(0, 0, 0, 0.7),
      4px 2px 8px 0px rgba(125, 125, 125, 0.1);
  }
`;

const BlockSpan = styled.span`
  display: inline-block;
  margin-inline-start: 1.5rem;
  color: gray;
  font-size: 14px;
`;

interface CheckboxProps {
  readonly?: boolean;
  check: boolean;
  children?: React.ReactChild;
  onChange?: () => void;
}

const Checkbox = ({
  readonly = false,
  check,
  children,
  onChange,
}: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(check);
  const toggleChecked = () => {
    setChecked(!checked);
  };
  return (
    <Wrapper>
      <Label readonly={readonly}>
        <RadioInput
          disabled={readonly}
          type="checkbox"
          onChange={() => {
            !readonly && toggleChecked();
            onChange();
          }}
          checked={checked}
        />
        <Indicator checked={checked} />
        {children && <BlockSpan>{children}</BlockSpan>}
      </Label>
    </Wrapper>
  );
};

export default Checkbox;
