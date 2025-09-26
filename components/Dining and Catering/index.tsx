"use client"
import Link from 'next/link';
import { useState, useEffect } from "react";

type CateringOption = {
    title: string;
    description: string;
    image: string;
};

type GalleryCarouselProps = {
    images: CateringOption[];
    itemsPerView?: number;
};

function GalleryCarousel({ images, itemsPerView = 3 }: GalleryCarouselProps) {
    const [startIdx, setStartIdx] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        // Ensure we don't go out of bounds
        if (startIdx > images.length - itemsPerView) {
            setStartIdx(Math.max(0, images.length - itemsPerView));
        }
    }, [itemsPerView, images.length, startIdx]);

    // Auto-scroll effect
    useEffect(() => {
        if (images.length <= itemsPerView) return;
        const interval = setInterval(() => {
            setStartIdx(prev => {
                if (prev + itemsPerView >= images.length) {
                    return 0;
                }
                return prev + 1;
            });
        }, 3000); // 3 seconds
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
            <div className="relative w-full max-w-4xl">
                {/* Navigation arrows */}
                {images.length > itemsPerView && (
                    <>
                        <button
                            onClick={prevSlide}
                            disabled={startIdx === 0}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full disabled:opacity-30"
                            aria-label="Previous slide"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={startIdx + itemsPerView >= images.length}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full disabled:opacity-30"
                            aria-label="Next slide"
                        >
                            &gt;
                        </button>
                    </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {visibleImages.map((img, idx) => (
                        <div
                            key={startIdx + idx}
                            className="relative h-64 transition-all duration-300 cursor-pointer"
                            onClick={() => openModal(startIdx + idx)}
                        >
                            <img
                                src={img.image}
                                alt={img.title}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Carousel controls */}
            <div className="flex gap-3 mt-6">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-4 h-4 rounded-full border-2 ${idx >= startIdx && idx < startIdx + itemsPerView ? 'bg-gold border-gold' : 'bg-gray-200 border-gray-400'}`}
                        onClick={() => setStartIdx(Math.max(0, Math.min(idx, images.length - itemsPerView)))}
                        aria-label={`Show slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Modal for large image */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                    <button
                        className="absolute top-8 right-8 text-white bg-black bg-opacity-60 rounded-full px-4 py-2 text-2xl font-bold hover:bg-opacity-80"
                        onClick={closeModal}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <img
                        src={images[activeIdx].image}
                        alt={images[activeIdx].title}
                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    />
                </div>
            )}
        </div>
    );
}

const Dining = () => {
    const restaurants = [
        {
            name: "Magnoliya Multi Cuisine Restaurant",
            cuisine: "Fine Dining from Around the World",
            description: "Magnoliya Grand Multi Cuisine Restaurant offers fine dining from around the world in an elegant setting, making it a premier destination for beautiful events. Known for its diverse international menu including American, Mexican, Italian, Indian, and Middle Eastern food.",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            features: ["International Menu", "Elegant Setting", "Event Hosting"]
        },
        {
            name: "Garden and Grille Restaurant and Bar",
            cuisine: "Relaxed Yet Refined Dining",
            description: "Located within the Hilton Garden Inn, just steps away from our main venue, the Garden and Grille Restaurant and Bar has been serving hotel guests and local diners since its opening in 2020. Known for its relaxed yet refined atmosphere.",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            features: ["Freshly Prepared Dishes", "Handcrafted Cocktails", "Casual Atmosphere"]
        }
    ];

    const cateringOptions = [
        {
            title: "Indoor Catering",
            description: "Elegant plated dinners in our beautiful ballrooms with customizable menus and professional service.",
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Outdoor Catering",
            description: "Romantic sunset receptions on our waterfront terrace with scenic views and ambient lighting.",
            image: "https://images.unsplash.com/photo-1549451378-6e2e2c1c3c5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Garden Catering (Coming Soon)",
            description: "Truly unforgettable gatherings in our beautifully designed garden with natural surroundings.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Corporate Events",
            description: "Professional catering services for business meetings and corporate gatherings.",
            image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Wedding Receptions",
            description: "Custom menus and impeccable service for your special day.",
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Slideshow */}
            <section className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Dining & Catering</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            Exceptional culinary experiences crafted by our award-winning chefs
                        </p>
                    </div>
                </div>
            </section>

            {/* Restaurants Section - Zig Zag */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Our Restaurants</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our diverse culinary venues, each offering a unique atmosphere and exquisite flavors
                        </p>
                    </div>

                    <div className="space-y-12">
                        {restaurants.map((restaurant, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Image Section */}
                                <div className="md:w-1/2 w-full h-64 md:h-80 flex-shrink-0">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Content Section */}
                                <div className="md:w-1/2 w-full p-6">
                                    <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                                    <p className="text-gold mb-2 font-medium">{restaurant.cuisine}</p>
                                    <p className="text-gray-600 mb-4">{restaurant.description}</p>
                                    <ul className="flex flex-wrap gap-2 mb-6">
                                        {restaurant.features.map((feature, i) => (
                                            <li key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/reservations" className="text-gold font-medium hover:text-gold-dark transition-colors duration-300 flex items-center">
                                        Make Reservation
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Indoor and Outdoor Catering Gallery Carousel */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Indoor and Outdoor Catering</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide an array of unique settings for both indoor and outdoor dining. Imagine hosting an elegant plated dinner in one of our ballrooms, a romantic sunset reception on the waterfront terrace, or—coming soon—a truly unforgettable gathering in our beautifully designed garden. Whatever the occasion, we'll work with you to create the perfect atmosphere.
                        </p>
                    </div>
                    <GalleryCarousel images={cateringOptions} itemsPerView={3} />
                </div>
            </section>

            {/* Culinary Team - Zig Zag & Keypoints */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Our Culinary Excellence</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Dedicated to quality, sustainability, and exceptional dining experiences
                        </p>
                    </div>
                    <div className="space-y-12">
                        {/* Skilled Experts (image left, content right) */}
                        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl overflow-hidden">
                            <div className="md:w-1/2 w-full h-64 md:h-80 flex-shrink-0">
                                <img
                                    src={culinaryTeam[0].image}
                                    alt={culinaryTeam[0].title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="md:w-1/2 w-full p-6">
                                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">{culinaryTeam[0].title}</h3>
                                <p className="text-gray-600">{culinaryTeam[0].description}</p>
                            </div>
                        </div>
                        {/* Sustainability (image right, content left) */}
                        <div className="flex flex-col items-center bg-white rounded-xl overflow-hidden md:flex-row-reverse">
                            <div className="md:w-1/2 w-full h-64 md:h-80 flex-shrink-0">
                                <img
                                    src={culinaryTeam[1].image}
                                    alt={culinaryTeam[1].title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="md:w-1/2 w-full p-6">
                                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">{culinaryTeam[1].title}</h3>
                                <p className="text-gray-600">{culinaryTeam[1].description}</p>
                            </div>
                        </div>
                        {/* Health & Safety (keypoints, no image) */}
                        <div className="bg-white rounded-xl p-6">
                            <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">{culinaryTeam[2].title}</h3>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                {culinaryTeam[2].description.split('.').filter((point: string) => Boolean(point)).map((point: string, idx: number) => (
                                    <li key={idx}>{point.trim()}{point.trim().endsWith('.') ? '' : '.'}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Our Catering Menus</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our diverse menu options for your next event
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gold">Magnoliya Multi Cuisine Restaurant</h3>
                            <div className="space-y-4">
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    American Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Mexican Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Italian Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Indian Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Middle Eastern Menu
                                </a>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gold">Garden and Grille Restaurant and Bar</h3>
                            <div className="space-y-4">
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Breakfast Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Lunch Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Dinner Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Bar Menu
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Reserve Your Table</h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        Experience culinary excellence at Magnoliya Grand's award-winning restaurants
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/reservations" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl">
                            Make a Reservation
                        </Link>
                        <Link href="/contact" className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dining;