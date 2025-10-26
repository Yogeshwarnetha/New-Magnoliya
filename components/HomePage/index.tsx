"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getHomepage } from '@/apirequests/homepage';
import type { HomepageData } from '@/apirequests/homepage';
import './index.css';

const Homepage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const sectionRef = useRef(null);

    // Background image URL
    const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";

    // About section carousel state
    const [currentAboutSlide, setCurrentAboutSlide] = useState(0);

    // Fetch homepage data from API
    const fetchHomepageData = async () => {
        try {
            setIsLoading(true);
            const response = await getHomepage();
            
            if (response.ok && response.data) {
                setHomepageData(response.data);
            } else {
                console.error('Failed to fetch homepage data:', response.error);
                // You could set default data here if needed
            }
        } catch (error) {
            console.error('Error fetching homepage data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHomepageData();
    }, []);

    // Modal functions
    const openModal = (image: string) => {
        setSelectedImage(image);
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.25, 3));
    };

    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: any) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    const handleMouseMove = (e: any) => {
        if (isDragging && zoomLevel > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Set up Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        if (!homepageData?.testimonials?.length) return;
        
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % homepageData.testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [homepageData?.testimonials?.length]);

    // Auto-rotate about carousel
    useEffect(() => {
        if (!homepageData?.about_carousel_images?.length) return;
        
        const interval = setInterval(() => {
            setCurrentAboutSlide((prev) => (prev + 1) % homepageData.about_carousel_images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [homepageData?.about_carousel_images?.length]);

    // Keyboard events for modal
    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (selectedImage) {
                if (e.key === 'Escape') closeModal();
                if (e.key === '+') zoomIn();
                if (e.key === '-') zoomOut();
                if (e.key === '0') resetZoom();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, zoomLevel]);

    const nextAboutSlide = () => {
        if (!homepageData?.about_carousel_images?.length) return;
        setCurrentAboutSlide((prev) => (prev + 1) % homepageData.about_carousel_images.length);
    };

    const prevAboutSlide = () => {
        if (!homepageData?.about_carousel_images?.length) return;
        setCurrentAboutSlide((prev) => (prev - 1 + homepageData.about_carousel_images.length) % homepageData.about_carousel_images.length);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            </div>
        );
    }

    // Use default data if API data is not available
    const data = homepageData || {
        hero_title: "Memorable Events, Luxury Stays",
        hero_subtitle: "Exceptional Experiences.",
        hero_video_url: "https://res.cloudinary.com/dwd2dks0h/video/upload/v1759594855/Web_zsq9z3.mp4",
        hero_button_text: "Book events/schedule meeting",
        hero_button_link: "https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062",
        navigation_section_title: "Experience Luxury",
        navigation_section_subtitle: "Discover the exceptional services and amenities that define the Magnoliya Grand experience",
        navigation_tiles: [],
        experience_section_title: "The Magnoliya Grand Experience",
        experience_section_subtitle: "Discover the exceptional amenities and services that set us apart as the premier destination for luxury stays and memorable events.",
        highlights: [],
        stats: [],
        experience_button_text: "Discover All Experiences",
        experience_button_link: "/experiences",
        about_section_title: "About Magnoliya Grand",
        about_description: [],
        about_button_text: "Learn More About Us",
        about_button_link: "/about",
        about_carousel_images: [],
        venues_section_title: "Featured Event Venues",
        event_venues: [],
        venues_button_text: "Explore All Venues",
        venues_button_link: "/venues",
        rooms_section_title: "Luxury Accommodations",
        featured_rooms: [],
        rooms_button_text: "View All Rooms",
        rooms_button_link: "/rooms",
        dining_section_title: "Exquisite Dining Experience",
        dining_description: [],
        dining_button_text: "Explore Dining",
        dining_button_link: "/dining",
        dining_image: "",
        testimonials_section_title: "Guest Experiences",
        testimonials: [],
        tours_section_title: "360° Venue Tours",
        tours_description: "Explore our spaces with interactive 360° tours. Use touch or mouse to look around, and open fullscreen from the tour controls.",
        tour_embeds: [],
        gallery_section_title: "Gallery",
        gallery_images: [],
        gallery_button_text: "View Full Gallery",
        gallery_button_link: "/gallery",
        cta_title: "Plan Your Dream Stay or Event Today",
        cta_description: "Experience unparalleled luxury and impeccable service at Magnoliya Grand",
        cta_primary_button_text: "Book Now",
        cta_primary_button_link: "https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062",
        cta_secondary_button_text: "Contact Us",
        cta_secondary_button_link: "/contact"
    };

    return (
        <div className="relative">
            {/* Background image for content below the hero banner */}
            <div
                className="absolute left-0 right-0 z-0 homepage-bg-darken"
                style={{
                    top: '100vh',
                    bottom: 0,
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                }}
            />

            {/* Hero Banner with Video */}
            <div className="relative h-screen overflow-hidden z-10">
                <div className="absolute inset-0 homepage-video-overlay z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute w-full h-full object-cover"
                    >
                        <source src={data.hero_video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Vignette overlay to darken edges while keeping center bright */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-white">
                        {data.hero_title}
                    </h1>
                    <p className="text-2xl md:text-4xl mb-10 animate-fade-in animation-delay-300 text-white">
                        {data.hero_subtitle}
                    </p>
                    <div className="animate-fade-in animation-delay-500">
                        <a href={data.hero_button_link} target="_blank" rel="noopener noreferrer" aria-label="Request a booking">
                            <button className="bg-white text-gold font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white/95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold/50">
                                {data.hero_button_text}
                            </button>
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Redesigned Experience Luxury Section */}
            <section className="py-20 relative overflow-hidden z-10">
                <div className="container mx-auto px-4 relative z-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
                            {data.navigation_section_title}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {data.navigation_section_subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.navigation_tiles.map((tile, index) => (
                            <Link
                                key={index}
                                href={tile.link}
                                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 h-full flex flex-col"
                            >
                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={tile.image}
                                        alt={tile.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Gold accent bar */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gold-dark transition-colors duration-300">
                                        {tile.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed mb-4 flex-1">
                                        {tile.description}
                                    </p>

                                    {/* Elegant divider */}
                                    <div className="w-12 h-0.5 bg-gold/30 mb-4 group-hover:w-16 group-hover:bg-gold transition-all duration-500"></div>

                                    {/* Learn more text */}
                                    <div className="flex items-center text-gold font-medium mt-auto">
                                        <span className="mr-2">Discover More</span>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Hover effect background */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/10 transition-all duration-500 -z-10"></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Redesigned The Magnoliya Grand Experience Section */}
            <section className="py-20 relative overflow-hidden z-10">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4">
                            {data.experience_section_title}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {data.experience_section_subtitle}
                        </p>
                    </div>

                    {/* Enhanced Highlights Grid without Icons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.highlights.map((highlight, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
                            >
                                {/* Content Container */}
                                <div className="p-8">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-gold-dark transition-colors duration-300">
                                        {highlight.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {highlight.description}
                                    </p>

                                    {/* Hover effect line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-gold-light to-gold group-hover:w-full transition-all duration-700"></div>
                                </div>

                                {/* Gold corner accent */}
                                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gold transform rotate-45 translate-x-8 -translate-y-8 group-hover:bg-gold-dark transition-colors duration-500"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    {data.stats.length > 0 && (
                        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                                {data.stats.map((stat, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="text-3xl md:text-4xl font-bold text-gold">{stat.value}</div>
                                        <div className="text-gray-600 font-medium">{stat.label}</div>
                                        <div className="text-xs text-gray-500">{stat.sublabel}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional CTA */}
                    <div className="text-center mt-16">
                        <Link
                            href={data.experience_button_link}
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold text-gray-900 font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:from-gold hover:to-gold-dark hover:-translate-y-1 text-lg"
                        >
                            <span className="mr-3">{data.experience_button_text}</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Magnoliya Grand with Carousel */}
            {data.about_carousel_images.length > 0 && (
                <section className="py-20 relative z-10">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="w-full lg:w-1/2">
                                {/* Carousel Container */}
                                <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                                    <div className="relative h-96 md:h-[500px] overflow-hidden">
                                        {data.about_carousel_images.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                                    index === currentAboutSlide ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${data.about_section_title} ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={prevAboutSlide}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-300 z-10"
                                        aria-label="Previous image"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={nextAboutSlide}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-300 z-10"
                                        aria-label="Next image"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    
                                    {/* Dots Indicator */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                                        {data.about_carousel_images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentAboutSlide(index)}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                    index === currentAboutSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                                                }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="max-w-lg mx-auto lg:mx-0">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                                        {data.about_section_title}
                                    </h2>
                                    {data.about_description.map((paragraph, index) => (
                                        <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                    <Link
                                        href={data.about_button_link}
                                        className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        {data.about_button_text}
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Event Venues */}
            {data.event_venues.length > 0 && (
                <section className="py-16 relative z-10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 font-serif">{data.venues_section_title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {data.event_venues.map((venue, index) => (
                                <div key={index} className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={venue.image}
                                            alt={venue.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
                                        <p className="text-gold mb-2 font-medium">{venue.capacity}</p>
                                        <p className="text-gray-600 mb-4">{venue.description}</p>
                                        <Link href={venue.link} className="text-gold font-medium hover:text-gold-dark transition-colors duration-300 flex items-center">
                                            View Details
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12 gap-4 flex justify-center space-x-4">
                            <a href="https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062" target="blank" className="btn-primary">
                                Booking Request
                            </a>
                            <Link href={data.venues_button_link} className="btn-primary">
                                {data.venues_button_text}
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Rooms & Suites Preview */}
            {data.featured_rooms.length > 0 && (
                <section className="py-16 relative z-10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 font-serif">{data.rooms_section_title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {data.featured_rooms.map((room, index) => (
                                <div key={index} className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                    <div className="h-56 overflow-hidden">
                                        <img
                                            src={room.image}
                                            alt={room.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-gold text-white py-1 px-3 rounded-lg font-semibold">
                                            {room.price}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                        <p className="text-gray-600 mb-4 text-sm">{room.description}</p>
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                                            <ul className="space-y-1">
                                                {room.features.slice(0, 3).map((feature, i) => (
                                                    <li key={i} className="flex items-center text-xs text-gray-600">
                                                        <span className="text-gold mr-2">•</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                                {room.features.length > 3 && (
                                                    <li className="text-xs text-gray-500">+{room.features.length - 3} more features</li>
                                                )}
                                            </ul>
                                        </div>
                                        <Link href={room.link} className="text-gold font-medium hover:text-gold-dark transition-colors duration-300 flex items-center">
                                            View Details & Book
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href={data.rooms_button_link} className="btn-primary">
                                {data.rooms_button_text}
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Dining Experience */}
            {data.dining_image && (
                <section className="py-16 relative z-10">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="w-full lg:w-1/2">
                                <img
                                    src={data.dining_image}
                                    alt="Fine Dining Experience"
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                />
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="max-w-lg mx-auto lg:mx-0">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                                        {data.dining_section_title}
                                    </h2>
                                    {data.dining_description.map((paragraph, index) => (
                                        <p key={index} className="text-lg text-gray-600 mb-6 leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                    <Link
                                        href={data.dining_button_link}
                                        className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        {data.dining_button_text}
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials */}
            {data.testimonials.length > 0 && (
                <section className="py-16 relative z-10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 font-serif">{data.testimonials_section_title}</h2>
                        <div className="max-w-4xl mx-auto relative h-64">
                            {data.testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <div className="bg-gray-50 rounded-2xl p-8 shadow-lg text-center">
                                        <div className="text-4xl text-gold mb-4">"</div>
                                        <p className="text-lg text-gray-700 italic mb-6">{testimonial.text}</p>
                                        <div>
                                            <p className="font-semibold text-gray-800">{testimonial.author}</p>
                                            <p className="text-sm text-gray-600">{testimonial.event}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8 space-x-2">
                            {data.testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-gold' : 'bg-gray-300'}`}
                                    onClick={() => setCurrentTestimonial(index)}
                                    aria-label={`View testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 360° Tours Section */}
            {data.tour_embeds.length > 0 && (
                <section className="py-16 relative z-10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">{data.tours_section_title}</h2>

                        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{data.tours_description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.tour_embeds.map((tour, index) => (
                                <div key={index} className="w-full rounded-2xl overflow-hidden shadow-lg">
                                    <div className="w-full aspect-[16/9] bg-black">
                                        <iframe
                                            title={tour.title}
                                            src={tour.embed_url}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; vr; xr-spatial-tracking"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            loading="lazy"
                                            className="w-full h-full border-0"
                                            onLoad={() => {}}
                                            onError={() => {}}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery Preview */}
            {data.gallery_images.length > 0 && (
                <section className="py-16 relative z-10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl text-center mb-12 font-serif">{data.gallery_section_title}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {data.gallery_images.slice(0, 8).map((image, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                                    onClick={() => openModal(image)}
                                >
                                    <img
                                        src={image}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-lg font-medium">
                                            View
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href={data.gallery_button_link} className="btn-primary">
                                {data.gallery_button_text}
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Call-to-Action Strip */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">
                        {data.cta_title}
                    </h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        {data.cta_description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href={data.cta_primary_button_link} target="_blank" rel="noopener noreferrer" className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            {data.cta_primary_button_text}
                        </a>
                        <a href={data.cta_secondary_button_link} className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                            {data.cta_secondary_button_text}
                        </a>
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-300"
                            onClick={closeModal}
                            aria-label="Close"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Zoom controls */}
                        <div className="absolute top-4 left-4 z-10 flex space-x-2">
                            <button
                                className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-300"
                                onClick={zoomIn}
                                aria-label="Zoom in"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                            <button
                                className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-300"
                                onClick={zoomOut}
                                aria-label="Zoom out"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <button
                                className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-300"
                                onClick={resetZoom}
                                aria-label="Reset zoom"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>

                        {/* Zoom level indicator */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full px-3 py-1">
                            {Math.round(zoomLevel * 100)}%
                        </div>

                        {/* Image container */}
                        <div
                            className="overflow-hidden max-w-full max-h-full"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            <img
                                src={selectedImage}
                                alt="Enlarged view"
                                className="max-w-full max-h-full object-contain cursor-move"
                                style={{
                                    transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;