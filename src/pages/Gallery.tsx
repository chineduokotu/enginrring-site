import React, { useState } from 'react';
import GalleryItem from '../components/sections/GalleryItem';

const categories = ['All', 'Electrical', 'Solar', 'Security', 'Smart Home'];

const galleryItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    title: 'Commercial Electrical Installation',
    category: 'Electrical',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    title: 'Rooftop Solar Array',
    category: 'Solar',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    title: 'CCTV Security System',
    category: 'Security',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    title: 'Industrial Panel Installation',
    category: 'Electrical',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&q=80',
    title: 'Smart Home Control Center',
    category: 'Smart Home',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
    title: 'Ground-Mounted Solar Farm',
    category: 'Solar',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    title: 'Perimeter Security Fencing',
    category: 'Security',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80',
    title: 'Smart Lighting System',
    category: 'Smart Home',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    title: 'LED Office Lighting',
    category: 'Electrical',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    title: 'Battery Storage Installation',
    category: 'Solar',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
    title: 'Outdoor Security Lighting',
    category: 'Security',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1593941707882-a56bbc8df44c?w=800&q=80',
    title: 'Home Automation Setup',
    category: 'Smart Home',
  },
];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-navy via-navy-light to-navy">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary font-medium rounded-full text-sm mb-4">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Project Gallery
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our portfolio of completed projects. Each installation represents
              our commitment to quality, safety, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
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

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <GalleryItem
                key={item.id}
                image={item.image}
                title={item.title}
                category={item.category}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Let's discuss your requirements and create something amazing together.
            Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
            >
              Get Free Consultation
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-yellow text-navy font-semibold rounded-lg hover:bg-amber-400 transition-colors duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
