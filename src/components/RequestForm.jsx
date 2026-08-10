// src/components/RequestForm.jsx
import React, { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'

export default function RequestForm({ onSubmit, initialData }) {
  const { t } = useLanguage()
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialData?.service || '',
    date: '',
    time: '',
    guests: '',
    comment: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.name')} *</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required
          className="input-field" 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.phone')} *</label>
        <input 
          type="tel" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          required
          className="input-field" 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.email')}</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange}
          className="input-field" 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.service')}</label>
        <input 
          type="text" 
          name="service" 
          value={formData.service} 
          onChange={handleChange}
          className="input-field bg-cream cursor-not-allowed" 
          readOnly 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.date')} *</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required
            className="input-field" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.time')}</label>
          <input 
            type="time" 
            name="time" 
            value={formData.time} 
            onChange={handleChange}
            className="input-field" 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.guests')}</label>
        <input 
          type="number" 
          name="guests" 
          value={formData.guests} 
          onChange={handleChange} 
          min="1" 
          max="20"
          className="input-field" 
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.comment')}</label>
        <textarea 
          name="comment" 
          value={formData.comment} 
          onChange={handleChange} 
          rows="3"
          className="input-field" 
        />
      </div>
      
      <button 
        type="submit"
        className="w-full py-4 bg-gold text-white rounded-soft hover:bg-gold-600 transition-all duration-300 font-semibold text-lg shadow-gold hover:shadow-lg"
      >
        {t('form.submit')}
      </button>
    </form>
  )
}