// src/components/ServiceCard.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function ServiceCard({ service, onOrder, onDetails }) {
  const { t } = useLanguage()

  return (
    <div className="card group overflow-hidden">
      {service.image && (
        <div className="overflow-hidden h-52 relative">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x300/8C7343/FFFFFF?text=' + encodeURIComponent(service.title)
            }}
          />
          {service.isPopular && (
            <div className="absolute top-3 right-3 bg-gold text-white text-xs font-semibold px-3 py-1 rounded-full">
              ★ {t('services.popular')}
            </div>
          )}
          {service.price === 'Бесплатно' && (
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {t('services.free')}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-gray-800 mb-1">{service.title}</h3>
        <p className="text-gray-500 text-sm mb-3">{service.description}</p>
        <p className="text-2xl font-bold text-gold mb-4">{service.price}</p>
        
        <div className="flex gap-3">
          <button 
            onClick={() => onDetails(service)}
            className="flex-1 px-4 py-2.5 text-sm border border-gold text-gold rounded-soft hover:bg-gold hover:text-white transition-all font-medium"
          >
            {t('services.details')}
          </button>
          <button 
            onClick={() => onOrder(service)}
            className="flex-1 px-4 py-2.5 text-sm bg-gold text-white rounded-soft hover:bg-gold-600 transition-all font-medium shadow-gold hover:shadow-lg"
          >
            {t('services.book')}
          </button>
        </div>
      </div>
    </div>
  )
}