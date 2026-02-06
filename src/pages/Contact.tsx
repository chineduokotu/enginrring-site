import * as React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones, Shield, Award } from 'lucide-react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    value: '09136030440',
    href: 'tel:09136030440',
    description: 'Call us for immediate assistance',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@thebuildershubb.com',
    href: 'mailto:info@thebuildershubb.com',
    description: 'Send us an email anytime',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: 'No 1 Efe Amenze way, Block 12 Pat Ugua complex , Arougba',
    href: 'https://www.google.com/maps/search/No+1+Efe+Amenze+way+Block+12+Pat+Ugua+complex+Arougba',
    description: 'Visit our headquarters',
    color: 'from-amber-500 to-orange-500',
  },
];

const businessHours = [
  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
  { day: 'Emergency Service', hours: '24/7 Available' },
];

const trustBadges = [
  { icon: Headphones, title: '24/7 Support', description: 'Always here for you' },
  { icon: Shield, title: 'Fully Insured', description: 'Complete protection' },
  { icon: Award, title: 'ISO Certified', description: 'Quality assured' },
];

const Contact: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/80" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 blob-decoration blob-primary" />
        <div className="absolute bottom-10 left-20 w-48 h-48 blob-decoration blob-yellow" />

        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="badge badge-primary mb-6">Contact Us</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Have a question or ready to start your project? We're here to help.
              Reach out to us through any of the methods below.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="relative -mt-8 z-20 mb-8">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-strong p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustBadges.map((badge) => (
                <div key={badge.title} className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <badge.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">{badge.title}</h3>
                    <p className="text-gray-500 text-sm">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">
                Contact Information
              </h2>

              <div className="space-y-5 mb-12">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    target={method.title === 'Address' ? '_blank' : undefined}
                    rel={method.title === 'Address' ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 group hover-lift"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">{method.title}</h3>
                      <p className="text-primary font-medium mb-1">{method.value}</p>
                      <p className="text-gray-500 text-sm">{method.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-600">{item.day}</span>
                      <span className={`font-medium ${item.day === 'Emergency Service' ? 'text-primary badge badge-primary' : 'text-navy'}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp CTA & Map */}
            <div>
              {/* Primary WhatsApp CTA */}
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 md:p-10 text-center mb-8 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Chat with Us on WhatsApp
                  </h2>
                  <p className="text-white/90 text-lg mb-8 max-w-md mx-auto">
                    Get quick responses to your inquiries. Our team is ready to help
                    you with any questions about our services.
                  </p>
                  <a
                    href="https://wa.me/2349136030440?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl text-lg hover:bg-gray-100 transition-colors duration-300 shadow-strong btn-shimmer"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Start WhatsApp Chat
                  </a>
                  <p className="text-white/70 text-sm mt-4">
                    09136030440
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src="/images/map-location.jpg"
                    alt="TheBuildersHubb Ventures location on Google Maps"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy/20 flex items-center justify-center">
                    <a
                      href="https://www.google.com/maps/search/No+1+Efe+Amenze+way+Block+12+Pat+Ugua+complex+Arougba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <MapPin className="w-5 h-5" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-navy mb-1">The BuildersHubb</h3>
                  <p className="text-gray-600">No 1 Efe Amenze way, Block 12 Pat Ugua complex , Arougba</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge badge-primary mb-4">Questions?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              We're Here to Help
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Whether you need a quick quote, have technical questions, or want to discuss a large project,
              our team is ready to assist you. Don't hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:09136030440"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300 btn-shimmer"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <a
                href="mailto:info@thebuildershubb.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-navy font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-accent-red to-red-600 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="container-custom relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Emergency Assistance?
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-xl mx-auto">
            Our emergency team is available 24/7 for urgent electrical issues.
            Don't wait – call us immediately for fast response.
          </p>
          <a
            href="tel:09136030440"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent-red font-bold rounded-xl text-lg hover:bg-gray-100 transition-colors duration-300 shadow-strong pulse-glow"
          >
            <Phone className="w-5 h-5" />
            Call Emergency Line
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;



