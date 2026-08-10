// src/components/SuccessScreen.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function SuccessScreen({ requestData, onClose, onNewRequest }) {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-smooth max-w-md w-full p-8 text-center shadow-medium">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('success.title')}</h2>
        
        <p className="text-gray-600 mb-2">
          {t('success.thanks', { name: requestData?.name || 'гость' })}
        </p>
        
        <p className="text-gray-600 mb-6">{t('success.message')}</p>

        <div className="bg-cream rounded-soft p-3 mb-4">
          <p className="text-gray-500 text-xs">Номер заявки</p>
          <p className="text-gray-800 font-mono font-bold">{requestData?.id || 'MÖV-' + Math.floor(Math.random()*10000)}</p>
        </div>

        <div className="bg-gold-50 border border-gold-100 rounded-soft p-3 mb-6">
          <p className="text-gold text-sm">{t('success.chocolateBonus')}</p>
        </div>
        
        <div className="flex gap-3">
          <button onClick={onNewRequest} className="flex-1 px-4 py-2 bg-gold text-white rounded-soft hover:bg-gold-600 transition-colors">
            {t('success.newRequest')}
          </button>
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-soft hover:bg-gray-50 transition-colors">
            {t('success.close')}
          </button>
        </div>
      </div>
    </div>
  )
}