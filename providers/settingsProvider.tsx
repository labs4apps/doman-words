// app/context/SettingsContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        const savedAutoChange = await AsyncStorage.getItem('autoChange');
        const savedInterval = await AsyncStorage.getItem('interval');

        if (savedLanguage) setLanguage(savedLanguage);
        if (savedAutoChange !== null) setAutoChange(JSON.parse(savedAutoChange));
        if (savedInterval) setInterval(Number(savedInterval));
      } catch (error) {
        console.error('Failed to load settings', error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('language', language);
        await AsyncStorage.setItem('autoChange', JSON.stringify(autoChange));
        await AsyncStorage.setItem('interval', interval.toString());
      } catch (error) {
        console.error('Failed to save settings', error);
      }
    };

    saveSettings();
  }, [language, autoChange, interval]);

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
