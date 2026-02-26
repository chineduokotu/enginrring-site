import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../common/Card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  features?: string[];
  linkTo?: string;
  variant?: "compact" | "detailed";
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  features = [],
  linkTo = "/contact",
  variant = "compact",
}) => {
  if (variant === "compact") {
    return (
      <Card className="group h-full overflow-hidden flex flex-col">
        {/* Image Header */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Overlay Icon */}
            <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Icon (shown if no image or as fallback) */}
          {!image && (
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
              <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
            </div>
          )}

          {/* Content */}
          <h3 className="text-xl font-semibold text-navy mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
            {description}
          </p>

          {/* Link */}
          <div className="mt-auto pt-4 border-t border-gray-100">
            <Link
              to={linkTo}
              className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group h-full" padding="lg">
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
          <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-semibold text-navy mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        {/* Features List */}
        {features.length > 0 && (
          <ul className="space-y-2 mb-6 flex-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <Link
          to={linkTo}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
        >
          Request Quote
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Card>
  );
};

export default ServiceCard;
