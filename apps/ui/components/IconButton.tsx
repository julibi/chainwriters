import React, { FormEvent } from 'react';
import EditIcon from '@material-ui/icons/edit';
import {
  BaseButton,
  BG_NORMAL,
  DISABLED_WHITE,
  INTER_BOLD,
  PLAIN_WHITE,
} from '../themes';
import styled from 'styled-components';

interface EditButtonTypes {
  disabled: boolean;
  onClick?: (e?: FormEvent<HTMLButtonElement>) => void;
  margin?: string;
  width?: string;
  color?: string;
}

interface ButtonTypes {
  disabled?: boolean;
  margin?: string;
  width?: string;
  color?: string;
}

const RootButton = styled(BaseButton)<ButtonTypes>`
  background-color: ${BG_NORMAL};
  color: ${({ color, disabled }) =>
    disabled ? DISABLED_WHITE : color ? color : PLAIN_WHITE};
  font-family: ${INTER_BOLD};
  width: ${({ width }) => width ?? '60px'};
  margin: ${({ margin }) => margin ?? '1rem 1rem 0 0'};
  padding: 1rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const EditButton = ({
  disabled = false,
  onClick,
  margin,
  width,
  color,
}: EditButtonTypes) => (
  <RootButton
    color={color}
    onClick={onClick}
    disabled={disabled}
    margin={margin}
    width={width}
  >
    <EditIcon />
  </RootButton>
);

export default EditButton;
