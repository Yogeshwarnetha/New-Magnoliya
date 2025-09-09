"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Home.module.css';
import { NavigationTile } from '../../types';

const Homepage = () => {
    const [currentHighlight, setCurrentHighlight] = useState<number>(0);

    const highlights: string[] = [
        "Multicuisine Restaurants",
        "Panoramic Water View",
        "State-of-the-Art AV & Lighting",
        "Terrace & Garden Venues",
        "End-to-End Event Management"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHighlight((prev) => (prev + 1) % highlights.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [highlights.length]);

    const navigationTiles: NavigationTile[] = [
        { title: "Rooms & Suites", icon: "🛏️", link: "/rooms" },
        { title: "Dining", icon: "🍽️", link: "/dining" },
        { title: "Weddings, Social & Corporate Events", icon: "💒", link: "/events" },
        { title: "Event Services", icon: "🎭", link: "/services" },
        { title: "Gallery", icon: "🖼️", link: "/gallery" },
        { title: "Contact Us", icon: "📞", link: "/contact" },
    ];

    return (
        <div className="relative">
            {/* Hero Banner with Video */}
            <div className="relative h-screen overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute w-full h-full object-cover"
                >
                    <source src="https://res.cloudinary.com/dwd2dks0h/video/upload/Final_-_Trim_p8yxaf.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        Luxury Stays. Memorable Events.
                    </h1>
                    <p className="text-2xl md:text-4xl mb-10 animate-fade-in animation-delay-300">
                        Exceptional Experiences.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-500">
                        <Link href="/booking" className="btn-primary">
                            Book a Room
                        </Link>
                        <Link href="/events" className="btn-secondary">
                            Book Your Event
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Quick Navigation Tiles */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl text-center mb-12">Explore Our Offerings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {navigationTiles.map((tile: NavigationTile, index: number) => (
                            <Link
                                key={index}
                                href={tile.link}
                                className="tile-hover bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center group"
                            >
                                <span className="text-4xl mb-4 group-hover:animate-float">{tile.icon}</span>
                                <h3 className="text-xl font-semibold">{tile.title}</h3>
                                <p className="mt-2 text-gray-600">Discover our exquisite {tile.title.toLowerCase()}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* New Features Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Unforgettable Experiences</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our world-class amenities and services designed to make your stay or event truly exceptional
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="feature-card p-6 rounded-lg bg-gray-50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="text-4xl mb-4 text-blue-500">🏨</div>
                            <h3 className="text-xl font-semibold mb-2">Luxurious Accommodations</h3>
                            <p className="text-gray-600">
                                Experience unparalleled comfort in our beautifully appointed rooms and suites with stunning views.
                            </p>
                        </div>

                        <div className="feature-card p-6 rounded-lg bg-gray-50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="text-4xl mb-4 text-blue-500">🎉</div>
                            <h3 className="text-xl font-semibold mb-2">Exquisite Event Spaces</h3>
                            <p className="text-gray-600">
                                From intimate gatherings to grand celebrations, our versatile venues provide the perfect backdrop.
                            </p>
                        </div>

                        <div className="feature-card p-6 rounded-lg bg-gray-50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="text-4xl mb-4 text-blue-500">🍽️</div>
                            <h3 className="text-xl font-semibold mb-2">Culinary Excellence</h3>
                            <p className="text-gray-600">
                                Savor exceptional cuisine crafted by our award-winning chefs using the finest ingredients.
                            </p>
                        </div>

                        <div className="feature-card p-6 rounded-lg bg-gray-50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="text-4xl mb-4 text-blue-500">💼</div>
                            <h3 className="text-xl font-semibold mb-2">Business Facilities</h3>
                            <p className="text-gray-600">
                                State-of-the-art meeting rooms and conference facilities equipped with modern technology.
                            </p>
                        </div>

                        <div className="feature-card p-6 rounded-lg bg-gray-50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="text-4xl mb-4 text-blue-500">🌿</div>
                            <h3 className="text-xl font-semibold mb-2">Scenic Outdoor Venues</h3>
                            <p className="text-gray-600">
                                Beautiful garden and terrace spaces offering picturesque settings for your special events.
                            </p>
                        </div>

                        <div className="feature-card p-6 rounded-lg bg-gray-50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="text-4xl mb-4 text-blue-500">⭐</div>
                            <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
                            <p className="text-gray-600">
                                Our dedicated team ensures every detail is perfected to create unforgettable experiences.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/about" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Learn More About Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Highlights Strip */}
            {/* <div className="py-8 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0 md:mr-8">
                            <h3 className="text-2xl font-semibold">Why Choose Us?</h3>
                        </div>
                        <div className="flex-1 text-center">
                            <div className={styles.highlightText}>
                                {highlights.map((text: string, index: number) => (
                                    <span
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHighlight ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        {text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Additional content sections would go here */}
        </div>
    );
};

export default Homepage;