// src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import plików z tłumaczeniami
import en from './locales/en.json';
import pl from './locales/pl.json';

const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = RNLocalize.getLocales();
    if (locales.length > 0) {
      callback(locales[0].languageTag);
    } else {
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

// Upewnij się, że kod wykonuje się tylko, gdy 'navigator' jest dostępny
if (typeof navigator !== 'undefined') {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      debug: true,
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
