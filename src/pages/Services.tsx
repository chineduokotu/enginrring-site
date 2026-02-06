import { useEffect, useState } from 'react';
import { Zap, Shield, Sun, Home as HomeIcon, Fence, ArrowRight, CheckCircle, Wrench, Settings, Loader2, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { servicesApi } from '../services/api';
import type { Service } from '../services/api';

// Icon mapping for dynamic icons
const iconMap: Record<string, React.ElementType> = {
  Zap,
  Shield,
  Sun,
  Home: HomeIcon,
  Fence,
  Wrench,
  Settings,
};

// Fallback services for when database is empty
const fallbackServices = [
  {
    _id: 'fallback-1',
    icon: 'Zap',
    name: 'Electrical Installation',
    description: 'Comprehensive electrical solutions for residential and commercial properties. From new installations to upgrades and repairs, our certified electricians ensure safety and efficiency.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    features: [
      'Complete wiring and rewiring',
      'Panel upgrades and installations',
      'Lighting design and installation',
      'Electrical safety inspections',
    ],
    whatsappNumber: '09136030440',
    whatsappContactName: '',
    isActive: true,
  },
  {
    _id: 'fallback-2',
    icon: 'Shield',
    name: 'CCTV Installation & Security Systems',
    description: 'State-of-the-art surveillance and security solutions to protect your property. We provide end-to-end services from design to installation and maintenance.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    features: [
      'HD and 4K camera systems',
      'Remote monitoring setup',
      'Motion detection and alerts',
      'Cloud storage solutions',
    ],
    whatsappNumber: '09136030440',
    whatsappContactName: '',
    isActive: true,
  },
  {
    _id: 'fallback-3',
    icon: 'Sun',
    name: 'Solar Energy Solutions',
    description: 'Harness the power of renewable energy with our premium solar installations. Reduce your electricity bills and carbon footprint with sustainable power.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    features: [
      'Solar panel installation',
      'Battery storage systems',
      'Grid-tie and off-grid solutions',
      'Maintenance and monitoring',
    ],
    whatsappNumber: '09136030440',
    whatsappContactName: '',
    isActive: true,
  },
  {
    _id: 'fallback-4',
    icon: 'Home',
    name: 'Smart Home Automation',
    description: 'Transform your living space with intelligent automation systems. Control lighting, climate, security, and appliances from anywhere in the world.',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&q=80',
    features: [
      'Smart lighting systems',
      'Climate control automation',
      'Voice assistant integration',
      'Custom automation scenarios',
    ],
    whatsappNumber: '09136030440',
    whatsappContactName: '',
    isActive: true,
  },
  {
    _id: 'fallback-5',
    icon: 'Fence',
    name: 'Electric Fencing & Perimeter Security',
    description: 'Robust perimeter protection for residential and commercial properties. Our electric fencing solutions provide reliable security with professional installation.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    features: [
      'High-voltage security fencing',
      'Integration with alarm systems',
      'Battery backup systems',
      'Regular maintenance services',
    ],
    whatsappNumber: '09136030440',
    whatsappContactName: '',
    isActive: true,
  },
];

const processSteps = [
  { step: '01', title: 'Consultation', description: 'We assess your needs and provide expert recommendations' },
  { step: '02', title: 'Planning', description: 'Detailed project planning with transparent pricing' },
  { step: '03', title: 'Installation', description: 'Professional installation by certified technicians' },
  { step: '04', title: 'Support', description: 'Ongoing maintenance and 24/7 customer support' },
];

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesApi.getAll();
        // Use fetched services if available, otherwise use fallback
        if (response.data.length > 0) {
          setServices(response.data);
        } else {
          setServices(fallbackServices as Service[]);
        }
      } catch {
        setError('Failed to load services');
        setServices(fallbackServices as Service[]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Handle scroll to hash
  useEffect(() => {
    if (!isLoading && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [isLoading]);

  // Generate WhatsApp link for a service
  const getWhatsAppLink = (service: Service) => {
    const cleanNumber = service.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hello! I would like to request a quote for your ${service.name} service.`);
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  // Get dynamic icon component
  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Zap;
  };

  const getServiceId = (name: string) => {
    const names: Record<string, string> = {
      'Electrical Installation': 'electrical',
      'CCTV Installation & Security Systems': 'security',
      'Solar Energy Solutions': 'solar',
      'Smart Home Automation': 'smarthome',
      'Electric Fencing & Perimeter Security': 'fencing',
    };
    return names[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 blob-decoration blob-primary" />
        <div className="absolute bottom-10 left-10 w-64 h-64 blob-decoration blob-yellow" />

        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="badge badge-primary mb-6">
              Our Services
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
              Professional Engineering Solutions
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
              From electrical installations to smart home automation, we deliver premium
              engineering services tailored to your needs. Quality craftsmanship backed
              by industry-leading warranties.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid with Alternating Layout */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error && services.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-gray-600">{error}</p>
            </div>
          ) : (
            <div className="space-y-16 md:space-y-24">
              {services.map((service, index) => {
                const IconComponent = getIcon(service.icon);
                return (
                  <div
                    key={service._id}
                    id={getServiceId(service.name)}
                    className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center scroll-mt-32 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                      }`}
                  >
                    {/* Image */}
                    <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-strong group">
                        <img
                          src={service.image || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'}
                          alt={service.name}
                          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Floating Badge */}
                      <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-primary text-white rounded-xl p-4 md:p-6 shadow-xl hidden sm:block">
                        <IconComponent className="w-8 h-8 md:w-10 md:h-10" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-5 lg:hidden">
                        <IconComponent className="w-7 h-7 text-primary" />
                      </div>

                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-4">
                        {service.name}
                      </h2>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-3 mb-8">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* WhatsApp Quote Button - Uses service-specific number */}
                      <a
                        href={getWhatsAppLink(service)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 btn-shimmer hover-lift"
                      >
                        Get a Quote
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      {service.whatsappContactName && (
                        <p className="text-sm text-gray-500 mt-2">
                          Contact: {service.whatsappContactName}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge badge-primary mb-4">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              How We Work
            </h2>
            <p className="text-gray-600 text-lg">
              Our streamlined process ensures quality results and a seamless experience from start to finish.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -z-10" />
                )}

                <div className="card-enhanced hover-lift text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-2xl font-bold mb-5 shadow-glow-primary">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-custom">
          <div className="relative bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 lg:p-16 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                Our team of experts can design and implement bespoke solutions
                tailored to your specific requirements. Get in touch for a consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" href="/contact">
                  Request a Quote
                </Button>
                <Button
                  variant="whatsapp"
                  size="lg"
                  href="https://wa.me/2349136030440"
                  isExternal
                >
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;



