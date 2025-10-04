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
            src: "https://images.unsplash.com/photo-1549451378-6e2e2c1c3c5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            alt: "Garden Wedding"
        }
    ];

    // Quick navigation tiles
    const navigationTiles = [
        { title: "Rooms & Suites", icon: "🛏️", link: "/rooms" },
        { title: "Dining", icon: "🍽️", link: "/dining" },
        { title: "Weddings & Social Events", icon: "💒", link: "/weddings" },
        { title: "Corporate Events", icon: "🏢", link: "/corporate-events" },
        { title: "Event Services", icon: "🎭", link: "/services" },
        { title: "Gallery", icon: "🖼️", link: "/gallery" },
    ];

    // Highlights strip
    const highlights = [
        "Multicuisine Restaurants",
        "Panoramic Water Views",
        "State-of-the-Art AV & Lighting",
        "Terrace & Garden Venues",
        "End-to-End Event Management",
        "Luxury Spa & Wellness",
        "24/7 Concierge Service",
        "Customized Event Planning"
    ];

    // Featured event venues
    const eventVenues = [
        {
            name: "Grand Ballroom",
            capacity: "Up to 500 guests",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Elegant space for grand celebrations"
        },
        {
            name: "Garden Terrace",
            capacity: "Up to 200 guests",
            image: "https://images.unsplash.com/photo-1549451378-6e2e2c1c3c5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Open-air venue with lush surroundings"
        },
        {
            name: "Water View Lounge",
            capacity: "Up to 100 guests",
            image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Intimate setting with panoramic water views"
        }
    ];

    // Featured rooms
    const featuredRooms = [
        {
            name: "Deluxe Suite",
            price: "$299/night",
            image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Spacious suite with premium amenities"
        },
        {
            name: "Executive Room",
            price: "$199/night",
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Comfortable elegance for business travelers"
        },
        {
            name: "Presidential Suite",
            price: "$599/night",
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            description: "Ultimate luxury with exclusive access"
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


    // Open modal with selected image
    const openModal = (image: string) => {
        setSelectedImage(image);
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Close modal
    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Enable scrolling
    };

    // Zoom in
    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.25, 3));
    };

    // Zoom out
    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    };

    // Reset zoom and position
    const resetZoom = () => {
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    };

    // Handle mouse down for dragging
    const handleMouseDown = (e: any) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    // Handle mouse move for dragging
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

    return (
        <div className="relative">
            {/* Hero Banner with Video */}
            <div className="relative h-screen overflow-hidden">
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

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        Luxury Stays. Memorable Events.
                    </h1>
                    <p className="text-2xl md:text-4xl mb-10 animate-fade-in animation-delay-300">
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


            {/* Quick Navigation Tiles */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
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
                                className="group relative bg-white p-10 rounded-xl shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-3"
                            >
                                {/* Gold accent bar */}
                                <div className="absolute top-0 left-0 w-2 h-0 bg-gold group-hover:h-full transition-all duration-500"></div>

                                {/* Content */}
                                <div className="relative">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-5 group-hover:text-gold-dark transition-colors duration-300">
                                        {tile.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        Indulge in our exceptional {tile.title.toLowerCase()} designed for those who appreciate the finer things in life
                                    </p>

                                    {/* Elegant divider */}
                                    <div className="w-16 h-0.5 bg-gold/30 mb-6 group-hover:w-24 group-hover:bg-gold transition-all duration-500"></div>

                                    {/* Learn more text */}
                                    <div className="flex items-center text-gold font-medium">
                                        <span className="mr-2">Discover More</span>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Hover effect background */}
                                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gold/10 transition-all duration-500 -z-10"></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights Strip */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-40 h-40 bg-gold/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-gold/5 rounded-full blur-xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-800 mb-4">
                            The <span className="text-gold font-medium">Magnoliya Grand</span> Experience
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover the exceptional amenities and services that set us apart as the premier destination for luxury stays and memorable events.
                        </p>
                    </div>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((highlight, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden"
                            >
                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gold transform rotate-45 translate-x-8 -translate-y-8 group-hover:bg-gold-dark transition-colors duration-500"></div>
                                </div>

                                {/* Number indicator */}
                                <div className="text-5xl font-serif text-gray-200 font-light mb-4 group-hover:text-gold/20 transition-colors duration-500">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Highlight text */}
                                <h3 className="text-xl font-medium text-gray-800 group-hover:text-gold-dark transition-colors duration-500">
                                    {highlight}
                                </h3>

                                {/* Hover effect line */}
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-gold-light to-gold group-hover:w-full transition-all duration-700"></div>
                            </div>
                        ))}
                    </div>

                    {/* Additional CTA */}
                    <div className="text-center mt-16">
                        <Link
                            href="/experiences"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold-light to-gold text-gray-900 font-medium rounded-full transition-all duration-300 hover:shadow-2xl hover:from-gold hover:to-gold-dark hover:-translate-y-1"
                        >
                            Discover All Experiences
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Magnoliya Grand */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="w-full lg:w-1/2">
                            <img
                                src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157318.jpg"
                                alt="Magnoliya Grand Hotel"
                                className="rounded-2xl shadow-2xl w-full h-auto"
                            />
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

            {/* Featured Event Venues */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl text-center mb-12 font-serif">Featured Event Venues</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {eventVenues.map((venue, index) => (
                            <div key={index} className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={venue.image}
                                        alt={venue.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
                                    <p className="text-gold mb-2 font-medium">{venue.capacity}</p>
                                    <p className="text-gray-600 mb-4">{venue.description}</p>
                                    <Link href="/venues" className="text-gold font-medium hover:text-gold-dark transition-colors duration-300 flex items-center">
                                        View Details
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/venues" className="btn-primary">
                            Explore All Venues
                        </Link>
                    </div>
                </div>
            </section>

            {/* Rooms & Suites Preview */}
            <section className="py-16 bg-white">
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
                                    <p className="text-gray-600 mb-4">{room.description}</p>
                                    <Link href="/rooms" className="text-gold font-medium hover:text-gold-dark transition-colors duration-300 flex items-center">
                                        View Details
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
            <section className="py-16 bg-gray-50">
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
            <section className="py-16 bg-white">
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

            {/* Gallery Preview */}
            <section className="py-16 bg-gray-50">
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
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
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
                                src={selectedImage.replace('300', '1200')} // Load higher resolution image
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