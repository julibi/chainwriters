import { useMemo } from 'react';

export const useDarkMode = () => {
  return useMemo(
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false,
    []
  );
};
