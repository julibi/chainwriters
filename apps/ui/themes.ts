import styled from 'styled-components';
export const BG_LIGHT = '#222632';
export const BG_NORMAL = '#1B1E28';
export const BG_DARK = '#0E1018';
export const PLAIN_WHITE = '#FFF';

export const BaseButton = styled.button`
  background-color: ${BG_NORMAL};
  color: ${PLAIN_WHITE};
  border-radius: 0.5rem;

  :hover {
    cursor: pointer;
  }
`;