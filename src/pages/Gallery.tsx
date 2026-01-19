import React, { useState } from 'react';
import { X, ZoomIn, ExternalLink } from 'lucide-react';

const categories = ['All', 'Electrical', 'Solar', 'Security', 'Smart Home'];

const galleryItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    title: 'Commercial Electrical Installation',
    category: 'Electrical',
    description: 'Complete electrical system for a 10,000 sq ft commercial building',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    title: 'Rooftop Solar Array',
    category: 'Solar',
    description: '50kW solar installation for industrial facility',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    title: 'CCTV Security System',
    category: 'Security',
    description: '32-camera HD surveillance system with remote monitoring',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    title: 'Industrial Panel Installation',
    category: 'Electrical',
    description: 'High-capacity electrical panel for manufacturing plant',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&q=80',
    title: 'Smart Home Control Center',
    category: 'Smart Home',
    description: 'Integrated home automation with voice control',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80',
    title: 'Ground-Mounted Solar Farm',
    category: 'Solar',
    description: '2MW solar farm installation for agricultural facility',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    title: 'Perimeter Security Fencing',
    category: 'Security',
    description: 'Electric fencing system for corporate headquarters',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80',
    title: 'Smart Lighting System',
    category: 'Smart Home',
    description: 'Automated lighting with scene presets and scheduling',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    title: 'LED Office Lighting',
    category: 'Electrical',
    description: 'Energy-efficient LED upgrade for office complex',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    title: 'Battery Storage Installation',
    category: 'Solar',
    description: '100kWh battery storage for solar backup system',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
    title: 'Outdoor Security Lighting',
    category: 'Security',
    description: 'Motion-activated flood lights for parking facility',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1593941707882-a56bbc8df44c?w=800&q=80',
    title: 'Home Automation Setup',
    category: 'Smart Home',
    description: 'Complete smart home package with app control',
  },
];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (item: typeof galleryItems[0]) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/80" />
        </div>
        
        <div className="absolute top-20 right-10 w-72 h-72 blob-decoration blob-primary" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="badge badge-primary mb-6">Our Work</span>
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
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 cursor-pointer hover-lift"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <span className="badge badge-primary mb-3 self-start">{item.category}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                  
                  {/* View Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Category Badge (always visible) */}
                <div className="absolute top-4 left-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="badge badge-primary">{item.category}</span>
                </div>
              </div>
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
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge badge-primary mb-4">Start Your Project</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Let's discuss your requirements and create something amazing together.
              Our team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300 btn-shimmer"
              >
                Get Free Consultation
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-yellow to-amber-500 text-navy font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div
            className="max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-strong"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedImage.image.replace('w=800', 'w=1200')}
                alt={selectedImage.title}
                className="w-full max-h-[60vh] object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="badge badge-primary">{selectedImage.category}</span>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
                >
                  Request Similar Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{selectedImage.title}</h2>
              <p className="text-gray-600 text-lg">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
