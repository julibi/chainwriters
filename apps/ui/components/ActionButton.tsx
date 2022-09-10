import React, { FormEvent } from 'react'
import styled from 'styled-components';
import { BaseButton, BG_NORMAL, DISABLED_WHITE, INTER_BOLD, PINK } from '../themes'
import Loading from './Loading';

interface ActionButtonTypes {
    disabled: boolean;
    loading: boolean;
    onClick?: (e?: FormEvent<HTMLButtonElement>) => void;
    text: string;
    margin?: string;
    width?: string;
}

interface ButtonTypes {
  disabled: boolean;
  margin?: string;
  width?: string;
}
  
  const RootButton = styled(BaseButton)<ButtonTypes>`
    background-color: ${BG_NORMAL};
    color: ${({ disabled }) => (disabled ? DISABLED_WHITE : PINK)};
    font-family: ${INTER_BOLD};
    width: ${({ width }) => ( width ?? '230px' )};
    margin: ${({ margin }) => ( margin ?? '1rem 1rem 0 0' )};
    padding: 1rem;
  
    @media (max-width: 900px) {
      width: 100%;
    }
  `;

const ActionButton = ({ disabled = false, onClick, loading = false, text, margin, width }: ActionButtonTypes) => {
  return (
    <RootButton
      onClick={onClick}
      disabled={disabled}
      margin={margin}
      width={width}
    >
      {loading ? 
        <Loading height={20} dotHeight={20} />
        : text}
    </RootButton>
  )
}

export default ActionButton