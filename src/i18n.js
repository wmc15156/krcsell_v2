import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

//translations
import translationEn from './locales/en/translation.json';
import translationKo from './locales/ko/translation.json';

const resources = {
    en: {
        translation: translationEn,
    },
    ko: {
        translation: translationKo,
    },
};

i18n.use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,

        lng: 'ko',
        fallbackLng: 'en', // use en if detected lng is not available

        // keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
