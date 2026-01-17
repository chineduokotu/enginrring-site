import React, { useState } from 'react';
import ProductCard from '../components/sections/ProductCard';

const categories = ['All', 'Electrical', 'Solar', 'Security', 'Smart Home'];

const products = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    name: 'Professional CCTV Camera System',
    price: 'From $299',
    category: 'Security',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    name: 'Solar Panel Kit 5kW',
    price: 'From $2,499',
    category: 'Solar',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80',
    name: 'Smart Thermostat Pro',
    price: 'From $199',
    category: 'Smart Home',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80',
    name: 'LED Panel Light Set',
    price: 'From $89',
    category: 'Electrical',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    name: 'Solar Battery Storage 10kWh',
    price: 'From $3,999',
    category: 'Solar',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&q=80',
    name: 'Smart Door Lock with Fingerprint',
    price: 'From $249',
    category: 'Smart Home',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
    name: 'Industrial Circuit Breaker Panel',
    price: 'From $549',
    category: 'Electrical',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80',
    name: 'Motion Sensor Flood Light',
    price: 'From $79',
    category: 'Security',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1593941707882-a56bbc8df44c?w=600&q=80',
    name: 'Smart Home Hub Controller',
    price: 'From $149',
    category: 'Smart Home',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80',
    name: 'Solar Inverter 8kW',
    price: 'From $1,299',
    category: 'Solar',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    name: 'Electric Fence Energizer',
    price: 'From $399',
    category: 'Security',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&q=80',
    name: 'Surge Protection Device',
    price: 'From $129',
    category: 'Electrical',
  },
];

const Store: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-navy via-navy-light to-navy">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary font-medium rounded-full text-sm mb-4">
              Our Store
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Quality Products & Equipment
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Browse our selection of premium electrical, solar, and smart home products.
              All items come with manufacturer warranties and professional installation options.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                category={product.category}
                linkTo="/contact"
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Our expert team can help you select the right products for your specific needs.
              Contact us for personalized recommendations and bulk pricing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                Contact Our Team
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-yellow text-navy font-semibold rounded-lg hover:bg-amber-400 transition-colors duration-300"
              >
                WhatsApp for Quick Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Store;
