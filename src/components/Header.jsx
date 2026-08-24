// src/components/Header.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import LanguageSwitcher from './LanguageSwitcher'
import { getImagePath } from '../utils/paths'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="bg-white border-b border-gold-100 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={getImagePath('images/movenpick-logo.png')}
              alt="Mövenpick Hotel" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.target.src = 'https://placehold.co/200x100/B8860B/FFFFFF?text=MH'
              }}
            />
          </div>

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