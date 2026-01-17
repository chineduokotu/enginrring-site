import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Shield,
  Sun,
  Home as HomeIcon,
  Fence,
  ArrowRight,
  Award,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Hero from '../components/sections/Hero';
import ServiceCard from '../components/sections/ServiceCard';
import Button from '../components/common/Button';
import CountUp from '../components/common/CountUp';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80',
    headline: 'Powering Your Future with Excellence',
    subheadline: 'Premium electrical and engineering solutions for homes and businesses. Experience the difference of working with certified professionals.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80',
    headline: 'Sustainable Energy Solutions',
    subheadline: 'Harness the power of the sun with our state-of-the-art solar installations. Reduce costs and your carbon footprint.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    headline: 'Smart Security Systems',
    subheadline: 'Protect what matters most with advanced CCTV and security solutions. 24/7 monitoring for complete peace of mind.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=1920&q=80',
    headline: 'Smart Home Automation',
    subheadline: 'Transform your living space with intelligent automation. Control your home from anywhere in the world.',
  },
];

const services = [
  {
    icon: Zap,
    title: 'Electrical Installation',
    description: 'Complete electrical solutions from wiring to panel upgrades, delivered by certified professionals.',
  },
  {
    icon: Shield,
    title: 'CCTV & Security',
    description: 'Advanced surveillance systems with remote monitoring and motion detection technology.',
  },
  {
    icon: Sun,
    title: 'Solar Energy',
    description: 'Sustainable power solutions with high-efficiency solar panels and battery storage systems.',
  },
  {
    icon: HomeIcon,
    title: 'Smart Home',
    description: 'Intelligent automation for lighting, climate, and appliances with seamless integration.',
  },
  {
    icon: Fence,
    title: 'Electric Fencing',
    description: 'Robust perimeter security with professional installation and maintenance services.',
  },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience', icon: Clock },
  { value: 2500, suffix: '+', label: 'Projects Completed', icon: CheckCircle },
  { value: 1000, suffix: '+', label: 'Happy Clients', icon: Users },
  { value: 50, suffix: '+', label: 'Industry Awards', icon: Award },
];

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero slides={heroSlides} />

      {/* Services Preview Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">
              Engineering Excellence for Every Need
            </h2>
            <p className="text-gray-600 text-lg">
              From electrical installations to smart home systems, we provide comprehensive
              solutions tailored to your specific requirements.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {services.slice(0, 3).map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                linkTo="/services"
              />
            ))}
          </div>

          {/* View All Services Link */}
          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:gap-3 transition-all duration-300"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators / Stats Section */}
      <section className="py-20 md:py-28 bg-navy">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                alt="Professional engineering team at work"
                className="rounded-2xl shadow-2xl w-full"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-yellow rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <div className="font-bold text-navy">ISO Certified</div>
                    <div className="text-gray-500 text-sm">Quality Assured</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Trusted by Thousands of Clients Nationwide
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                With over 15 years of experience in the industry, we've built a reputation
                for delivering exceptional quality and service. Our team of certified
                professionals is committed to exceeding your expectations.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Licensed and fully insured professionals',
                  '24/7 emergency support available',
                  'Competitive pricing with transparent quotes',
                  'Industry-leading warranty on all work',
                  'Eco-friendly and sustainable solutions',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" href="/about">
                  Learn More About Us
                </Button>
                <Button variant="outline" size="lg" href="/contact">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Get in touch with our team today for a free consultation and quote.
            We're here to help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" href="/contact">
              Get Free Quote
            </Button>
            <Button
              variant="whatsapp"
              size="lg"
              href="https://wa.me/1234567890"
              isExternal
            >
              WhatsApp Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
