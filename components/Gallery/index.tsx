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
            description: "Elegant space for weddings and corporate events"
        },
        {
            id: 2,
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FrontPre.jpg",
            description: "Stunning waterfront views and premium amenities"
        },
        {
            id: 3,
            image: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/WaterViewGarden.png",
            title: "Garden Venue",
            description: "Beautiful outdoor settings for memorable events"
        },
        {
            id: 4,
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Kwaza%20hall.jpg",
            title: "Conference Hall",
            description: "Professional spaces for business gatherings"
        }
    ];

    // Category-wise organized images
    const galleryImages = {
        weddings: [
            { id: 1, src: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/LibertyBallroom_Picture.jpg", title: "Elegant Wedding Reception" },
            { id: 9, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_173043.jpg", title: "Wedding Dance" },
            { id: 64, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_174321.jpg", title: "Wedding Dance" },
            { id: 66, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_174756.jpg", title: "Wedding Dance" },
            { id: 71, src: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/WaterViewGarden.png", title: "Bridal Preparation" },
            { id: 73, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_194433.jpg", title: "Bridal Preparation" },
            { id: 75, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/DSC_0220.JPG", title: "Bridal Preparation" },
        ],
        corporate: [
            { id: 11, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/WhatsApp%20Image%202025-10-08%20at%2009.40.09_2f5aa1ef.jpg", title: "Corporate Conference" },
            { id: 13, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/WhatsApp%20Image%202025-10-08%20at%2009.41.25_408b6bf0.jpg", title: "Award Ceremony" },
        ],
        dining: [
            { id: 23, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_201602.jpg", title: "Casual Dining" },
        ],
        venues: [
            { id: 41, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg", title: "Garden Terrace" },
            { id: 42, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FrontPre.jpg", title: "Water View Lounge" },
            { id: 43, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Left.jpg", title: "Luxury Suite" },
            { id: 44, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Back.jpg", title: "Grand Ballroom" },
            { id: 46, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Kwaza%20hall.jpg", title: "Outdoor Venue" },
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

    // Carousel auto-play effect
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
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

    // Manual slide navigation
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
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
        <div className="relative min-h-screen">
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
                {/* Carousel Hero Section - DECREASED HEIGHT */}
                <section ref={heroRef} className="relative h-[40vh] md:h-[45vh] lg:h-[50vh] overflow-hidden">
                    {/* Carousel Container */}
                    <div className="relative w-full h-full">
                        {carouselSlides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title || slide.description}
                                    className="w-full h-full object-cover"
                                />
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                                
                                {/* Slide content */}
                                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                                    <div className="px-4 max-w-4xl">
                                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-3">
                                            {slide.title || "Our Gallery"}
                                        </h1>
                                        <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Navigation */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 md:p-3 hover:bg-opacity-70 transition-all duration-300 z-20"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 md:p-3 hover:bg-opacity-70 transition-all duration-300 z-20"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Carousel Indicators */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                        {carouselSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                    index === currentSlide 
                                    ? 'bg-gold scale-125' 
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-70'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </section>

                {/* Main Content Area with Visible Background */}
                <div className="relative">
                    {/* Gallery Filter */}
                    <section className="py-8">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap justify-center gap-3 mb-6">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-full font-medium transition-all duration-300 ${
                                            activeCategory === category.id
                                            ? 'bg-gold text-white shadow-lg transform -translate-y-1'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            {/* Image Gallery */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                                {filteredImages.map((image, index) => (
                                    <div
                                        key={image.id}
                                        className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                                        onClick={() => openModal(image.src, index)}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
                                            <div className="p-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 capitalize">
                                                    {image.category}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredImages.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-600 text-lg">No images found in this category.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Video Tours Section */}
                    <section className="py-12 bg-transparent">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-3">Video Tours & Highlights</h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                    Experience our venues through immersive video content
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {videos.map((video) => (
                                    <div key={video.id} className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                        <div className="relative aspect-video bg-gray-200">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div
                                                    className="w-14 h-14 bg-gold rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                                                    onClick={() => openVideoModal({ src: video.videoSrc, title: video.title })}
                                                >
                                                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{video.title}</h3>
                                            <p className="text-gray-600 text-sm md:text-base">{video.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-12">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-2xl md:text-3xl font-serif text-black mb-4">Experience Our Venues in Person</h2>
                            <p className="text-lg text-black mb-8 max-w-3xl mx-auto">
                                Schedule a tour to see our beautiful spaces for yourself
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-3">
                                <a href="/contact" className="bg-black text-white font-semibold py-2 px-6 md:py-3 md:px-8 rounded-lg transition-all duration-300 hover:shadow-2xl text-sm md:text-base">
                                    Schedule a Tour
                                </a>
                                <a href="/venues" className="border border-black text-black font-semibold py-2 px-6 md:py-3 md:px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white text-sm md:text-base">
                                    View Venues
                                </a>
                            </div>
                        </div>
                    </section>
                </div>

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
                            {/* Navigation buttons */}
                            <button
                                className="absolute left-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all duration-300"
                                onClick={prevImage}
                                aria-label="Previous image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                className="absolute right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all duration-300"
                                onClick={nextImage}
                                aria-label="Next image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Zoom controls */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
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
                                    {Math.round(zoomLevel * 100)}%
                                </button>
                                <button
                                    className="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-300"
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

                {/* Video Modal */}
                {selectedVideo && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                        onClick={closeVideoModal}
                    >
                        <div
                            className="relative max-w-4xl w-full flex flex-col items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all duration-300"
                                onClick={closeVideoModal}
                                aria-label="Close"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 className="text-white text-2xl mb-4">{selectedVideo.title}</h2>
                            <video
                                src={selectedVideo.src}
                                controls
                                autoPlay
                                className="w-full max-h-[70vh] rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;