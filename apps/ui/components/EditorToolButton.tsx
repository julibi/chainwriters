import React, { FormEvent, ReactChild } from 'react';
import styled from 'styled-components';
import {
  BASE_BORDER_RADIUS,
  INTER_BOLD,
  PLAIN_WHITE,
  BASE_BOX_SHADOW,
  INSET_BASE_BOX_SHADOW,
  BG_NORMAL,
} from '../themes';

type EditorToolButtonProps = {
  active?: boolean;
  children?: ReactChild;
  onMouseDown?: (event: FormEvent<HTMLButtonElement>) => void;
};

export const Root = styled.button<EditorToolButtonProps>`
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL} !important;
  font-family: ${INTER_BOLD} !important;
  border-radius: ${BASE_BORDER_RADIUS} !important;
  padding: 10px;
  margin: 5px;
  box-shadow: ${({ active }) =>
    active ? INSET_BASE_BOX_SHADOW : BASE_BOX_SHADOW} !important;

  :hover {
    cursor: pointer;
  }
`;

const EditorToolButton = ({
  active,
  children,
  onMouseDown,
}: EditorToolButtonProps) => {
  return (
    <Root active={active} onMouseDown={onMouseDown}>
      {children}
    </Root>
  );
};

export default EditorToolButton;
