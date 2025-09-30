import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ptTranslation from './locales/pt/translation.json';
import enTranslation from './locales/en/translation.json';
// 1. Importa o arquivo de tradução em espanhol
import esTranslation from './locales/es/translation.json';

const resources = {
  pt: {
    translation: ptTranslation,
  },
  en: {
    translation: enTranslation,
  },
  // 2. Adiciona o recurso 'es' (espanhol)
  es: {
    translation: esTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',  // Mantém 'pt' como fallback (idioma padrão se o preferido não for encontrado)
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

export default i18n;