"use client";
import { useState, useEffect, useRef } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guests: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);
    const [backgroundTop, setBackgroundTop] = useState<number | null>(null);
    const heroRef = useRef<HTMLElement | null>(null);

    // Same decorative background image used on About page
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setIsSubmitted(true);

        // Reset form after submission
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                eventType: '',
                eventDate: '',
                guests: '',
                message: ''
            });
        }, 3000);
    };

    // Return local YYYY-MM-DD for date inputs to avoid timezone issues
    const getLocalDateString = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const minEventDate = getLocalDateString(new Date());

    const faqs = [
        {
            question: "What types of events do you host?",
            answer: "We host a wide variety of events including weddings, corporate events, social gatherings, conferences, and private parties. Our versatile spaces can accommodate events from 20 to 500 guests."
        },
        {
            question: "How far in advance should I book my event?",
            answer: "We recommend booking at least 6-12 months in advance for weddings and large events, and 3-6 months for corporate events and smaller gatherings. However, we can sometimes accommodate last-minute bookings based on availability."
        },
        {
            question: "Do you provide catering services?",
            answer: "Yes, we offer in-house catering through our multi-cuisine restaurant. We can customize menus to suit your event needs, dietary restrictions, and cultural preferences."
        },
        {
            question: "Is parking available for guests?",
            answer: "Yes, we offer ample complimentary parking for all guests. Valet parking services are also available for special events upon request."
        },
        {
            question: "Can I bring in my own vendors?",
            answer: "While we have preferred vendors we work with regularly, you may bring in your own vendors for certain services. All external vendors must be approved by our event management team and provide proof of insurance."
        }
    ];

    const toggleFAQ = (index: number) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    return (
        <div className="relative min-h-screen bg-white">
            {/* Decorative repeating background — start after hero (matches About page) */}
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
                        src="https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/DJI_0093.jpg"
                        alt="Contact Us"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                        <div className="px-4">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-white">Contact Us</h1>
                            {/* <p className="text-lg md:text-xl max-w-2xl mx-auto">
                                Get in touch to start planning your event
                            </p> */}
                        </div>
                    </div>
                </section>

                {/* Contact Information & Form */}
                <section className="py-24 relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full translate-x-1/3 translate-y-1/3"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Enhanced Contact Information */}
                            <div>
                                <div className="mb-8">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-px bg-gold mr-4"></div>
                                        <span className="text-gold font-semibold tracking-widest text-sm uppercase">CONTACT US</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6 leading-tight">
                                        Get In Touch
                                    </h2>
                                    <p className="text-xl text-gray-700 font-light">
                                        Our team is ready to help you plan your next event. Reach out to us through any of the following methods:
                                    </p>
                                </div>

                                <div className="space-y-8 mb-12">
                                    {[
                                        {
                                            icon: (
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            ),
                                            title: "Address",
                                            content: ["7001 Infantry Ridge Rd,", "Manassas, VA 20109"]
                                        },
                                        {
                                            icon: (
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            ),
                                            title: "Phone",
                                            content: [
                                                <a key="phone1" href="tel:+17038435536" aria-label="Call Magnoliya Grand" className="hover:underline transition-all duration-300">
                                                    +1 (703) 843-5536
                                                </a>,
                                                <a key="phone2" href="tel:+170384435649" aria-label="Call Magnoliya Grand secondary" className="hover:underline transition-all duration-300">
                                                    +1 (703) 844-35649
                                                </a>
                                            ]
                                        },
                                        {
                                            icon: (
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            ),
                                            title: "Email",
                                            content: [
                                                <a key="email" href="mailto:sales@magnoliyagrand.com" aria-label="Email Magnoliya Grand" className="hover:underline transition-all duration-300">
                                                    sales@magnoliyagrand.com
                                                </a>
                                            ]
                                        }
                                    ].map((contact, index) => (
                                        <div key={index} className="flex items-start group">
                                            <div className="bg-gold rounded-2xl p-4 mr-6 flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                                                {contact.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-serif font-light text-gray-800 mb-3">{contact.title}</h3>
                                                <div className="space-y-1">
                                                    {contact.content.map((item, i) => (
                                                        <p key={i} className="text-gray-700 font-light text-lg">{item}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Enhanced Contact Form */}
                            <div>
                                <div className="mb-8">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-px bg-gold mr-4"></div>
                                        <span className="text-gold font-semibold tracking-widest text-sm uppercase">SEND MESSAGE</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6 leading-tight">
                                        Send Us a Message
                                    </h2>
                                </div>

                                {isSubmitted ? (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-2xl mb-8 text-lg">
                                        <p>Thank you for your message! We'll get back to you soon.</p>
                                    </div>
                                ) : null}

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">Full Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-3">Event Type *</label>
                                            <select
                                                id="eventType"
                                                name="eventType"
                                                value={formData.eventType}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                            >
                                                <option value="">Select Event Type</option>
                                                <option value="wedding">Wedding</option>
                                                <option value="corporate">Corporate Event</option>
                                                <option value="social">Social Gathering</option>
                                                <option value="conference">Conference</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-3">Event Date</label>
                                            <input
                                                type="date"
                                                id="eventDate"
                                                name="eventDate"
                                                value={formData.eventDate}
                                                onChange={handleChange}
                                                min={minEventDate}
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-3">Number of Guests</label>
                                            <input
                                                type="number"
                                                id="guests"
                                                name="guests"
                                                value={formData.guests}
                                                onChange={handleChange}
                                                min="1"
                                                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Google Maps Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">LOCATION</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                Find Us
                            </h2>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gold/20">
                            <iframe
                                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d758.2429680661145!2d-77.51543335632445!3d38.805043902081664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b65d2cdbc0b3f9%3A0x5cbc9082e6b64c66!2sMagnoliya%20Grand%20Conference%20and%20Event%20center!5e0!3m2!1sen!2sin!4v1760907389364!5m2!1sen!2sin'
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Magnoliya Grand Location"
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* Enhanced FAQ Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">FAQ</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="group border-b border-gray-200 pb-6">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="flex justify-between items-center w-full text-left py-6 font-serif text-xl text-gray-800 hover:text-gold transition-all duration-300"
                                    >
                                        <span className="font-light">{faq.question}</span>
                                        <svg
                                            className={`w-6 h-6 transition-transform duration-300 ${activeFAQ === index ? 'transform rotate-180 text-gold' : 'text-gray-400'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {activeFAQ === index && (
                                        <div className="pb-4 text-gray-600 text-lg font-light leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced CTA Section */}
                <section className="py-24 relative overflow-hidden">
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
                                <span className="text-black font-semibold tracking-widest text-sm uppercase">READY TO PLAN YOUR EVENT?</span>
                                <div className="w-20 h-px bg-black ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-black mb-6">
                                Ready to Plan Your Event?
                            </h2>
                            <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto font-light">
                                Contact us today to start planning your unforgettable event at Magnoliya Grand
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="tel:7038435536" className="bg-black text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
                                    Call Now
                                </a>
                                <a href="#contact-form" className="border-2 border-black text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white transform hover:scale-105">
                                    Send Message
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ContactUs;