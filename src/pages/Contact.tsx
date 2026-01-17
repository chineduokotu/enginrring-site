import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (234) 567-890',
    href: 'tel:+1234567890',
    description: 'Call us for immediate assistance',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@powertech.com',
    href: 'mailto:info@powertech.com',
    description: 'Send us an email anytime',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: '123 Engineering Way, Tech City, TC 12345',
    href: 'https://maps.google.com',
    description: 'Visit our headquarters',
  },
];

const businessHours = [
  { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
  { day: 'Emergency Service', hours: '24/7 Available' },
];

const Contact: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-navy via-navy-light to-navy">
        <div className="container-custom px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary font-medium rounded-full text-sm mb-4">
              Contact Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Have a question or ready to start your project? We're here to help.
              Reach out to us through any of the methods below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Methods */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 mb-12">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    target={method.title === 'Address' ? '_blank' : undefined}
                    rel={method.title === 'Address' ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <method.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
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
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-navy">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-600">{item.day}</span>
                      <span className={`font-medium ${item.day === 'Emergency Service' ? 'text-primary' : 'text-navy'}`}>
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
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 md:p-10 text-center mb-8">
                <MessageCircle className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Chat with Us on WhatsApp
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Get quick responses to your inquiries. Our team is ready to help
                  you with any questions about our services.
                </p>
                <a
                  href="https://wa.me/1234567890?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Start WhatsApp Chat
                </a>
                <p className="text-white/70 text-sm mt-4">
                  +1 (234) 567-890
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">
                      Map integration available upon request
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium mt-2 hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-navy mb-1">PowerTech Engineering</h3>
                  <p className="text-gray-600">123 Engineering Way, Tech City, TC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 md:py-20 bg-accent-red">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Emergency Assistance?
          </h2>
          <p className="text-white/90 text-lg mb-6">
            Our emergency team is available 24/7 for urgent electrical issues.
          </p>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-accent-red font-bold rounded-xl text-lg hover:bg-gray-100 transition-colors duration-300"
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
