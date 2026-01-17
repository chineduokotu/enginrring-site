import React from 'react';
import { Zap, Shield, Sun, Home as HomeIcon, Fence } from 'lucide-react';
import ServiceCard from '../components/sections/ServiceCard';

const services = [
  {
    icon: Zap,
    title: 'Electrical Installation',
    description: 'Comprehensive electrical solutions for residential and commercial properties. From new installations to upgrades and repairs, our certified electricians ensure safety and efficiency.',
    features: [
      'Complete wiring and rewiring',
      'Panel upgrades and installations',
      'Lighting design and installation',
      'Electrical safety inspections',
    ],
  },
  {
    icon: Shield,
    title: 'CCTV Installation & Security Systems',
    description: 'State-of-the-art surveillance and security solutions to protect your property. We provide end-to-end services from design to installation and maintenance.',
    features: [
      'HD and 4K camera systems',
      'Remote monitoring setup',
      'Motion detection and alerts',
      'Cloud storage solutions',
    ],
  },
  {
    icon: Sun,
    title: 'Solar Energy Solutions',
    description: 'Harness the power of renewable energy with our premium solar installations. Reduce your electricity bills and carbon footprint with sustainable power.',
    features: [
      'Solar panel installation',
      'Battery storage systems',
      'Grid-tie and off-grid solutions',
      'Maintenance and monitoring',
    ],
  },
  {
    icon: HomeIcon,
    title: 'Smart Home Automation',
    description: 'Transform your living space with intelligent automation systems. Control lighting, climate, security, and appliances from anywhere in the world.',
    features: [
      'Smart lighting systems',
      'Climate control automation',
      'Voice assistant integration',
      'Custom automation scenarios',
    ],
  },
  {
    icon: Fence,
    title: 'Electric Fencing & Perimeter Security',
    description: 'Robust perimeter protection for residential and commercial properties. Our electric fencing solutions provide reliable security with professional installation.',
    features: [
      'High-voltage security fencing',
      'Integration with alarm systems',
      'Battery backup systems',
      'Regular maintenance services',
    ],
  },
];

const Services: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-navy via-navy-light to-navy">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary font-medium rounded-full text-sm mb-4">
              Our Services
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Professional Engineering Solutions
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              From electrical installations to smart home automation, we deliver premium
              engineering services tailored to your needs. Quality craftsmanship backed
              by industry-leading warranties.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                variant="detailed"
                linkTo="/contact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Our team of experts can design and implement bespoke solutions
              tailored to your specific requirements. Get in touch for a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Request a Quote
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
        </div>
      </section>
    </div>
  );
};

export default Services;
