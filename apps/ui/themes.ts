import styled from 'styled-components';

export const BG_LIGHT = '#222632';
export const BG_NORMAL = '#1B1E28';
export const BG_DARK = '#0E1018';
export const PLAIN_WHITE = '#FFF';
export const PINK = '#F50A48';
export const DISABLED_WHITE = '#808080';

export const BASE_BORDER_RADIUS = '.5em';
export const BASE_BOX_SHADOW = `
  -5px -6px 9px rgba(125,125,125,0.1),
  10px 10px 10px rgba(0,0,0,0.2);
`;

export const INSET_BASE_BOX_SHADOW = `
  inset -5px -6px 9px rgba(125,125,125,0.1),
  inset 10px 10px 10px rgba(0,0,0,0.2);
`;

export const BaseButton = styled.button`
  background-color: ${BG_NORMAL};
  color: ${PLAIN_WHITE};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;

  :hover {
    cursor: pointer;
  }
  :active {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }
`;

export const PrimaryButton = styled.button`
  background-color: ${PLAIN_WHITE};
  color: ${BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};

  :hover {
    cursor: pointer;
  }
`;

export const BaseInput = styled.input`
  font-family: 'Nunito Sans Bold', sans-serif;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  padding: 1rem;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  outline: none;
  
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StyledLink = styled.a`
  color: #F50A48;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
`;