import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    // changing language
    const newLanguage = i18n.language === "en" ? "fa" : "en"

    i18n.changeLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return(
    <button className=" text-xs font-semibold tracking-wider
                        px-3 py-2 rounded-lg
                        border border-[var(--Surface)]
                        hover:border-[var(--Accent)]
                        hover:bold    
                        hover:text-[var(--Accent)]
                        transition-all duration-300"
            onClick={changeLanguage}>
        {
            i18n.language === "en" ? "فارسی" : "ENG" 
        }
    </button>
  )
}

export default LanguageSwitcher;