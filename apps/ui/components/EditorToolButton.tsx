import React, { FormEvent, ReactChild } from 'react';
import styled from 'styled-components';
import { BASE_BORDER_RADIUS, FONT_SERIF_BOLD, Theme } from '../themes';
import { useTheme } from '../hooks/theme';

type EditorToolButtonProps = {
  active?: boolean;
  children?: ReactChild;
  onMouseDown?: (event: FormEvent<HTMLButtonElement>) => void;
  theme: Theme;
};

export const Root = styled.button<EditorToolButtonProps>`
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
  background-color: ${({ theme }) => theme.BG_NORMAL} !important;
  font-family: ${FONT_SERIF_BOLD} !important;
  border-radius: ${BASE_BORDER_RADIUS} !important;
  padding: 10px;
  margin: 5px;
  box-shadow: ${({ active, theme }) =>
    active ? theme.INSET_BASE_BOX_SHADOW : theme.BASE_BOX_SHADOW} !important;

  :hover {
    cursor: pointer;
  }
`;

const EditorToolButton = ({
  active,
  children,
  onMouseDown,
}: EditorToolButtonProps) => {
  const theme = useTheme();
  return (
    <Root active={active} onMouseDown={onMouseDown} theme={theme}>
      {children}
    </Root>
  );
};

export default EditorToolButton;
