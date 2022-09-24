import styled from 'styled-components';

export const BG_LIGHT = '#222632';
export const BG_NORMAL = '#1B1E28';
export const BG_DARK = '#161820';
export const PLAIN_WHITE = '#FFF';
export const PINK = '#F50A48';
export const DISABLED_WHITE = '#808080';
export const VALID_GREEN = '#19bdb4';

export const BASE_BORDER_RADIUS = '.5em';
// export const BASE_BOX_SHADOW = `
//   -5px -6px 9px rgba(125,125,125,0.1),
//   10px 10px 10px rgba(0,0,0,0.2);
// `;
export const BASE_BOX_SHADOW = `
  -4px -2px 4px 0px rgba(125,125,125,0.1),
  4px 2px 8px 0px rgba(0,0,0,0.7);
`;

// export const INSET_BASE_BOX_SHADOW = `
//   inset -5px -6px 9px rgba(125,125,125,0.1),
//   inset 10px 10px 10px rgba(0,0,0,0.2);
// `;

export const INTER_LIGHT = `
  'Inter Light', sans-serif;
`;

export const INTER_REGULAR = `
  'Inter', sans-serif;
`;

export const INTER_BOLD = `
  'Inter Bold', sans-serif;
`;

export const INTER_BLACK = `
  'Inter Black', sans-serif;
`;

export const INSET_BASE_BOX_SHADOW = `
  inset -4px -2px 4px 0px rgba(125,125,125,0.1),
  inset 4px 2px 8px 0px rgba(0,0,0,0.7);
`;

interface BaseButtonProps {
  active?: boolean;
  disabled?: boolean;
}

export const BaseButton = styled.button<BaseButtonProps>`
  background-color: ${BG_NORMAL};
  color: ${PLAIN_WHITE};
  font-family: ${INTER_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;

  :hover {
    cursor: pointer;
  }

  :active {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }

  :disabled {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
    pointer-events: none;
  }
`;

export const FlatButton = styled.button<BaseButtonProps>`
  color: ${PLAIN_WHITE};
  font-family: ${INTER_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};
  padding: 10px;
  margin: 5px;

  :hover {
    cursor: pointer;
  }

  :disabled {
    // background-color: ${BG_LIGHT};
    color: grey;
    pointer-events: none;
  }
`;

export const PrimaryButton = styled.button`
  background-color: ${PLAIN_WHITE};
  color: ${BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};

  :disabled {
    pointer-events: none;
  }

  :hover {
    cursor: pointer;
  }
`;

export const BaseInput = styled.input`
  font-family: ${INTER_BOLD};
  font-size: 16px;
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
  color: #f50a48;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
`;

export const Cross = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  opacity: 0.3;
  margin-left: -60px;

  :hover {
    opacity: 1;
    cursor: pointer;
  }
  :before,
  :after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: white;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

export const FadeInBaseAnimation = `
  animation: fadein 2s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;
