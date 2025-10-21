"use client";
import { useState, useEffect, useRef } from 'react';

const Gallery = () => {
    // Decorative background image used on the Homepage
    const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [selectedVideo, setSelectedVideo] = useState<null | { src: string; title: string }>(null);
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);
    const [backgroundTop, setBackgroundTop] = useState<number | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    
    // Carousel state
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Gallery categories
    const categories = [
        { id: 'all', name: 'All Photos' },
        { id: 'weddings', name: 'Weddings' },
        { id: 'corporate', name: 'Corporate Events' },
        { id: 'dining', name: 'Dining' },
        { id: 'venues', name: 'Venues' }
    ];

    // Carousel slides - using your best venue images
    const carouselSlides = [
        {
            id: 1,
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg",
            title: "Grand Ballroom",
            // description: "Elegant space for weddings and corporate events"
        },
        {
            id: 2,
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FrontPre.jpg",
            // description: "Stunning waterfront views and premium amenities"
        },
        {
            id: 3,
            image: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/WaterViewGarden.png",
            title: "Garden Venue",
            // description: "Beautiful outdoor settings for memorable events"
        },
        {
            id: 4,
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Kwaza%20hall.jpg",
            title: "Conference Hall",
            // description: "Professional spaces for business gatherings"
        }
    ];

    // Category-wise organized images
    const galleryImages = {
        weddings: [
            { id: 1, src: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/LibertyBallroom_Picture.jpg", title: "Elegant Wedding Reception" },
            { id: 9, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_173043.jpg", title: "Wedding Dance" },
            // { id: 64, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_174321.jpg", title: "Wedding Dance" },
            { id: 66, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_174756.jpg", title: "Wedding Dance" },
            { id: 71, src: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/WaterViewGarden.png", title: "Bridal Preparation" },
            // { id: 73, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_194433.jpg", title: "Bridal Preparation" },
            // { id: 75, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/DSC_0220.JPG", title: "Bridal Preparation" },
        ],
        corporate: [
            { id: 11, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/WhatsApp%20Image%202025-10-08%20at%2009.40.09_2f5aa1ef.jpg", title: "Corporate Conference" },
            { id: 13, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/WhatsApp%20Image%202025-10-08%20at%2009.41.25_408b6bf0.jpg", title: "Award Ceremony" },
        ],
        dining: [
            { id: 23, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_201602.jpg", title: "Casual Dining" },
        ],
        venues: [
            // { id: 41, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg", title: "Garden Terrace" },
            { id: 42, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FrontPre.jpg", title: "Water View Lounge" },
            { id: 43, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Left.jpg", title: "Luxury Suite" },
            { id: 44, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Back.jpg", title: "Grand Ballroom" },
            // { id: 46, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Kwaza%20hall.jpg", title: "Outdoor Venue" },
            { id: 47, src: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/DJI_0093.jpg", title: "Poolside Area" },
        ]
    };

    // Flatten all images for "all" category and filtering
    const allImages = [
        ...galleryImages.weddings.map(img => ({ ...img, category: 'weddings' })),
        ...galleryImages.corporate.map(img => ({ ...img, category: 'corporate' })),
        ...galleryImages.dining.map(img => ({ ...img, category: 'dining' })),
        ...galleryImages.venues.map(img => ({ ...img, category: 'venues' }))
    ];

    // Filter images based on selected category
    const filteredImages = activeCategory === 'all'
        ? allImages
        : allImages.filter(image => image.category === activeCategory);

    // Video tours and highlight reels
    const videos = [
        {
            id: 1,
            title: "Venue Tour",
            thumbnail: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_194433.jpg",
            videoSrc: "https://res.cloudinary.com/dwd2dks0h/video/upload/v1759594855/Web_zsq9z3.mp4",
            description: "Take a virtual tour of our beautiful event spaces"
        },
    ];

    // Improved Carousel auto-play effect with transition handling
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
                setIsTransitioning(false);
            }, 50);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, carouselSlides.length]);

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

    // Improved manual slide navigation
    const goToSlide = (index: number) => {
        if (index === currentSlide) return;
        
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide(index);
            setIsTransitioning(false);
        }, 50);
        
        setIsAutoPlaying(false);
        // Resume auto-play after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % carouselSlides.length);
    };

    const prevSlide = () => {
        goToSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length);
    };

    // Open video modal
    const openVideoModal = (video: { src: string; title: string }) => {
        setSelectedVideo(video);
        document.body.style.overflow = 'hidden';
    };

    // Close video modal
    const closeVideoModal = () => {
        setSelectedVideo(null);
        document.body.style.overflow = 'auto';
    };

    // Open modal with selected image
    const openModal = (image: string, index: number) => {
        setSelectedImage(image);
        setCurrentIndex(index);
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    // Navigate to next image
    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(filteredImages[nextIndex].src);
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    };

    // Navigate to previous image
    const prevImage = () => {
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(filteredImages[prevIndex].src);
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
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
    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    // Handle mouse move for dragging
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoomLevel > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    // Handle mouse up for dragging
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === '+') zoomIn();
                if (e.key === '-') zoomOut();
                if (e.key === '0') resetZoom();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, currentIndex, zoomLevel]);

    return (
        <div className="relative min-h-screen bg-white">
            {/* Decorative repeating background — start after hero (matches Homepage/About) */}
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
                {/* Enhanced Carousel Hero Section */}
                <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
                    <div className="absolute inset-0">
                        {/* Carousel Container */}
                        <div className="relative w-full h-full">
                            {carouselSlides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                        index === currentSlide 
                                            ? 'opacity-100 transform translate-x-0' 
                                            : 'opacity-0 transform translate-x-4'
                                    } ${isTransitioning ? 'transition-opacity duration-700' : ''}`}
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
                                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-tight">
                                                {slide.title || "Our Gallery"}
                                            </h1>
                                            {/* <p className="text-xl md:text-2xl text-gold font-light mb-8 max-w-2xl mx-auto">
                                                {slide.description}
                                            </p> */}
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
                        {carouselSlides.map((_, index) => (
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

                {/* Enhanced Main Content Area */}
                <div className="relative">
                    {/* Enhanced Gallery Filter Section */}
                    <section className="py-16 relative overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full translate-x-1/3 translate-y-1/3"></div>
                        
                        <div className="container mx-auto px-6 relative z-10">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center justify-center mb-6">
                                    <div className="w-20 h-px bg-gold mr-4"></div>
                                    <span className="text-gold font-semibold tracking-widest text-sm uppercase">GALLERY</span>
                                    <div className="w-20 h-px bg-gold ml-4"></div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                    Explore Our Gallery
                                </h2>
                                <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
                                    Discover the beauty and elegance of our venues through stunning visuals
                                </p>
                            </div>

                            {/* Enhanced Filter Buttons */}
                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                                            activeCategory === category.id
                                            ? 'bg-gold text-white shadow-2xl -translate-y-1 border-2 border-gold'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg border-2 border-gray-200 hover:border-gold/30'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            {/* Enhanced Image Gallery */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredImages.map((image, index) => (
                                    <div
                                        key={image.id}
                                        className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                        onClick={() => openModal(image.src, index)}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                                            <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                                <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                                                <div className="w-12 h-px bg-gold mx-auto mb-2"></div>
                                                <p className="text-sm opacity-90 capitalize">{image.category}</p>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <span className="text-gold font-bold text-lg">+</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredImages.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 text-xl font-light">No images found in this category.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Enhanced Video Tours Section */}
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
                                    <span className="text-gold font-semibold tracking-widest text-sm uppercase">VIDEO TOURS</span>
                                    <div className="w-20 h-px bg-gold ml-4"></div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                    Video Tours & Highlights
                                </h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                                    Experience our venues through immersive video content and virtual tours
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {videos.map((video) => (
                                    <div key={video.id} className="group relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
                                        <div className="relative aspect-video bg-gray-200 overflow-hidden">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500 flex items-center justify-center">
                                                <div
                                                    className="w-20 h-20 bg-gold rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 shadow-2xl group-hover:shadow-3xl"
                                                    onClick={() => openVideoModal({ src: video.videoSrc, title: video.title })}
                                                >
                                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">{video.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{video.description}</p>
                                        </div>
                                        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gold/20 transition-all duration-300"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Enhanced CTA Section */}
                    <section className="py-24 relative overflow-hidden">
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
                                    <span className="text-black font-semibold tracking-widest text-sm uppercase">VISIT US</span>
                                    <div className="w-20 h-px bg-black ml-4"></div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif font-light text-black mb-6">
                                    Experience Our Venues in Person
                                </h2>
                                <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto font-light">
                                    Schedule a tour to see our beautiful spaces for yourself and create unforgettable memories
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <a href="/contact" className="bg-black text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
                                        Schedule a Tour
                                    </a>
                                    <a href="/venues" className="border-2 border-black text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white transform hover:scale-105">
                                        View Venues
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Enhanced Image Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <div
                            className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Enhanced Close button */}
                            <button
                                className="absolute top-6 right-6 z-10 text-white bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-gold transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                                onClick={closeModal}
                                aria-label="Close"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            
                            {/* Enhanced Navigation buttons */}
                            <button
                                className="absolute left-6 z-10 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-gold transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                                onClick={prevImage}
                                aria-label="Previous image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                className="absolute right-6 z-10 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-gold transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                                onClick={nextImage}
                                aria-label="Next image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Enhanced Zoom controls */}
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-3 bg-black/50 backdrop-blur-sm rounded-2xl p-3">
                                <button
                                    className="text-white bg-black/30 rounded-xl p-3 hover:bg-gold transition-all duration-300 hover:scale-110"
                                    onClick={zoomOut}
                                    aria-label="Zoom out"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>
                                <button
                                    className="text-white bg-black/30 rounded-xl p-3 hover:bg-gold transition-all duration-300 hover:scale-110 min-w-16"
                                    onClick={resetZoom}
                                    aria-label="Reset zoom"
                                >
                                    {Math.round(zoomLevel * 100)}%
                                </button>
                                <button
                                    className="text-white bg-black/30 rounded-xl p-3 hover:bg-gold transition-all duration-300 hover:scale-110"
                                    onClick={zoomIn}
                                    aria-label="Zoom in"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>

                            {/* Image with zoom and drag */}
                            <div
                                className="flex items-center justify-center w-full h-full"
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                            >
                                <img
                                    src={selectedImage}
                                    alt="Enlarged view"
                                    className="max-w-full max-h-full object-contain cursor-move transition-transform duration-200"
                                    style={{
                                        transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Enhanced Video Modal */}
                {selectedVideo && (
                    <div
                        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeVideoModal}
                    >
                        <div
                            className="relative max-w-6xl w-full flex flex-col items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Enhanced Close button */}
                            <button
                                className="absolute -top-16 right-0 z-10 text-white bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-gold transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                                onClick={closeVideoModal}
                                aria-label="Close"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 className="text-white text-3xl font-serif font-light mb-6 text-center">{selectedVideo.title}</h2>
                            <video
                                src={selectedVideo.src}
                                controls
                                autoPlay
                                className="w-full max-h-[70vh] rounded-2xl shadow-2xl border-2 border-gold/20"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;