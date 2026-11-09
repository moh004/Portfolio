import i18n from "i18next";
import { initReactI18next} from "react-i18next";

import en from "./data/language/en/translation.json";
import fa from "./data/language/fa/translation.json";

const savedLanguage = "en";

i18n.use(initReactI18next).init(
    {
        resources: {
            en: { translation: en },
            fa: { translation: fa }
        },
        lng: savedLanguage,
        fallbackLng: "en",
        interpolant: {
            escapeValue: false
        }
    }
)

export default i18n;