// src/components/Header.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="bg-white border-b border-gold-100 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Только логотип (без текста, звёзд и SWISS LUXURY) */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white text-xl font-serif font-bold">
              MH
            </div>
          </div>

          {/* Навигация */}
          <nav className="flex items-center gap-6 text-sm">
            <a href="#services" className="text-gray-600 hover:text-gold transition-colors">
              {t('header.nav.services')}
            </a>
            <a href="#about" className="text-gray-600 hover:text-gold transition-colors">
              {t('header.nav.about')}
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gold transition-colors">
              {t('header.nav.contacts')}
            </a>
            <LanguageSwitcher variant="header" />
          </nav>
        </div>
      </div>
    </header>
  )
}