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

// Add this popup component before your Dining component
function MenuPopupModal({ isOpen, onClose, menuData }: { isOpen: boolean; onClose: () => void; menuData: MenuPopup | null }) {
    if (!isOpen || !menuData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
            <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <button
                        className="absolute top-4 right-4 text-gray-600 hover:text-gold text-2xl font-bold z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center"
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
                                className="w-full h-64 object-cover rounded-lg"
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
    const [popupOpen, setPopupOpen] = useState(false);
    const [currentMenu, setCurrentMenu] = useState<MenuPopup | null>(null);

    // Add this menu data with content from your write-up
    const menuData = {
        multiCuisine: {
            title: "Multi-Cuisine Restaurant",
            description: "Embark on a culinary voyage at Magnoliya Multi Cuisine Restaurant, our premier destination where the world's finest flavors unite on one table. From the aromatic allure of sizzling Asian stir-fries and the vibrant elegance of Mediterranean mezze to the hearty indulgence of continental grills, every creation is crafted à la carte with authenticity and artistry. Complement your meal with an exquisite selection of wines, top-shelf spirits, and masterfully mixed cocktails from our curated bar. Whether you're hosting a family celebration, entertaining distinguished guests, or simply indulging your wanderlust for flavor, Magnoliya Multi Cuisine Restaurant offers a dining experience as exquisite as the cuisines it celebrates.",
            images: [
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            ]
        },
        american: {
            title: "American Menu",
            description: "Relish the bold spirit of America, where every plate celebrates comfort, craft, and tradition. Indulge in juicy, flame-grilled burgers, savor golden hand-cut fries, and delight in smoky barbecue slow-cooked to perfection. Enjoy soul-warming classics like creamy mac and cheese and crisp buttermilk fried chicken, each dish designed to satisfy both nostalgia and appetite. Elevating the experience, our bar offers a robust selection of bourbons, craft beers, and signature cocktails—from smooth Old Fashioneds to refreshing whiskey sours—that pair seamlessly with every bite. Whether you seek a casual bite or a hearty feast, our American menu is a tribute to timeless flavors and convivial dining.",
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/American%201.jpg",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/American%202.jpg",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/American%203.jpg",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/American%204.jpg",
            ]
        },
        mexican: {
            title: "Mexican Menu",
            description: "Celebrate the spirited soul of Mexico with cuisine as colorful as its culture. From hand-pressed tortillas and flame-kissed salsas to tender carnitas and moles simmered to rich, earthy perfection, every dish pays homage to tradition and bold flavor. Relish the zest of tacos, elotes, and quesadillas, or savor refined classics like enchiladas, tamales, and chile rellenos. Elevate the experience with hand-shaken margaritas, smoky mezcal, or aged tequila from our curated bar, each sip amplifying the vibrancy of the cuisine. Whether for a lively fiesta or an intimate meal, our Mexican kitchen delivers passion, warmth, and unmistakable flair.",
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Mexican%201.png",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Mexican%202.png",
            ]
        },
        italian: {
            title: "Italian Menu",
            description: "Savor the timeless romance of Italy, where every dish embodies the essence of la dolce vita. Relish velvety pastas such as our signature Rigatoni Vodka, delight in wood-fired pizzas crowned with artisan cheeses, and indulge in the silken elegance of a classic tiramisu. To complete the journey, our sommeliers have curated an exceptional selection of Italian wines—full-bodied reds, crisp whites, and sparkling prosecco—that perfectly complement the rich flavors of each course. Every bite, every sip, transports you to a rustic Roman trattoria- where warm hospitality, bold flavors, and culinary passion converge in an unforgettable symphony.",
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Italian%201.png",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Italian%202.png",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Italian%203.png",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Italian%204.png"
            ]
        },
        indian: {
            title: "Indian Menu",
            description: "Immerse yourself in the kaleidoscope of spices and soulful flavors that define India's rich culinary heritage. From the velvety indulgence of slow-simmered House Black Daal and the regal depth of Laal Maans to the irresistible charm of street food favorites, every dish is a celebration of tradition and taste. Relish the crunch and zest of tangy chaats, savor smoky kebabs fresh from the tandoor, and explore the playful spirit of India's bustling bazaars through pani puri, samosas, and pav bhaji. Complemented by warm, pillowy breads and fragrant biryanis layered with spices, our Indian kitchen offers a journey that is vibrant, authentic, and unforgettable—an experience that awakens the senses with every bite.",
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Indian%201.png",
            ]
        },
        middleEastern: {
            title: "Middle Eastern Menu",
            description: "Experience the exotic flavors and aromatic spices of the Middle East. Our menu features traditional dishes like hummus, falafel, shawarma, and kebabs, all prepared with authentic recipes and the finest ingredients. Savor the rich flavors of slow-cooked stews, fragrant rice dishes, and freshly baked flatbreads. Each dish tells a story of ancient culinary traditions and modern interpretations, creating a dining experience that transports you to the heart of the Middle East.",
            images: [
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1565299585323-38174c13fae8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        },
        breakfast: {
            title: "Breakfast Menu",
            description: "Start your day with our delightful breakfast offerings featuring fresh pastries, hearty egg dishes, artisanal cereals, and premium coffee selections. From fluffy pancakes to savory omelets, our breakfast menu is designed to energize your morning with both classic favorites and innovative creations.",
            images: [
                "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        },
        lunch: {
            title: "Lunch Menu",
            description: "Enjoy a midday break with our carefully crafted lunch menu featuring fresh salads, gourmet sandwiches, daily specials, and light entrees. Perfect for business lunches or casual dining, our lunch offerings combine quality ingredients with creative preparations.",
            images: [
                "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        },
        dinner: {
            title: "Dinner Menu",
            description: "Experience the elegance of our dinner service with premium cuts of meat, fresh seafood, seasonal vegetables, and decadent desserts. Our dinner menu showcases the best of contemporary cuisine with sophisticated presentations and exceptional flavors.",
            images: [
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ]
        },
        bar: {
            title: "Bar Menu",
            description: "Discover our extensive bar menu featuring handcrafted cocktails, premium spirits, fine wines, and local craft beers. Our expert mixologists create innovative drinks while honoring classic recipes, ensuring the perfect beverage to complement your dining experience.",
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
        <div className="min-h-screen bg-gray-50">
            {/* Menu Popup Modal */}
            <MenuPopupModal
                isOpen={popupOpen}
                onClose={closeMenuPopup}
                menuData={currentMenu}
            />




            <section className="relative h-[32rem] overflow-hidden">
                <img
                    src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Dinning.jpg"
                    alt="Event Venue"
                    className="w-full h-full object-cover"
                />
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
                                <button
                                    onClick={() => openMenuPopup('american')}
                                    className="block w-full text-left py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    American Menu
                                </button>
                                <button
                                    onClick={() => openMenuPopup('mexican')}
                                    className="block w-full text-left py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    Mexican Menu
                                </button>
                                <button
                                    onClick={() => openMenuPopup('italian')}
                                    className="block w-full text-left py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    Italian Menu
                                </button>
                                <button
                                    onClick={() => openMenuPopup('indian')}
                                    className="block w-full text-left py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    Indian Menu
                                </button>
                                <button
                                    onClick={() => openMenuPopup('middleEastern')}
                                    className="block w-full text-left py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    Middle Eastern Menu
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gold">Garden and Grille Restaurant and Bar</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => openMenuPopup('breakfast')}
                                    className="block w-full text-left py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    Breakfast Menu
                                </button>
                                <button
                                    onClick={() => openMenuPopup('lunch')}
                                    className="block w-full text-left py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    Lunch Menu
                                </button>
                                <button
                                    onClick={() => openMenuPopup('dinner')}
                                    className="block w-full text-left py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    Dinner Menu
                                </button>
                                <button
                                    onClick={() => openMenuPopup('bar')}
                                    className="block w-full text-left py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300"
                                >
                                    Bar Menu
                                </button>
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