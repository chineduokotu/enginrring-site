import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItemProps {
  image: string;
  title: string;
  category: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, title, category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Gallery Card */}
      <div
        className="group relative overflow-hidden rounded-xl cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <span className="text-primary text-sm font-medium mb-1">{category}</span>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          
          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt={title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
              <span className="text-primary text-sm font-medium">{category}</span>
              <h3 className="text-white text-xl font-semibold">{title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryItem;
