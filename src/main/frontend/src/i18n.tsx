import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18next.use(LanguageDetector).use(initReactI18next).use(Backend).init({
    returnObjects: true,
    fallbackLng: "pl",
    backend:{
        loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    supportedLngs: ['en', 'pl'],
    nonExplicitSupportedLngs: true,
    load: 'currentOnly'
});

export default i18next;