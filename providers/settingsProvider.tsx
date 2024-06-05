// app/context/SettingsContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface SettingsContextProps {
  language: string;
  setLanguage: (language: string) => void;
  autoChange: boolean;
  setAutoChange: (value: boolean) => void;
  interval: number;
  setInterval: (value: number) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [autoChange, setAutoChange] = useState(true);
  const [interval, setInterval] = useState(5); // default 5 seconds

  return (
    <SettingsContext.Provider value={{ language, setLanguage, autoChange, setAutoChange, interval, setInterval }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
