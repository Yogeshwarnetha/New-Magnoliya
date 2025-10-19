"use client";
import { useState, useEffect, useRef } from 'react';

const RoomsAndSuites = () => {
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);
    const [backgroundTop, setBackgroundTop] = useState<number | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);

    // Decorative background image used on the Homepage
    const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";

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

    const roomTypes = [
        {
            name: "King Room",
            description: "Spacious room with one king bed, perfect for solo travelers or couples",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/standard-king-688be9.avif",
            features: ["One King Bed", "Free WiFi", "Flat-screen TV", "Work Desk", "Coffee Maker", "Mini Refrigerator"]
        },
        {
            name: "Double Queen Room",
            description: "Comfortable room with two queen beds, ideal for families or groups",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/standard-double-queen-e39b41.jpg",
            features: ["Two Queen Beds", "Free WiFi", "Flat-screen TV", "Work Desk", "Coffee Maker", "Mini Refrigerator"]
        },
        {
            name: "King Suite",
            description: "Luxurious suite with separate living area and premium amenities",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/king-one-bedroom-suite-3.avif",
            features: ["Separate Living Area", "One King Bed", "Microwave", "Mini Refrigerator", "Premium Bath Amenities"]
        },
        {
            name: "Accessible Room",
            description: "Fully accessible room designed for guests with mobility needs",
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/hearing-accessbiel-king.jpg",
            features: ["ADA Compliant", "Roll-in Shower", "Lowered Features", "Accessible Routes", "All Standard Amenities"]
        }
    ];

    const hotelFeatures = [
        {
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            title: "Lobby",
            description: "Elegant and welcoming entrance area"
        },
        {
            image: "https://images.unsplash.com-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            title: "Pool",
            description: "Indoor pool for relaxation and exercise"
        },
        {
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            title: "Guest Rooms",
            description: "Comfortable and well-appointed accommodations"
        }
    ];

    return (
        <div className="relative min-h-screen">
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
                {/* Hero Section */}
                <section ref={heroRef} className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
                    <img
                        src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/king-one-bedroom-suite-3.avif"
                        alt="Luxury Rooms"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                        <div className="px-4">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4">Rooms & Suites</h1>
                            <p className="text-lg md:text-xl max-w-2xl mx-auto">
                                Experience comfort and luxury in our meticulously designed accommodations
                            </p>
                        </div>
                    </div>
                </section>

                {/* Connected Hotel Information */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="w-full lg:w-1/2">
                                <img
                                    src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/035-AAM_0126_7_8.jpg"
                                    alt="Hilton Garden Inn"
                                    className="rounded-2xl shadow-2xl w-full h-auto"
                                />
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="max-w-lg mx-auto lg:mx-0">
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Connected to Hilton Garden Inn</h2>
                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        Hilton Garden Inn Manassas is a modern, full-service hotel conveniently located just off I-66, minutes from Manassas National Battlefield Park.
                                    </p>
                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        Guests can enjoy free Wi-Fi, an on-site restaurant and bar, indoor pool, fitness center, business services, EV charging, and pet-friendly accommodations—all backed by consistently friendly service and a clean, inviting ambiance.
                                    </p>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://www.guestreservations.com/hilton-garden-inn-manassas/booking?msclkid=3ab69d372b361ee38a45f5806dfd8973&ctTriggered=true"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                                        >
                                            Book Rooms
                                        </a>
                                        <a
                                            href="https://www.guestreservations.com/hilton-garden-inn-manassas/booking?msclkid=3ab69d372b361ee38a45f5806dfd8973&ctTriggered=true"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="border border-gold text-gold hover:bg-gold hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                                        >
                                            Book Suites
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Room Types */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Accommodation Options</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Choose from our variety of room types to find the perfect fit for your stay
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {roomTypes.map((room, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={room.image}
                                            alt={room.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                        <p className="text-gray-600 mb-4 text-sm">{room.description}</p>
                                        <ul className="space-y-2 mb-6">
                                            {room.features.map((feature, i) => (
                                                <li key={i} className="flex items-center text-sm text-gray-600">
                                                    <span className="text-gold mr-2">•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <a
                                            href="https://www.guestreservations.com/hilton-garden-inn-manassas/booking?msclkid=3ab69d372b361ee38a45f5806dfd8973&ctTriggered=true"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gold font-medium hover:text-gold-dark transition-colors duration-300 flex items-center"
                                        >
                                            Book Now
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Ready to Book Your Stay?</h2>
                        <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                            Experience the comfort and convenience of our accommodations connected to Hilton Garden Inn
                        </p>
                        <a
                            href="https://www.guestreservations.com/hilton-garden-inn-manassas/booking?msclkid=3ab69d372b361ee38a45f5806dfd8973&ctTriggered=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl"
                        >
                            Book Now
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RoomsAndSuites;