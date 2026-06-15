// src/components/ServiceModal.jsx
import React from 'react';

const ServiceModal = ({ service, onClose, onOrder }) => {
  if (!service) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок с иконкой */}
        <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-t-2xl">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl"
          >
            ✕
          </button>
          <div className="text-6xl mb-3">{service.icon}</div>
          <h2 className="text-2xl font-bold">{service.title}</h2>
          <div className="flex gap-2 mt-2">
            {service.badge && (
              <span className="bg-white bg-opacity-20 text-white text-xs px-3 py-1 rounded-full">
                {service.badge}
              </span>
            )}
            {service.popular && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                🔥 Популярное
              </span>
            )}
          </div>
        </div>

        {/* Контент */}
        <div className="p-6">
          {/* Полное описание */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📖 Подробнее об услуге</h3>
            <p className="text-gray-600 leading-relaxed">{service.fullDescription || service.description}</p>
          </div>

          {/* Характеристики */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {service.time && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">🕐 Время</div>
                <div className="font-semibold text-gray-800">{service.time}</div>
              </div>
            )}
            {service.location && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">📍 Место</div>
                <div className="font-semibold text-gray-800">{service.location}</div>
              </div>
            )}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-500 text-sm">💰 Цена</div>
              <div className="font-semibold text-amber-600 text-lg">{service.price}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-gray-500 text-sm">⭐ Рейтинг</div>
              <div className="font-semibold text-gray-800">★★★★★ 5.0</div>
            </div>
          </div>

          {/* Все преимущества */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">✨ Что вас ждёт</h3>
            <div className="grid grid-cols-2 gap-2">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-amber-500">✓</span> {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                onOrder && onOrder(service);
                onClose();
              }}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              📞 Забронировать сейчас
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-200"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;