"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    const sectionRef = useRef(null);

    // Background image URL
    const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";

    // Hero carousel images
    const heroSlides = [
        {
            type: "image",
            src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            alt: "Luxury Hotel Facade"
        },
        {
            type: "image",
            src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            alt: "Elegant Ballroom"
        },
        {
            type: "image",
            src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            alt: "Terrace Wedding"
        },
        {
            type: "image",
            src: "https://images.unsplash.com/photo-1549451371-587aa8e60963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            alt: "Garden Wedding"
        }
    ];

    // About section carousel images
    const aboutCarouselImages = [
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157318.jpg",
        "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/DJI_MagHotel_Front.jpg",
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157342.jpg",
        "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/DJI_0087.jpg",
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/DSC03324-Enhanced-NR.jpg"
    ];

    // Enhanced navigation tiles with actual images
    const navigationTiles = [
        {
            title: "Event Venues",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/DSC03324-Enhanced-NR.jpg",
            alt: "Grand Ballroom Event Space",
            link: "/venues",
            description: "Stunning venues for weddings, conferences, and special events"
        },
        {
            title: "Weddings & Social Events",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157342.jpg",
            alt: "Beautiful Wedding Setup",
            link: "/weddings",
            description: "Create unforgettable memories with our expert event planning"
        },
        {
            title: "Corporate Events",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/WhatsApp%20Image%202025-10-08%20at%2009.40.09_2f5aa1ef.jpg",
            alt: "Corporate Meeting Space",
            link: "/corporate",
            description: "Professional settings for meetings, conferences, and corporate gatherings"
        },
        {
            title: "Rooms & Suites",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/king-one-bedroom-suite-3.avif",
            alt: "Luxury Hotel Suite",
            link: "/rooms-suites",
            description: "Elegant accommodations with premium amenities and comfort"
        },
        {
            title: "Dining",
            image: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_201602.jpg",
            alt: "Fine Dining Restaurant",
            link: "/dining",
            description: "Exquisite culinary experiences in sophisticated settings"
        },
        {
            title: "Gallery",
            image: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/P1157318.jpg",
            alt: "Hotel Gallery Views",
            link: "/gallery",
            description: "Explore our stunning spaces and previous events"
        },
    ];

    // Enhanced highlights with icons and images
    const highlights = [
        {
            title: "Multicuisine Restaurants",
            icon: "🍽️",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/_1196636.jpg",
            description: "Award-winning dining experiences"
        },
        {
            title: "Panoramic Water Views",
            icon: "🌅",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/DJI_0078-Edit.jpg",
            description: "Breathtaking lake and garden vistas"
        },
        {
            title: "State-of-the-Art AV & Lighting",
            icon: "💡",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg",
            description: "Advanced technology for perfect events"
        },
        {
            title: "Terrace & Garden Venues",
            icon: "🌿",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/LakeView.jpg",
            description: "Beautiful outdoor event spaces"
        },
        {
            title: "End-to-End Event Management",
            icon: "📋",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157342.jpg",
            description: "Comprehensive planning services"
        },
        {
            title: "24/7 Concierge Service",
            icon: "🛎️",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/king-one-bedroom-suite-3.avif",
            description: "Round-the-clock personalized service"
        },
        {
            title: "Customized Event Planning",
            icon: "🎯",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Kwaza%20hall.jpg",
            description: "Tailored solutions for your needs"
        },
        {
            title: "Luxury Accommodations",
            icon: "🛏️",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/standard-king-688be9.avif",
            description: "Premium rooms and suites"
        }
    ];

    // Featured event venues
    const eventVenues = [
        {
            name: "Grand Ballroom",
            capacity: "Up to 1,800 guests",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg",
            description: "Breathtaking setting with soaring ceilings and elegant design for weddings, galas, and large-scale gatherings",
            link: "/venues#grand-ballroom"
        },
        {
            name: "Lakeview Terrace",
            capacity: "Up to 200 guests",
            image: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/WaterViewGarden.png",
            description: "Open-air space with serene lake views, perfect for cocktail hours and social gatherings",
            link: "/venues#lakeview-terrace"
        },
        {
            name: "Kwanzan Hall",
            capacity: "Up to 260 guests",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Kwaza%20hall.jpg",
            description: "Polished private atmosphere with advanced AV capabilities for business meetings and intimate gatherings",
            link: "/venues#kwanzan-hall"
        }
    ];

    // Featured rooms
    const featuredRooms = [
        {
            name: "King Room",
            price: "Spacious & Comfortable",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/standard-king-688be9.avif",
            description: "Spacious room with one king bed, perfect for solo travelers or couples",
            features: ["One King Bed", "Free WiFi", "Flat-screen TV", "Work Desk", "Coffee Maker", "Mini Refrigerator"],
            link: "/rooms"
        },
        {
            name: "Double Queen Room",
            price: "Ideal for Families",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/standard-double-queen-e39b41.jpg",
            description: "Comfortable room with two queen beds, ideal for families or groups",
            features: ["Two Queen Beds", "Free WiFi", "Flat-screen TV", "Work Desk", "Coffee Maker", "Mini Refrigerator"],
            link: "/rooms"
        },
        {
            name: "King Suite",
            price: "Luxurious Experience",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/king-one-bedroom-suite-3.avif",
            description: "Luxurious suite with separate living area and premium amenities",
            features: ["Separate Living Area", "One King Bed", "Microwave", "Mini Refrigerator", "Premium Bath Amenities"],
            link: "/rooms"
        }
    ];

    // Testimonials
    const testimonials = [
        {
            text: "Our wedding was absolutely perfect thanks to the Magnoliya Grand team. Every detail was executed flawlessly.",
            author: "Sarah & Michael",
            event: "Wedding Couple"
        },
        {
            text: "The corporate retreat was a huge success. The facilities and service were exceptional.",
            author: "John Smith",
            event: "Tech Conference Organizer"
        },
        {
            text: "The rooms are luxurious, the views breathtaking, and the dining experience unforgettable.",
            author: "Emma Johnson",
            event: "Luxury Travel Blogger"
        }
    ];

    // Gallery images
    const galleryImages = [
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157318.jpg",
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157336-Edit.jpg",
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157342.jpg",
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157407-HDR.jpg",
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/DSC03324-Enhanced-NR.jpg",
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/_1196541.jpg",
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/_1196569.jpg",
        "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/DJI_0078-Edit.jpg",
    ];

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

    // Auto-rotate hero carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Auto-rotate about carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAboutSlide((prev) => (prev + 1) % aboutCarouselImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [aboutCarouselImages.length]);

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

    // About section carousel state
    const [currentAboutSlide, setCurrentAboutSlide] = useState(0);

    const nextAboutSlide = () => {
        setCurrentAboutSlide((prev) => (prev + 1) % aboutCarouselImages.length);
    };

    const prevAboutSlide = () => {
        setCurrentAboutSlide((prev) => (prev - 1 + aboutCarouselImages.length) % aboutCarouselImages.length);
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
                        <source src="https://res.cloudinary.com/dwd2dks0h/video/upload/v1759594855/Web_zsq9z3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Vignette overlay to darken edges while keeping center bright */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in text-white">
                        Memorable Events, Luxury Stays
                    </h1>
                    <p className="text-2xl md:text-4xl mb-10 animate-fade-in animation-delay-300 text-white">
                        Exceptional Experiences.
                    </p>
                    
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
                {/* Background decorative elements */}
                {/* <div className="absolute top-0 left-0 w-full h-32 "></div>
                <div className="absolute bottom-0 left-0 w-full h-32"></div> */}

                <div className="container mx-auto px-4 relative z-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">
                            Experience <span className="text-gold">Luxury</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover the exceptional services and amenities that define the Magnoliya Grand experience
                        </p>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {navigationTiles.map((tile, index) => (
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
                            The <span className="text-gold font-medium">Magnoliya Grand</span> Experience
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover the exceptional amenities and services that set us apart as the premier destination for luxury stays and memorable events.
                        </p>
                    </div>

                    {/* Enhanced Highlights Grid without Icons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {highlights.map((highlight, index) => (
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
                    <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                            
                            <div className="space-y-2">
                                <div className="text-3xl md:text-4xl font-bold text-gold">1,800</div>
                                <div className="text-gray-600 font-medium">Guest Capacity</div>
                                <div className="text-xs text-gray-500">Grand Ballroom</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-3xl md:text-4xl font-bold text-gold">98%</div>
                                <div className="text-gray-600 font-medium">Guest Satisfaction</div>
                                <div className="text-xs text-gray-500">Rating</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-3xl md:text-4xl font-bold text-gold">24/7</div>
                                <div className="text-gray-600 font-medium">Concierge</div>
                                <div className="text-xs text-gray-500">Service Available</div>
                            </div>
                        </div>
                    </div>

                    {/* Additional CTA */}
                    <div className="text-center mt-16">
                        <Link
                            href="/experiences"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold text-gray-900 font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:from-gold hover:to-gold-dark hover:-translate-y-1 text-lg"
                        >
                            <span className="mr-3">Discover All Experiences</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Magnoliya Grand with Carousel */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="w-full lg:w-1/2">
                            {/* Carousel Container */}
                            <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                                <div className="relative h-96 md:h-[500px] overflow-hidden">
                                    {aboutCarouselImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                                index === currentAboutSlide ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Magnoliya Grand Hotel ${index + 1}`}
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
                                    {aboutCarouselImages.map((_, index) => (
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
                                    About <span className="text-gold">Magnoliya Grand</span>
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Where luxury meets impeccable service. Our prestigious hotel offers breathtaking views, world-class amenities, and unforgettable experiences for both leisure and business travelers.
                                </p>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    We specialize in creating memorable events, from intimate weddings to large corporate gatherings, with attention to every detail.
                                </p>
                                <Link
                                    href="/about"
                                    className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    Learn More About Us
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Event Venues - Updated without dark overlay */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl text-center mb-12 font-serif">Featured Event Venues</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {eventVenues.map((venue, index) => (
                            <div key={index} className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src={venue.image}
                                        alt={venue.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Removed the dark overlay gradient */}
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
                        <Link href="https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062" target="blank" className="btn-primary">
                            Booking Request
                        </Link>
                        <Link href="/venues" className="btn-primary">
                            Explore All Venues
                        </Link>
                    </div>
                </div>
            </section>

            {/* Rooms & Suites Preview */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl text-center mb-12 font-serif">Luxury Accommodations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredRooms.map((room, index) => (
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
                        <Link href="/rooms" className="btn-primary">
                            View All Rooms
                        </Link>
                    </div>
                </div>
            </section>

            {/* Dining Experience */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="w-full lg:w-1/2">
                            <img
                                src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/_1196636.jpg"
                                alt="Fine Dining Experience"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="max-w-lg mx-auto lg:mx-0">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
                                    Exquisite <span className="text-gold">Dining</span> Experience
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Indulge in culinary excellence at our award-winning restaurants. Our master chefs create unforgettable dining experiences with the finest ingredients and innovative techniques.
                                </p>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    From intimate dinners to grand celebrations, our diverse culinary offerings cater to every palate and occasion.
                                </p>
                                <Link
                                    href="/dining"
                                    className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    Explore Dining
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl text-center mb-12 font-serif">Guest Experiences</h2>
                    <div className="max-w-4xl mx-auto relative h-64">
                        {testimonials.map((testimonial, index) => (
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
                        {testimonials.map((_, index) => (
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

            {/* 360° Tours Section */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">360° Venue Tours</h2>

                    <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Explore our spaces with interactive 360° tours. Use touch or mouse to look around, and open fullscreen from the tour controls.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                            <div className="w-full aspect-[16/9] bg-black">
                                <iframe
                                    title="360 Tour Collection 7J4X8"
                                    src="https://kuula.co/share/collection/7J4X8?logo=0&info=1&fs=1&vr=1&sd=1&thumbs=1"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; vr; xr-spatial-tracking"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    loading="lazy"
                                    className="w-full h-full border-0"
                                    onLoad={() => {}}
                                    onError={() => {}}
                                />
                            </div>

                        </div>

                        <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                            <div className="w-full aspect-[16/9] bg-black">
                                <iframe
                                    title="360 Tour Collection 7J4Ft"
                                    src="https://kuula.co/share/collection/7J4Ft?logo=0&info=0&fs=1&vr=0&thumbs=1"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; vr; xr-spatial-tracking"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    loading="lazy"
                                    className="w-full h-full border-0"
                                    onLoad={() => {}}
                                    onError={() => {}}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl text-center mb-12 font-serif">Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryImages.map((image, index) => (
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
                        <Link href="/gallery" className="btn-primary">
                            View Full Gallery
                        </Link>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Strip */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">
                        Plan Your Dream Stay or Event Today
                    </h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        Experience unparalleled luxury and impeccable service at Magnoliya Grand
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/booking" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl">
                            Book Now
                        </a>
                        <a href="/contact" className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                            Contact Us
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
                                src={selectedImage.replace('300', '1200')}
                                alt="Enlarged view"
                                className="max-w-full max-h-full object-contain cursor-move"
                                style={{
                                    transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                                }}
                            />
                        </div>

                        {/* Navigation arrows */}
                        <button
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = galleryImages.indexOf(selectedImage);
                                const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                                setSelectedImage(galleryImages[prevIndex]);
                                resetZoom();
                            }}
                            aria-label="Previous image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                const currentIndex = galleryImages.indexOf(selectedImage);
                                const nextIndex = (currentIndex + 1) % galleryImages.length;
                                setSelectedImage(galleryImages[nextIndex]);
                                resetZoom();
                            }}
                            aria-label="Next image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;