import * as React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  to?: string;
  isExternal?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  to,
  isExternal = false,
  className = '',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg
    transition-all duration-300 ease-in-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-primary text-white
      hover:bg-primary-dark hover:shadow-lg hover:scale-[1.02]
      focus-visible:ring-primary
    `,
    secondary: `
      bg-navy text-white
      hover:bg-navy-light hover:shadow-lg hover:scale-[1.02]
      focus-visible:ring-navy
    `,
    whatsapp: `
      bg-accent-yellow text-navy
      hover:bg-amber-400 hover:shadow-lg hover:scale-[1.02]
      focus-visible:ring-accent-yellow
    `,
    ghost: `
      bg-transparent text-navy
      hover:bg-gray-100
      focus-visible:ring-gray-300
    `,
    outline: `
      bg-transparent text-primary border-2 border-primary
      hover:bg-primary hover:text-white hover:shadow-lg
      focus-visible:ring-primary
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {variant === 'whatsapp' && <MessageCircle className="w-5 h-5" />}
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={combinedClassName}
      >
        {variant === 'whatsapp' && <MessageCircle className="w-5 h-5" />}
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {variant === 'whatsapp' && <MessageCircle className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;



