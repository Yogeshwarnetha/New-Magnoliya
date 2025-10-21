"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CorporateEvents = () => {
    const [activeEventType, setActiveEventType] = useState('conferences');
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);
    const [backgroundTop, setBackgroundTop] = useState<number | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Decorative background image used on the Homepage
    const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";

    // Enhanced hero carousel slides
    const carouselSlides = [
        {
            id: 1,
            image: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/d58236b5-9d93-49d9-9180-091813755df9.png",
            title: "Corporate Events",
            description: "Professional settings for successful business gatherings"
        },
        {
            id: 2,
            image: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/d58236b5-9d93-49d9-9180-091813755df9.png",
            title: "Business Excellence",
            description: "Spaces designed for productivity and success"
        },
        {
            id: 3,
            image: "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/d58236b5-9d93-49d9-9180-091813755df9.png",
            title: "Professional Gatherings",
            description: "Where business meets exceptional experience"
        }
    ];

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

    // Carousel auto-play effect
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, carouselSlides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % carouselSlides.length);
    };

    const prevSlide = () => {
        goToSlide((currentSlide - 1 + carouselSlides.length) % carouselSlides.length);
    };

    const eventTypes = [
        {
            id: 'conferences',
            name: 'Conferences & Seminars',
            description: 'Professional settings for knowledge sharing and industry events where innovation meets inspiration. Our state-of-the-art facilities provide the perfect backdrop for thought leadership and professional development.',
            image: 'https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/1b916c7f-00a0-400a-b715-7771193d4ed0.png',
            features: ['Stage setups', 'Presentation equipment', 'Breakout rooms', 'Registration areas', 'Networking lounges', 'VIP sections']
        },
        {
            id: 'meetings',
            name: 'Business Meetings',
            description: 'Productive environments for corporate discussions and strategic decision making. Designed to foster collaboration and drive business success with sophisticated ambiance and cutting-edge technology.',
            image: 'https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/164bbd42-0d14-40d1-b8bf-178b83b0043b.png',
            features: ['Boardroom setups', 'Video conferencing', 'Catering services', 'Professional ambiance', 'Executive lounges', 'Private dining']
        },
        {
            id: 'training',
            name: 'Training Sessions',
            description: 'Interactive spaces for workshops and employee development that inspire learning and growth. Our flexible training environments adapt to your unique educational needs and team dynamics.',
            image: 'https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/828a8f92f0d44aba32f486a29ae23a07fea4e203.jpeg',
            features: ['Classroom setups', 'Interactive technology', 'Work materials space', 'Comfortable seating', 'Breakout areas', 'Learning labs']
        },
        {
            id: 'corporate-social',
            name: 'Corporate Social Events',
            description: 'Elegant spaces for celebrations, team building, and company milestones. Transform ordinary gatherings into extraordinary experiences that strengthen corporate culture and celebrate success.',
            image: 'https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/d58236b5-9d93-49d9-9180-091813755df9.png',
            features: ['Entertainment space', 'Catering options', 'Social seating', 'Celebration décor', 'Dance floors', 'Themed environments']
        }
    ];

    const eventServices = [
        {
            title: "Planning & Coordination",
            description: "Our dedicated team ensures every detail of your event runs with precision and grace. From the initial concept to final execution, we work alongside you to create layouts, timelines, and logistics that transform your vision into reality.",
        },
        {
            title: "Event Design & Direction",
            description: "We bring your corporate vision to life through sophisticated design and strategic direction. Whether your style is modern minimalism or classic elegance, our team crafts environments that reflect your brand identity and support your business objectives.",
        },
        {
            title: "Lighting & AV",
            description: "Our venues feature the latest lighting and audiovisual technology to create immersive event experiences. From dynamic lighting environments to crystal-clear sound and high-definition projection, we provide the tools that make your message resonate.",
        },
        {
            title: "Vendors & Partnerships",
            description: "Through our exclusive network of trusted vendors, we connect you with professionals who provide exceptional catering, décor, and specialized services. Our established partnerships ensure seamless integration of all event elements.",
        }
    ];

    const testimonials = [
        {
            text: "The corporate retreat was a monumental success. The facilities and service were exceptional beyond measure. Every detail was executed with precision, creating an environment where business flourished and connections deepened.",
            author: "John Smith",
            company: "Tech Conference Organizer"
        },
        {
            text: "We've hosted multiple events at Magnoliya Grand and each experience has been flawless. The team understands corporate needs with remarkable insight, anticipating requirements before we even articulate them.",
            author: "Sarah Johnson",
            company: "Marketing Director"
        },
        {
            text: "The AV capabilities and flexible spaces made our hybrid conference an outstanding success. Both in-person and remote attendees experienced seamless engagement and professional production quality.",
            author: "Michael Chen",
            company: "Event Planner"
        }
    ];

    const selectedEventType = eventTypes.find(type => type.id === activeEventType) || eventTypes[0];

    const handleTabClick = (eventId: string) => {
        console.log('Tab clicked:', eventId);
        setActiveEventType(eventId);
    };

    const handleKeyDown = (e: React.KeyboardEvent, eventId: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setActiveEventType(eventId);
        }
    };

    return (
        <div className="relative min-h-screen bg-white">
            {/* FIXED: Background with proper z-index */}
            <div
                className="absolute left-0 right-0 z-0"
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

            {/* FIXED: Content with higher z-index */}
            <div className="relative z-20">
                {/* Hero Section with proper z-index containment */}
                <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden z-10">
                    <div className="absolute inset-0 z-0">
                        {/* Carousel Container */}
                        <div className="relative w-full h-full">
                            {carouselSlides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                        index === currentSlide 
                                            ? 'opacity-100 transform translate-x-0' 
                                            : 'opacity-0 transform translate-x-4'
                                    }`}
                                >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* FIXED: Gradient overlays with proper z-index */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10"></div>
                                    
                                    {/* Slide content */}
                                    <div className="absolute inset-0 flex items-center justify-center text-center text-white z-20">
                                        <div className="px-6 max-w-4xl">
                                            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
                                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-tight text-white">
                                                {slide.title}
                                            </h1>
                                            <p className="text-xl md:text-2xl text-gold font-light mb-8 max-w-2xl mx-auto">
                                                {slide.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Navigation - HIGH z-index */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-gold transition-all duration-300 z-50 hover:scale-110 hover:shadow-2xl"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-gold transition-all duration-300 z-50 hover:scale-110 hover:shadow-2xl"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Carousel Indicators - HIGH z-index */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
                        {carouselSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                                    index === currentSlide 
                                    ? 'bg-gold scale-125 shadow-lg' 
                                    : 'bg-white/50 hover:bg-white/70'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Scroll indicator - HIGH z-index */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                        <div className="animate-bounce">
                            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Event Types Section - HIGH z-index and no overlay issues */}
                <section className="py-24 relative overflow-hidden z-30">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full translate-x-1/3 translate-y-1/3 z-0"></div>
                    
                    <div className="container mx-auto px-6 relative z-40">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">BUSINESS SOLUTIONS</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-6">
                                Corporate Event Solutions
                            </h2>
                            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed">
                                Versatile spaces and professional services meticulously designed for all types of business events. 
                                Where corporate vision meets exceptional execution.
                            </p>
                        </div>

                        {/* Event Type Navigation - HIGH z-index and clickable */}
                        <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-50">
                            {eventTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => handleTabClick(type.id)}
                                    onKeyDown={(e) => handleKeyDown(e, type.id)}
                                    className={`px-8 py-4 rounded-full font-medium transition-all duration-300 relative z-50 cursor-pointer ${
                                        activeEventType === type.id
                                            ? 'bg-gold text-white shadow-2xl -translate-y-1'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-100'
                                    }`}
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>

                        {/* Event Type Display */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 relative z-40">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <div className="h-96 lg:h-full group overflow-hidden">
                                    <img
                                        src={selectedEventType.image}
                                        alt={selectedEventType.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                <div className="p-12">
                                    <h3 className="text-4xl font-serif font-light text-gray-800 mb-6">
                                        {selectedEventType.name}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                                        {selectedEventType.description}
                                    </p>

                                    <div className="mb-8">
                                        <h4 className="text-xl font-serif font-light text-gray-800 mb-4">Key Features:</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedEventType.features.map((feature, index) => (
                                                <div key={index} className="flex items-center group hover:bg-gold/5 rounded-2xl p-3 transition-all duration-300">
                                                    <span className="w-2 h-2 bg-gold rounded-full mr-4 flex-shrink-0"></span>
                                                    <span className="text-gray-700 font-light text-lg">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl group relative z-40"
                                    >
                                        Plan Your Event
                                        <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Rest of the sections with proper z-index */}
                <section className="py-24 relative overflow-hidden z-30">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5 z-0">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-40">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">COMPREHENSIVE SERVICES</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                Comprehensive Event Services
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                                End-to-end solutions meticulously crafted for successful corporate events
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-40">
                            {eventServices.map((service, index) => (
                                <div 
                                    key={index} 
                                    className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 relative z-40"
                                >
                                    <h3 className="text-2xl font-serif font-light text-gray-800 mb-4">{service.title}</h3>
                                    <p className="text-gray-600 leading-relaxed font-light text-lg">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-24 relative overflow-hidden z-30">
                    <div className="container mx-auto px-6 relative z-40">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">CLIENT SUCCESS</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                Client Success Stories
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                                Hear from businesses that have hosted exceptional events with us
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-40">
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={index} 
                                    className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 relative z-40"
                                >
                                    <div className="text-5xl text-gold mb-6 transform group-hover:scale-110 transition-transform duration-300">"</div>
                                    <p className="text-lg text-gray-700 italic mb-8 leading-relaxed font-light">{testimonial.text}</p>
                                    <div className="border-t border-gray-200 pt-6">
                                        <p className="font-semibold text-gray-800 text-lg">{testimonial.author}</p>
                                        <p className="text-sm text-gray-600 font-light">{testimonial.company}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden z-30">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 z-0">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>

                    <div className="container mx-auto px-6 text-center relative z-40">
                        <h2 className="text-4xl md:text-5xl font-serif font-light text-black mb-8">Plan Your Next Corporate Event</h2>
                        <p className="text-xl text-black mb-12 max-w-3xl mx-auto font-light">
                            Let us help you create a productive and successful business gathering that exceeds expectations
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-40">
                            <Link 
                                href="/contact" 
                                className="bg-black text-white font-semibold py-4 px-12 rounded-xl transition-all duration-500 hover:shadow-2xl transform hover:scale-105 group relative z-40"
                            >
                                Request a Proposal
                                <svg className="w-5 h-5 ml-3 inline transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link 
                                href="/venues" 
                                className="border-2 border-black text-black font-semibold py-4 px-12 rounded-xl transition-all duration-500 hover:bg-black hover:text-white transform hover:scale-105 relative z-40"
                            >
                                View Venues
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CorporateEvents;