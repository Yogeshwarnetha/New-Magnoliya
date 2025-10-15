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
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        preferredVenue: 'grand-ballroom',
        eventDate: '',
        guestCount: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
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
            image: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/34993d40-e8ac-4adf-ad13-167ddaa25e9b.jpeg',
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

    const eventTypes = [
        'Wedding',
        'Corporate Event',
        'Birthday Party',
        'Conference',
        'Graduation',
        'Baby Shower',
        'Gala',
        'Other'
    ];

    // Form handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after success
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                eventType: '',
                preferredVenue: 'grand-ballroom',
                eventDate: '',
                guestCount: '',
                message: ''
            });
            setSubmitSuccess(false);
            setShowBookingForm(false);
        }, 3000);
    };

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
            {/* Booking Form Modal */}
            {showBookingForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-serif font-bold text-gray-800">Book Your Event</h2>
                                <button
                                    onClick={() => setShowBookingForm(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {submitSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                                    <p className="text-gray-600">Your event inquiry has been submitted successfully. Our team will contact you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                                                Event Type *
                                            </label>
                                            <select
                                                id="eventType"
                                                name="eventType"
                                                required
                                                value={formData.eventType}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                                            >
                                                <option value="">Select event type</option>
                                                {eventTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="preferredVenue" className="block text-sm font-medium text-gray-700 mb-2">
                                                Preferred Venue *
                                            </label>
                                            <select
                                                id="preferredVenue"
                                                name="preferredVenue"
                                                required
                                                value={formData.preferredVenue}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                                            >
                                                {venues.map(venue => (
                                                    <option key={venue.id} value={venue.id}>{venue.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-2">
                                                Expected Guest Count *
                                            </label>
                                            <input
                                                type="number"
                                                id="guestCount"
                                                name="guestCount"
                                                required
                                                value={formData.guestCount}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                                                placeholder="Number of guests"
                                                min="1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Event Date *
                                        </label>
                                        <input
                                            type="date"
                                            id="eventDate"
                                            name="eventDate"
                                            required
                                            value={formData.eventDate}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Additional Information
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                                            placeholder="Tell us about your event vision, special requirements, or any questions you may have..."
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowBookingForm(false)}
                                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                    Submitting...
                                                </div>
                                            ) : (
                                                'Submit Inquiry'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

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
                        <button
                            onClick={() => setShowBookingForm(true)}
                            className="mt-8 bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Book Your Event
                        </button>
                    </div>
                </div>
            </section>



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

                                    <button
                                        onClick={() => {
                                            setFormData(prev => ({ ...prev, preferredVenue: venue.id }));
                                            setShowBookingForm(true);
                                        }}
                                        className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        Book Your Event
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
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

                            {/* <div className="bg-white p-6 rounded-lg shadow-md">
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
                            </div> */}
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
                        <button
                            onClick={() => setShowBookingForm(true)}
                            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            Book Your Event
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
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
                        <button
                            onClick={() => setShowBookingForm(true)}
                            className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
                        >
                            Book Your Event
                        </button>
                        <Link href="/contact" className="border-2 border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white transform hover:-translate-y-1">
                            Schedule a Tour
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventVenue;