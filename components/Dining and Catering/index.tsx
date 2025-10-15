"use client"
import Link from 'next/link';
import { useState, useEffect } from "react";

// Add this type definition at the top
type MenuPopup = {
    title: string;
    description: string;
    images: string[];
};

type CateringOption = {
    title: string;
    description: string;
    image: string;
};

type GalleryCarouselProps = {
    images: CateringOption[];
    itemsPerView?: number;
};

// Enhanced popup component
function MenuPopupModal({ isOpen, onClose, menuData }: { isOpen: boolean; onClose: () => void; menuData: MenuPopup | null }) {
    if (!isOpen || !menuData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-gold text-2xl font-bold z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>

                    {/* Images Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                        {menuData.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${menuData.title} ${index + 1}`}
                                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-0">
                        <h3 className="text-2xl font-serif font-bold text-gold mb-4">{menuData.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{menuData.description}</p>
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
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
                <div
                    className={`flex transition-transform duration-500 ease-in-out ${isTransitioning ? '' : 'transition-none'}`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {extendedImages.map((item, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden mx-2">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                                    <div className="p-8 text-white">
                                        <h3 className="text-3xl font-serif font-bold mb-3">{item.title}</h3>
                                        <p className="text-xl opacity-95 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
                    aria-label="Previous slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg"
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

            {/* Enhanced Slide Counter */}
            <div className="mt-4 text-gray-600 text-lg font-semibold bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                {displayIndex + 1} / {images.length}
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
            <div className="relative w-full max-w-6xl">
                {images.length > itemsPerView && (
                    <>
                        <button
                            onClick={prevSlide}
                            disabled={startIdx === 0}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm text-gray-800 p-3 rounded-full disabled:opacity-30 shadow-lg hover:bg-white transition-all duration-300"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={startIdx + itemsPerView >= images.length}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm text-gray-800 p-3 rounded-full disabled:opacity-30 shadow-lg hover:bg-white transition-all duration-300"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                <div className={`grid gap-6 ${itemsPerView === 3 ? 'grid-cols-1 lg:grid-cols-3' : itemsPerView === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {visibleImages.map((img, idx) => (
                        <div
                            key={startIdx + idx}
                            className="relative h-72 transition-all duration-300 cursor-pointer group"
                            onClick={() => openModal(startIdx + idx)}
                        >
                            <img
                                src={img.image}
                                alt={img.title}
                                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 shadow-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl font-semibold mb-2">{img.title}</h3>
                                    <p className="text-sm opacity-90">{img.description}</p>
                                </div>
                            </div>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4">
                    <button
                        className="absolute top-8 right-8 text-white bg-black/50 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold hover:bg-black/70 transition-all duration-300 shadow-lg"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <div className="relative max-w-4xl max-h-full">
                        <img
                            src={images[activeIdx].image}
                            alt={images[activeIdx].title}
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                            <h3 className="text-2xl font-semibold text-white mb-2">{images[activeIdx].title}</h3>
                            <p className="text-white/90">{images[activeIdx].description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const Dining = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [currentMenu, setCurrentMenu] = useState<MenuPopup | null>(null);

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

    const restaurants = [
        {
            name: "Magnoliya Multi Cuisine Restaurant",
            cuisine: "Fine Dining from Around the World",
            description: "Magnoliya Grand Multi Cuisine Restaurant offers fine dining from around the world in an elegant setting, making it a premier destination for beautiful events. Known for its diverse international menu including American, Mexican, Italian, Indian, and Middle Eastern food.",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Food.jpg",
            features: ["International Menu", "Elegant Setting", "Event Hosting"]
        },
        {
            name: "Garden and Grille Restaurant and Bar",
            cuisine: "Relaxed Yet Refined Dining",
            description: "Located within the Hilton Garden Inn, just steps away from our main venue, the Garden and Grille Restaurant and Bar has been serving hotel guests and local diners since its opening in 2020. Known for its relaxed yet refined atmosphere.",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/hilton-live-miami0j5a0151.avif",
            features: ["Freshly Prepared Dishes", "Handcrafted Cocktails", "Casual Atmosphere"]
        }
    ];

    const cateringOptions = [
        {
            title: "Indoor Catering",
            description: "Elegant plated dinners in our beautiful ballrooms with customizable menus and professional service.",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Cat1.jpg"
        },
        {
            title: "Outdoor Catering",
            description: "Romantic sunset receptions on our waterfront terrace with scenic views and ambient lighting.",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Food.jpg"
        },
        {
            title: "Garden Catering (Coming Soon)",
            description: "Truly unforgettable gatherings in our beautifully designed garden with natural surroundings.",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Cat2.jpg"
        },
        {
            title: "Corporate Events",
            description: "Professional catering services for business meetings and corporate gatherings.",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/R6II6815.jpg"
        },
        {
            title: "Wedding Receptions",
            description: "Custom menus and impeccable service for your special day.",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Cat3.jpg"
        }
    ];

    const culinaryTeam = [
        {
            title: "Skilled Experts",
            description: "Our culinary team is led by a high quality chef whose expertise extends far beyond regional specialties. With a mastery of Italian, Mexican, Middle Eastern, and a wide variety of global cuisines.",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/image%20(1).png"
        },
        {
            title: "Sustainability",
            description: "Our food and beverage team is central to our commitment to sustainability. In our on-site kitchens, all food scraps are composted, and we work closely with community partners.",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Health & Safety",
            description: "Comprehensive health and safety training programs for all team members. Enhanced protective measures, including additional PPE and an extended glove policy. Rigorous kitchen sanitation protocols with scheduled cleaning and disinfection. Menus thoughtfully designed with modern hygiene and safety standards in mind.",
            image: "https://images.unsplash.com/photo-1585513360126-ec5c22663f6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Menu Popup Modal */}
            <MenuPopupModal
                isOpen={popupOpen}
                onClose={closeMenuPopup}
                menuData={currentMenu}
            />

            {/* Banner Section - Kept as requested */}
            <section className="relative h-[32rem] overflow-hidden">
                <img
                    src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FoodBeveragesHeroBanner.jpg"
                    alt="Event Venue"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Food & Beverages.</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            Exceptional culinary experiences crafted by our award-winning chefs
                        </p>
                    </div>
                </div>
            </section>

            {/* Enhanced Culinary Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">Our Culinary Story</h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            At Magnoliya Grand, dining becomes an art form where global flavors meet refined craftsmanship. Every dish tells a story of passion, culture, and creativity—transforming each meal into an unforgettable sensory journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-serif font-semibold mb-4 text-gray-800">Meet Our Culinary Maestros</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Led by our esteemed Maestros, our international chefs redefine culinary excellence. Their artistry blends technique and imagination, creating menus that inspire and delight with every bite.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-serif font-semibold mb-4 text-gray-800">Our Core Values</h3>
                            <p className="text-gray-600 leading-relaxed">
                                At Magnoliya Grand, our cuisine begins with integrity—fresh, authentic, and sustainably sourced ingredients. With inclusive menus for every palate, we serve hospitality that is as thoughtful as it is extraordinary.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-serif font-semibold mb-4 text-gray-800">The Guest Experience</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Dining at Magnoliya Grand is an experience of comfort, luxury, and connection. Whether an intimate dinner or a grand celebration, every moment is designed to delight and inspire.
                            </p>
                        </div>
                    </div>

                    {/* Enhanced Flavorful Voyage Section */}
                    <div className="bg-gradient-to-r from-gold/5 to-transparent rounded-3xl p-8 mb-16 border border-gold/10">
                        <h3 className="text-3xl font-serif font-bold text-gray-800 mb-6 text-center">Our Flavorful Voyage — Multi-Cuisine Dining</h3>
                        <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto text-lg">
                            Embark on a global journey where the world's finest cuisines unite under one roof. From Asian stir-fries to Mediterranean mezze and continental grills, each dish is crafted with artistry, authenticity, and flair.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <h4 className="text-xl font-serif font-semibold mb-3 text-gold">Italian</h4>
                                <p className="text-gray-600 leading-relaxed">Experience the romance of Italy through velvety pastas, wood-fired pizzas, and classic tiramisu. Paired with fine wines and warm hospitality, every bite captures the essence of la dolce vita.</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <h4 className="text-xl font-serif font-semibold mb-3 text-gold">American</h4>
                                <p className="text-gray-600 leading-relaxed">Celebrate the bold spirit of American cuisine with smoky barbecues, gourmet burgers, and comforting classics. Each dish honors tradition while delivering modern flavor and generous warmth.</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <h4 className="text-xl font-serif font-semibold mb-3 text-gold">Indian</h4>
                                <p className="text-gray-600 leading-relaxed">Immerse yourself in the vibrant spices and soulful traditions of India. From tandoori kebabs to fragrant biryanis and rich curries, every plate tells a story of heritage, color, and passion.</p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <h4 className="text-xl font-serif font-semibold mb-3 text-gold">Mexican</h4>
                                <p className="text-gray-600 leading-relaxed">Savor the spirited flavors of Mexico with hand-pressed tortillas, smoky moles, and fresh salsas. Every dish bursts with color, zest, and the joyful essence of fiesta dining.</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6">
                            <h4 className="text-lg font-semibold mb-3 text-gray-800">Desserts</h4>
                            <p className="text-gray-600">End your journey on a sweet note with confections that enchant the senses. From molten chocolate cakes to French macarons and classic tiramisu.</p>
                        </div>
                        <div className="text-center p-6">
                            <h4 className="text-lg font-semibold mb-3 text-gray-800">Catering & Celebrations</h4>
                            <p className="text-gray-600">Through CGA Catering New York, we bring world-class cuisine to events of every scale. From elegant weddings to corporate galas.</p>
                        </div>
                        <div className="text-center p-6">
                            <h4 className="text-lg font-semibold mb-3 text-gray-800">Beyond the Plate</h4>
                            <p className="text-gray-600">At Magnoliya Grand, food becomes storytelling, artistry, and emotion. Every detail is crafted to create lasting memories beyond the table.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Restaurants Section - Kept as requested */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">Our Restaurants</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our diverse culinary venues, each offering a unique atmosphere and exquisite flavors
                        </p>
                    </div>

                    <div className="space-y-16">
                        {restaurants.map((restaurant, index) => (
                            <div
                                key={index}
                                className={`flex flex-col lg:flex-row items-center bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className="lg:w-1/2 w-full h-80 lg:h-96 flex-shrink-0">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="lg:w-1/2 w-full p-8 lg:p-12">
                                    <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-4 text-gray-800">{restaurant.name}</h3>
                                    <p className="text-gold text-lg font-semibold mb-4">{restaurant.cuisine}</p>
                                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">{restaurant.description}</p>
                                    <ul className="flex flex-wrap gap-3 mb-8">
                                        {restaurant.features.map((feature, i) => (
                                            <li key={i} className="bg-gold/10 text-gold font-semibold px-4 py-2 rounded-full text-sm">
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/reservations" className="inline-flex items-center bg-gold text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-gold-dark hover:shadow-lg">
                                        Make Reservation
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Indoor and Outdoor Catering Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">Indoor and Outdoor Catering</h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            We provide an array of unique settings for both indoor and outdoor dining. Imagine hosting an elegant plated dinner in one of our ballrooms, a romantic sunset reception on the waterfront terrace, or—coming soon—a truly unforgettable gathering in our beautifully designed garden.
                        </p>
                    </div>
                    <GalleryCarousel images={cateringOptions} itemsPerView={1} />
                </div>
            </section>

            {/* Our Culinary Excellence Section - Kept as requested */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">Our Culinary Excellence</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Dedicated to quality, sustainability, and exceptional dining experiences
                        </p>
                    </div>
                    <div className="space-y-16">
                        {/* Skilled Experts */}
                        <div className="flex flex-col lg:flex-row items-center bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <div className="lg:w-1/2 w-full h-80 lg:h-96 flex-shrink-0">
                                <img
                                    src={culinaryTeam[0].image}
                                    alt={culinaryTeam[0].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="lg:w-1/2 w-full p-8 lg:p-12">
                                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-gray-800 mb-6">{culinaryTeam[0].title}</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">{culinaryTeam[0].description}</p>
                            </div>
                        </div>
                        {/* Sustainability */}
                        <div className="flex flex-col lg:flex-row-reverse items-center bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <div className="lg:w-1/2 w-full h-80 lg:h-96 flex-shrink-0">
                                <img
                                    src={culinaryTeam[1].image}
                                    alt={culinaryTeam[1].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="lg:w-1/2 w-full p-8 lg:p-12">
                                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-gray-800 mb-6">{culinaryTeam[1].title}</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">{culinaryTeam[1].description}</p>
                            </div>
                        </div>
                        {/* Health & Safety */}
                        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
                            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-gray-800 mb-8">{culinaryTeam[2].title}</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {culinaryTeam[2].description.split('.').filter((point: string) => Boolean(point.trim())).map((point: string, idx: number) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-gray-600 text-lg">{point.trim()}{point.trim().endsWith('.') ? '' : '.'}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Menu Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">Our Catering Menus</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our diverse menu options for your next event
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                            <h3 className="text-2xl font-serif font-bold mb-6 text-gold">Magnoliya Multi Cuisine Restaurant</h3>
                            <div className="space-y-4">
                                {['american', 'mexican', 'italian', 'indian', 'middleEastern'].map((menuKey) => (
                                    <button
                                        key={menuKey}
                                        onClick={() => openMenuPopup(menuKey as keyof typeof menuData)}
                                        className="w-full text-left p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gold hover:text-white border border-gray-200 hover:border-gold group"
                                    >
                                        <span className="text-lg font-semibold group-hover:text-white">
                                            {menuData[menuKey as keyof typeof menuData].title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                            <h3 className="text-2xl font-serif font-bold mb-6 text-gold">Garden and Grille Restaurant and Bar</h3>
                            <div className="space-y-4">
                                {['breakfast', 'lunch', 'dinner', 'bar'].map((menuKey) => (
                                    <button
                                        key={menuKey}
                                        onClick={() => openMenuPopup(menuKey as keyof typeof menuData)}
                                        className="w-full text-left p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gold hover:text-white border border-gray-200 hover:border-gold group"
                                    >
                                        <span className="text-lg font-semibold group-hover:text-white">
                                            {menuData[menuKey as keyof typeof menuData].title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* 360° Tours Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">360° Venue Tours</h2>

                    <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Explore our spaces with interactive 360° tours. Use touch or mouse to look around, and open fullscreen from the tour controls.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                            <div className="w-full aspect-[16/9] bg-black">
                                <iframe
                                    title="360 Tour Collection 7J4X8"
                                    src="https://kuula.co/share/collection/7J4X8?logo=0&info=1&fs=1&vr=1&sd=1&thumbs=1"
                                    allowFullScreen
                                    loading="lazy"
                                    className="w-full h-full border-0"
                                />
                            </div>
                            
                        </div>

                        <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                            <div className="w-full aspect-[16/9] bg-black">
                                <iframe
                                    title="360 Tour Collection 7J4Ft"
                                    src="https://kuula.co/share/collection/7J4Ft?logo=0&info=0&fs=1&vr=0&thumbs=1"
                                    allowFullScreen
                                    loading="lazy"
                                    className="w-full h-full border-0"
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="py-20 bg-gradient-to-br from-gold to-gold-dark">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">Reserve Your Table</h2>
                    <p className="text-xl text-black/90 mb-10 max-w-3xl mx-auto">
                        Experience culinary excellence at Magnoliya Grand's award-winning restaurants
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/reservations" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                            Make a Reservation
                        </Link>
                        <Link href="/contact" className="border-2 border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white transform hover:-translate-y-1">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dining;