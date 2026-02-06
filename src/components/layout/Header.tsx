import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Send } from 'lucide-react';
import Button from '../common/Button';
import logo from '../../assets/image/logo.jpeg';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/store', label: 'Store' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const touchUsedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Handle touch for mobile - this fires first on touch devices
  const handleMenuTouch = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    touchUsedRef.current = true;
    setIsMenuOpen(prev => !prev);
    // Reset touch flag after a short delay
    setTimeout(() => {
      touchUsedRef.current = false;
    }, 300);
  }, []);

  // Handle click for desktop - skip if touch was just used
  const handleMenuClick = useCallback((e: React.MouseEvent) => {
    if (touchUsedRef.current) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className={`flex items-center gap-2 font-bold text-xl transition-colors ${isScrolled ? 'text-navy' : 'text-white'
                }`}
            >
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
              <span>The BuildersHubb</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors relative group ${isScrolled
                    ? 'text-gray-700 hover:text-primary'
                    : 'text-white/90 hover:text-white'
                    } ${location.pathname === link.path
                      ? isScrolled
                        ? 'text-primary'
                        : 'text-white'
                      : ''
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button
                variant="primary"
                size="sm"
                to="/quote"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2 z-[60]">
              <Link
                to="/quote"
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all shadow-md ${isScrolled
                  ? 'bg-primary text-white hover:bg-primary-dark'
                  : 'bg-white text-primary hover:bg-gray-100'
                  }`}
              >
                <Send className="w-4 h-4" />
                <span>Quote</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={handleMenuClick}
                onTouchEnd={handleMenuTouch}
                className={`p-2 rounded-lg transition-colors ${isScrolled
                  ? 'text-navy hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
                  }`}
                style={{ touchAction: 'manipulation' }}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay - Outside header for proper fixed positioning */}
      <div
        className={`fixed inset-0 bg-navy/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden z-[55] ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer - Outside header for proper fixed positioning */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-[60] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-navy">
              <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
              <span>The BuildersHubb</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-6 py-3 font-medium transition-colors ${location.pathname === link.path
                  ? 'text-primary bg-primary/5 border-r-4 border-primary'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu CTA */}
          <div className="p-6 border-t border-gray-100">
            <Button
              variant="primary"
              size="md"
              to="/quote"
              className="w-full"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;




