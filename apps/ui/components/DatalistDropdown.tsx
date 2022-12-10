import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import {
  BASE_BORDER_RADIUS,
  BG_NORMAL_DARKMODE,
  BG_NORMAL_LIGHTMODE,
  FONT_SERIF_BOLD,
  INSET_BASE_BOX_SHADOW_DARKMODE,
  INSET_BASE_BOX_SHADOW_LIGHTMODE,
  MAIN_TEXT_COLOR_DARKMODE,
  MAIN_TEXT_COLOR_LIGHTMODE,
} from '../themes';

type DatalistDropdownProps = {
  listName: string;
  placeholder?: string;
  options: string[];
  onSelect: (x: ChangeEvent) => void;
};

const StyledInput = styled.input`
  font-family: ${FONT_SERIF_BOLD};
  font-size: 16px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW_LIGHTMODE};
  padding: 1rem;
  color: ${MAIN_TEXT_COLOR_LIGHTMODE};
  background-color: ${BG_NORMAL_LIGHTMODE};
  outline: none;
  -webkit-appearance: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    color: ${MAIN_TEXT_COLOR_DARKMODE};
    background-color: ${BG_NORMAL_DARKMODE};
    box-shadow: ${INSET_BASE_BOX_SHADOW_DARKMODE};
  }
`;

const StyledDataList = styled.datalist`
  background-color: red !important;
`;

const DatalistDropdown = ({
  listName,
  options,
  onSelect,
  placeholder = 'Start typing...',
}: DatalistDropdownProps) => {
  return (
    <>
      <StyledInput
        list={listName}
        onChange={onSelect}
        placeholder={placeholder}
      />
      <StyledDataList id={listName}>
        {options.map((opt, idx) => (
          <option key={idx}>{opt}</option>
        ))}
      </StyledDataList>
    </>
  );
};

export default DatalistDropdown;
