import { useEffect, useState } from 'react';
import { ShoppingBag, Star, ArrowRight, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { productsApi, categoriesApi } from '../services/api';
import type { Product } from '../services/api';

const categoryImages: Record<string, string> = {
  'Electrical': '/images/category_electrical.png',
  'Solar': '/images/category_solar.png',
  'Security': '/images/category_security.png',
  'Smart Home': '/images/category_smarthome.png',
  'All': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
};

const defaultCategoryImage = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80';

const Store: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<{ name: string, image: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productsApi.getAll(),
          categoriesApi.getAll()
        ]);

        setProducts(productsRes.data);

        const dynamicCategories = categoriesRes.data.map(cat => ({
          name: cat.name,
          image: categoryImages[cat.name] || defaultCategoryImage
        }));

        setCategories([
          { name: 'All', image: categoryImages['All'] },
          ...dynamicCategories
        ]);
      } catch {
        setError('Failed to load store data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const featuredProducts = products.filter((p) => p.featured);

  const formatPrice = (price: number) => {
    return ` ₦${price.toLocaleString()}`;
  };

  const getWhatsAppLink = (productName: string) => {
    const message = encodeURIComponent(`Hello! I want this product: ${productName}`);
    return `https://wa.me/2349136030440?text=${message}`;
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
                    <a
                      key={product._id}
                      href={getWhatsAppLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 hover:bg-white/20 transition-colors duration-300"
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
                    </a>
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
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge badge-primary mb-4">Store Departments</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Browse Categories
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mx-auto" />
          </div>
          {/* Category Cards Filter */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500 hover-lift ${activeCategory === category.name
                  ? 'ring-4 ring-primary ring-offset-4 scale-105 shadow-xl'
                  : 'hover:shadow-lg'
                  }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${activeCategory === category.name ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                      }`}
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent transition-opacity duration-300 ${activeCategory === category.name ? 'opacity-90' : 'opacity-60 group-hover:opacity-80'
                    }`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className={`text-lg md:text-xl font-bold text-white transition-all duration-300 ${activeCategory === category.name ? 'scale-110' : ''
                    }`}>
                    {category.name}
                  </h3>
                  <div className={`w-8 h-1 bg-primary rounded-full mt-2 transition-all duration-300 transform ${activeCategory === category.name ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`} />
                </div>
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
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 hover-lift"
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
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                        <span className="badge badge-featured flex items-center gap-1 text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-1">
                          <Star className="w-2.5 h-2.5 sm:w-3 h-3" />
                          <span className="hidden xs:inline">Featured</span>
                        </span>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                      <span className="badge badge-primary text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-1">
                        {product.category}
                      </span>
                    </div>

                    {/* Quick Action Overlay (Hidden on Mobile) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex items-end justify-center pb-6">
                      <a
                        href={getWhatsAppLink(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Inquire Now
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating)
                            ? 'fill-accent-yellow text-accent-yellow'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                      <span className="text-[10px] sm:text-sm text-gray-500 ml-0.5 sm:ml-1">{product.rating}</span>
                    </div>

                    <h3 className="font-semibold text-navy mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 text-sm sm:text-base leading-tight">
                      {product.name}
                    </h3>

                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mt-auto">
                      <span className="text-sm sm:text-lg font-bold gradient-text whitespace-nowrap">{formatPrice(product.price)}</span>
                      <a
                        href={getWhatsAppLink(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary font-medium text-[11px] sm:text-sm group-hover:gap-2 transition-all duration-300"
                      >
                        Details
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
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
                  href="https://wa.me/2349136030440?text=Hello!%20I%20would%20like%20to%20get%20a%20quick%20quote."
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




