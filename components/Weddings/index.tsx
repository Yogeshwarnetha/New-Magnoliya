"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiGift as _FiGift, FiHeart as _FiHeart, FiMusic as _FiMusic, FiCalendar as _FiCalendar } from 'react-icons/fi';
import { PiCheersThin as _PiCheersThin, PiChurchDuotone as _PiChurchDuotone } from 'react-icons/pi';
import { GiKnifeFork as _GiKnifeFork } from 'react-icons/gi';
import type { IconType } from 'react-icons/lib';
import type { WeddingData } from '@/apirequests/wedding';
import { getWedding } from '@/apirequests/wedding';

const FiHeart = _FiHeart as unknown as React.ComponentType<any>;
const PiChurchDuotone = _PiChurchDuotone as unknown as React.ComponentType<any>;
const PiCheersThin = _PiCheersThin as unknown as React.ComponentType<any>;
const GiKnifeFork = _GiKnifeFork as unknown as React.ComponentType<any>;

const Weddings = () => {
    const [activeGallery, setActiveGallery] = useState('all');
    const [activeSlide, setActiveSlide] = useState(0);
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);
    const [backgroundTop, setBackgroundTop] = useState<number | null>(null);
    const [weddingData, setWeddingData] = useState<WeddingData | null>(null);
    const [loading, setLoading] = useState(true);
    const heroRef = useRef<HTMLElement | null>(null);

        const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";


    useEffect(() => {
        const fetchWeddingData = async () => {
            try {
                const response = await getWedding();
                if (response.ok && response.data) {
                    setWeddingData(response.data);
                }
            } catch (error) {
                console.error('Error fetching wedding data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeddingData();
    }, []);

    useEffect(() => {
        const compute = () => {
            const vh = window.innerHeight;
            setViewportHeight(vh);

            const heroHeight = heroRef.current?.clientHeight ?? null;
            if (heroHeight) setBackgroundTop(heroHeight);
            else setBackgroundTop(vh);
        };

        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!weddingData) return <div>No wedding content available</div>;

    const allImages = weddingData.gallery_images || [];

    // Icon mapping for services
    const iconComponents: { [key: string]: React.ComponentType<any> } = {
        FiHeart,
        PiChurchDuotone,
        PiCheersThin,
        GiKnifeFork
    };

    return (
        <div className="relative min-h-screen bg-white">
            {/* Background */}
            <div
                className="absolute left-0 right-0 z-0 homepage-bg-darken"
                style={{
                    top: backgroundTop ? `${backgroundTop}px` : (viewportHeight ? `${viewportHeight}px` : '40vh'),
                    bottom: 0,
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    pointerEvents: 'none'
                }}
            />

            {/* Content overlay */}
            <div className="relative z-10">
                {/* Enhanced Hero Section */}
                <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={weddingData.hero_image}
                            alt="Beautiful Wedding"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="relative h-full flex items-center">
                        <div className="container mx-auto px-6">
                            <div className="max-w-2xl">
                                <div className="mb-8">
                                    <div className="w-24 h-1 bg-gold mb-6"></div>
                                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white mb-6 leading-tight">
                                        {weddingData.hero_title}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-gold font-light mb-8 max-w-xl">
                                        {weddingData.hero_subtitle}
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={weddingData.hero_button_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-center"
                                    >
                                        {weddingData.hero_button_text}
                                    </a>
                                    <a
                                        href="#venues"
                                        className="border border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-center"
                                    >
                                        Explore Venues
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Venue Spaces Section */}
                <section id="venues" className="py-24 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full translate-x-1/3 translate-y-1/3"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        {/* Enhanced Main Heading */}
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">ELEGANT VENUES</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-6">
                                {weddingData.venues_section_title}
                            </h2>
                            <div className="w-32 h-1 bg-gold mx-auto mb-8"></div>
                            <div className="max-w-4xl mx-auto space-y-6">
                                {weddingData.venues_section_description.map((paragraph, index) => (
                                    <p key={index} className="text-xl text-gray-700 leading-relaxed font-light">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Enhanced Venue Spaces */}
                        <div className="space-y-32">
                            {weddingData.venues.map((venue, index) => (
                                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                    <div className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-700 h-[600px]">
                                            <img
                                                src={venue.image}
                                                alt={venue.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                                                <span className="text-gold font-semibold">{venue.capacity}</span>
                                            </div>
                                        </div>
                                        <div className="absolute -inset-4 bg-gold/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                    </div>
                                    <div className={`lg:pl-12 ${index % 2 === 1 ? 'lg:pr-12 lg:pl-0' : ''}`}>
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-px bg-gold mr-4"></div>
                                            <span className="text-gold font-semibold tracking-widest text-sm uppercase">{venue.type}</span>
                                        </div>
                                        <h3 className="text-4xl font-serif font-light text-gray-900 mb-6 leading-tight">
                                            {venue.name}
                                        </h3>
                                        <div className="space-y-4 mb-8">
                                            {venue.description.map((desc, descIndex) => (
                                                <p key={descIndex} className="text-lg text-gray-700 leading-relaxed font-light">
                                                    {desc}
                                                </p>
                                            ))}
                                        </div>
                                        
                                        <a
                                            href={venue.button_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                                        >
                                            {venue.button_text}
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced Wedding Packages Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        {/* Enhanced Intro Block */}
                        <div className="max-w-4xl mx-auto text-center mb-20">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">WEDDING PACKAGES</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-8">
                                {weddingData.packages_section_title}
                            </h2>
                            <p className="text-xl text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
                                {weddingData.packages_section_description}
                            </p>
                        </div>

                        {/* Enhanced Packages with Luxury Design */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                            {weddingData.wedding_packages.map((pkg, index) => (
                                <div
                                    key={index}
                                    className="group relative rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 hover:shadow-3xl hover:-translate-y-4 min-h-[700px]"
                                >
                                    {/* Background Image with Gradient Overlay */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col justify-end h-full p-8 text-white">
                                        {/* Content Container */}
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                            <h3 className="text-2xl font-serif font-bold mb-3">
                                                {pkg.name}
                                            </h3>
                                            <p className="text-gold-light font-medium mb-6 text-lg">
                                                {pkg.description}
                                            </p>

                                            {/* Features List */}
                                            <ul className="space-y-3 mb-8">
                                                {pkg.includes.map((item, i) => (
                                                    <li key={i} className="flex items-center">
                                                        <span className="text-gold mr-3 text-lg font-bold">✓</span>
                                                        <span className="text-white text-base font-medium">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* CTA Button */}
                                            <a
                                                href={weddingData.hero_button_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full bg-gold hover:bg-gold-dark text-white text-center font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                            >
                                                {pkg.button_text}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gold/40 transition-all duration-500"></div>
                                    <div className="absolute -inset-4 bg-gold/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                </div>
                            ))}
                        </div>

                        {/* Enhanced Wedding Offerings Section */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">OUR SERVICES</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                {weddingData.services_section_title}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                                {weddingData.services_section_description}
                            </p>
                        </div>

                        {/* Enhanced Wedding Ceremonies Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                            {weddingData.services.map((service, index) => {
                                const IconComponent = iconComponents[service.icon] || FiHeart;
                                return (
                                    <div
                                        key={index}
                                        className="group relative bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                                    >
                                        {/* Background Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`}></div>
                                        
                                        {/* Icon Container */}
                                        <div className="relative z-10 flex items-center justify-center mb-6">
                                            <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                                                <IconComponent className="text-3xl text-gold" />
                                            </div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="relative z-10">
                                            <h4 className="text-xl font-serif font-semibold mb-4 text-gray-800">
                                                {service.title}
                                            </h4>
                                            <p className="text-gray-600 text-base leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Hover Border */}
                                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/20 transition-all duration-300"></div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Enhanced Footer CTA */}
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-3xl p-8 border border-gold/20 max-w-2xl mx-auto">
                                <p className="text-gray-700 mb-6 text-lg font-light">
                                    All packages can be customized to fit your specific needs and vision.
                                    Let us create the perfect experience for your special day.
                                </p>
                                <a
                                    href={weddingData.hero_button_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                                >
                                    Talk to a Wedding Planner
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced 360° Tours Section */}
                {/* <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">VIRTUAL TOURS</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                {weddingData.tours_section_title}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                                {weddingData.tours_section_description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {weddingData.tour_embeds.map((tour, index) => (
                                <div key={index} className="group">
                                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100">
                                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4 text-center">
                                            {tour.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 text-center font-light">
                                            {tour.description}
                                        </p>
                                        <div className="rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
                                            <div className="w-full aspect-[16/9] bg-black">
                                                <iframe
                                                    title={tour.title}
                                                    src={tour.embed_url}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; vr; xr-spatial-tracking"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    loading="lazy"
                                                    className="w-full h-full border-0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Enhanced Gallery Section */}
                <section className="py-24">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">GALLERY</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                {weddingData.gallery_section_title}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                                {weddingData.gallery_section_description}
                            </p>
                        </div>

                        {/* Enhanced Gallery Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {allImages.slice(0, 6).map((image, index) => (
                                <div key={index} className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer">
                                    <img
                                        src={image}
                                        alt={`Wedding image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 text-white text-center">
                                            <div className="text-lg font-semibold mb-2">View Details</div>
                                            <div className="w-12 h-px bg-gold mx-auto"></div>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span className="text-gold font-bold">+</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link 
                                href={weddingData.gallery_button_link} 
                                className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                            >
                                {weddingData.gallery_button_text}
                                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Enhanced Testimonials Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-50 to-transparent"></div>
                    
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">TESTIMONIALS</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                {weddingData.testimonials_section_title}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                                {weddingData.testimonials_section_description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {weddingData.testimonials.map((testimonial, index) => (
                                <div 
                                    key={index} 
                                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                                >
                                    {/* Quote Icon */}
                                    <div className="absolute top-6 left-6 text-gold/20 text-6xl">"</div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10">
                                        <p className="text-lg text-gray-700 italic mb-8 leading-relaxed font-light">
                                            {testimonial.text}
                                        </p>
                                        <div className="border-t border-gray-200 pt-6">
                                            <p className="font-semibold text-gray-800 text-lg">{testimonial.author}</p>
                                            <p className="text-sm text-gray-600 mt-1">{testimonial.event}</p>
                                        </div>
                                    </div>

                                    {/* Hover Effect */}
                                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gold/10 transition-all duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced CTA Section */}
                <section className="py-24 bg-gradient-to-br from-gold to-gold-dark relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 text-center relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-black mr-4"></div>
                                <span className="text-black font-semibold tracking-widest text-sm uppercase">GET STARTED</span>
                                <div className="w-20 h-px bg-black ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-black mb-6">
                                {weddingData.cta_title}
                            </h2>
                            <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto font-light">
                                {weddingData.cta_description}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href={weddingData.cta_primary_button_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-black text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
                                >
                                    {weddingData.cta_primary_button_text}
                                </a>
                                <a
                                    href={weddingData.cta_secondary_button_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-black text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white"
                                >
                                    {weddingData.cta_secondary_button_text}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Weddings;