import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import { services } from './data/services';

function App() {
  const [selectedService, setSelectedService] = useState(null);
  
  const handleSelectService = (service) => {
    setSelectedService(service);
    alert(`You selected: ${service.title}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Hero />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onClick={handleSelectService}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;