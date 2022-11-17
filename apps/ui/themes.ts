import styled from 'styled-components';

export const BG_NORMAL_LIGHTMODE = '#cfd5ea';
export const BG_DARK_LIGHTMODE = '#B0BADF';
export const MAIN_TEXT_COLOR_LIGHTMODE = '#364165';

export const BG_NORMAL_DARKMODE = '#1B1E28';
export const BG_DARK_DARKMODE = '#161820';
export const MAIN_TEXT_COLOR_DARKMODE = '#FFF';

export const BASE_BOX_SHADOW_LIGHTMODE = `
5px 5px 16px #b4b9cc,
-5px -5px 16px #eaf1ff;
`;

export const INSET_BASE_BOX_SHADOW_LIGHTMODE = `
  inset 5px 5px 16px #b4b9cc,
  inset -5px -5px 16px #eaf1ff;
`;

export const BASE_BOX_SHADOW_DARKMODE = `
  5px 5px 16px rgba(125,125,125,0.1),
  -5px -5px 16px rgba(0,0,0,0.7);
`;

export const INSET_BASE_BOX_SHADOW_DARKMODE = `
  inset 5px 5px 16px rgba(12, 125, 125, 0.1),
  inset -5px -5px 16px rgba(0, 0, 0, 0.7);
`;

export const lightTheme = {
  BG_NORMAL: '#cfd5ea',
  BG_DARK: '#B0BADF',
  MAIN_TEXT_COLOR: '#364165',
  BASE_BOX_SHADOW: `
    5px 5px 16px #b4b9cc,
    -5px -5px 16px #eaf1ff;
  `,
  INSET_BASE_BOX_SHADOW: `
    inset 5px 5px 16px #b4b9cc,
    inset -5px -5px 16px #eaf1ff;
  `,
};

export const darkTheme = {
  BG_NORMAL: '#1B1E28',
  BG_DARK: '#161820',
  MAIN_TEXT_COLOR: '#FFF',
  BASE_BOX_SHADOW: `
    5px 5px 16px rgba(125,125,125,0.1),
    -5px -5px 16px rgba(0,0,0,0.7);
  `,
  INSET_BASE_BOX_SHADOW: `
    inset 5px 5px 16px rgba(12, 125, 125, 0.1),
    inset -5px -5px 16px rgba(0, 0, 0, 0.7);
  `,
};

export interface Theme {
  BG_NORMAL: string;
  BG_DARK: string;
  MAIN_TEXT_COLOR: string;
  BASE_BOX_SHADOW: string;
  INSET_BASE_BOX_SHADOW: string;
}

export interface ElementThemeProps {
  theme: Theme;
}

export const POP = '#ff6f00';
export const DISABLED_WHITE = '#808080';
export const VALID_GREEN = '#19bdb4';
export const BASE_BORDER_RADIUS = '.5em';

export const FONT_SERIF_LIGHT = `
  'Merriweather Light', sans-serif;
`;

export const FONT_SERIF_REGULAR = `
  'Merriweather', sans-serif;
`;

export const FONT_SERIF_BOLD = `
  'Merriweather Bold', sans-serif;
`;

export const FONT_SERIF_BLACK = `
  'Merriweather Black', sans-serif;
`;

interface BaseButtonProps {
  active?: boolean;
  disabled?: boolean;
}

export const BaseButton = styled.button<BaseButtonProps>`
  font-family: ${FONT_SERIF_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};
  padding: 1rem;

  @media (prefers-color-scheme: dark) {
    background-color: ${BG_NORMAL_DARKMODE};
    color: ${MAIN_TEXT_COLOR_DARKMODE};
    box-shadow: ${BASE_BOX_SHADOW_DARKMODE};

    :active {
      box-shadow: ${INSET_BASE_BOX_SHADOW_DARKMODE};
    }

    :disabled {
      box-shadow: ${INSET_BASE_BOX_SHADOW_DARKMODE};
      pointer-events: none;
    }
  }

  @media (prefers-color-scheme: light) {
    background-color: ${BG_NORMAL_LIGHTMODE};
    color: ${MAIN_TEXT_COLOR_LIGHTMODE};
    box-shadow: ${BASE_BOX_SHADOW_LIGHTMODE};

    :active {
      box-shadow: ${INSET_BASE_BOX_SHADOW_LIGHTMODE};
    }

    :disabled {
      box-shadow: ${INSET_BASE_BOX_SHADOW_LIGHTMODE};
      pointer-events: none;
    }
  }

  :hover {
    cursor: pointer;
  }
`;

export const FlatButton = styled.button<BaseButtonProps>`
  color: ${MAIN_TEXT_COLOR_LIGHTMODE};
  font-family: ${FONT_SERIF_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};
  padding: 10px;
  margin: 5px;

  @media (prefers-color-scheme: dark) {
    color: ${MAIN_TEXT_COLOR_DARKMODE};
  }

  :hover {
    cursor: pointer;
  }

  :disabled {
    color: grey;
    pointer-events: none;
  }
`;

export const PrimaryButton = styled.button`
  background-color: ${MAIN_TEXT_COLOR_LIGHTMODE};
  color: ${BG_NORMAL_LIGHTMODE};
  border-radius: ${BASE_BORDER_RADIUS};

  @media (prefers-color-scheme: dark) {
    color: ${BG_NORMAL_DARKMODE};
    background-color: ${MAIN_TEXT_COLOR_DARKMODE};
  }

  :disabled {
    pointer-events: none;
  }

  :hover {
    cursor: pointer;
  }
`;

export const BaseInput = styled.input`
  font-family: ${FONT_SERIF_BOLD};
  font-size: 16px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW_LIGHTMODE};
  padding: 1rem;
  color: ${MAIN_TEXT_COLOR_LIGHTMODE};
  background-color: ${BG_NORMAL_LIGHTMODE};
  outline: none;
  -webkit-appearance: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    color: ${MAIN_TEXT_COLOR_DARKMODE};
    background-color: ${BG_NORMAL_DARKMODE};
    box-shadow: ${INSET_BASE_BOX_SHADOW_DARKMODE};
  }
`;

export const StyledLink = styled.a`
  color: ${MAIN_TEXT_COLOR_LIGHTMODE};
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;

  @media (prefers-color-scheme: dark) {
    color: ${MAIN_TEXT_COLOR_DARKMODE};
  }
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

  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
  @media (prefers-color-scheme: light) {
    :before,
    :after {
      position: absolute;
      left: 15px;
      content: ' ';
      height: 20px;
      width: 2px;
      background-color: ${MAIN_TEXT_COLOR_LIGHTMODE};
    }
  }

  @media (prefers-color-scheme: dark) {
    :before,
    :after {
      position: absolute;
      left: 15px;
      content: ' ';
      height: 20px;
      width: 2px;
      background-color: ${MAIN_TEXT_COLOR_DARKMODE};
    }
  }
`;

export const FadeInBaseAnimation = `
  animation: fadein 2s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;
