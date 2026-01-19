import React from 'react';
import { Target, Lightbulb, Users, Shield, Award, CheckCircle, Calendar, Building, Wrench } from 'lucide-react';
import Button from '../components/common/Button';
import CountUp from '../components/common/CountUp';

const values = [
  {
    icon: Target,
    title: 'Quality Excellence',
    description: 'We never compromise on quality. Every project meets the highest industry standards.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay ahead with the latest technologies and innovative solutions.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: 'Your satisfaction is our priority. We listen, understand, and deliver.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All installations comply with strict safety regulations and best practices.',
    color: 'from-red-500 to-rose-500',
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

const milestones = [
  { year: '2009', title: 'Company Founded', description: 'Started as a small electrical contracting firm', icon: Building },
  { year: '2013', title: 'Solar Division', description: 'Expanded into renewable energy solutions', icon: Lightbulb },
  { year: '2017', title: 'Smart Home Integration', description: 'Launched smart home automation services', icon: Wrench },
  { year: '2021', title: 'Regional Expansion', description: 'Opened 5 new offices across the region', icon: Target },
  { year: '2024', title: '2500+ Projects', description: 'Milestone of completed installations', icon: Award },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 2500, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Team Members' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

const team = [
  {
    name: 'Michael Chen',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    name: 'Sarah Johnson',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    name: 'David Park',
    role: 'Operations Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Emily Williams',
    role: 'Customer Success Lead',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
];

const About: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/80" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-80 h-80 blob-decoration blob-primary" />
        
        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="badge badge-primary mb-6">About Us</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
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

      {/* Stats Banner */}
      <section className="relative -mt-8 z-20 mb-12">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-strong p-6 md:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <span className="badge badge-primary mb-4">Our Story</span>
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
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="PowerTech team at work"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
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
              {/* Decorative Element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-yellow/20 rounded-full hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge badge-primary mb-4">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Key Milestones
            </h2>
            <p className="text-gray-600 text-lg">
              From our humble beginnings to where we are today, every milestone represents our commitment to growth and excellence.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary-light to-accent-yellow rounded-full" />
            
            <div className="space-y-8 lg:space-y-0">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative lg:flex lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div className="card-enhanced hover-lift">
                      <div className={`flex items-center gap-4 mb-3 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                          <milestone.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-navy mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-white shadow-md" />
                  
                  {/* Empty Space for Other Side */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge badge-primary mb-4">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              The Principles That Guide Us
            </h2>
            <p className="text-gray-600 text-lg">
              Our core values define who we are and how we approach every project.
              They are the foundation of our success and the reason our clients trust us.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="card-enhanced hover-lift group text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge badge-primary mb-4">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Meet the Experts
            </h2>
            <p className="text-gray-600 text-lg">
              Our leadership team brings decades of combined experience in engineering,
              project management, and customer service.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="relative rounded-2xl overflow-hidden mb-5 shadow-medium">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-1">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-2xl overflow-hidden shadow-strong">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="Professional installation"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl hidden lg:block" />
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-accent-yellow/20 rounded-full hidden lg:block" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="badge badge-primary mb-4">Why Choose Us</span>
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
      <section className="py-16 md:py-24 bg-navy relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        <div className="container-custom relative z-10 text-center">
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
