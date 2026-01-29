import React from 'react';
import Carousel from '../common/Carousel';

interface HeroSlide {
  id: number;
  image: string;
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaLink?: string;
  isExternal?: boolean;
}

interface HeroProps {
  slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  return (
    <section className="relative">
      <Carousel slides={slides} autoPlayInterval={6000} />
    </section>
  );
};

export default Hero;
