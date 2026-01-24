import React from 'react';
import { FileText, DollarSign, Shield, Scale } from 'lucide-react';

const quickNav = [
  { id: 'services', title: 'Our Services', icon: FileText },
  { id: 'pricing', title: 'Pricing & Payments', icon: DollarSign },
  { id: 'warranty', title: 'Warranties', icon: Shield },
  { id: 'liability', title: 'Liability', icon: Scale },
];

const Terms: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=60)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/85" />
        </div>
        
        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="badge badge-primary mb-6">Legal</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Please read these terms carefully before using our services. They govern your use of PowerTech Engineering services.
            </p>
            <p className="text-gray-400 mt-4">
              Last updated: January 17, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="relative -mt-8 z-20 mb-8">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-strong p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickNav.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-navy text-sm">{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
              <div className="prose-custom">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the services provided by PowerTech Engineering ("Company," "we," "us," or "our"),
                  you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms,
                  you may not use our services.
                </p>

                <h2 id="services">2. Services</h2>
                <p>
                  PowerTech Engineering provides electrical installation, CCTV and security systems, solar energy solutions,
                  smart home automation, and electric fencing services. All services are subject to availability and may vary
                  by location.
                </p>

                <h2 id="pricing">3. Quotations and Pricing</h2>
                <p>
                  All quotations provided are valid for 30 days from the date of issue unless otherwise stated. Prices are
                  subject to change and may vary based on the complexity of the project, materials required, and site conditions.
                </p>
                <ul>
                  <li>Quotations are estimates and final pricing may vary upon site inspection</li>
                  <li>Additional work not included in the original scope will be quoted separately</li>
                  <li>Payment terms will be specified in individual project agreements</li>
                </ul>

                <h2 id="warranty">4. Warranties</h2>
                <p>
                  We provide warranties on our workmanship and installed products. The warranty period varies by service type:
                </p>
                <ul>
                  <li><strong>Electrical Installation:</strong> 2-year workmanship warranty</li>
                  <li><strong>CCTV Systems:</strong> 1-year comprehensive warranty</li>
                  <li><strong>Solar Panels:</strong> As per manufacturer warranty (typically 10-25 years)</li>
                  <li><strong>Smart Home Systems:</strong> 1-year workmanship warranty</li>
                  <li><strong>Electric Fencing:</strong> 1-year workmanship warranty</li>
                </ul>

                <h2>5. Client Responsibilities</h2>
                <p>
                  Clients are responsible for:
                </p>
                <ul>
                  <li>Providing accurate information about their requirements</li>
                  <li>Ensuring safe access to work areas</li>
                  <li>Obtaining necessary permits or approvals where required</li>
                  <li>Maintaining installed systems as per provided guidelines</li>
                </ul>

                <h2 id="liability">6. Limitation of Liability</h2>
                <p>
                  PowerTech Engineering shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages arising from the use of our services. Our total liability shall not exceed the amount paid for the
                  specific service in question.
                </p>

                <h2>7. Safety and Compliance</h2>
                <p>
                  All installations are performed in accordance with local electrical codes and safety regulations. We are
                  fully licensed and insured. Clients must not modify or tamper with installed systems, as this may void
                  warranties and create safety hazards.
                </p>

                <h2>8. Cancellation Policy</h2>
                <p>
                  Cancellations must be made at least 48 hours before scheduled work. Deposits may be non-refundable depending
                  on the project stage. Custom orders and special materials are non-refundable once ordered.
                </p>

                <h2>9. Intellectual Property</h2>
                <p>
                  All designs, documentation, and technical specifications created by PowerTech Engineering remain our
                  intellectual property unless explicitly transferred in writing.
                </p>

                <h2>10. Dispute Resolution</h2>
                <p>
                  Any disputes arising from these terms or our services shall first be addressed through good-faith negotiations.
                  If unresolved, disputes shall be subject to binding arbitration in accordance with local laws.
                </p>

                <h2>11. Modifications</h2>
                <p>
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective upon posting
                  to our website. Continued use of our services constitutes acceptance of modified terms.
                </p>

                <h2>12. Contact Information</h2>
                <p>
                  For questions regarding these Terms and Conditions, please contact us:
                </p>
                <ul>
                  <li><strong>Email:</strong> legal@powertech.com</li>
                  <li><strong>Phone:</strong> 09136030440</li>
                  <li><strong>Address:</strong> 123 Engineering Way, Tech City, TC 12345</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
