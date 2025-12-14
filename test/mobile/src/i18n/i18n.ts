//-Path: "TeaChoco-Hospital/client/src/i18n/i18n.ts"
import i18n from 'i18next';
import en from './locales/en.json';
import th from './locales/th.json';
import { initReactI18next } from 'react-i18next';

const resources = {
    th: { translation: th },
    en: { translation: en },
};

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

export default i18n;
