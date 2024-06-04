// app/hooks/useSettings.ts
import { useState } from 'react';

export const useSettings = () => {
  const [language, setLanguage] = useState('en');
  const [autoChange, setAutoChange] = useState(true);
  const [interval, setInterval] = useState(5); // default 5 seconds

  return { language, autoChange, interval, setLanguage, setAutoChange, setInterval };
};
