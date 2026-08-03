// src/components/Hero.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function Hero({ onScroll, showAdminLink = false }) {
  const { t } = useLanguage()

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-50 via-amber-100/80 to-orange-50/90">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-200/40 via-amber-100/20 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-amber-100/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 font-serif">
          <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text text-transparent">
            Mövenpick
          </span>
          <span className="text-amber-800"> Hotel</span>
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-amber-700/80 mb-6 font-light tracking-widest">
          {t('hero.subtitle')}
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-8 h-8 text-amber-400 fill-current drop-shadow-md" viewBox="0 0 20 20">
              <path d="M10 1L12.39 6.99L19 7.76L14.5 12.15L15.88 18.52L10 15.37L4.12 18.52L5.5 12.15L1 7.76L7.61 6.99L10 1Z" />
            </svg>
          ))}
        </div>

        <p className="text-lg md:text-xl text-amber-700/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#services" className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50">
            {t('hero.buttons.book')}
          </a>
          <a href="#about" className="px-8 py-4 bg-amber-100/60 backdrop-blur-sm border border-amber-300/50 text-amber-700 rounded-full font-semibold hover:bg-amber-100/80 transition-all duration-300 shadow-lg hover:shadow-xl">
            {t('hero.buttons.learnMore')}
          </a>
        </div>
      </div>
    </section>
  )
}