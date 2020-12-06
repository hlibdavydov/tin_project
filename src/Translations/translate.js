import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import {TRANSLATIONS_PL} from "./pl/translation";
import {TRANSLATIONS_EN} from "./en/translation";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: TRANSLATIONS_EN
            },
            pl: {
                translation: TRANSLATIONS_PL
            }
        }
    });
i18n.changeLanguage("en");
export default i18n;