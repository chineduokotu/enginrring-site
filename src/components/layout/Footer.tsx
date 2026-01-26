import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import logo from '../../assets/image/logo.jpeg';

// Custom TikTok Icon component to match Lucide style
const Tiktok = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/store', label: 'Store' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const services = [
  { path: '/services', label: 'Electrical Installation' },
  { path: '/services', label: 'CCTV & Security' },
  { path: '/services', label: 'Solar Energy' },
  { path: '/services', label: 'Smart Home' },
  { path: '/services', label: 'Electric Fencing' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61550482598066', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/thebuildershubb?igsh=MTBramhzODY2MmVmdg==', label: 'Instagram' },
  { icon: Tiktok, href: 'https://www.tiktok.com/@thebuildershubb', label: 'TikTok' },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
              <span className="font-bold text-xl">The BuildersHubb</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium engineering solutions for homes and businesses. 
              Delivering excellence in electrical, security, and energy systems.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path + link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin/login"
                  className="text-gray-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-2"
                >
                  Panel <span className="text-red-500 text-xs">(admin only)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:09136030440"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>09136030440</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@thebuildershubb.com"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>info@thebuildershubb.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>No 1 Efe Amenze Way, Arougba,<br />Off Airport Road, Irhirhi Shop 12</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} The BuildersHubb. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
