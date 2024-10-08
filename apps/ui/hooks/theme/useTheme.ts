import { useContext } from 'react';
import { ThemeContext } from '../../providers';

export const useTheme = () => {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return value;
};
