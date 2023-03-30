import React, { FormEvent } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { BaseButton, DISABLED_WHITE, FONT_SERIF_BOLD, Theme } from '../themes';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import TooltippedIndicator from './TooltippedIndicator';

interface EditButtonTypes {
  disabled?: boolean;
  isEditing: boolean;
  onClick?: (e?: FormEvent<HTMLButtonElement>) => void;
  margin?: string;
  width?: string;
  color?: string;
  tooltipText?: string;
}

interface ButtonTypes {
  disabled?: boolean;
  margin?: string;
  width?: string;
  color?: string;
  theme: Theme;
}

const RootButton = styled(BaseButton)<ButtonTypes>`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.BG_NORMAL};
  color: ${({ color, disabled, theme }) =>
    disabled ? DISABLED_WHITE : color ? color : theme.MAIN_TEXT_COLOR};
  font-family: ${FONT_SERIF_BOLD};
  width: ${({ width }) => width ?? '60px'};
  margin: ${({ margin }) => margin ?? '1rem 1rem 0 0'};
  padding: 1rem;
  z-index: 10;

  @media (max-width: 900px) {
    width: 60px;
    margin: 0;
  }
`;

const EditButton = ({
  isEditing,
  disabled = false,
  onClick,
  margin,
  width,
  color,
  tooltipText,
}: EditButtonTypes) => {
  const theme = useTheme();

  const EditIconWithTooltip = () => {
    if (tooltipText?.trim()?.length) {
      return (
        <TooltippedIndicator
          backgroundColor="transparent"
          tooltipContent={tooltipText}
          icon={<EditIcon />}
        />
      );
    }
    return <EditIcon />;
  };

  return (
    <RootButton
      color={color}
      onClick={onClick}
      disabled={disabled}
      margin={margin}
      theme={theme}
      width={width}
    >
      {isEditing ? <CloseIcon /> : EditIconWithTooltip()}
    </RootButton>
  );
};

export default EditButton;
