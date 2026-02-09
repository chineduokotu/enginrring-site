import * as React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, CheckCircle2, Phone, Mail, Clock, Shield, Award, Headphones } from 'lucide-react';
import Button from '../components/common/Button';

const Quote: React.FC = () => {
    const [state, handleSubmit] = useForm("xlgwrqjz");

    if (state.succeeded) {
        return (
            <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-strong p-8 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-navy mb-4">Request Sent!</h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Thank you for your interest. Our team will review your request and get back to you within 24 hours.
                    </p>
                    <Button variant="primary" size="lg" onClick={() => window.location.href = '/'}>
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 md:pt-40 md:pb-28 overflow-hidden bg-navy">
                <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-navy/80" />
                <div className="absolute top-20 right-10 w-72 h-72 blob-decoration blob-primary opacity-20" />

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <span className="badge badge-primary mb-6">Quote Request</span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Get a Professional Quote
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                            Tell us about your project requirements and we'll provide a detailed estimate tailored to your needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 md:py-20 -mt-10 md:-mt-16">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-8 items-start">

                        {/* Form Column */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-strong p-6 md:p-10">
                                <h2 className="text-2xl font-bold text-navy mb-8 flex items-center gap-3">
                                    Project Details
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label htmlFor="full-name" className="text-sm font-semibold text-gray-700 ml-1">
                                                Full Name
                                            </label>
                                            <input
                                                id="full-name"
                                                type="text"
                                                name="name"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label htmlFor="email-address" className="text-sm font-semibold text-gray-700 ml-1">
                                                Email Address
                                            </label>
                                            <input
                                                id="email-address"
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                placeholder="johnmudichristopher@gmail.com"
                                            />
                                            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label htmlFor="phone-number" className="text-sm font-semibold text-gray-700 ml-1">
                                                Phone Number
                                            </label>
                                            <input
                                                id="phone-number"
                                                type="tel"
                                                name="phone"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                placeholder="+234 ..."
                                            />
                                        </div>

                                        {/* Service Type */}
                                        <div className="space-y-2">
                                            <label htmlFor="service-type" className="text-sm font-semibold text-gray-700 ml-1">
                                                Service Type
                                            </label>
                                            <select
                                                id="service-type"
                                                name="service"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white"
                                            >
                                                <option value="electrical">Electrical Installation</option>
                                                <option value="maintenance">Maintenance & Repairs</option>
                                                <option value="security">Security Systems</option>
                                                <option value="consultancy">Consultancy</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label htmlFor="project-description" className="text-sm font-semibold text-gray-700 ml-1">
                                            Project Description
                                        </label>
                                        <textarea
                                            id="project-description"
                                            name="message"
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                            placeholder="Tell us about your project or requirements..."
                                        />
                                        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={state.submitting}
                                            className={`w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group`}
                                        >
                                            {state.submitting ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </span>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    Send Request
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Info Column */}
                        <div className="space-y-8">
                            {/* Trust Section */}
                            <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-100">
                                <h3 className="text-xl font-bold text-navy mb-6">Why Choose Us?</h3>
                                <div className="space-y-6">
                                    {[
                                        { icon: Shield, title: 'Expert Team', desc: 'Highly skilled professionals' },
                                        { icon: Award, title: 'Quality Work', desc: 'Superior materials & standards' },
                                        { icon: Clock, title: 'Fast Response', desc: 'We value your time' },
                                        { icon: Headphones, title: 'Support', desc: 'Dedicated customer care' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                                                <p className="text-gray-500 text-xs">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
                                <h3 className="text-xl font-bold mb-6 relative z-10 text-white">Direct Contact</h3>
                                <div className="space-y-4 relative z-10">
                                    <a href="tel:09136030440" className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg transition-colors text-white">
                                        <Phone className="w-5 h-5 text-white" />
                                        <span className="text-white">09136030440</span>
                                    </a>
                                    <a href="mailto:johnmudichristopher@gmail.com" className="flex items-center gap-4 hover:bg-white/10 p-2 rounded-lg transition-colors text-white">
                                        <Mail className="w-5 h-5 text-white" />
                                        <span className="text-sm text-white">johnmudichristopher@gmail.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Quote;

