// app/rooms/page.tsx
import Link from 'next/link';

const RoomsAndSuites = () => {
    const roomTypes = [
        {
            name: "Standard Rooms",
            description: "Comfortable accommodations with all essential amenities",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            price: "$149/night",
            features: ["Free WiFi", "Flat-screen TV", "Work Desk", "Coffee Maker"]
        },
        {
            name: "Deluxe Rooms",
            description: "Spacious rooms with premium amenities and enhanced comfort",
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            price: "$199/night",
            features: ["Premium View", "Marble Bathroom", "Mini Bar", "Enhanced Amenities"]
        },
        {
            name: "Suites",
            description: "Luxurious suites with separate living areas and exclusive access",
            image: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            price: "$299/night",
            features: ["Separate Living Area", "Premium View", "Luxury Bath Amenities", "Express Check-in"]
        },
        {
            name: "Water View Rooms",
            description: "Beautiful rooms with stunning water views and premium comforts",
            image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            price: "$229/night",
            features: ["Water View", "Private Balcony", "Premium Toiletries", "Enhanced Comfort"]
        }
    ];

    const hotelFeatures = [
        {
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            title: "Lobby",
            description: "Elegant and welcoming entrance area"
        },
        {
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Luxury Rooms"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Rooms & Suites</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            Experience comfort and luxury in our meticulously designed accommodations
                        </p>
                    </div>
                </div>
            </section>

            {/* Connected Hotel Information */}
            <section className="py-16 bg-white">
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
            <section className="py-16 bg-gray-50">
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
                                    <p className="text-gold mb-2 font-medium">{room.price}</p>
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

            {/* Hotel Features */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Hotel Features</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover the amenities and facilities that make your stay exceptional
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {hotelFeatures.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
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
    );
};

export default RoomsAndSuites;