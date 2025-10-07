"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import PanoramicViewer from '../PanoramicViewer';

const EventVenue = () => {
    const [activeVenue, setActiveVenue] = useState('grand-ballroom');
    const [activeCapacity, setActiveCapacity] = useState('theater');
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [isAutoPanning, setIsAutoPanning] = useState(false);
    const dragStartRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const startPanRef = useRef(0);
    const [pan, setPan] = useState(0); // pixels to offset panorama image
    const [maxPan, setMaxPan] = useState(0);


    const venues = [
        {
            id: 'grand-ballroom',
            name: 'Grand Ballroom',
            description: 'The Grand Ballroom offers a breathtaking setting for life\'s most important celebrations. With its soaring ceilings, expansive layout, and elegant design, this space is ideal for hosting weddings, galas, fundraisers, and large-scale gatherings. Flooded with natural light by day and glowing with sophistication by night, the ballroom provides a dramatic yet adaptable backdrop that allows every event to feel truly extraordinary. Whether your vision is classic, modern, or completely unique, the Grand Ballroom has the scale and presence to bring it to life.',
            image: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg',
            squareFeet: '14,500',
            theater: '1,800',
            banquet: '1,200',
            classroom: '800',
            reception: '1,000'
        },
        {
            id: 'front-pre-function',
            name: 'Front Pre Function Area',
            description: 'The Front Pre-Function Area is a dynamic space that can be easily transformed to match the spirit of your event. Serving as the perfect welcome point, it can be styled for elegant cocktail receptions, interactive guest experiences, or simply as a lively gathering spot before the main celebration begins. With its open layout and adaptable design, this area becomes whatever you need it to be—an inviting introduction, a social hub, or a seamless extension of your event\'s theme.',
            image: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FrontPre.jpg',
            squareFeet: '4,000',
            theater: '1,500',
            banquet: '1,200',
            classroom: '600',
            reception: '800'
        },
        {
            id: 'side-pre-function',
            name: 'Side Pre-Function Area',
            description: 'The Side Pre-Function Area offers a striking first impression, anchored by a sweeping grand staircase that adds a sense of drama and elegance to any event. Perfect for pre-reception mingling, cocktail hours, or photo opportunities, this versatile space blends functionality with style. Whether used as a welcoming lounge, a graceful transition into the ballroom, or a backdrop for memorable entrances, the Side Pre-Function Area elevates every moment with its timeless charm.',
            image: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Left.jpg',
            squareFeet: '2,500',
            theater: '1,500',
            banquet: '1,200',
            classroom: '600',
            reception: '800'
        },
        {
            id: 'back-pre-function',
            name: 'Back Pre Function Area',
            description: 'The Back Pre-Function Area is a versatile extension of your event, perfectly suited for buffets, live dining stations, and relaxed lounge seating. Its open design encourages guests to mingle and explore, creating a natural flow of energy throughout the space. With seamless access to the Lakeview Terrace, it effortlessly transitions from indoor comforts to outdoor charm, offering the best of both worlds for dining, socializing, and celebrating.',
            image: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Back.jpg',
            squareFeet: '2,000',
            theater: '1,500',
            banquet: '1,200',
            classroom: '500',
            reception: '700'
        },
        {
            id: 'lakeview-terrace',
            name: 'Lakeview Terrace',
            description: 'Our Lakeview Terrace is the perfect setting for mingling with friends, hosting an elegant cocktail hour, or celebrating with a lively cocktail party. Overlooking the serene lake, this open-air space combines breathtaking views with a relaxed, sophisticated atmosphere. Guests can sip, socialize, and enjoy the fresh air while creating unforgettable memories. Whether you\'re planning an intimate gathering or a pre-reception cocktail hour, the Lakeview Terrace offers the ideal blend of charm, style, and versatility.',
            image: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/LakeView.jpg',
            squareFeet: '1,800',
            theater: '200',
            banquet: '150',
            classroom: '100',
            reception: '180'
        },
        {
            id: 'kwanzan-hall',
            name: 'Kwanzan Hall',
            description: 'Kwanzan Hall offers a polished and private atmosphere, making it an excellent choice for business meetings, board discussions, or intimate gatherings. Featuring advanced audiovisual capabilities, including a crisp projector display and dynamic sound system, the space is designed to keep every presentation engaging and impactful. Its focused setting creates the perfect environment for productive conversations, meaningful connections, and memorable events.',
            image: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Kwaza%20hall.jpg',
            squareFeet: '2,000',
            theater: '260',
            banquet: '180',
            classroom: '120',
            reception: '200'
        },
        {
            id: 'liberty-hall',
            name: 'Liberty Hall',
            description: 'The Liberty Ballroom is a bright and customizable space that sets the stage for celebrations of every kind. Flooded with natural light from its sweeping windows, the room creates an inviting and uplifting atmosphere that\'s perfect for baby showers, graduation parties, or even weddings. Its generous layout offers plenty of room for dining, dancing, and décor, giving you the freedom to bring your vision to life. Whatever the occasion, the Liberty Ballroom provides an elegant backdrop where unforgettable moments unfold.',
            image: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Liberty%20Hall.jpg',
            squareFeet: '1,800',
            theater: '220',
            banquet: '170',
            classroom: '80',
            reception: '150'
        },
        {
            id: 'lakeview-garden',
            name: 'Lakeview Garden (Coming Soon)',
            description: 'Soon to be unveiled, our Lakeview Garden will offer a breathtaking outdoor setting designed with weddings and special celebrations in mind. Surrounded by natural beauty and framed by views of the water, this enchanting garden creates a storybook atmosphere for ceremonies, receptions, and open-air gatherings. With endless possibilities for décor and a serene backdrop that shifts beautifully from day to night, the Lakeview Garden will be the perfect place to say "I do" or host any unforgettable outdoor event.',
            image: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/Lake%20Side.jpg',
            squareFeet: '5,500',
            theater: '650',
            banquet: '500',
            classroom: '800',
            reception: '1,000'
        }
    ];

    const capacityTypes = [
        { id: 'theater', name: 'Theater Style' },
        { id: 'banquet', name: 'Banquet Style' },
        { id: 'classroom', name: 'Classroom Style' },
        { id: 'reception', name: 'Reception Style' }
    ];

    // Mouse/Touch handlers for panoramic viewer
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStartRef.current = e.clientX;
        startPanRef.current = pan;
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        dragStartRef.current = e.touches[0].clientX;
        startPanRef.current = pan;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartRef.current;
        if (maxPan <= 0) return;
        const newPan = Math.min(Math.max(startPanRef.current - deltaX, 0), maxPan);
        setPan(newPan);
        setRotation((newPan / Math.max(maxPan, 1)) * 360);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - dragStartRef.current;
        if (maxPan <= 0) return;
        const newPan = Math.min(Math.max(startPanRef.current - deltaX, 0), maxPan);
        setPan(newPan);
        setRotation((newPan / Math.max(maxPan, 1)) * 360);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Keyboard controls: Left/Right to pan, Space toggles auto-panning
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const step = 80;
        if (e.code === 'ArrowLeft') {
            setPan(prev => Math.max(prev - step, 0));
        } else if (e.code === 'ArrowRight') {
            setPan(prev => Math.min(prev + step, maxPan));
        } else if (e.code === 'Space') {
            e.preventDefault();
            setIsAutoPanning(prev => !prev);
        }
    };

    // Auto-panning effect
    useEffect(() => {
        if (!isAutoPanning) return;
        const interval = setInterval(() => {
            setPan(prev => {
                if (maxPan <= 0) return prev;
                const next = prev + 2; // pixels per tick
                if (next >= maxPan) return 0; // loop back
                return next;
            });
            setRotation(prev => (prev + 2) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, [isAutoPanning, maxPan]);

    // Recompute maxPan on resize
    useEffect(() => {
        const handleResize = () => {
            if (!imgRef.current || !containerRef.current) return;
            const imgRect = imgRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            setMaxPan(Math.max(imgRect.width - containerRect.width, 0));
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    

    const selectedVenue = venues.find(venue => venue.id === activeVenue) || venues[0];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
                <img
                    src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FrontPre.jpg"
                    alt="Event Venue"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4">Event Venues</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Exceptional spaces for unforgettable events and celebrations
                        </p>
                    </div>
                </div>
            </section>

            <PanoramicViewer 
                src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/IMG_20250711_165221_00_004.jpg"
                alt="Magnoliya venue panoramic view"
            />
            {/* Venues Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">Our Venues</h2>

                    <div className="space-y-16">
                        {venues.map((venue, idx) => (
                            <div
                                key={venue.id}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-center rounded-2xl bg-white overflow-hidden transition-all duration-500 shadow-lg hover:shadow-xl ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Image left for even, right for odd */}
                                <div className={`h-[420px] lg:h-full ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <img
                                        src={venue.image}
                                        alt={venue.name}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>

                                <div className="p-8">
                                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">
                                        {venue.name}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {venue.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 mb-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Square Feet</h4>
                                            <p className="text-2xl font-bold text-gold">{venue.squareFeet}</p>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Capacity Options</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {capacityTypes.map((type) => (
                                                    <div
                                                        key={type.id}
                                                        className="p-2 rounded text-center bg-white text-gray-700 shadow-inner"
                                                    >
                                                        <div className="text-xs font-medium">{type.name}</div>
                                                        <div className="text-sm font-bold">{venue[type.id as keyof typeof venue]}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        Inquire About This Venue
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Capacity Charts */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-12 text-center">Venue Capacity Charts</h2>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-12">
                        <h3 className="text-xl font-serif font-semibold text-gray-800 mb-6 text-center">Layout Options & Capacities</h3>

                        <div className="overflow-x-auto rounded-lg shadow-lg">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gold text-white">
                                        <th className="p-4 text-left font-semibold text-lg">Venue</th>
                                        <th className="p-4 text-center font-semibold text-lg">Square Feet</th>
                                        <th className="p-4 text-center font-semibold text-lg">Theater Style</th>
                                        <th className="p-4 text-center font-semibold text-lg">Banquet Style</th>
                                        <th className="p-4 text-center font-semibold text-lg">Classroom Style</th>
                                        <th className="p-4 text-center font-semibold text-lg">Reception Style</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {venues.map((venue, index) => (
                                        <tr
                                            key={venue.id}
                                            className={`transition-colors duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gold-light/20`}
                                            onMouseEnter={() => setActiveVenue(venue.id)}
                                        >
                                            <td className="p-4 font-medium border-b border-gray-200">{venue.name}</td>
                                            <td className="p-4 text-center border-b border-gray-200 font-semibold">{venue.squareFeet}</td>
                                            <td className="p-4 text-center border-b border-gray-200">
                                                <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                                                    {venue.theater}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center border-b border-gray-200">
                                                <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
                                                    {venue.banquet}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center border-b border-gray-200">
                                                <span className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm font-medium">
                                                    {venue.classroom}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center border-b border-gray-200">
                                                <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-sm font-medium">
                                                    {venue.reception}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">Layout Examples</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                                        <span className="text-gray-700">Theater Style: Rows of chairs facing forward</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                                        <span className="text-gray-700">Banquet Style: Round tables with seating</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                                        <span className="text-gray-700">Classroom Style: Tables with chairs facing forward</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                                        <span className="text-gray-700">Reception Style: Standing cocktail format</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">Planning Guidance</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-gold mr-2">•</span>
                                        <span>Add 10-15% extra capacity for comfort</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gold mr-2">•</span>
                                        <span>Consider space for dance floor, stage, or buffet</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gold mr-2">•</span>
                                        <span>Our event planners can help optimize your layout</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Photo Galleries */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-12 text-center">Venue Galleries</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {venues.map((venue) => (
                            <div
                                key={venue.id}
                                className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
                                onClick={() => setActiveVenue(venue.id)}
                            >
                                <img
                                    src={venue.image}
                                    alt={venue.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                                    <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="font-semibold">{venue.name}</h3>
                                        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{venue.squareFeet} sq ft</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/gallery" className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                            View Full Gallery
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Plan Your Next Event With Us</h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        Let us help you create an unforgettable experience in our exceptional venues
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                            Schedule a Tour
                        </Link>
                        <Link href="/booking" className="border-2 border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white transform hover:-translate-y-1">
                            Request Booking
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventVenue;