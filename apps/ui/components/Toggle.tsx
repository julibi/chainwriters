import React from 'react';
import styled from 'styled-components';
import { PINK } from '../themes';
import Title from './Title';

const Root = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 175px;
  margin: 0 auto;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 24px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 24px;
  cursor: pointer;
  &:checked + ${CheckBoxLabel} {
    background: ${PINK};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

interface ToggleProps {
  onChange: (checked: boolean) => void;
  label: string;
  isChecked: boolean;
}

const Toggle = ({ isChecked, onChange, label }: ToggleProps) => {
  return (
    <Root>
      <CheckBox
        checked={isChecked}
        id="checkbox"
        type="checkbox"
        onChange={(evt) => onChange(evt.target.checked)}
      />
      <CheckBoxLabel htmlFor="checkbox" />
      <Title size="xs" padding="0" margin="0 0 0 1rem">
        {label}
      </Title>
    </Root>
  );
};

export default Toggle;
