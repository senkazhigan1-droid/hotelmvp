import React, { useState, useEffect } from 'react'
import { useLanguage } from './hooks/useLanguage'
import { useServices } from './hooks/useServices'
import { addRequest } from './utils/requestUtils'
import ServiceCard from './components/ServiceCard'
import ServiceModal from './components/ServiceModal'
import RequestForm from './components/RequestForm'
import SuccessScreen from './components/SuccessScreen'
import Header from './components/header'
import Hero from './components/Hero'
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
    const newRequest = await addRequest(formData)
    if (newRequest) {
      setLastRequest(newRequest)
      setShowForm(false)
      setShowSuccess(true)
    } else {
      alert('Ошибка при отправке заявки. Попробуйте ещё раз.')
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-100/80 to-orange-50/90 overflow-x-hidden">
      <Header />
      <Hero onScroll={handleHeroScroll} showAdminLink={false} />

      <section id="services" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">
            {t('services.subtitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mt-2 mb-4 font-serif">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-amber-700/80 max-w-2xl mx-auto text-lg">
            {t('services.description')}
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap mt-8">
            <button
              onClick={() => setShowOnlyPopular(!showOnlyPopular)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md ${
                showOnlyPopular 
                  ? 'bg-amber-600 text-white hover:bg-amber-700' 
                  : 'bg-white/70 backdrop-blur-sm text-amber-700 hover:bg-white border border-amber-200'
              }`}
            >
              {showOnlyPopular ? t('services.showAll') : t('services.popular')}
            </button>
          </div>
        </div>

        {displayedServices.length === 0 ? (
          <p className="text-center text-amber-600">Услуг пока нет</p>
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

      <section id="about" className="bg-white/60 backdrop-blur-sm py-16 md:py-24 border-t border-amber-200/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">
                {t('about.subtitle')}
              </span>
              <h2 className="text-4xl font-bold text-amber-800 mt-2 mb-4 font-serif">
                {t('about.title')}
              </h2>
              <div className="w-16 h-1 bg-amber-500 rounded-full mb-6"></div>
              <p className="text-amber-700/80 text-lg leading-relaxed mb-6">
                {t('about.description')}
              </p>
              <div className="flex gap-6 mb-6">
                <div>
                  <p className="text-3xl font-bold text-amber-600">20+</p>
                  <p className="text-amber-600/70 text-sm">{t('about.years')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-600">1000+</p>
                  <p className="text-amber-600/70 text-sm">{t('about.guests')}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-600">5</p>
                  <p className="text-amber-600/70 text-sm">{t('about.rating')}</p>
                </div>
              </div>
              <a href="#services" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50">
                {t('about.button')}
              </a>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/room.jpg" 
                  alt="Номер" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover border-2 border-amber-200/50"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300/78350F/FFFFFF?text=Номер'
                  }}
                />
                <img 
                  src="/images/spa.jpg" 
                  alt="Спа" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover mt-8 border-2 border-amber-200/50"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300/78350F/FFFFFF?text=СПА'
                  }}
                />
                <img 
                  src="/images/restaurant.jpg" 
                  alt="Ресторан" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover border-2 border-amber-200/50"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300/78350F/FFFFFF?text=Ресторан'
                  }}
                />
                <img 
                  src="/images/chocolate.jpg" 
                  alt="Шоколад" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover mt-8 border-2 border-amber-200/50"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300/78350F/FFFFFF?text=Шоколад'
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-xl shadow-xl">
                <p className="text-xl font-bold">{t('advantages.items.chocolate')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">
              {t('advantages.subtitle')}
            </span>
            <h2 className="text-4xl font-bold text-amber-800 mt-2 font-serif">
              {t('advantages.title')}
            </h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/30">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-amber-600">1</span>
              </div>
              <h3 className="font-bold text-amber-800 mb-2">{t('advantages.items.chocolate')}</h3>
              <p className="text-amber-600/70 text-sm">{t('advantages.items.chocolateDesc')}</p>
            </div>
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/30">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-amber-600">2</span>
              </div>
              <h3 className="font-bold text-amber-800 mb-2">{t('advantages.items.spa')}</h3>
              <p className="text-amber-600/70 text-sm">{t('advantages.items.spaDesc')}</p>
            </div>
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/30">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-amber-600">3</span>
              </div>
              <h3 className="font-bold text-amber-800 mb-2">{t('advantages.items.restaurant')}</h3>
              <p className="text-amber-600/70 text-sm">{t('advantages.items.restaurantDesc')}</p>
            </div>
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/30">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-amber-600">4</span>
              </div>
              <h3 className="font-bold text-amber-800 mb-2">{t('advantages.items.view')}</h3>
              <p className="text-amber-600/70 text-sm">{t('advantages.items.viewDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-amber-900/90 backdrop-blur-sm text-white py-12 border-t border-amber-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-amber-100">Mövenpick Hotel</h3>
              <p className="text-amber-200/70 text-sm">{t('footer.description')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-amber-100">{t('footer.contacts')}</h4>
              <p className="text-amber-200/70 text-sm">{t('footer.address')}</p>
              <p className="text-amber-200/70 text-sm">{t('footer.phone')}</p>
              <p className="text-amber-200/70 text-sm">{t('footer.email')}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-amber-100">{t('footer.links')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="text-amber-200/70 hover:text-amber-100 transition-colors">{t('header.nav.services')}</a></li>
                <li><a href="#about" className="text-amber-200/70 hover:text-amber-100 transition-colors">{t('header.nav.about')}</a></li>
                <li><a href="#services" className="text-amber-200/70 hover:text-amber-100 transition-colors">{t('header.nav.contacts')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-amber-100">{t('footer.subscribe')}</h4>
              <p className="text-amber-200/70 text-sm mb-4">{t('footer.subscribeDesc')}</p>
              <div className="flex gap-4">
                <a href="#" className="text-amber-200/70 hover:text-amber-100 transition-colors">Instagram</a>
                <a href="#" className="text-amber-200/70 hover:text-amber-100 transition-colors">Facebook</a>
                <a href="#" className="text-amber-200/70 hover:text-amber-100 transition-colors">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800/30 mt-8 pt-8 text-center text-amber-200/50 text-sm">
            <p>{t('footer.rights')}</p>
          </div>
        </div>
      </footer>

      <ServiceModal service={selectedService} onClose={closeModal} onOrder={handleOrder} />

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{t('form.title')}</h2>
                <button onClick={closeForm} className="text-white hover:text-gray-200 text-2xl leading-none">✕</button>
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