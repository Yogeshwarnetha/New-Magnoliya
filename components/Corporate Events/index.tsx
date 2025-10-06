"use client";
import { useState } from 'react';
import Link from 'next/link';

const CorporateEvents = () => {
    const [activeEventType, setActiveEventType] = useState('conferences');
    const [activeFeature, setActiveFeature] = useState(0);

    const eventTypes = [
        {
            id: 'conferences',
            name: 'Conferences & Seminars',
            description: 'Professional settings for knowledge sharing and industry events',
            image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            features: ['Stage setups', 'Presentation equipment', 'Breakout rooms', 'Registration areas']
        },
        {
            id: 'meetings',
            name: 'Business Meetings',
            description: 'Productive environments for corporate discussions and decision making',
            image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            features: ['Boardroom setups', 'Video conferencing', 'Catering services', 'Professional ambiance']
        },
        {
            id: 'training',
            name: 'Training Sessions',
            description: 'Interactive spaces for workshops and employee development',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            features: ['Classroom setups', 'Interactive technology', 'Work materials space', 'Comfortable seating']
        },
        {
            id: 'corporate-social',
            name: 'Corporate Social Events',
            description: 'Spaces for celebrations, team building, and company milestones',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            features: ['Entertainment space', 'Catering options', 'Social seating', 'Celebration décor']
        }
    ];

    const eventServices = [
        {
            title: "Planning & Coordination",
            description: "Our team is here to ensure every detail of your event runs seamlessly. From the moment you book with us, we work alongside you to plan layouts, timelines, and logistics, making sure the setup and flow of your celebration feel effortless and well-organized.",
            icon: "📋"
        },
        {
            title: "Event Design & Direction",
            description: "We help bring your vision to life by guiding the direction of your event and making the most of our versatile spaces. Whether your style is modern, classic, or something in between, our team ensures the venue is arranged to complement your theme and support the experience you want to create.",
            icon: "🎨"
        },
        {
            title: "Lighting & AV",
            description: "Our venue is equipped with the latest lighting and audiovisual technology to enhance your event atmosphere. From dynamic lighting options to crisp sound and projection, we provide the tools that allow your event to shine and keep your guests engaged.",
            icon: "💡"
        },
        {
            title: "Vendors & Partnerships",
            description: "Through our exclusive network of trusted vendors, we connect you with professionals who can provide catering, décor, and additional services to enhance your event. While our expertise lies in planning the layout, flow, and setup of the venue, our established partnerships ensure you have access to reliable resources that align seamlessly with your vision.",
            icon: "🤝"
        }
    ];

    const technologyFeatures = [
        {
            title: "Latest Lighting Technology",
            description: "Create just the right ambiance with our advanced lighting systems. Designed for flexibility and impact, our lighting capabilities help set the mood for everything from intimate gatherings to large celebrations.",
            image: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Live Streaming & Hybrid Event Capabilities",
            description: "Stay connected with guests near and far through our live streaming and hybrid event options. With reliable AV support, we make it easy to share your event in real time, ensuring no one misses a moment.",
            image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "State-of-the-Art Audio Systems",
            description: "Crystal clear audio delivery for presentations, discussions, and entertainment with professional sound engineering support.",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const testimonials = [
        {
            text: "The corporate retreat was a huge success. The facilities and service were exceptional. Everything ran smoothly from start to finish.",
            author: "John Smith",
            company: "Tech Conference Organizer"
        },
        {
            text: "We've hosted multiple events at Magnoliya Grand and each time the experience has been flawless. The team understands corporate needs perfectly.",
            author: "Sarah Johnson",
            company: "Marketing Director"
        },
        {
            text: "The AV capabilities and flexible spaces made our hybrid conference a great success. Both in-person and remote attendees had an excellent experience.",
            author: "Michael Chen",
            company: "Event Planner"
        }
    ];

    const selectedEventType = eventTypes.find(type => type.id === activeEventType) || eventTypes[0];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Corporate Event"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4">Corporate Events</h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Professional settings for successful business gatherings
                        </p>
                    </div>
                </div>
            </section>

            {/* Event Types */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Corporate Event Solutions</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Versatile spaces and professional services for all types of business events
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {eventTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setActiveEventType(type.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeEventType === type.id
                                    ? 'bg-gold text-white shadow-lg transform -translate-y-1'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                    }`}
                            >
                                {type.name}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                            <div className="h-96 lg:h-full">
                                <img
                                    src={selectedEventType.image}
                                    alt={selectedEventType.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">
                                    {selectedEventType.name}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {selectedEventType.description}
                                </p>

                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features:</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {selectedEventType.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="text-gold mr-2">•</span>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    Plan Your Event
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event Services */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Comprehensive Event Services</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            End-to-end solutions for successful corporate events
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {eventServices.map((service, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Features */}
            {/* <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Advanced Technology Solutions</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            State-of-the-art equipment and capabilities for modern corporate events
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {technologyFeatures.map((feature, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gold-light rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">Need Custom Technology Solutions?</h3>
                        <p className="text-gray-700 mb-6">
                            Our technical team can create tailored AV and technology setups for your specific event requirements.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Discuss Technical Requirements
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section> */}

            {/* Testimonials */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Client Success Stories</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Hear from businesses that have hosted successful events with us
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="text-4xl text-gold mb-4">"</div>
                                <p className="text-lg text-gray-700 italic mb-6">{testimonial.text}</p>
                                <div>
                                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Plan Your Next Corporate Event</h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        Let us help you create a productive and successful business gathering
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl">
                            Request a Proposal
                        </Link>
                        <Link href="/venues" className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                            View Venues
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CorporateEvents;