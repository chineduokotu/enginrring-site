import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, ArrowRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { productsApi } from '../services/api';
import type { Product } from '../services/api';

const categories = ['All', 'Electrical', 'Solar', 'Security', 'Smart Home'];

const Store: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getAll();
        setProducts(response.data);
      } catch {
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const featuredProducts = products.filter((p) => p.featured);

  const formatPrice = (price: number) => {
    return `From ₦${price.toLocaleString()}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/80" />
        </div>
        
        <div className="absolute top-20 right-10 w-72 h-72 blob-decoration blob-primary" />
        <div className="absolute bottom-10 left-20 w-48 h-48 blob-decoration blob-yellow" />
        
        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="badge badge-primary mb-6">Our Store</span>
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

      {/* Featured Products Banner */}
      {featuredProducts.length > 0 && (
        <section className="relative -mt-8 z-20 mb-8">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 md:p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Featured Products</h3>
                    <p className="text-white/80">Top-rated items with special offers</p>
                  </div>
                </div>
                
                <div className="flex gap-3 flex-wrap justify-center">
                  {featuredProducts.slice(0, 3).map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
                    >
                      <img
                        src={product.images[0]?.url || 'https://via.placeholder.com/40'}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="text-white font-medium text-sm line-clamp-1">{product.name.split(' ').slice(0, 2).join(' ')}</p>
                        <p className="text-accent-yellow text-xs">{formatPrice(product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
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

          {/* Products Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 hover-lift"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.images[0]?.url || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="badge badge-featured flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Featured
                        </span>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="badge badge-primary">{product.category}</span>
                    </div>
                    
                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Inquire Now
                      </a>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-accent-yellow text-accent-yellow'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                    </div>
                    
                    <h3 className="font-semibold text-navy mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold gradient-text">{formatPrice(product.price)}</span>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300"
                      >
                        Details
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredProducts.length === 0 && (
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
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-strong">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                  alt="Expert consultation"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl hidden lg:block" />
            </div>
            
            {/* Content */}
            <div>
              <span className="badge badge-primary mb-4">Expert Advice</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Need Help Choosing?
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Our expert team can help you select the right products for your specific needs.
                Contact us for personalized recommendations and bulk pricing options.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Personalized product recommendations',
                  'Bulk order discounts available',
                  'Professional installation services',
                  'Extended warranty options',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300 btn-shimmer"
                >
                  Contact Our Team
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-yellow to-amber-500 text-navy font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  WhatsApp for Quick Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Store;
