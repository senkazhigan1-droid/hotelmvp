// src/components/header.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="relative bg-gradient-to-r from-amber-900/95 via-amber-800/95 to-amber-900/95 text-white py-6 shadow-2xl border-b border-amber-700/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"></div>
      
      <div className="absolute top-3 left-6 w-1.5 h-1.5 rounded-full bg-amber-400/40"></div>
      <div className="absolute top-3 right-6 w-1.5 h-1.5 rounded-full bg-amber-400/40"></div>
      <div className="absolute bottom-3 left-6 w-1.5 h-1.5 rounded-full bg-amber-400/30"></div>
      <div className="absolute bottom-3 right-6 w-1.5 h-1.5 rounded-full bg-amber-400/30"></div>
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-amber-400/0 via-amber-400/40 to-amber-400/0"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-amber-400/0 via-amber-400/40 to-amber-400/0"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-amber-400/30 flex items-center justify-center bg-amber-800/30 backdrop-blur-sm">
                <span className="text-2xl font-serif font-bold">MH</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400/60 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-wide">
                <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                  Mövenpick
                </span>
                <span className="text-white/90"> Hotel</span>
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 1L12.39 6.99L19 7.76L14.5 12.15L15.88 18.52L10 15.37L4.12 18.52L5.5 12.15L1 7.76L7.61 6.99L10 1Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-amber-400/60 text-xs tracking-widest">SWISS LUXURY</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center">
            <p className="text-amber-100/70 text-sm font-light tracking-[0.2em] uppercase">
              {t('header.subtitle')}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400/40"></span>
              <span className="text-amber-400/40 text-xs">◆</span>
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400/40"></span>
            </div>
            <p className="text-amber-300/50 text-[10px] tracking-[0.3em] uppercase">since 1995</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-amber-200/80 text-sm font-light">{t('header.chocolateHour')}</span>
              <span className="text-amber-400/60 text-xs tracking-wider">{t('header.chocolateTime')}</span>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full border border-amber-400/20 flex items-center justify-center bg-amber-800/20 backdrop-blur-sm hover:bg-amber-700/30 transition-colors cursor-pointer group">
                <span className="text-xl group-hover:scale-110 transition-transform">◆</span>
              </div>
            </div>
            <LanguageSwitcher variant="header" />
          </div>
        </div>

        <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-amber-700/20">
          <a href="#services" className="text-amber-100/60 hover:text-amber-200 text-sm transition-colors duration-300 tracking-wider relative group">
            {t('header.nav.services')}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400/60 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#about" className="text-amber-100/60 hover:text-amber-200 text-sm transition-colors duration-300 tracking-wider relative group">
            {t('header.nav.about')}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400/60 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#services" className="text-amber-100/60 hover:text-amber-200 text-sm transition-colors duration-300 tracking-wider relative group">
            {t('header.nav.contacts')}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400/60 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </div>
    </header>
  )
}