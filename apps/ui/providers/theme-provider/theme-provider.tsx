import { useDarkMode } from '../../hooks/useDarkMode';
import { createContext } from 'react';
import { darkTheme, lightTheme } from '../../themes';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const isDark = useDarkMode();
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
