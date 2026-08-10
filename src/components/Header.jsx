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
          {/* Логотип */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-serif font-bold text-lg">
              MH
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-gray-800">
                <span className="text-gold">Mövenpick</span> Hotel
              </h1>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-gold fill-current" viewBox="0 0 20 20">
                    <path d="M10 1L12.39 6.99L19 7.76L14.5 12.15L15.88 18.52L10 15.37L4.12 18.52L5.5 12.15L1 7.76L7.61 6.99L10 1Z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-400 tracking-widest ml-1">SWISS LUXURY</span>
              </div>
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