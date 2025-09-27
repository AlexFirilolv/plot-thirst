import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('dark');

  const applyTheme = (newTheme) => {
    const root = document.documentElement;

    if (newTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const actualTheme = systemPrefersDark ? 'dark' : 'light';
      setResolvedTheme(actualTheme);

      if (actualTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else {
      setResolvedTheme(newTheme);

      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
  };

  useEffect(() => {
    // Get saved theme or default to system
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: setThemeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};