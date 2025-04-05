import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// Create a context with a default value
const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  setTheme: () => {},
});

// Provider component that wraps the app
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const deviceTheme = useDeviceColorScheme() as ThemeType | null;
  const [theme, setTheme] = useState<ThemeType>(deviceTheme || 'light');

  // Update theme when device theme changes
  useEffect(() => {
    if (deviceTheme) {
      setTheme(deviceTheme);
    }
  }, [deviceTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useThemeManager = () => useContext(ThemeContext); 