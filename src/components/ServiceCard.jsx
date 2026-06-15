import React from 'react';

export default function ServiceCard({ service, onOrder, onDetails }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      {service.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Фото+загружается';
            }}
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
        <p className="text-2xl font-bold text-amber-600 mb-4">{service.price}</p>
        <div className="flex gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDetails(service);
            }}
            className="flex-1 px-4 py-2 border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors text-sm font-semibold"
          >
            Подробнее
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOrder(service);
            }}
            className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-semibold"
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}