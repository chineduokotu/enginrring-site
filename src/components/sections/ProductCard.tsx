import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

interface ProductCardProps {
  image: string;
  name: string;
  price?: string;
  category?: string;
  linkTo?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price = 'Contact for Pricing',
  category,
  linkTo = '/contact',
}) => {
  return (
    <Card className="group overflow-hidden" padding="none" hover>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        {category && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
            {category}
          </span>
        )}
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-navy mb-2 line-clamp-2">{name}</h3>
        <p className="text-primary font-semibold mb-4">{price}</p>
        
        <Link
          to={linkTo}
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-gray-100 text-navy font-medium rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
        >
          Contact Us
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;



