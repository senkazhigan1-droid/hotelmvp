// src/hooks/useLanguage.js
import { useTranslation } from 'react-i18next'

export const useLanguage = () => {
  const { i18n, t } = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('i18nextLng', lang)
  }

  const currentLanguage = i18n.language

  return {
    t,
    changeLanguage,
    currentLanguage,
    languages: [
      { code: 'ru', label: 'Русский' },
      { code: 'en', label: 'English' },
    ],
  }
}