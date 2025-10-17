"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FiGift as _FiGift, FiHeart as _FiHeart, FiMusic as _FiMusic, FiCalendar as _FiCalendar } from 'react-icons/fi';
import type { IconType } from 'react-icons/lib';

const FiGift = _FiGift as unknown as React.ComponentType<any>;
const FiHeart = _FiHeart as unknown as React.ComponentType<any>;
const FiMusic = _FiMusic as unknown as React.ComponentType<any>;
const FiCalendar = _FiCalendar as unknown as React.ComponentType<any>;

const Weddings = () => {
    const [activeGallery, setActiveGallery] = useState('all');
    const [activeSlide, setActiveSlide] = useState(0);

    const weddingGalleries = [
        {
            id: 'ceremonies',
            name: 'Ceremonies',
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Wedding%202.jpg",
            ]
        },
        {
            id: 'receptions',
            name: 'Receptions',
            images: [
                'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Wedding%201.jpg',
                'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Wedding%205.jpg',
                'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Wedding%206.jpg'
            ]
        },
        {
            id: 'details',
            name: 'Wedding Details',
            images: [
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Wedding%207.jpg",
                "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Wedding%209.jpg"
            ]
        }
    ];

    const allImages = weddingGalleries.flatMap(gallery => gallery.images);

    const weddingPackages = [
        {
            name: 'Intimate Celebration',
            price: '$5,000',
            description: 'Perfect for smaller weddings with close family and friends',
            includes: ['Up to 50 guests', 'Ceremony setup', 'Basic décor', '3-hour reception', 'Complimentary champagne toast']
        },
        {
            name: 'Grand Affair',
            price: '$10,000',
            description: 'Our most popular package for traditional weddings',
            includes: ['Up to 150 guests', 'Ceremony & reception', 'Premium décor', '5-hour reception', 'Custom menu planning', 'Day-of coordinator']
        },
        {
            name: 'Luxury Experience',
            price: '$15,000',
            description: 'The ultimate wedding package for a truly exceptional day',
            includes: ['Up to 300 guests', 'Premium ceremony setup', 'Luxury décor', '7-hour reception', 'Custom menu with premium bar', 'Dedicated wedding planner', 'Premium linens and china']
        }
    ];

    const testimonials = [
        {
            text: "Our wedding was absolutely perfect thanks to the Magnoliya Grand team. Every detail was executed flawlessly.",
            author: "Sarah & Michael",
            event: "Wedding Couple"
        },
        {
            text: "The venue provided the perfect backdrop for our special day. The staff went above and beyond to make everything perfect.",
            author: "Jessica & David",
            event: "Wedding Couple"
        },
        {
            text: "From the initial planning to the day itself, the team was professional, attentive, and truly cared about making our day special.",
            author: "Amanda & Chris",
            event: "Wedding Couple"
        }
    ];

    const bookingLink = "https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Beautiful Wedding"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4">Weddings</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Your Forever Starts Here at Magnoliya Grand Manor
                        </p>
                    </div>
                </div>
            </section>

            {/* Venue Spaces with Images - Directly after hero */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    {/* Main Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
                            Your Forever Starts Here
                        </h2>
                        <div className="w-48 h-1 bg-gold mx-auto"></div>
                        <p className="text-xl text-gray-600 mt-6 max-w-7xl mx-auto">
                            At Magnoliya Grand Manor, weddings unfold with timeless elegance and romantic grandeur.
Surrounded by breathtaking landscapes, every detail is artfully curated to reflect your unique
love story. With moments imbued with elegance and grace, your wedding becomes an intimate
and unforgettable experience.
                        </p>
                        <p className="text-xl text-gray-600 mt-6 max-w-7xl mx-auto">
                            From the heartfelt vows and graceful toasts of an American wedding, where love is celebrated
beneath soft light and classic charm, to the vivid splendor of an Indian wedding, alive with the
colors of Mehendi, the joy of Haldi, and the rhythm of Sangeet, Magnoliya Grand Manor
transforms every tradition from diverse cultures into a masterpiece of celebration. Each
event—whether a serene exchange of vows or a dance beneath a thousand lights—is woven
together with elegance, warmth, and the promise of forever.
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* Magnoliya Grand Ballroom */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="relative rounded-2xl overflow-hidden h-96 order-2 lg:order-1">
                                <img
                                    src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg"
                                    alt="Magnoliya Grand Ballroom"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            </div>
                            <div className="order-1 lg:order-2 lg:pr-8">
                                <h3 className="text-3xl font-serif font-semibold text-gray-800 mb-4">
                                    Magnoliya Grand Ballroom
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    The Ballroom offers an enchanting setting for unforgettable weddings. With soaring ceilings,
                                    radiant chandeliers, and sweeping views, it exudes timeless elegance and romance.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    The graceful ambiance and grandeur of this exquisite space transform every celebration into a truly
                                    extraordinary experience. From the first toast to the final dance, your wedding unfolds in
                                    unmatched sophistication.
                                </p>
                                <p className="text-gold font-semibold mb-6">
                                    For more intimate gatherings, the Yoshino, Denali, and Kwanzan ballrooms provide the perfect blend of style and intimacy.
                                </p>
                                <a
                                    href={bookingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                                >
                                    Book This Venue
                                </a>
                            </div>
                        </div>

                        {/* Lakeview Garden */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="lg:pl-8">
                                <h3 className="text-3xl font-serif font-semibold text-gray-800 mb-4">
                                    Lakeview Garden
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    The Garden offers a serene setting where love blossoms beneath open skies. Surrounded by lush
                                    greenery and views of the shimmering water stream.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    Ideal for outdoor ceremonies, it provides a naturally elegant atmosphere where every moment feels intimate and timeless. This serene space is perfect for couples seeking a classic garden wedding with effortless charm.
                                </p>
                                <a
                                    href={bookingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                                >
                                    Book This Venue
                                </a>
                            </div>
                            <div className="relative rounded-2xl overflow-hidden h-96">
                                <img
                                    src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/34993d40-e8ac-4adf-ad13-167ddaa25e9b.jpeg"
                                    alt="Lakeview Garden"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            </div>
                        </div>

                        {/* Lakeview Terrace */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="relative rounded-2xl overflow-hidden h-96 order-2 lg:order-1">
                                <img
                                    src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/LakeView.jpg"
                                    alt="Lakeview Terrace"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                            </div>
                            <div className="order-1 lg:order-2 lg:pr-8">
                                <h3 className="text-3xl font-serif font-semibold text-gray-800 mb-4">
                                    Lakeview Terrace
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    Our Terrace provides a stylish open-air venue overlooking the lake and beautifully landscaped
                                    grounds.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    Perfect for cocktail receptions, rehearsal dinners, or smaller ceremonies, it combines
                                    scenic views with modern sophistication. As day turns to evening, the Terrace creates a relaxed
                                    yet refined ambiance for celebrating with family and friends.
                                </p>
                                <a
                                    href={bookingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
                                >
                                    Book This Venue
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

          {/* Wedding Packages with Image Backgrounds */}
<section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
        {/* Intro Block */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 mb-12 shadow-lg">
            <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-6 text-center">
                Weddings at Our Venue
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
                Your wedding deserves a setting as unforgettable as the day itself.
                Our venue provides a canvas that adapts beautifully to any theme,
                from timeless elegance to modern luxury. Expansive spaces, filled
                with natural light and refined architectural details, offer the
                perfect backdrop for lavish décor, personalized touches, and moments
                of pure romance. Whether you envision a grand celebration or a more
                intimate affair, our halls and outdoor spaces allow you to bring
                your vision to life with grace, style, and a sense of occasion.
            </p>
        </div>

        {/* Packages with Image Backgrounds - Only for the 3 main packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {weddingPackages.map((pkg, index) => {
                // Different background images for each package
                const packageImages = [
                    "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/20250831_194427%20(1).jpg", // Intimate
                    "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/20250920_182834.jpg", // Grand
                    "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Wedding%205.jpg"  // Luxury
                ];

                return (
                    <div
                        key={index}
                        className="group relative rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 min-h-[600px]"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={packageImages[index]}
                                alt={pkg.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Subtle dark overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-between h-full p-8 text-white">
                            {/* Top Content */}
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-2xl font-serif font-bold mb-2">
                                        {pkg.name}
                                    </h3>
                                    {/* <p className="text-3xl font-bold text-gold mb-2">{pkg.price}</p> */}
                                    <p className="text-gold-light font-medium">{pkg.description}</p>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-3 mb-8">
                                    {pkg.includes.map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <span className="text-gold mr-3 text-lg">✓</span>
                                            <span className="text-white text-sm font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Button */}
                            <a
                                href={bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-gold hover:bg-gold-dark text-white text-center font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Customize This Package
                            </a>
                        </div>

                        {/* Gold Accent Border */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/30 transition-all duration-500"></div>
                    </div>
                );
            })}
        </div>

        {/* Footer */}
        <div className="text-center">
            <p className="text-gray-600 mb-6">
                All packages can be customized to fit your specific needs and
                vision.
            </p>
            <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
                Talk to a Wedding Planner
            </a>
        </div>

        {/* Wedding Offerings Section - Keep original white cards */}
        <div className="text-center my-12">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
                Our Wedding Offerings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From intimate ceremonies to grand celebrations, we bring your vision
                to life with exceptional attention to detail
            </p>
        </div>

        {/* Wedding Ceremonies Cards - Keep original white design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Bridal Showers & Engagement Parties */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">
                <div className="flex items-center justify-center mb-4 text-gold text-5xl">
                    <FiGift />
                </div>
                <h4 className="text-xl font-serif font-semibold mb-2 text-gray-800">
                    Bridal Showers & Engagements
                </h4>
                <p className="text-gray-600 text-base">
                    Celebrate milestones along your journey with elegance and joy.
                </p>
            </div>

            {/* Ceremonies */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">
                <div className="flex items-center justify-center mb-4 text-gold text-5xl">
                    <FiHeart />
                </div>
                <h4 className="text-xl font-serif font-semibold mb-2 text-gray-800">
                    Ceremonies
                </h4>
                <p className="text-gray-600 text-base">
                    Elegant and intimate settings designed to make your vows
                    unforgettable.
                </p>
            </div>

            {/* Receptions */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">
                <div className="flex items-center justify-center mb-4 text-gold text-5xl">
                    <FiMusic />
                </div>
                <h4 className="text-xl font-serif font-semibold mb-2 text-gray-800">
                    Receptions
                </h4>
                <p className="text-gray-600 text-base">
                    Celebrate your union with a memorable reception full of joy,
                    music, and dancing.
                </p>
            </div>

            {/* Rehearsal Dinners */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">
                <div className="flex items-center justify-center mb-4 text-gold text-5xl">
                    <FiCalendar />
                </div>
                <h4 className="text-xl font-serif font-semibold mb-2 text-gray-800">
                    Rehearsal Dinners
                </h4>
                <p className="text-gray-600 text-base">
                    Gather your loved ones for a relaxed pre-wedding celebration in
                    style.
                </p>
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

            {/* Gallery Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Wedding Gallery</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Browse through our collection of beautiful wedding moments
                        </p>
                    </div>

                    {/* Gallery Images */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                        {(activeGallery === 'all' ? allImages : weddingGalleries.find(g => g.id === activeGallery)?.images || []).map((image, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer">
                                <img
                                    src={image}
                                    alt={`Wedding image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-lg font-medium">
                                        View
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link href="/gallery" className="btn-primary">
                            View Full Wedding Gallery
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Real Wedding Stories</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Hear from couples who celebrated their special day with us
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center">
                                <div className="text-4xl text-gold mb-4">"</div>
                                <p className="text-lg text-gray-700 italic mb-6">{testimonial.text}</p>
                                <div>
                                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                                    <p className="text-sm text-gray-600">{testimonial.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Begin Your Wedding Journey</h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        Let us help you create the wedding of your dreams at Magnoliya Grand
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href={bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl"
                        >
                            Schedule a Tour
                        </a>
                        <a
                            href={bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white"
                        >
                            Request Pricing
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Weddings;