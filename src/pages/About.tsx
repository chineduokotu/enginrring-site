import React from 'react';
import { Target, Lightbulb, Users, Shield, Award, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';

const values = [
  {
    icon: Target,
    title: 'Quality Excellence',
    description: 'We never compromise on quality. Every project meets the highest industry standards.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay ahead with the latest technologies and innovative solutions.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Your satisfaction is our priority. We listen, understand, and deliver.',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All installations comply with strict safety regulations and best practices.',
  },
];

const differentiators = [
  '15+ years of proven industry experience',
  'Certified and licensed professionals',
  '24/7 emergency support available',
  'Comprehensive warranties on all work',
  'Competitive and transparent pricing',
  'Eco-friendly and sustainable solutions',
  'State-of-the-art equipment and materials',
  'Dedicated project managers for each job',
];

const About: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/75" />
        </div>
        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary font-medium rounded-full text-sm mb-4">
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Powering Excellence Since 2009
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              PowerTech Engineering is a leading provider of electrical, solar, and smart home solutions.
              With a commitment to quality and innovation, we've grown to serve thousands of satisfied clients
              across residential and commercial sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                Building a Legacy of Trust and Excellence
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2009, PowerTech Engineering began as a small electrical contracting firm
                  with a vision to provide exceptional service and quality workmanship. Over the years,
                  we've evolved into a comprehensive engineering solutions provider, expanding our
                  expertise to include solar energy, security systems, and smart home automation.
                </p>
                <p>
                  Our growth has been driven by a simple philosophy: treat every project as if it were
                  our own. This commitment to excellence has earned us the trust of homeowners,
                  businesses, and institutions across the region.
                </p>
                <p>
                  Today, with a team of over 50 certified professionals, we continue to push the
                  boundaries of what's possible in modern engineering, while maintaining the personal
                  touch and attention to detail that has defined us from the start.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="PowerTech team at work"
                className="rounded-2xl shadow-2xl w-full"
              />
              {/* Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-primary text-white rounded-xl p-6 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <Award className="w-10 h-10" />
                  <div>
                    <div className="text-3xl font-bold">15+</div>
                    <div className="text-sm text-white/80">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              The Principles That Guide Us
            </h2>
            <p className="text-gray-600 text-lg">
              Our core values define who we are and how we approach every project.
              They are the foundation of our success and the reason our clients trust us.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-5">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                alt="Professional installation"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                What Sets Us Apart
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Choosing the right partner for your engineering needs is crucial.
                Here's why thousands of clients have trusted us with their projects.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {differentiators.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-navy">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Let's Work Together
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Ready to experience the PowerTech difference? Contact us today to discuss
            your project and receive a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/contact">
              Contact Us
            </Button>
            <Button
              variant="whatsapp"
              size="lg"
              href="https://wa.me/1234567890"
              isExternal
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
