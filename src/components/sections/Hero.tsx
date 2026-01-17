import React from 'react';
import Carousel from '../common/Carousel';
import Button from '../common/Button';

interface HeroSlide {
  id: number;
  image: string;
  headline: string;
  subheadline: string;
}

interface HeroProps {
  slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  return (
    <section className="relative">
      <Carousel slides={slides} autoPlayInterval={6000} />
      
      {/* CTA Buttons Overlay - positioned above dots */}
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 left-0 right-0 z-10">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0">
            <Button variant="primary" size="sm" href="/services" className="sm:!px-6 sm:!py-3 md:!px-8 md:!py-4 sm:!text-base md:!text-lg">
              Get Started
            </Button>
            <Button
              variant="whatsapp"
              size="sm"
              href="https://wa.me/1234567890"
              isExternal
              className="sm:!px-6 sm:!py-3 md:!px-8 md:!py-4 sm:!text-base md:!text-lg"
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
