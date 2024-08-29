"use client";

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Theme,
} from "@mui/material/styles";
import { createContext, useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";

const createCustomTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
    },
  });

interface ThemeContextType {
  isDarkMode: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = createCustomTheme(isDarkMode ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
