// src/components/SuccessScreen.jsx
import React, { useEffect, useState } from 'react';

const SuccessScreen = ({ requestData, onClose, onNewRequest }) => {
  const [countdown, setCountdown] = useState(5);
  const [showConfetti, setShowConfetti] = useState(true);

  // Эффект для обратного отсчёта
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Эффект для конфетти
  useEffect(() => {
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(confettiTimer);
  }, []);

  // Автоматическое закрытие через 5 секунд
  useEffect(() => {
    if (countdown === 0) {
      const autoCloseTimer = setTimeout(() => {
        if (onClose) onClose();
      }, 500);

      return () => clearTimeout(autoCloseTimer);
    }
  }, [countdown, onClose]);

  // Функция для создания конфетти
  const createConfetti = () => {
    const colors = ['#FFD700', '#FFA500', '#FF6B6B', '#4CAF50', '#2196F3', '#9C27B0'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const size = Math.random() * 10 + 5;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;

      confetti.style.position = 'absolute';
      confetti.style.left = `${left}%`;
      confetti.style.top = '-20px';
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.opacity = Math.random() * 0.7 + 0.3;
      confetti.style.animation = `confettiFall ${duration}s ease-in ${delay}s forwards`;
      
      confettiContainer.appendChild(confetti);

      // Удаляем конфетти после анимации
      setTimeout(() => {
        confetti.remove();
      }, (duration + delay) * 1000);
    }

    // Удаляем контейнер через 5 секунд
    setTimeout(() => {
      confettiContainer.remove();
    }, 5000);
  };

  // Добавляем стили для анимации
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confettiFall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Запускаем конфетти
    createConfetti();
    
    return () => {
      style.remove();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 animate-fadeInUp">
        {/* Иконка успеха */}
        <div className="relative bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-t-2xl text-center">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="bg-green-500 rounded-full p-4 shadow-lg animate-bounce">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-8">Заявка принята! 🎉</h2>
          <p className="text-green-100 mt-2">Спасибо за доверие к Mövenpick Hotel</p>
        </div>

        {/* Контент */}
        <div className="p-6">
          {/* Информация о заявке */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-600 text-sm mb-2">Номер заявки:</p>
            <p className="text-gray-800 font-mono font-bold text-lg">{requestData?.id || 'MÖV-' + Math.floor(Math.random()*10000)}</p>
          </div>

          {/* Детали заявки */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <p className="text-gray-600 text-sm">Услуга</p>
                <p className="text-gray-800 font-semibold">{requestData?.service || 'Не указана'}</p>
              </div>
            </div>
            
            {requestData?.date && (
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">📅</div>
                <div>
                  <p className="text-gray-600 text-sm">Дата</p>
                  <p className="text-gray-800 font-semibold">{requestData.date}</p>
                </div>
              </div>
            )}
            
            {requestData?.time && (
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">🕐</div>
                <div>
                  <p className="text-gray-600 text-sm">Время</p>
                  <p className="text-gray-800 font-semibold">{requestData.time}</p>
                </div>
              </div>
            )}
            
            {requestData?.guests && (
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">👥</div>
                <div>
                  <p className="text-gray-600 text-sm">Количество гостей</p>
                  <p className="text-gray-800 font-semibold">{requestData.guests} чел.</p>
                </div>
              </div>
            )}
          </div>

          {/* Блок с шоколадным комплиментом */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-center">
            <div className="text-3xl mb-2">🍫</div>
            <p className="text-amber-800 font-semibold mb-1">Вас ждёт шоколадный комплимент!</p>
            <p className="text-amber-600 text-sm">При заселении вы получите фирменный шоколад Mövenpick</p>
          </div>

          {/* Кнопки действий */}
          <div className="space-y-3">
            <button
              onClick={() => {
                if (onNewRequest) onNewRequest();
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
            >
              🍫 Оставить ещё заявку
            </button>
            
            <button
              onClick={() => {
                if (onClose) onClose();
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
            >
              Закрыть (автоматически через {countdown} сек)
            </button>
          </div>

          {/* Подпись */}
          <p className="text-center text-gray-400 text-xs mt-4">
            Наш менеджер свяжется с вами в ближайшее время
          </p>
        </div>
      </div>

      {/* Стили для анимации */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

// Альтернативная простая версия без конфетти и анимаций
export const SimpleSuccessScreen = ({ requestData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl text-center">
          <div className="text-6xl mb-2">✅</div>
          <h2 className="text-2xl font-bold">Заявка принята!</h2>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 text-center mb-4">
            Спасибо, <strong>{requestData?.name || 'гость'}</strong>! Ваша заявка на услугу 
            <strong> "{requestData?.service || 'не указана'}"</strong> успешно отправлена.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-center">
            <p className="text-amber-700 text-sm">🍫 Не забудьте про шоколадный час в 15:00! 🍫</p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Отлично! 🎉
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;