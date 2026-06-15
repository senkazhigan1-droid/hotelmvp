import React, { useState } from 'react';
import { services, getPopularServices } from './data/services';
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';
import RequestForm from './components/RequestForm';
import SuccessScreen from './components/SuccessScreen';
import AdminPanel from './components/AdminPanel';
import { addRequest } from './utils/requestUtils';
import './output.css';

export default function App() {
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastRequest, setLastRequest] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const displayedServices = showOnlyPopular ? getPopularServices() : services;

  const handleOrder = (service) => {
    setSelectedService(service);
    setShowForm(true);
    setIsModalOpen(false);
  };

  const handleDetails = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedService(null);
  };

  const handleFormSubmit = (formData) => {
    const newRequest = addRequest(formData);
    setLastRequest(newRequest);
    setShowForm(false);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setLastRequest(null);
  };

  const handleNewRequest = () => {
    setShowSuccess(false);
    setShowForm(true);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Шапка с фоновой фоткой */}
      <header className="relative text-white py-20 shadow-xl" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('https://cdn.pixabay.com/photo/2016/10/22/17/49/hotel-1761083_640.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute top-4 right-4 text-6xl opacity-20">🍫</div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-7xl mb-4 drop-shadow-lg">🏔️🍫</div>
          <h1 className="text-6xl font-bold mb-3 drop-shadow-lg">Mövenpick Hotel</h1>
          <p className="text-2xl opacity-95 drop-shadow">Швейцарское гостеприимство с шоколадной традицией</p>
          <div className="mt-4 text-lg opacity-90">✨ Ежедневный шоколадный час — 15:00–16:00 ✨</div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Наши услуги</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            От знаменитого шоколадного часа до премиум трансфера — мы создали идеальные условия для вашего отдыха
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setShowOnlyPopular(!showOnlyPopular)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md ${
                showOnlyPopular 
                  ? 'bg-amber-600 text-white hover:bg-amber-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {showOnlyPopular ? '✨ Показать все услуги' : '⭐ Показать популярное'}
            </button>
            
            <button
              onClick={() => setShowAdminPanel(true)}
              className="px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md bg-gray-700 text-white hover:bg-gray-800"
            >
              👨‍💼 Админ-панель
            </button>
          </div>
        </div>

        {/* Сетка карточек */}
        {displayedServices.length === 0 ? (
          <p className="text-center text-gray-500">Услуг пока нет</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedServices.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onOrder={handleOrder}
                onDetails={handleDetails}
              />
            ))}
          </div>
        )}
      </main>

      {/* Футер */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl mb-2">🏔️🍫</div>
          <p className="mb-2">© 2025 Mövenpick Hotel | Швейцарское качество и тепло</p>
          <p className="text-gray-400 text-sm">Создано с любовью для вашего идеального отдыха</p>
        </div>
      </footer>

      {/* Модальное окно с деталями услуги */}
      <ServiceModal 
        service={selectedService} 
        onClose={closeModal} 
        onOrder={handleOrder}
      />

      {/* Форма отправки заявки */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Оставить заявку</h2>
                <button 
                  onClick={closeForm}
                  className="text-white hover:text-gray-200 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>
              {selectedService && (
                <p className="text-amber-100 text-sm mt-1">Услуга: {selectedService.title}</p>
              )}
            </div>
            <div className="p-6">
              <RequestForm 
                onSubmit={handleFormSubmit}
                initialData={selectedService ? { service: selectedService.title } : {}}
              />
            </div>
          </div>
        </div>
      )}

      {/* Экран успеха */}
      {showSuccess && (
        <SuccessScreen 
          requestData={lastRequest}
          onClose={closeSuccess}
          onNewRequest={handleNewRequest}
        />
      )}

      {/* Админ-панель */}
      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </div>
  );
}