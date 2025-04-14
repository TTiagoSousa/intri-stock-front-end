import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enJson from './Translations/en.json';
import ptJson from './Translations/pt.json';

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt', 
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: enJson,
      pt: ptJson
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    }
  });

export default i18n;