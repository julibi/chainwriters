import { createContext } from 'react';
import { darkTheme, lightTheme } from '../../themes';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const isBrowserDefaultDark = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = isBrowserDefaultDark ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
