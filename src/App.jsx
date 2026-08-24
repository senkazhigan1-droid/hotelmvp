import React, { useState, useEffect } from 'react'
import { useLanguage } from './hooks/useLanguage'
import { useServices } from './hooks/useServices'
import { addRequest } from './utils/requestUtils'
import ServiceCard from './components/ServiceCard'
import ServiceModal from './components/ServiceModal'
import RequestForm from './components/RequestForm'
import SuccessScreen from './components/SuccessScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import { getImagePath } from './utils/paths'
import './output.css'

export default function App() {
  const { t } = useLanguage()
  const { services, getPopularServices } = useServices()

  const [showOnlyPopular, setShowOnlyPopular] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastRequest, setLastRequest] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const displayedServices = showOnlyPopular ? getPopularServices() : services

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = document.querySelectorAll('.service-card')
    cards.forEach((card) => observer.observe(card))

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [displayedServices])

  const handleOrder = (service) => {
    console.log('Кнопка Забронировать нажата!', service)
    setSelectedService(service)
    setShowForm(true)
    setIsModalOpen(false)
  }

  const handleDetails = (service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  const closeForm = () => {
    setShowForm(false)
    setSelectedService(null)
  }

  const handleFormSubmit = async (formData) => {
    try {
      const newRequest = await addRequest(formData)
      if (newRequest) {
        setLastRequest(newRequest)
        setShowForm(false)
        setShowSuccess(true)
      } else {
        alert('Ошибка при отправке заявки. Попробуйте ещё раз.')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Произошла ошибка. Попробуйте ещё раз.')
    }
  }

  const closeSuccess = () => {
    setShowSuccess(false)
    setLastRequest(null)
  }

  const handleNewRequest = () => {
    setShowSuccess(false)
    setShowForm(true)
    setSelectedService(null)
  }

  const handleHeroScroll = (scrolled) => {
    setIsScrolled(scrolled)
  }

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <Header />
      <Hero onScroll={handleHeroScroll} showAdminLink={false} />

      <section id="services" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            {t('services.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-warm-dark mt-2 mb-4 font-serif">
            {t('services.title')}
          </h2>
          <div className="divider-gold"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('services.description')}
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap mt-8">
            <button
              onClick={() => setShowOnlyPopular(!showOnlyPopular)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-soft ${
                showOnlyPopular 
                  ? 'bg-gold text-white hover:bg-gold-600' 
                  : 'bg-white text-warm-dark hover:bg-warm border border-gold-200'
              }`}
            >
              {showOnlyPopular ? t('services.showAll') : t('services.popular')}
            </button>
          </div>
        </div>

        {displayedServices.length === 0 ? (
          <p className="text-center text-gray-500">Услуг пока нет</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
      </section>

      <section id="about" className="bg-warm py-16 md:py-24 border-t border-gold-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                {t('about.subtitle')}
              </span>
              <h2 className="text-4xl font-bold text-warm-dark mt-2 mb-4 font-serif">
                {t('about.title')}
              </h2>
              <div className="w-16 h-1 bg-gold rounded-full mb-6"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t('about.description')}
              </p>
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="text-3xl font-bold text-gold">20+</p>
                  <p className="text-gray-500 text-sm">{t('about.years')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold">1000+</p>
                  <p className="text-gray-500 text-sm">{t('about.guests')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gold">5</p>
                  <p className="text-gray-500 text-sm">{t('about.rating')}</p>
                </div>
              </div>
              <a href="#services" className="btn-primary">
                {t('about.button')}
              </a>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src={getImagePath('images/room.jpg')}
                  alt="Номер" 
                  className="rounded-soft shadow-medium w-full h-48 object-cover border border-gold-100"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300/B8860B/FFFFFF?text=Номер'
                  }}
                />
                <img 
                  src={getImagePath('images/spa.jpg')}
                  alt="Спа" 
                  className="rounded-soft shadow-medium w-full h-48 object-cover mt-8 border border-gold-100"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300/B8860B/FFFFFF?text=СПА'
                  }}
                />
                <img 
                  src={getImagePath('images/restaurant.jpg')}
                  alt="Ресторан" 
                  className="rounded-soft shadow-medium w-full h-48 object-cover border border-gold-100"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300/B8860B/FFFFFF?text=Ресторан'
                  }}
                />
                <img 
                  src={getImagePath('images/chocolate.jpg')}
                  alt="Шоколад" 
                  className="rounded-soft shadow-medium w-full h-48 object-cover mt-8 border border-gold-100"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300/B8860B/FFFFFF?text=Шоколад'
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gold text-white p-4 rounded-soft shadow-gold">
                <p className="text-xl font-bold">{t('advantages.items.chocolate')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              {t('advantages.subtitle')}
            </span>
            <h2 className="text-4xl font-bold text-warm-dark mt-2 font-serif">
              {t('advantages.title')}
            </h2>
            <div className="divider-gold"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center p-6">
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-gold">1</span>
              </div>
              <h3 className="font-bold text-warm-dark mb-2">{t('advantages.items.chocolate')}</h3>
              <p className="text-gray-500 text-sm">{t('advantages.items.chocolateDesc')}</p>
            </div>
            <div className="card text-center p-6">
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-gold">2</span>
              </div>
              <h3 className="font-bold text-warm-dark mb-2">{t('advantages.items.spa')}</h3>
              <p className="text-gray-500 text-sm">{t('advantages.items.spaDesc')}</p>
            </div>
            <div className="card text-center p-6">
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-gold">3</span>
              </div>
              <h3 className="font-bold text-warm-dark mb-2">{t('advantages.items.restaurant')}</h3>
              <p className="text-gray-500 text-sm">{t('advantages.items.restaurantDesc')}</p>
            </div>
            <div className="card text-center p-6">
              <div className="w-16 h-16 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-gold">4</span>
              </div>
              <h3 className="font-bold text-warm-dark mb-2">{t('advantages.items.view')}</h3>
              <p className="text-gray-500 text-sm">{t('advantages.items.viewDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Контакты</span>
            <h2 className="text-4xl font-bold text-warm-dark mt-2 font-serif">Свяжитесь с нами</h2>
            <div className="divider-gold"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Мы всегда рады ответить на ваши вопросы</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="font-serif text-xl font-bold text-warm-dark mb-4">Наш адрес</h3>
              <p className="text-gray-600 mb-2">Швейцария, Интерлакен</p>
              <p className="text-gray-600 mb-2">Höheweg 41, 3800 Interlaken</p>
              <p className="text-gray-600 mb-4">🇨🇭 Switzerland</p>
              
              <h3 className="font-serif text-xl font-bold text-warm-dark mb-4 mt-6">Контакты</h3>
              <p className="text-gray-600 mb-2">📞 +41 79 123 45 67</p>
              <p className="text-gray-600 mb-2">✉️ info@movenpick-hotel.ch</p>
              <p className="text-gray-600">🌐 www.movenpick-hotel.ch</p>

              <a href="#services" className="btn-primary inline-block mt-6">Забронировать сейчас</a>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-warm-dark mb-4">Часы работы</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gold-50 pb-3">
                  <span className="text-gray-600">Ресепшн</span>
                  <span className="text-warm-dark font-medium">Круглосуточно</span>
                </div>
                <div className="flex justify-between items-center border-b border-gold-50 pb-3">
                  <span className="text-gray-600">Шоколадный час</span>
                  <span className="text-warm-dark font-medium">15:00 – 16:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gold-50 pb-3">
                  <span className="text-gray-600">Ресторан</span>
                  <span className="text-warm-dark font-medium">12:00 – 23:00</span>
                </div>
                <div className="flex justify-between items-center border-b border-gold-50 pb-3">
                  <span className="text-gray-600">СПА-центр</span>
                  <span className="text-warm-dark font-medium">10:00 – 21:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Фитнес</span>
                  <span className="text-warm-dark font-medium">06:00 – 22:00</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-warm rounded-soft border border-gold-100">
                <p className="text-sm text-gray-600">
                  🍫 <span className="font-medium text-warm-dark">Ежедневный шоколадный час</span>
                  <br />
                  Приходите и наслаждайтесь нашими знаменитыми трюфелями!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-warm-dark text-white py-12 border-t border-gold-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-gold-200">Mövenpick Hotel</h3>
              <p className="text-gray-400 text-sm">{t('footer.description')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gold-200">{t('footer.contacts')}</h4>
              <p className="text-gray-400 text-sm">{t('footer.address')}</p>
              <p className="text-gray-400 text-sm">{t('footer.phone')}</p>
              <p className="text-gray-400 text-sm">{t('footer.email')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gold-200">{t('footer.links')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="text-gray-400 hover:text-gold-200 transition-colors">{t('header.nav.services')}</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-gold-200 transition-colors">{t('header.nav.about')}</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-gold-200 transition-colors">{t('header.nav.contacts')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gold-200">{t('footer.subscribe')}</h4>
              <p className="text-gray-400 text-sm mb-4">{t('footer.subscribeDesc')}</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-gold-200 transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-gold-200 transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-gold-200 transition-colors">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gold-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>{t('footer.rights')}</p>
          </div>
        </div>
      </footer>

      <ServiceModal service={selectedService} onClose={closeModal} onOrder={handleOrder} />

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-soft max-w-md w-full max-h-[90vh] overflow-y-auto shadow-warm">
            <div className="sticky top-0 bg-gold text-white p-6 rounded-t-soft">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{t('form.title')}</h2>
                <button onClick={closeForm} className="text-white hover:text-gray-200 text-2xl leading-none">✕</button>
              </div>
              {selectedService && (
                <p className="text-gold-100 text-sm mt-1">
                  {t('form.service')}: {selectedService.title}
                </p>
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

      {showSuccess && (
        <SuccessScreen 
          requestData={lastRequest}
          onClose={closeSuccess}
          onNewRequest={handleNewRequest}
        />
      )}
    </div>
  )
}