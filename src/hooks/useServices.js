// src/hooks/useServices.js
import { useLanguage } from './useLanguage'
import { getImagePath } from '../utils/paths'

export const useServices = () => {
  const { t } = useLanguage()

  const getTranslatedServices = () => {
    const serviceKeys = ['chocolate', 'spa', 'restaurant', 'room', 'transfer', 'fitness', 'conference', 'pool']
    
    return serviceKeys.map((key, index) => ({
      id: index + 1,
      title: t(`services.list.${key}.title`),
      description: t(`services.list.${key}.description`),
      price: t(`services.list.${key}.price`),
      category: getCategory(key),
      isPopular: ['chocolate', 'spa', 'restaurant', 'room'].includes(key),
      image: getImagePath(`images/${key}.jpg`),
      duration: getDuration(key),
      includes: getIncludes(key)
    }))
  }

  const getCategory = (key) => {
    const categories = {
      chocolate: 'special',
      spa: 'spa',
      restaurant: 'restaurant',
      room: 'room',
      transfer: 'transport',
      fitness: 'sport',
      conference: 'business',
      pool: 'sport'
    }
    return categories[key] || 'other'
  }

  const getDuration = (key) => {
    const durations = {
      chocolate: '1 hour',
      spa: '1.5 hours',
      restaurant: '2 hours',
      room: '1 day',
      transfer: '40 min',
      fitness: '1 hour',
      conference: '4 hours',
      pool: 'Unlimited'
    }
    return durations[key] || ''
  }

  const getIncludes = (key) => {
    const includes = {
      chocolate: ['Fondue', 'Truffles', 'Hot chocolate'],
      spa: ['Massage', 'Wrap', 'Sauna'],
      restaurant: ['Dinner', 'Wine', 'Dessert'],
      room: ['Breakfast', 'Chocolate', 'Bathrobe'],
      transfer: ['Meeting', 'Water', 'Wi-Fi'],
      fitness: ['Machines', 'Yoga', 'Shower'],
      conference: ['Projector', 'Microphone', 'Coffee break'],
      pool: ['Pool', 'Jacuzzi', 'Lounge chairs']
    }
    return includes[key] || []
  }

  return {
    services: getTranslatedServices(),
    getPopularServices: () => getTranslatedServices().filter(s => s.isPopular)
  }
}