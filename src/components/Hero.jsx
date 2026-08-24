// src/components/Hero.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { getImagePath } from '../utils/paths'

export default function Hero({ onScroll, showAdminLink = false }) {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-cream">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${getImagePath('images/hero-bg.jpg')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 to-cream/90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-8 h-8 text-gold fill-current" viewBox="0 0 20 20">
                <path d="M10 1L12.39 6.99L19 7.76L14.5 12.15L15.88 18.52L10 15.37L4.12 18.52L5.5 12.15L1 7.76L7.61 6.99L10 1Z" />
              </svg>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-warm-dark mb-4 leading-tight">
            <span className="text-gold">Mövenpick</span> Hotel
          </h1>

          <div className="divider-gold"></div>

          <p className="text-xl md:text-2xl text-gray-600 mb-6 font-light tracking-widest">
            {t('hero.subtitle')}
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#services" className="btn-primary">
              {t('hero.buttons.book')}
            </a>
            <a href="#about" className="btn-secondary">
              {t('hero.buttons.learnMore')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}