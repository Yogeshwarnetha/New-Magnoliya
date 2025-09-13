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
    // Video modal state
    const [selectedVideo, setSelectedVideo] = useState<null | { src: string; title: string }>(null);

    // Gallery categories as mentioned in the PDF
    const categories = [
        { id: 'all', name: 'All Photos' },
        { id: 'weddings', name: 'Weddings' },
        { id: 'corporate', name: 'Corporate Events' },
        { id: 'dining', name: 'Dining' },
        { id: 'venues', name: 'Venues' }
    ];

    // Sample gallery images (replace with actual images from your Google Drive)
    const galleryImages = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "weddings",
            title: "Elegant Wedding Reception"
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "corporate",
            title: "Corporate Conference"
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "dining",
            title: "Fine Dining Experience"
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1549451378-6e2e2c1c3c5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "venues",
            title: "Garden Terrace"
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "venues",
            title: "Water View Lounge"
        },
        {
            id: 6,
            src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "weddings",
            title: "Grand Ballroom Wedding"
        },
        {
            id: 7,
            src: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "corporate",
            title: "Executive Meeting"
        },
        {
            id: 8,
            src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "dining",
            title: "Seafood Specialties"
        },
        {
            id: 9,
            src: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "venues",
            title: "Luxury Suite"
        },
        {
            id: 10,
            src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "weddings",
            title: "Cocktail Reception"
        },
        {
            id: 11,
            src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "corporate",
            title: "Award Ceremony"
        },
        {
            id: 12,
            src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            category: "dining",
            title: "Casual Dining"
        }
    ];

    // Filter images based on selected category
    const filteredImages = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(image => image.category === activeCategory);

    // Video tours and highlight reels (as mentioned in PDF)
    const videos = [
        {
            id: 1,
            title: "Venue Tour",
            thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            videoSrc: "https://res.cloudinary.com/dwd2dks0h/video/upload/Final_-_Trim_p8yxaf.mp4",
            description: "Take a virtual tour of our beautiful event spaces"
        },
        {
            id: 2,
            title: "Wedding Highlights",
            thumbnail: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
            description: "Beautiful moments from recent weddings"
        },
        {
            id: 3,
            title: "Corporate Events",
            thumbnail: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            videoSrc: "https://www.w3schools.com/html/movie.mp4",
            description: "Successful business gatherings at our venue"
        }
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
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Close modal
    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Enable scrolling
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
            <section className="relative h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Gallery"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Gallery</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
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
                                        <h3 className="font-semibold">{image.title}</h3>
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
                        {/* ...existing image modal controls and content... */}
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