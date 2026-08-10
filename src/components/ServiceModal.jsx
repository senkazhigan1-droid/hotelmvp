// src/components/ServiceModal.jsx
import React from 'react'

export default function ServiceModal({ service, onClose, onOrder }) {
  if (!service) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-smooth max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-warm" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-gold text-white p-8 rounded-t-smooth">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200 text-3xl leading-none transition-colors">✕</button>
          <h2 className="text-3xl font-bold pr-8 font-serif">{service.title}</h2>
          <p className="text-gold-100 mt-1 text-sm tracking-wider uppercase">{service.category}</p>
        </div>

        <div className="p-8">
          {service.image && (
            <div className="mb-6 rounded-soft overflow-hidden shadow-soft">
              <img src={service.image} alt={service.title} className="w-full h-72 object-cover" />
            </div>
          )}

          <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.description}</p>

          <div className="bg-warm border border-gold-100 rounded-soft p-6 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Стоимость</span>
              <span className="text-3xl font-bold text-gold">{service.price}</span>
            </div>
            {service.duration && (
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gold-100">
                <span className="text-gray-600 font-medium">Длительность</span>
                <span className="text-warm-dark font-semibold">{service.duration}</span>
              </div>
            )}
          </div>

          {service.includes && service.includes.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-warm-dark mb-4 text-lg">Входит в услугу:</h3>
              <div className="grid grid-cols-2 gap-2">
                {service.includes.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600 bg-warm rounded-soft px-4 py-2">
                    <span className="text-gold text-lg">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => onOrder(service)} className="flex-1 px-6 py-4 bg-gold text-white rounded-soft hover:bg-gold-600 transition-all duration-300 font-semibold shadow-gold hover:shadow-lg">
              Забронировать сейчас
            </button>
            <button onClick={onClose} className="px-6 py-4 border border-gray-300 text-gray-700 rounded-soft hover:bg-gray-50 transition-colors font-medium">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}