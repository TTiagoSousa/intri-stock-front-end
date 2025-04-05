import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');

  // Carrega o modo do localStorage uma vez, no carregamento inicial
  useEffect(() => {
    const storedMode = localStorage.getItem('mode');
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  // Atualiza a classe do body sempre que "mode" mudar
  useEffect(() => {
    if (mode === 'light') {
      document.body.className = 'Light_Mode';
    } else if (mode === 'dark') {
      document.body.className = 'Dark_Mode';
    } else {
      // modo auto — muda baseado no horário
      const currentTime = new Date().getHours();
      if (currentTime >= 20 || currentTime < 7) {
        document.body.className = 'Dark_Mode';
      } else {
        document.body.className = 'Light_Mode';
      }
    }
  }, [mode]);

  // Funções para trocar de tema
  const handleDarkMode = () => {
    localStorage.setItem('mode', 'dark');
    setMode('dark');
  };

  const handleLightMode = () => {
    localStorage.setItem('mode', 'light');
    setMode('light');
  };

  const handleAutoMode = () => {
    localStorage.setItem('mode', 'auto');
    setMode('auto');
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        handleDarkMode,
        handleLightMode,
        handleAutoMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTheme() {
  return useContext(ThemeContext);
}
