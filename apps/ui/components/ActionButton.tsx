import React from 'react'
import styled from 'styled-components';
import { BaseButton, BG_NORMAL, DISABLED_WHITE, INTER_BOLD, PINK } from '../themes'
import Loading from './Loading';

interface ActionButtonTypes {
    disabled: boolean;
    loading: boolean;
    onClick?: () => void;
    text: string;
    width?: string;
}

interface ButtonTypes {
  disabled: boolean;
  width?: string;
}
  
  const RootButton = styled(BaseButton)<ButtonTypes>`
    background-color: ${BG_NORMAL};
    color: ${({ disabled }) => (disabled ? DISABLED_WHITE : PINK)};
    font-family: ${INTER_BOLD};
    width: ${({ width }) => ( width ?? '230px' )};
    margin: 1rem 1rem 0 0;
    padding: 1rem;
  
    @media (max-width: 900px) {
      width: 100%;
    }
  `;

const ActionButton = ({ disabled = false, onClick, loading = false, text, width }: ActionButtonTypes) => {
  return (
    <RootButton
      onClick={onClick}
      disabled={disabled}
      width={width}
    >
      {loading ? 
        <Loading height={20} dotHeight={20} />
        : text}
    </RootButton>
  )
}

export default ActionButton