// src/components/LanguageSwitcher.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function LanguageSwitcher({ variant = 'header' }) {
  const { changeLanguage, currentLanguage, languages } = useLanguage()

  if (variant === 'header') {
    return (
      <div className="flex items-center gap-1 bg-cream rounded-full p-1 border border-gold-100">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              currentLanguage === lang.code
                ? 'bg-gold text-white shadow-gold'
                : 'text-gray-500 hover:text-gold hover:bg-gold-50'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-4 py-2 rounded-soft font-medium transition-all duration-300 ${
            currentLanguage === lang.code
              ? 'bg-gold text-white shadow-gold'
              : 'bg-white text-gray-600 hover:bg-gold-50 hover:text-gold border border-gold-100'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}