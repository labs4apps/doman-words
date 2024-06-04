// src/types/react-i18next.d.ts

import 'react-i18next';
import en from '../locales/en.json';
import pl from '../locales/pl.json';

declare module 'react-i18next' {
  interface Resources {
    en: typeof en;
    pl: typeof pl;
  }
}
