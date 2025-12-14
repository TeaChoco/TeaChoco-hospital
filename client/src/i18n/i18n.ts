//-Path: "TeaChoco-Hospital/client/src/i18n/i18n.ts"
import i18n from 'i18next';
import th from './locales/th.json';
import en from './locales/en.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const detectBrowserLanguage = (): string => {
    try {
        const savedLang = localStorage.getItem('i18nextLng');
        if (savedLang && ['en', 'th'].includes(savedLang)) return savedLang;
        const browserLang =
            navigator.language || (navigator.languages && navigator.languages[0]) || 'en';

        if (browserLang.toLowerCase().startsWith('th')) return 'th';

        return 'en';
    } catch (error) {
        return 'en';
    }
};

const resources = {
    th: { translation: th },
    en: { translation: en },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        lng: detectBrowserLanguage(),
        interpolation: { escapeValue: false },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
