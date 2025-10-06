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
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1549451378-6e2e2c1c3c5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        },
        {
            id: 'receptions',
            name: 'Receptions',
            images: [
                'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            ]
        },
        {
            id: 'details',
            name: 'Wedding Details',
            images: [
                'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1519415711931-702deacf5be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1519657337289-0776531cd5a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
                            From intimate ceremonies to grand celebrations
                        </p>
                    </div>
                </div>
            </section>

            {/* Wedding Offerings */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">
                            Our Wedding Offerings
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From intimate ceremonies to grand celebrations, we bring your vision
                            to life with exceptional attention to detail
                        </p>
                    </div>

                    {/* NEW CEREMONIES CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
                    </div>

                    {/* Intro Block */}
                    <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 mb-12">
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



                    {/* Packages */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {weddingPackages.map((pkg, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                            >
                                <div className="h-48 bg-gradient-to-r from-gold-light to-gold flex items-center justify-center">
                                    <div className="text-center text-white p-4">
                                        <h3 className="text-2xl font-serif font-bold mb-2">
                                            {pkg.name}
                                        </h3>
                                        <p className="text-xl font-semibold">{pkg.price}</p>
                                        <p className="text-gold-light">{pkg.description}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <ul className="space-y-3 mb-6">
                                        {pkg.includes.map((item, i) => (
                                            <li key={i} className="flex items-center">
                                                <span className="text-gold mr-2">✓</span>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/contact"
                                        className="block w-full bg-gold hover:bg-gold-dark text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                                    >
                                        Customize This Package
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-gray-600 mb-6">
                            All packages can be customized to fit your specific needs and
                            vision.
                        </p>
                        <Link href="/contact" className="btn-primary">
                            Talk to a Wedding Planner
                        </Link>
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

                    {/* Gallery Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button
                            onClick={() => setActiveGallery('all')}
                            className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${activeGallery === 'all'
                                ? 'bg-gold text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            All Photos
                        </button>
                        {weddingGalleries.map((gallery) => (
                            <button
                                key={gallery.id}
                                onClick={() => setActiveGallery(gallery.id)}
                                className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${activeGallery === gallery.id
                                    ? 'bg-gold text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {gallery.name}
                            </button>
                        ))}
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

            {/* Planning Process */}
            {/* <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Our Wedding Planning Process</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We guide you through every step to create your perfect day
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Initial Consultation</h3>
                            <p className="text-gray-600">We discuss your vision, preferences, and requirements for your special day.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Venue Selection</h3>
                            <p className="text-gray-600">Choose the perfect space that matches your style and guest count.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Planning & Coordination</h3>
                            <p className="text-gray-600">Our team handles all details from décor to timeline management.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">4</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">The Big Day</h3>
                            <p className="text-gray-600">We execute your vision flawlessly so you can enjoy every moment.</p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Begin Your Wedding Journey</h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        Let us help you create the wedding of your dreams at Magnoliya Grand
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl">
                            Schedule a Tour
                        </Link>
                        <Link href="/booking" className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                            Request Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Weddings;