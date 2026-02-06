import { useEffect, useState } from 'react';
import { X, ZoomIn, ExternalLink, Loader2, AlertCircle, Play } from 'lucide-react';
import { galleryApi } from '../services/api';
import type { GalleryItem } from '../services/api';

const categories = ['All', 'Electrical', 'Solar', 'Security', 'Smart Home'];

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await galleryApi.getAll();
        setItems(response.data);
      } catch {
        setError('Failed to load gallery');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = '';
  };

  const getServiceHashForCategory = (category: string) => {
    const normalized = category.trim().toLowerCase();
    const map: Record<string, string> = {
      electrical: 'electrical',
      solar: 'solar',
      security: 'security',
      'smart home': 'smarthome',
      'smart-home': 'smarthome',
      smarthome: 'smarthome',
    };
    return map[normalized] ?? '';
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
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-primary/30'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center py-16">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-gray-600">{error}</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => openLightbox(item)}
                  className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 cursor-pointer hover-lift"
                >
                  <div className="aspect-[4/5] sm:aspect-[4/3] overflow-hidden relative">
                    {item.mediaType === 'video' ? (
                      <>
                        <video
                          src={item.url}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          muted
                          playsInline
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-primary fill-current ml-1" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-2 sm:p-6">
                    <span className="badge badge-primary mb-1 sm:mb-3 self-start text-[8px] sm:text-xs px-1 py-0 sm:px-2.5 sm:py-1">{item.category}</span>
                    <h3 className="text-[10px] sm:text-xl font-bold text-white mb-0.5 sm:mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-gray-300 text-[8px] sm:text-sm line-clamp-1 hidden xs:block">{item.description}</p>

                    {/* View Icon */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ZoomIn className="w-3 h-3 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>

                  {/* Category Badge (always visible) */}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <span className="badge badge-primary text-[8px] sm:text-xs px-1 py-0 sm:px-2.5 sm:py-1">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredItems.length === 0 && (
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
      {selectedItem && (
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
            className="w-full h-full max-w-[95vw] max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-strong flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-grow bg-black flex items-center justify-center">
              {selectedItem.mediaType === 'video' ? (
                <video
                  src={selectedItem.url}
                  className="w-full h-full max-h-[75vh] object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full h-full max-h-[75vh] object-contain"
                />
              )}
            </div>
            <div className="p-4 sm:p-6 md:p-8 bg-white">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <span className="badge badge-primary">{selectedItem.category}</span>
                <a
                  href={`/services${getServiceHashForCategory(selectedItem.category)
                    ? `#${getServiceHashForCategory(selectedItem.category)}`
                    : ''
                    }`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 text-sm sm:text-base"
                >
                  Request Similar Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy mb-1 sm:mb-3">{selectedItem.title}</h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg line-clamp-2 md:line-clamp-none">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;




