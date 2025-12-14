//-Path: "TeaChoco-Portfolio/client/src/i18n/i18n.ts"
import i18n from 'i18next';
import th from './locales/th.json';
import en from './locales/en.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    th: { translation: th },
    en: { translation: en },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
