"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getEventVenues, EventVenueData } from '@/apirequests/eventVenue';

// Venue type based on your API
// Override the `id` coming from EventVenueData (likely a number) with a string id
type Venue = Omit<EventVenueData, 'id'> & {
    id: string;
    name: string;
    [key: string]: any;
};

const EventVenue = () => {
    const [activeVenue, setActiveVenue] = useState<string>('');
    const [activeCapacity, setActiveCapacity] = useState('theater');
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        preferredVenue: '',
        eventDate: '',
        guestCount: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);
    const [backgroundTop, setBackgroundTop] = useState<number | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const [embedErrors, setEmbedErrors] = useState<Record<string, boolean>>({});
    const [isIframeLoaded, setIsIframeLoaded] = useState<Record<string, boolean>>({});
    const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});
    
    // State for dynamic data
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Decorative background image used on the Homepage
    const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";

    // Fetch venues data
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                setLoading(true);
                const response = await getEventVenues();
                
                if (response.ok && response.data) {
                    // Transform API data to match component expectations
                    const transformedVenues: Venue[] = response.data.map(venue => ({
                        ...venue,
                        id: venue.id?.toString() || '',
                        name: venue.venue_name,
                        // Map the fields to match your existing structure
                        description: venue.description,
                        image: venue.image,
                        squareFeet: venue.squareFeet,
                        theater: venue.theater,
                        banquet: venue.banquet,
                        tourUrl: venue.tourUrl,
                        iframeSrc: venue.iframeSrc,
                        features: venue.features || [],
                        gallery_images: venue.gallery_images || [],
                        planning_guidance: venue.planning_guidance || []
                    }));
                    
                    setVenues(transformedVenues);
                    
                    // Set first venue as active
                    if (transformedVenues.length > 0) {
                        setActiveVenue(transformedVenues[0].id);
                        setFormData(prev => ({
                            ...prev,
                            preferredVenue: transformedVenues[0].id
                        }));
                    }
                } else {
                    setError(response.error || 'Failed to load venues');
                }
            } catch (err) {
                setError('An unexpected error occurred');
                console.error('Error fetching venues:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

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

    const capacityTypes = [
        { id: 'theater', name: 'Theater Style' },
        { id: 'banquet', name: 'Banquet Style' },
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
                preferredVenue: venues[0]?.id || '',
                eventDate: '',
                guestCount: '',
                message: ''
            });
            setSubmitSuccess(false);
            setShowBookingForm(false);
        }, 3000);
    };

    const handleIframeLoad = (venueId: string) => {
        setIsIframeLoaded(prev => ({ ...prev, [venueId]: true }));
        setEmbedErrors(prev => ({ ...prev, [venueId]: false }));
        
        // Post-load optimization for Kuula iframes
        const iframe = iframeRefs.current[venueId];
        if (iframe) {
            // Ensure proper focus and interaction capabilities
            iframe.style.pointerEvents = 'auto';
            iframe.style.touchAction = 'manipulation';
            
            // Try to send a message to the iframe to enable interactions
            try {
                setTimeout(() => {
                    if (iframe.contentWindow) {
                        iframe.contentWindow.postMessage({ action: 'enableInteraction' }, '*');
                    }
                }, 1000);
            } catch (e) {
                console.log('Cross-origin communication not available, which is normal for security reasons');
            }
        }
    };

    const handleIframeError = (venueId: string) => {
        setIsIframeLoaded(prev => ({ ...prev, [venueId]: false }));
        setEmbedErrors(prev => ({ ...prev, [venueId]: true }));
    };

    const openTourInNewTab = (tourUrl: string) => {
        window.open(tourUrl, '_blank', 'noopener,noreferrer');
    };

    // Optimize Kuula URLs for better iframe integration
    const optimizeKuulaUrl = (url: string): string => {
        if (!url) return url;
        
        // Check if it's a Kuula URL
        if (url.includes('kuula.co')) {
            // Ensure proper iframe parameters for Kuula
            const urlObj = new URL(url);
            
            // Add parameters for better iframe integration
            if (!urlObj.searchParams.has('fs')) {
                urlObj.searchParams.set('fs', '1'); // Enable fullscreen
            }
            if (!urlObj.searchParams.has('vr')) {
                urlObj.searchParams.set('vr', '1'); // Enable VR mode
            }
            if (!urlObj.searchParams.has('sd')) {
                urlObj.searchParams.set('sd', '1'); // Enable stereo mode
            }
            if (!urlObj.searchParams.has('thumbs')) {
                urlObj.searchParams.set('thumbs', '1'); // Enable thumbnails
            }
            if (!urlObj.searchParams.has('info')) {
                urlObj.searchParams.set('info', '0'); // Hide info by default
            }
            if (!urlObj.searchParams.has('logo')) {
                urlObj.searchParams.set('logo', '0'); // Hide logo for cleaner experience
            }
            
            return urlObj.toString();
        }
        
        return url;
    };

    const selectedVenue = venues.find(venue => venue.id === activeVenue) || venues[0];

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading venues...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to load venues</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-gold text-white font-semibold py-2 px-6 rounded-lg hover:bg-gold-dark transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // No venues state
    if (venues.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No venues available</h3>
                    <p className="text-gray-600">Please check back later for available venues.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white">
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
                {/* Enhanced Booking Form Modal */}
                {showBookingForm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/20">
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <div className="w-12 h-1 bg-gold mb-4"></div>
                                        <h2 className="text-3xl font-serif font-light text-gray-800">Book Your Event</h2>
                                    </div>
                                    <button
                                        onClick={() => setShowBookingForm(false)}
                                        className="text-gray-500 hover:text-gray-700 transition-all duration-300 p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {submitSuccess ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-serif font-light text-gray-800 mb-4">Thank You!</h3>
                                        <p className="text-gray-600 text-lg">Your event inquiry has been submitted successfully. Our team will contact you within 24 hours.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-3">
                                                    Event Type *
                                                </label>
                                                <select
                                                    id="eventType"
                                                    name="eventType"
                                                    required
                                                    value={formData.eventType}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                                >
                                                    <option value="">Select event type</option>
                                                    {eventTypes.map(type => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="preferredVenue" className="block text-sm font-medium text-gray-700 mb-3">
                                                    Preferred Venue *
                                                </label>
                                                <select
                                                    id="preferredVenue"
                                                    name="preferredVenue"
                                                    required
                                                    value={formData.preferredVenue}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                                >
                                                    {venues.map(venue => (
                                                        <option key={venue.id} value={venue.id}>{venue.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-3">
                                                    Expected Guest Count *
                                                </label>
                                                <input
                                                    type="number"
                                                    id="guestCount"
                                                    name="guestCount"
                                                    required
                                                    value={formData.guestCount}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                                    placeholder="Number of guests"
                                                    min="1"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-3">
                                                Preferred Event Date *
                                            </label>
                                            <input
                                                type="date"
                                                id="eventDate"
                                                name="eventDate"
                                                required
                                                value={formData.eventDate}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                                                Additional Information
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                                placeholder="Tell us about your event vision, special requirements, or any questions you may have..."
                                            />
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowBookingForm(false)}
                                                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 px-6 py-4 bg-gold text-white font-semibold rounded-xl hover:bg-gold-dark transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex items-center justify-center">
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
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

                {/* Enhanced Hero Section */}
                <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={venues[0]?.image || "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FrontPre.jpg"}
                            alt="Event Venue"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="relative h-full flex items-center">
                        <div className="container mx-auto px-6">
                            <div className="max-w-2xl">
                                <div className="mb-8">
                                    <div className="w-24 h-1 bg-gold mb-6"></div>
                                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white mb-6 leading-tight">
                                        {venues[0]?.venue_title || "Social Venues"}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-gold font-light mb-8 max-w-xl">
                                        {venues[0]?.venue_title_description || "Exceptional spaces for unforgettable events and celebrations"}
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => setShowBookingForm(true)}
                                        className="bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 text-center"
                                    >
                                        Book Your Event
                                    </button>
                                    <a
                                        href="#venues"
                                        className="border border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-center"
                                    >
                                        Explore Venues
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="animate-bounce">
                            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Venues Section */}
                <section id="venues" className="py-24 relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full translate-x-1/3 translate-y-1/3"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">PREMIUM VENUES</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-6">
                                Our Venues
                            </h2>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-light">
                                Discover our collection of exceptional spaces, each designed to create unforgettable experiences
                            </p>
                        </div>

                        <div className="space-y-32">
                            {venues.map((venue, idx) => (
                                <div
                                    key={venue.id}
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group`}
                                >
                                    {/* Image/Video Section */}
                                    <div className={`relative ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-700 h-[500px]">
                                            {venue.tourUrl ? (
                                                <div className="w-full h-full bg-black relative tour-iframe-container iframe-wrapper">
                                                    {/* Loading State */}
                                                    {!isIframeLoaded[venue.id] && !embedErrors[venue.id] && (
                                                        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
                                                            <div className="text-center text-white">
                                                                <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                                                <p className="text-lg">Loading 360° Tour...</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Iframe */}
                                                    <iframe
                                                        ref={el => iframeRefs.current[venue.id] = el}
                                                        title={`360 Tour ${venue.name}`}
                                                        src={optimizeKuulaUrl(venue.iframeSrc ?? venue.tourUrl)}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; vr; xr-spatial-tracking; camera; microphone"
                                                        allowFullScreen
                                                        referrerPolicy="no-referrer-when-downgrade"
                                                        loading="lazy"
                                                        className={`tour-iframe ${isIframeLoaded[venue.id] ? 'opacity-100' : 'opacity-0'}`}
                                                        onLoad={() => handleIframeLoad(venue.id)}
                                                        onError={() => handleIframeError(venue.id)}
                                                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock allow-orientation-lock allow-modals allow-presentation"
                                                    />

                                                    {/* Mobile Interaction Helper */}
                                                    <div 
                                                        className="absolute inset-0 bg-transparent pointer-events-none md:hidden"
                                                        onTouchStart={(e) => {
                                                            // Enable pointer events on touch to help with mobile interaction
                                                            const iframe = iframeRefs.current[venue.id];
                                                            if (iframe) {
                                                                iframe.style.pointerEvents = 'auto';
                                                                iframe.style.touchAction = 'manipulation';
                                                            }
                                                        }}
                                                    />

                                                    {/* Error State */}
                                                    {embedErrors[venue.id] && (
                                                        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-6 z-20">
                                                            <div className="text-white text-lg mb-4">
                                                                <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                                </svg>
                                                                <p className="mb-4">Interactive 360 tour failed to load.</p>
                                                            </div>
                                                            <button
                                                                onClick={() => openTourInNewTab(venue.tourUrl!)}
                                                                className="inline-flex items-center bg-gold text-black font-semibold px-6 py-3 rounded-lg hover:bg-gold-dark transition-all duration-300"
                                                            >
                                                                Open Tour in New Tab
                                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Enhanced Instructions Overlay */}
                                                    {isIframeLoaded[venue.id] && (
                                                        <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white px-4 py-3 rounded-lg text-sm backdrop-blur-sm z-10">
                                                            <div className="flex flex-col space-y-2">
                                                                <div className="flex items-center space-x-2">
                                                                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                                                    </svg>
                                                                    <span className="font-semibold">360° Interactive Tour</span>
                                                                </div>
                                                                <div className="text-xs opacity-90">
                                                                    • Click and drag to look around
                                                                    • Use mouse wheel to zoom in/out
                                                                    • Double-click to enter fullscreen
                                                                    • On mobile: Touch and drag to explore
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <img
                                                    src={venue.image}
                                                    alt={venue.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                                                <span className="text-gold font-semibold">{venue.squareFeet} sq ft</span>
                                            </div>
                                            
                                            {/* Fullscreen Tour Button for 360 tours */}
                                            {venue.tourUrl && (
                                                <button
                                                    onClick={() => openTourInNewTab(venue.tourUrl!)}
                                                    className="absolute top-6 left-6 bg-gold/90 hover:bg-gold text-white backdrop-blur-sm rounded-full p-3 transition-all duration-300 transform hover:scale-105 group"
                                                    title="Open 360° tour in fullscreen"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                    </svg>
                                                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                        Open Fullscreen
                                                    </span>
                                                </button>
                                            )}
                                            {venue.tourUrl && (
                                                <div className="absolute top-6 left-6 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                                                    360° Interactive Tour
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute -inset-4 bg-gold/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                    </div>

                                    {/* Content Section */}
                                    <div className={`${idx % 2 === 1 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                                        {/* <div className="flex items-center mb-4">
                                            <div className="w-12 h-px bg-gold mr-4"></div>
                                            <span className="text-gold font-semibold tracking-widest text-sm uppercase">{venue.id.split('-').join(' ').toUpperCase()}</span>
                                        </div> */}
                                        <h3 className="text-4xl font-serif font-light text-gray-900 mb-6 leading-tight">
                                            {venue.name}
                                        </h3>
                                        <p className="text-lg text-gray-700 leading-relaxed font-light mb-8">
                                            {venue.description}
                                        </p>

                                        {/* Enhanced Capacity Display */}
                                        <div className="grid grid-cols-2 gap-6 mb-8">
                                            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-lg">
                                                <h4 className="text-sm font-medium text-gray-500 mb-3">Square Feet</h4>
                                                <p className="text-3xl font-bold text-gold">{venue.squareFeet}</p>
                                            </div>

                                            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-lg">
                                                <h4 className="text-sm font-medium text-gray-500 mb-3">Capacity</h4>
                                                <div className="space-y-2">
                                                    {capacityTypes.map((type) => (
                                                        <div key={type.id} className="flex justify-between items-center">
                                                            <span className="text-sm text-gray-600">{type.name}</span>
                                                            <span className="font-bold text-gray-800">{venue[type.id as keyof typeof venue]}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <a
                                            href="https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                                        >
                                            Book This Venue
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Rest of the sections remain the same... */}
                {/* Enhanced Capacity Charts Section */}
                <section className="py-24 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">CAPACITY CHARTS</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                Venue Capacity Charts
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                                Compare our venue capacities and find the perfect space for your event
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-2xl border border-gold/10">
                            <h3 className="text-2xl font-serif font-light text-gray-800 mb-8 text-center">Capacity - Theater Style, Banquet Style</h3>

                            <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gold to-gold-dark text-white">
                                            <th className="p-6 text-left font-semibold text-lg font-serif">Venue</th>
                                            <th className="p-6 text-center font-semibold text-lg font-serif">Square Feet</th>
                                            <th className="p-6 text-center font-semibold text-lg font-serif">Theater Style</th>
                                            <th className="p-6 text-center font-semibold text-lg font-serif">Banquet Style</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {venues.map((venue, index) => (
                                            <tr
                                                key={venue.id}
                                                className={`transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-gold/5 group`}
                                                onMouseEnter={() => setActiveVenue(venue.id)}
                                            >
                                                <td className="p-6 font-medium border-b border-gray-200 group-hover:border-gold/30 transition-colors duration-300">
                                                    <div className="flex items-center">
                                                        <div className="w-2 h-2 bg-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        {venue.name}
                                                    </div>
                                                </td>
                                                <td className="p-6 text-center border-b border-gray-200 font-semibold text-gray-800 group-hover:border-gold/30 transition-colors duration-300">
                                                    {venue.squareFeet}
                                                </td>
                                                <td className="p-6 text-center border-b border-gray-200 group-hover:border-gold/30 transition-colors duration-300">
                                                    <span className="bg-blue-100 text-blue-800 py-2 px-4 rounded-full text-sm font-semibold border border-blue-200">
                                                        {venue.theater}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-center border-b border-gray-200 group-hover:border-gold/30 transition-colors duration-300">
                                                    <span className="bg-green-100 text-green-800 py-2 px-4 rounded-full text-sm font-semibold border border-green-200">
                                                        {venue.banquet}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-lg">
                                    <h4 className="text-xl font-serif font-light text-gray-800 mb-6">Layout Examples</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center p-4 bg-blue-50/50 rounded-xl border border-blue-200">
                                            <div className="w-6 h-6 bg-blue-500 rounded-full mr-4 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            <span className="text-gray-700 font-medium">Theater Style: Rows of chairs facing forward for presentations</span>
                                        </div>
                                        <div className="flex items-center p-4 bg-green-50/50 rounded-xl border border-green-200">
                                            <div className="w-6 h-6 bg-green-500 rounded-full mr-4 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                            <span className="text-gray-700 font-medium">Banquet Style: Round tables with seating for dining events</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 shadow-lg">
                                    <h4 className="text-xl font-serif font-light text-gray-800 mb-6">Planning Guidance</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-start p-3 hover:bg-gold/5 rounded-lg transition-colors duration-300">
                                            <span className="text-gold mr-3 text-lg mt-1">•</span>
                                            <span className="text-gray-700">Add 10-15% extra capacity for guest comfort and movement</span>
                                        </li>
                                        <li className="flex items-start p-3 hover:bg-gold/5 rounded-lg transition-colors duration-300">
                                            <span className="text-gold mr-3 text-lg mt-1">•</span>
                                            <span className="text-gray-700">Consider additional space for dance floors, stages, or buffet stations</span>
                                        </li>
                                        <li className="flex items-start p-3 hover:bg-gold/5 rounded-lg transition-colors duration-300">
                                            <span className="text-gold mr-3 text-lg mt-1">•</span>
                                            <span className="text-gray-700">Our event planners can help optimize your layout for the best experience</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Photo Galleries Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">GALLERIES</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                Venue Galleries
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                                Explore our stunning venues through these captivating visuals
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {venues.map((venue) => (
                                <div
                                    key={venue.id}
                                    className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                    onClick={() => setActiveVenue(venue.id)}
                                >
                                    <img
                                        src={venue.image}
                                        alt={venue.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                                        <div className="text-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="font-semibold text-lg mb-2">{venue.name}</h3>
                                            <div className="w-12 h-px bg-gold mx-auto mb-2"></div>
                                            <p className="text-sm opacity-90">{venue.squareFeet} sq ft</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span className="text-gold font-bold text-lg">+</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-16">
                            <button
                                onClick={() => setShowBookingForm(true)}
                                className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
                            >
                                Book Your Event
                                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Enhanced CTA Section */}
                <section className="py-24  relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 text-center relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-black mr-4"></div>
                                <span className="text-black font-semibold tracking-widest text-sm uppercase">GET STARTED</span>
                                <div className="w-20 h-px bg-black ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-black mb-6">
                                Plan Your Next Event With Us
                            </h2>
                            <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto font-light">
                                Let us help you create an unforgettable experience in our exceptional venues. 
                                Your perfect event starts here.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button
                                    onClick={() => setShowBookingForm(true)}
                                    className="bg-black text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
                                >
                                    Book Your Event
                                </button>
                                <Link 
                                    href="/contact" 
                                    className="border-2 border-black text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white transform hover:scale-105"
                                >
                                    Schedule a Tour
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EventVenue;