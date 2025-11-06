"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import { getDining, DiningData } from '@/apirequests/dining';

// Add this type definition at the top
type MenuPopup = {
    title: string;
    description: string;
    images: string[];
};

type CateringOption = {
    title: string;
    description?: string;
    image: string;
    // optional per-image fit: 'contain' will use object-contain, otherwise object-cover
    fit?: 'contain' | 'cover';
};

type GalleryCarouselProps = {
    images: CateringOption[];
    itemsPerView?: number;
};

// Enhanced popup component
function MenuPopupModal({ isOpen, onClose, menuData }: { isOpen: boolean; onClose: () => void; menuData: MenuPopup | null }) {
    if (!isOpen || !menuData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/20">
                <div className="relative">
                    <button
                        className="absolute top-6 right-6 text-gray-600 hover:text-gold text-2xl font-bold z-10 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>

                    {/* Images Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                        {menuData.images.map((image, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-2xl">
                                <img
                                    src={image}
                                    alt={`${menuData.title} ${index + 1}`}
                                    className="w-full h-80 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="p-8 pt-4">
                        <div className="w-16 h-1 bg-gold mb-4"></div>
                        <h3 className="text-3xl font-serif font-light text-gray-800 mb-4">{menuData.title}</h3>
                        <p className="text-gray-700 leading-relaxed text-lg font-light">{menuData.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced Single Item Carousel
function SingleItemCarousel({ images }: { images: CateringOption[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Defensive: if there are no images, render a small placeholder and avoid accessing images[0]
    if (!images || images.length === 0) {
        return (
            <div className="w-full flex items-center justify-center p-8">
                <div className="text-gray-500">No images available</div>
            </div>
        );
    }

    const extendedImages = [...images, images[0]];

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => {
            if (prev === images.length - 1) {
                return prev + 1;
            } else if (prev === images.length) {
                setTimeout(() => {
                    setCurrentIndex(0);
                    setIsTransitioning(true);
                }, 50);
                return prev;
            }
            return prev + 1;
        });
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => {
            if (prev === 0) {
                return images.length - 1;
            }
            return prev - 1;
        });
    };

    const goToSlide = (index: number) => {
        setIsTransitioning(true);
        setCurrentIndex(index);
    };

    const displayIndex = currentIndex >= images.length ? 0 : currentIndex;

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
            <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl">
                <div
                    className={`flex transition-transform duration-700 ease-in-out ${isTransitioning ? '' : 'transition-none'}`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {extendedImages.map((item, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <div className="relative h-96 md:h-[40rem] rounded-3xl overflow-hidden mx-2">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className={`w-full h-full ${item.fit === 'contain' ? 'object-contain' : 'object-cover'} object-center transform hover:scale-105 transition-transform duration-1000`}
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Navigation Arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-4 rounded-full hover:bg-gold transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                    aria-label="Previous slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-4 rounded-full hover:bg-gold transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                    aria-label="Next slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Enhanced Carousel Indicators */}
            <div className="flex gap-4 mt-8">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                            idx === displayIndex
                                ? 'bg-gold scale-125 shadow-lg'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => goToSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

function GalleryCarousel({ images, itemsPerView = 1 }: GalleryCarouselProps) {
    if (itemsPerView === 1) {
        return <SingleItemCarousel images={images} />;
    }

    const [startIdx, setStartIdx] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        if (startIdx > images.length - itemsPerView) {
            setStartIdx(Math.max(0, images.length - itemsPerView));
        }
    }, [itemsPerView, images.length, startIdx]);

    useEffect(() => {
        if (images.length <= itemsPerView) return;
        const interval = setInterval(() => {
            setStartIdx(prev => {
                if (prev + itemsPerView >= images.length) {
                    return 0;
                }
                return prev + 1;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length, itemsPerView]);

    const nextSlide = () => {
        if (startIdx + itemsPerView < images.length) {
            setStartIdx(startIdx + 1);
        }
    };

    const prevSlide = () => {
        if (startIdx > 0) {
            setStartIdx(startIdx - 1);
        }
    };

    const visibleImages = images.slice(startIdx, startIdx + itemsPerView);

    const openModal = (idx: number) => {
        setActiveIdx(idx);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full max-w-7xl">
                {images.length > itemsPerView && (
                    <>
                        <button
                            onClick={prevSlide}
                            disabled={startIdx === 0}
                            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-4 rounded-full disabled:opacity-30 hover:bg-gold transition-all duration-300 hover:scale-110"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={startIdx + itemsPerView >= images.length}
                            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-4 rounded-full disabled:opacity-30 hover:bg-gold transition-all duration-300 hover:scale-110"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                <div className={`grid gap-8 ${itemsPerView === 3 ? 'grid-cols-1 lg:grid-cols-3' : itemsPerView === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {visibleImages.map((img, idx) => (
                        <div
                            key={startIdx + idx}
                            className="relative h-96 md:h-[32rem] transition-all duration-500 cursor-pointer group"
                            onClick={() => openModal(startIdx + idx)}
                        >
                            <img
                                src={img.image}
                                alt={img.title}
                                className={`w-full h-full ${img.fit === 'contain' ? 'object-contain' : 'object-cover'} object-center rounded-3xl group-hover:scale-110 transition-transform duration-700 shadow-2xl`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 mt-8">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            idx >= startIdx && idx < startIdx + itemsPerView
                                ? 'bg-gold scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => setStartIdx(Math.max(0, Math.min(idx, images.length - itemsPerView)))}
                        aria-label={`Show slide ${idx + 1}`}
                    />
                ))}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
                    <button
                        className="absolute top-8 right-8 text-white bg-black/50 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold hover:bg-gold transition-all duration-300 shadow-2xl hover:scale-110"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <div className="relative max-w-6xl max-h-full">
                        <img
                            src={images[activeIdx].image}
                            alt={images[activeIdx].title}
                            className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

const Dining = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [currentMenu, setCurrentMenu] = useState<MenuPopup | null>(null);
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);
    const [backgroundTop, setBackgroundTop] = useState<number | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    
    // State for dynamic data
    const [data, setData] = useState<DiningData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Decorative background image used on the Homepage
    const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getDining();
                
                if (response.ok && response.data) {
                    setData(response.data);
                } else {
                    throw new Error(response.error || 'Failed to load data');
                }
            } catch (err) {
                console.error('Error fetching dining data:', err);
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

    const menuData = {
        multiCuisine: {
            title: "Multi-Cuisine Restaurant",
            description: "",
            images: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            ]
        },
        american: {
            title: "American Menu",
            description: "",
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/American%201.jpg",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/American%202.jpg",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/American%203.jpg",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/American%204.jpg",
            ]
        },
        mexican: {
            title: "Mexican Menu",
            description: "Savor the spirited flavors of Mexico with hand-pressed tortillas, smoky moles, and fresh salsas. Every dish bursts with color, zest, and the joyful essence of fiesta dining.",
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Mexican%201.png",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Mexican%202.png",
            ]
        },
        italian: {
            title: "Italian Menu",
            description: "",
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Italian%201.png",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Italian%202.png",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Italian%203.png",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Italian%204.png"
            ]
        },
        indian: {
            title: "Indian Menu",
            description: "Immerse yourself in the vibrant spices and soulful traditions of India. From tandoori kebabs to fragrant biryanis and rich curries, every plate tells a story of heritage, color, and passion.",
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Indian%201.png",
            ]
        },
        middleEastern: {
            title: "Middle Eastern Menu",
            description: "Experience the exotic flavors and aromatic spices of the Middle East. Our menu features traditional dishes like hummus, falafel, shawarma, and kebabs, all prepared with authentic recipes and the finest ingredients.",
            images: [
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com-1565299585323-38174c13fae8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        },
        breakfast: {
            title: "Breakfast Menu",
            description: "Start your day with our delightful breakfast offerings featuring fresh pastries, hearty egg dishes, artisanal cereals, and premium coffee selections.",
            images: [
                "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        },
        lunch: {
            title: "Lunch Menu",
            description: "Enjoy a midday break with our carefully crafted lunch menu featuring fresh salads, gourmet sandwiches, daily specials, and light entrees.",
            images: [
                "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        },
        dinner: {
            title: "Dinner Menu",
            description: "Experience the elegance of our dinner service with premium cuts of meat, fresh seafood, seasonal vegetables, and decadent desserts.",
            images: [
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        },
        bar: {
            title: "Bar Menu",
            description: "Discover our extensive bar menu featuring handcrafted cocktails, premium spirits, fine wines, and local craft beers.",
            images: [
                "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        }
    };

    const openMenuPopup = (menuKey: keyof typeof menuData) => {
        setCurrentMenu(menuData[menuKey]);
        setPopupOpen(true);
    };

    const closeMenuPopup = () => {
        setPopupOpen(false);
        setCurrentMenu(null);
    };

    // Transform API data for components
    const cateringOptions = data?.catering_options?.map(option => ({
        title: option.title,
        image: option.image
    })) || [];

    const culinaryStoryCarousel = data?.culinary_story_carousel?.map(item => ({
        title: item.title,
        description: item.description,
        image: item.image
    })) || [];

    const restaurants = data?.restaurants_cards?.map(card => ({
        name: card.heading,
        cuisine: card.tagline,
        description: card.description,
        image: card.image,
        features: card.keypoints
    })) || [];

    const culinaryTeam = data?.culinary_excellence?.map(item => ({
        title: item.title,
        description: item.description,
        image: item.image
    })) || [];

    const cuisineCategories = data?.flavorful_voyage_cards?.map(card => ({
        title: card.heading,
        description: card.description,
        images: [card.image]
    })) || [];

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading dining content...</p>
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
            {/* Decorative repeating background — start after hero (matches Gallery component) */}
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
                {/* Menu Popup Modal */}
                <MenuPopupModal
                    isOpen={popupOpen}
                    onClose={closeMenuPopup}
                    menuData={currentMenu}
                />

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

                {/* Enhanced Culinary Story Section */}
                <section className="py-24 relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full translate-x-1/3 translate-y-1/3"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">CULINARY STORY</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-6">
                                {data.culinary_story_title}
                            </h2>
                            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed">
                                {data.culinary_story_description}
                            </p>
                        </div>

                        {/* Enhanced Culinary Story Carousel */}
                        <div className="mb-20">
                            <GalleryCarousel images={culinaryStoryCarousel} itemsPerView={1} />
                        </div>

                        {/* Enhanced Feature Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                            {data.culinary_story_features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
                                >
                                    <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                                        <div dangerouslySetInnerHTML={{ __html: feature.icon }} />
                                    </div>
                                    <h3 className="text-2xl font-serif font-light text-gray-800 mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed font-light">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Enhanced Flavorful Voyage Section */}
                        <div className="mb-20">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center justify-center mb-6">
                                    <div className="w-20 h-px bg-gold mr-4"></div>
                                    <span className="text-gold font-semibold tracking-widest text-sm uppercase">FLAVORFUL VOYAGE</span>
                                    <div className="w-20 h-px bg-gold ml-4"></div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                    {data.flavorful_voyage_title}
                                </h2>
                            </div>

                            {/* Enhanced Cuisine Categories Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                {cuisineCategories.map((category, index) => (
                                    <div
                                        key={index}
                                        className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2"
                                    >
                                        {/* Single Featured Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={category.images[0]}
                                                alt={category.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8">
                                            <h3 className="text-2xl font-serif font-light text-gold mb-4">{category.title}</h3>
                                            <p className="text-gray-600 leading-relaxed font-light mb-6">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Enhanced Additional Highlights - Now using the two-card structure */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.flavorful_voyage_second_cards.map((card, index) => (
                                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-500">
                                    <h4 className="text-xl font-serif font-light text-gray-800 mb-4">{card.title}</h4>
                                    <p className="text-gray-600 font-light">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced Restaurants Section */}
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
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">OUR RESTAURANTS</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                {data.restaurants_title}
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                                {data.restaurants_subtitle}
                            </p>
                        </div>

                        <div className="space-y-16">
                            {restaurants.map((restaurant, index) => (
                                <div
                                    key={index}
                                    className={`group flex flex-col lg:flex-row items-center bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} hover:-translate-y-2`}
                                >
                                    <div className="lg:w-1/2 w-full h-80 lg:h-96 flex-shrink-0 overflow-hidden">
                                        <img
                                            src={restaurant.image}
                                            alt={restaurant.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="lg:w-1/2 w-full p-8 lg:p-12">
                                        <h3 className="text-3xl font-serif font-light text-gray-800 mb-4">{restaurant.name}</h3>
                                        <p className="text-gold text-xl font-light mb-6">{restaurant.cuisine}</p>
                                        <p className="text-gray-600 mb-8 leading-relaxed text-lg font-light">{restaurant.description}</p>
                                        <ul className="flex flex-wrap gap-3 mb-8">
                                            {restaurant.features.map((feature, i) => (
                                                <li key={i} className="bg-gold/10 text-gold font-semibold px-4 py-2 rounded-full text-sm">
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced Culinary Excellence Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">CULINARY EXCELLENCE</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                Our Culinary Excellence
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                                Dedicated to quality, sustainability, and exceptional dining experiences
                            </p>
                        </div>
                        
                        <div className="space-y-16">
                            {/* Skilled Experts */}
                            {culinaryTeam.map((team, index) => (
                                <div 
                                    key={index}
                                    className={`group flex flex-col lg:flex-row items-center bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                                >
                                    <div className="lg:w-1/2 w-full h-80 lg:h-96 flex-shrink-0 overflow-hidden">
                                        <img
                                            src={team.image}
                                            alt={team.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="lg:w-1/2 w-full p-8 lg:p-12">
                                        <h3 className="text-3xl font-serif font-light text-gray-800 mb-6">{team.title}</h3>
                                        <p className="text-gray-600 text-lg leading-relaxed font-light">{team.description}</p>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Health & Safety */}
                            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
                                <h3 className="text-3xl font-serif font-light text-gray-800 mb-8">{data.culinary_excellence_second_title}</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.culinary_excellence_keypoints.map((point, idx) => (
                                        <li key={idx} className="flex items-start space-x-4 p-4 hover:bg-gold/5 rounded-2xl transition-colors duration-300">
                                            <div className="w-3 h-3 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-600 text-lg font-light">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dining;