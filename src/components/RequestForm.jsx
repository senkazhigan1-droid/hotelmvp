// src/components/RequestForm.jsx
import React, { useState } from 'react';

const RequestForm = ({ onSubmit, initialData = {}, isModal = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    service: initialData.service || '',
    date: initialData.date || '',
    time: initialData.time || '',
    guests: initialData.guests || '2',
    comment: initialData.comment || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^[\d\s\+\(\)\-]{10,17}$/.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.service) {
      newErrors.service = 'Выберите услугу';
    }
    
    if (!formData.date) {
      newErrors.date = 'Выберите дату';
    }
    
    return newErrors;
  };

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Имитация отправки на сервер
    setTimeout(() => {
      console.log('Данные формы:', formData);
      if (onSubmit) {
        onSubmit(formData);
      }
      setIsSubmitting(false);
      
      // Сброс формы после успешной отправки (опционально)
      // setFormData({
      //   name: '',
      //   phone: '',
      //   email: '',
      //   service: '',
      //   date: '',
      //   time: '',
      //   guests: '2',
      //   comment: '',
      // });
    }, 1000);
  };

  // Список услуг для выбора
  const serviceOptions = [
    { value: '', label: 'Выберите услугу' },
    { value: 'Шоколадный час Mövenpick', label: '🍫 Шоколадный час Mövenpick' },
    { value: 'Ресторан швейцарской кухни', label: '🧀 Ресторан швейцарской кухни' },
    { value: 'Премиум номера', label: '👑 Премиум номера' },
    { value: 'Mövenpick СПА', label: '💎 Mövenpick СПА' },
    { value: 'Конференц-залы Montreux', label: '🏔️ Конференц-залы Montreux' },
    { value: 'Детский клуб', label: '🐻 Детский клуб "Альпийский лучик"' },
    { value: 'Фитнес с видом', label: '⛰️ Фитнес с альпийским видом' },
    { value: 'Экскурсии', label: '🚞 Экскурсии "Альпийский вояж"' },
    { value: 'Лаунж-бар', label: '🥂 Лаунж-бар "Geneva"' },
    { value: 'Трансфер', label: '🚘 Трансфер на премиум авто' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Поле Имя */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Ваше имя <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Иван Иванов"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Поле Телефон */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Номер телефона <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (999) 123-45-67"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Поле Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ivan@example.com"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
        <p className="text-gray-400 text-xs mt-1">Необязательно, но пригодится для подтверждения</p>
      </div>

      {/* Поле Услуга */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Выберите услугу <span className="text-red-500">*</span>
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white ${
            errors.service ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {serviceOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-red-500 text-xs mt-1">{errors.service}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Поле Дата */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Дата <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
          )}
        </div>

        {/* Поле Время */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Время
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          />
          <p className="text-gray-400 text-xs mt-1">Необязательно</p>
        </div>
      </div>

      {/* Поле Количество гостей */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Количество гостей
        </label>
        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'гость' : (num < 5 ? 'гостя' : 'гостей')}
            </option>
          ))}
          <option value="10+">Более 10 гостей</option>
        </select>
      </div>

      {/* Поле Комментарий */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Комментарий или особые пожелания
        </label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="3"
          placeholder="Например: нужны детские кресла, аллергия на продукты, особые даты..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-none"
        />
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Отправка...
          </span>
        ) : (
          'Отправить заявку 🍫'
        )}
      </button>

      {/* Подпись */}
      <p className="text-center text-gray-400 text-xs mt-4">
        Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных
      </p>
    </form>
  );
};

export default RequestForm;