// src/components/SuccessScreen.jsx
import React from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function SuccessScreen({ requestData, onClose, onNewRequest }) {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl transform transition-all duration-300 scale-100">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{t('success.title')}</h2>
        <p className="text-gray-600 mb-2">
          {t('success.thanks', { name: requestData?.name || 'гость' })}
        </p>
        <p className="text-gray-600 mb-6">{t('success.message')}</p>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-gray-500 text-xs">Номер заявки</p>
          <p className="text-gray-800 font-mono font-bold">{requestData?.id || 'MÖV-' + Math.floor(Math.random()*10000)}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
          <p className="text-amber-700 text-sm">{t('success.chocolateBonus')}</p>
        </div>
        
        <div className="flex gap-3">
          <button onClick={onNewRequest} className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
            {t('success.newRequest')}
          </button>
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            {t('success.close')}
          </button>
        </div>
      </div>
    </div>
  )
}