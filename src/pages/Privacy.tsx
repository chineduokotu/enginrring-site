import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const quickNav = [
  { id: 'collect', title: 'Information We Collect', icon: FileText },
  { id: 'use', title: 'How We Use It', icon: Eye },
  { id: 'security', title: 'Data Security', icon: Lock },
  { id: 'rights', title: 'Your Rights', icon: Shield },
];

const Privacy: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1920&q=60)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/85" />
        </div>
        
        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="badge badge-primary mb-6">Legal</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Your privacy matters to us. This policy explains how we collect, use, and protect your information.
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
                <p className="text-lg text-gray-600 leading-relaxed">
                  PowerTech Engineering ("Company," "we," "us," or "our") is committed to protecting your privacy. This
                  Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
                  services or visit our website.
                </p>

                <h2 id="collect">1. Information We Collect</h2>
                <h3>Personal Information</h3>
                <p>
                  We may collect personal information that you voluntarily provide when contacting us or requesting our
                  services, including:
                </p>
                <ul>
                  <li>Name and contact details (phone number, email address)</li>
                  <li>Property address for service delivery</li>
                  <li>Payment and billing information</li>
                  <li>Communication preferences</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>
                  When you visit our website, we may automatically collect certain information, including:
                </p>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website addresses</li>
                </ul>

                <h2 id="use">2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraudulent or unauthorized activity</li>
                </ul>

                <h2>3. Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information:
                </p>
                <ul>
                  <li>With service providers who assist in our operations</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>

                <h2 id="security">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
                  internet is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2>5. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required by law. Service records may be kept for warranty and
                  legal compliance purposes.
                </p>

                <h2 id="rights">6. Your Rights</h2>
                <p>
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul>
                  <li>Access and receive a copy of your data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Lodge a complaint with a supervisory authority</li>
                </ul>

                <h2>7. Cookies</h2>
                <p>
                  Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can
                  set your browser to refuse cookies, though this may affect website functionality.
                </p>

                <h2>8. Third-Party Links</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or
                  content of these external sites. We encourage you to review their privacy policies.
                </p>

                <h2>9. Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
                  information from children. If we become aware of such collection, we will take steps to delete the information.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
                  revision date. We encourage you to review this policy periodically.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <ul>
                  <li><strong>Email:</strong> privacy@powertech.com</li>
                  <li><strong>Phone:</strong> +1 (234) 567-890</li>
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

export default Privacy;
