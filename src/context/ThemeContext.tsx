import React, { createContext, useState, ReactNode, FC } from "react";

export interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextType = {
  isDarkTheme: false,
  toggleTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
