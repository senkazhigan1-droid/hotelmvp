// src/components/ServiceCard.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function ServiceCard({ service, onOrder, onDetails }) {
  const { t } = useLanguage()

  const formatPrice = (price) => {
    if (price === 'Бесплатно' || price === 'Free' || price === 'Бесплатно для гостей' || price === 'Free for guests') {
      return t('services.free')
    }
    return price
  }

  return (
    <div className="service-card group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border border-amber-200/30">
      {service.image && (
        <div className="overflow-hidden h-52 relative">
          <img 
            src={service.image} 
            alt={service.title}
            className="card-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x300/78350F/FFFFFF?text=' + encodeURIComponent(service.title)
            }}
          />
          {service.isPopular && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              ★ {t('services.popular')}
            </div>
          )}
          {(service.price === 'Бесплатно' || service.price === 'Free') && (
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {t('services.free')}
            </div>
          )}
        </div>
      )}
      <div className="p-5">
        <h3 className="card-title text-lg font-bold text-amber-800 mb-1">{service.title}</h3>
        <p className="text-amber-700/70 text-sm mb-3">{service.description}</p>
        <p className="card-price text-2xl font-bold text-amber-600 mb-4">{formatPrice(service.price)}</p>
        
        <div className="flex gap-2 w-full">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onDetails(service)
            }}
            className="flex-1 px-3 py-2 text-sm border border-amber-400/50 text-amber-700 rounded-xl hover:bg-amber-50/50 transition-all font-medium"
          >
            {t('services.details')}
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onOrder(service)
            }}
            className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all font-medium shadow-md hover:shadow-lg"
          >
            {t('services.book')}
          </button>
        </div>
      </div>
    </div>
  )
}