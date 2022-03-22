import styled from 'styled-components';
export const BG_LIGHT = '#222632';
export const BG_NORMAL = '#1B1E28';
export const BG_DARK = '#0E1018';
export const PLAIN_WHITE = '#FFF';

export const BASE_BORDER_RADIUS = '.5em';
export const BASE_BOX_SHADOW = `
  -5px -6px 9px rgba(128,128,128,0.1),
  10px 10px 10px rgba(0,0,0,0.2);
`;

export const BaseButton = styled.button`
  background-color: ${BG_NORMAL};
  color: ${PLAIN_WHITE};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};

  :hover {
    cursor: pointer;
  }
`;