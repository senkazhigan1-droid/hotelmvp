// src/components/LanguageSwitcher.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function LanguageSwitcher({ variant = 'header' }) {
  const { changeLanguage, currentLanguage, languages } = useLanguage()

  if (variant === 'header') {
    return (
      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-amber-400/20">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
              currentLanguage === lang.code
                ? 'bg-amber-500 text-white shadow-lg'
                : 'text-amber-100/70 hover:text-white hover:bg-white/10'
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
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentLanguage === lang.code
              ? 'bg-amber-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}