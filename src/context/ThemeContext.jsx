import { createContext } from 'react';

// Create the context with default values
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});