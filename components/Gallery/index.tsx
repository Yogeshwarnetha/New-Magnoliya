"use client";
import { useState, useEffect } from 'react';

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [selectedVideo, setSelectedVideo] = useState<null | { src: string; title: string }>(null);

    // Gallery categories
    const categories = [
        { id: 'all', name: 'All Photos' },
        { id: 'weddings', name: 'Weddings' },
        { id: 'corporate', name: 'Corporate Events' },
        { id: 'dining', name: 'Dining' },
        { id: 'venues', name: 'Venues' }
    ];

    // Category-wise organized images
    const galleryImages = {
        weddings: [
            { id: 1, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_171410.jpg", title: "Elegant Wedding Reception" },
            { id: 2, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_171510.jpg", title: "Grand Ballroom Wedding" },
            { id: 3, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_171519.jpg", title: "Outdoor Wedding Ceremony" },
            { id: 4, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_171749.jpg", title: "Wedding Cake Celebration" },
            { id: 5, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_171841.jpg", title: "Cocktail Reception" },
            { id: 6, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_171519.jpg", title: "Wedding Decor" },
            { id: 7, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_171525.jpg", title: "Bridal Party" },
            { id: 8, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_171742.jpg", title: "Reception Dinner" },
            { id: 9, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_173043.jpg", title: "Wedding Dance" },
            { id: 10, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_173103.jpg", title: "Bridal Preparation" },
            // { id: 61, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_173648.jpg", title: "Wedding Decor" },
            // { id: 62, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_171847.jpg", title: "Bridal Party" },
            // { id: 63, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_172041.jpg", title: "Reception Dinner" },
            // { id: 64, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_174321.jpg", title: "Wedding Dance" },
            // { id: 65, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_174330.jpg", title: "Bridal Preparation" },
            // { id: 66, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_174756.jpg", title: "Wedding Dance" },
            // { id: 67, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_185400.jpg", title: "Bridal Preparation" },
            // { id: 68, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_184113.jpg", title: "Wedding Dance" },
            // { id: 69, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_192517.jpg", title: "Bridal Preparation" },
            // { id: 70, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_185206.jpg", title: "Wedding Dance" },
            // { id: 71, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_190316.jpg", title: "Bridal Preparation" },
            // { id: 72, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_183915.jpg", title: "Wedding Dance" },
            // { id: 73, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_194433.jpg", title: "Bridal Preparation" },
            // { id: 74, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_193110.jpg", title: "Wedding Dance" },
            // { id: 75, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/DSC_0220.JPG", title: "Bridal Preparation" },
            // { id: 76, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/DSC_0233.JPG", title: "Wedding Dance" },
            // { id: 77, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/DSC_0235.JPG", title: "Bridal Preparation" },
            // { id: 78, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/DSC_0228.JPG", title: "Wedding Dance" },
            // { id: 79, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/DSC_0237.JPG", title: "Bridal Preparation" },
            // { id: 80, src: "https://pub-529898d7b434445e9797bf8fec46d127.r2.dev/20250913_195507.jpg", title: "Wedding Dance" }
        ],
        corporate: [
            { id: 11, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/WhatsApp%20Image%202025-10-08%20at%2009.40.09_2f5aa1ef.jpg", title: "Corporate Conference" },
            { id: 12, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/WhatsApp%20Image%202025-10-08%20at%2009.41.11_9e1fa16c.jpg", title: "Executive Meeting" },
            { id: 13, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/WhatsApp%20Image%202025-10-08%20at%2009.41.25_408b6bf0.jpg", title: "Award Ceremony" },
            { id: 14, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/WhatsApp%20Image%202025-10-08%20at%2009.41.49_9366c702.jpg", title: "Business Seminar" },

        ],
        dining: [
            { id: 21, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0276.JPG", title: "Fine Dining Experience" },
            { id: 22, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_192702.jpg", title: "Seafood Specialties" },
            { id: 23, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_201602.jpg", title: "Casual Dining" },
            { id: 24, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_200319.jpg", title: "Gourmet Cuisine" },
            { id: 25, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_193112.jpg", title: "Buffet Setup" },
            { id: 26, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0296.JPG", title: "Wine Pairing" },
            { id: 27, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_194806.jpg", title: "Restaurant Interior" },
            { id: 28, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_194818.jpg", title: "Dessert Display" },
            { id: 29, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_194926.jpg", title: "Private Dining" },
            { id: 30, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0307.JPG", title: "Chef's Special" },
            // { id: 31, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_195005.jpg", title: "Breakfast Service" },
            // { id: 32, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_194932.jpg", title: "Lunch Menu" },
            // { id: 33, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0302.JPG", title: "Dinner Service" },
            // { id: 34, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_195318.jpg", title: "Bar Area" },
            // { id: 35, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_195334.jpg", title: "Outdoor Dining" },
            // { id: 36, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0362.JPG", title: "Table Setting" },
            // { id: 37, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0364.JPG", title: "Catering Service" },
            // { id: 38, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0361.JPG", title: "Beverage Station" },
            // { id: 39, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0360.JPG", title: "Fine Dining Setup" },
            // { id: 40, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0375.JPG", title: "Restaurant View" },
            // { id: 51, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0386.JPG", title: "Restaurant View" },
            // { id: 52, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0304.JPG", title: "Restaurant View" },
            // { id: 52, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0387.JPG", title: "Restaurant View" },
            // { id: 53, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0346.JPG", title: "Restaurant View" },
            // { id: 54, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_210347.jpg", title: "Restaurant View" },
            // { id: 55, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_205936.jpg", title: "Restaurant View" },
            // { id: 56, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_195318.jpg", title: "Restaurant View" },
            // { id: 57, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_195034.jpg", title: "Restaurant View" },
            // { id: 58, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_194932.jpg", title: "Restaurant View" },
            // { id: 59, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/20250831_195318.jpg", title: "Restaurant View" },
            // { id: 60, src: "https://pub-837447cab048469baef2e30fbd0a9877.r2.dev/DSC_0392.JPG", title: "Restaurant View" }


        ],
        venues: [
            { id: 41, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg", title: "Garden Terrace" },
            { id: 42, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FrontPre.jpg", title: "Water View Lounge" },
            { id: 43, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Left.jpg", title: "Luxury Suite" },
            { id: 44, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Back.jpg", title: "Grand Ballroom" },
            { id: 45, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/LakeView.jpg", title: "Conference Hall" },
            { id: 46, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Kwaza%20hall.jpg", title: "Outdoor Venue" },
            { id: 47, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Liberty%20Hall.jpg", title: "Poolside Area" },
            { id: 48, src: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Lake%20Side.jpg", title: "Executive Lounge" },

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
        // {
        //     id: 2,
        //     title: "Wedding Highlights",
        //     thumbnail: "w=800&q=80",
        //     videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
        //     description: "Beautiful moments from recent weddings"
        // },
        // {
        //     id: 3,
        //     title: "Corporate Events",
        //     thumbnail: "w=800&q=80",
        //     videoSrc: "https://www.w3schools.com/html/movie.mp4",
        //     description: "Successful business gatherings at our venue"
        // }
    ];

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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
                <img
                    src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg"
                    alt="Gallery"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4">Gallery</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Explore our beautiful venues and memorable events
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Filter */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category.id
                                    ? 'bg-gold text-white shadow-lg transform -translate-y-1'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredImages.map((image, index) => (
                            <div
                                key={image.id}
                                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                                onClick={() => openModal(image.src, index)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                                    <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {/* <h3 className="font-semibold">{image.title}</h3> */}
                                        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 capitalize">
                                            {image.category}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredImages.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">No images found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Video Tours Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Video Tours & Highlights</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience our venues through immersive video content
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {videos.map((video) => (
                            <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="relative aspect-video bg-gray-200">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className="w-16 h-16 bg-gold rounded-full flex items-center justify-center cursor-pointer"
                                            onClick={() => openVideoModal({ src: video.videoSrc, title: video.title })}
                                        >
                                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h3>
                                    <p className="text-gray-600">{video.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Experience Our Venues in Person</h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        Schedule a tour to see our beautiful spaces for yourself
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/contact" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl">
                            Schedule a Tour
                        </a>
                        <a href="/venues" className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                            View Venues
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
    );
};

export default Gallery;