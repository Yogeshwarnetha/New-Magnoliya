"use client";
import { useState, useEffect, useRef } from 'react';
import { getRoomsSuites, RoomsSuitesData } from '@/apirequests/rooms-suites';

const RoomsAndSuites = () => {
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);
    const [backgroundTop, setBackgroundTop] = useState<number | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const [lightboxIndex, setLightboxIndex] = useState<number>(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    
    // State for dynamic data
    const [data, setData] = useState<RoomsSuitesData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Decorative background image used on the Homepage
    const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getRoomsSuites();
                
                if (response.ok && response.data) {
                    setData(response.data);
                } else {
                    throw new Error(response.error || 'Failed to load data');
                }
            } catch (err) {
                console.error('Error fetching rooms and suites data:', err);
                setError(err instanceof Error ? err.message : 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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

    // Carousel auto-play effect
    useEffect(() => {
        if (!isAutoPlaying || !data?.carousel_slides?.length) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % data.carousel_slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, data?.carousel_slides?.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        if (!data?.carousel_slides?.length) return;
        goToSlide((currentSlide + 1) % data.carousel_slides.length);
    };

    const prevSlide = () => {
        if (!data?.carousel_slides?.length) return;
        goToSlide((currentSlide - 1 + data.carousel_slides.length) % data.carousel_slides.length);
    };

    // Add keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen || !data?.gallery_images?.length) return;
            
            if (e.key === 'Escape') {
                setLightboxOpen(false);
            } else if (e.key === 'ArrowLeft') {
                setLightboxIndex((prev) => (prev - 1 + data.gallery_images.length) % data.gallery_images.length);
            } else if (e.key === 'ArrowRight') {
                setLightboxIndex((prev) => (prev + 1) % data.gallery_images.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, data?.gallery_images?.length]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading rooms and suites...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to load content</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-gold text-white font-semibold py-2 px-6 rounded-lg hover:bg-gold-dark transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // No data state
    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No content available</h3>
                    <p className="text-gray-600">Please check back later for available content.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white">
            {/* Decorative repeating background — start after hero (matches other components) */}
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
                {/* Enhanced Hero Carousel Section */}
                <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
                    <div className="absolute inset-0">
                        {/* Carousel Container */}
                        <div className="relative w-full h-full">
                            {data.carousel_slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                        index === currentSlide 
                                            ? 'opacity-100 transform translate-x-0' 
                                            : 'opacity-0 transform translate-x-4'
                                    }`}
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Enhanced gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                    
                                    {/* Enhanced Slide content */}
                                    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                                        <div className="px-6 max-w-4xl">
                                            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
                                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-tight text-white">
                                                {slide.title}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Carousel Navigation */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-gold transition-all duration-300 z-20 hover:scale-110 hover:shadow-2xl"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-gold transition-all duration-300 z-20 hover:scale-110 hover:shadow-2xl"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Enhanced Carousel Indicators */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                        {data.carousel_slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                                    index === currentSlide 
                                    ? 'bg-gold scale-125 shadow-lg' 
                                    : 'bg-white/50 hover:bg-white/70'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="animate-bounce">
                            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Connected Hotel Information */}
                <section className="py-24 relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full translate-x-1/3 translate-y-1/3"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                            <div className="w-full lg:w-1/2">
                                <div className="relative group">
                                    <img
                                        src={data.connected_hotel_image}
                                        alt="Hilton Garden Inn"
                                        className="rounded-3xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute -inset-4 bg-gold/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="max-w-lg mx-auto lg:mx-0">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-px bg-gold mr-4"></div>
                                        <span className="text-gold font-semibold tracking-widest text-sm uppercase">CONNECTED HOTEL</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6 leading-tight">
                                        {data.connected_hotel_title}
                                    </h2>
                                    <div className="space-y-4 mb-8">
                                        {data.connected_hotel_description.map((paragraph, index) => (
                                            <p key={index} className="text-lg text-gray-700 leading-relaxed font-light">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://www.guestreservations.com/hilton-garden-inn-manassas/booking?msclkid=3ab69d372b361ee38a45f5806dfd8973&ctTriggered=true"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                                        >
                                            Book Rooms
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </a>
                                        <a
                                            href="https://www.guestreservations.com/hilton-garden-inn-manassas/booking?msclkid=3ab69d372b361ee38a45f5806dfd8973&ctTriggered=true"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center border border-gold text-gold hover:bg-gold hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 group"
                                        >
                                            Book Suites
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Room Types Section */}
                <section className="py-24 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">ACCOMMODATIONS</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                {data.accommodations_title}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                                {data.accommodations_description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {data.room_types.map((room, index) => (
                                <div 
                                    key={index} 
                                    className="group bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 cursor-pointer relative"
                                    onClick={() => window.open("https://www.guestreservations.com/hilton-garden-inn-manassas/booking?msclkid=3ab69d372b361ee38a45f5806dfd8973&ctTriggered=true", "_blank", "noopener,noreferrer")}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={room.image}
                                            alt={room.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-serif font-light text-gray-800 mb-3">{room.name}</h3>
                                        <p className="text-gray-600 mb-4 text-sm font-light leading-relaxed">{room.description}</p>
                                        <ul className="space-y-2 mb-6">
                                            {room.features.map((feature, i) => (
                                                <li key={i} className="flex items-center text-sm text-gray-600 font-light">
                                                    <span className="text-gold mr-3 font-bold">•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div
                                            className="inline-flex items-center text-gold font-medium hover:text-gold-dark transition-all duration-300 group pointer-events-none"
                                        >
                                            Book Now
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gold/20 transition-all duration-300 pointer-events-none"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced Gallery Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">GALLERY</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                {data.gallery_title}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                                {data.gallery_description}
                            </p>
                        </div>

                        {/* Enhanced Masonry-style grid */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {data.gallery_images.map((image, index) => (
                                <div
                                    key={index}
                                    className="break-inside-avoid group cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                                    onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}
                                >
                                    <div className="relative overflow-hidden rounded-3xl shadow-xl bg-white">
                                        <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                                            <img
                                                src={image.src}
                                                alt={image.caption}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                                            <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                                <p className="text-lg font-medium mb-2">{image.caption}</p>
                                                <div className="w-12 h-px bg-gold mx-auto mb-2"></div>
                                                <div className="flex items-center justify-center text-sm opacity-90">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                    Click to view
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="text-gold font-bold text-lg">+</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced Lightbox Modal */}
                {lightboxOpen && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm px-4"
                        role="dialog" 
                        aria-modal="true"
                        aria-label="Image gallery"
                        onClick={(e) => e.target === e.currentTarget && setLightboxOpen(false)}
                    >
                        <div className="max-w-7xl w-full max-h-[90vh] flex flex-col">
                            {/* Header with counter and close button */}
                            <div className="flex justify-between items-center text-white mb-6">
                                <div className="text-lg font-light opacity-80">
                                    {lightboxIndex + 1} of {data.gallery_images.length}
                                </div>
                                <button
                                    onClick={() => setLightboxOpen(false)}
                                    className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white hover:scale-110"
                                    aria-label="Close gallery"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Main image container */}
                            <div className="relative flex-1 flex items-center justify-center">
                                <button
                                    onClick={() => setLightboxIndex((prev) => (prev - 1 + data.gallery_images.length) % data.gallery_images.length)}
                                    className="absolute left-6 z-10 p-4 text-white hover:bg-white/10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white hover:scale-110"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <div className="w-full h-full flex items-center justify-center">
                                    <img 
                                        src={data.gallery_images[lightboxIndex].src}
                                        alt={data.gallery_images[lightboxIndex].caption}
                                        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                                    />
                                </div>

                                <button
                                    onClick={() => setLightboxIndex((prev) => (prev + 1) % data.gallery_images.length)}
                                    className="absolute right-6 z-10 p-4 text-white hover:bg-white/10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white hover:scale-110"
                                    aria-label="Next image"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Image caption */}
                            <div className="text-center text-white mt-6">
                                <p className="text-xl font-serif font-light">{data.gallery_images[lightboxIndex].caption}</p>
                            </div>

                            {/* Thumbnail navigation */}
                            <div className="flex justify-center mt-8 space-x-3">
                                {data.gallery_images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setLightboxIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white hover:scale-125 ${
                                            index === lightboxIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                                        }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Enhanced CTA Section */}
                <section className="py-24 bg-gradient-to-br from-gold to-gold-dark relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 text-center relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-black mr-4"></div>
                                <span className="text-black font-semibold tracking-widest text-sm uppercase">BOOK YOUR STAY</span>
                                <div className="w-20 h-px bg-black ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-black mb-6">
                                {data.cta_title}
                            </h2>
                            <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto font-light">
                                {data.cta_description}
                            </p>
                            <a
                                href="https://www.guestreservations.com/hilton-garden-inn-manassas/booking?msclkid=3ab69d372b361ee38a45f5806dfd8973&ctTriggered=true"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-black text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
                            >
                                Book Now
                                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RoomsAndSuites;