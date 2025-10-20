// app/about/page.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const About = () => {
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

    // Decorative background image used on the Homepage
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

    const getLocalDateString = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const minEventDate = getLocalDateString(new Date());

    const toggleFAQ = (index: number) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    const leadershipTeam = [
        {
            name: "John Smith",
            title: "General Manager",
            description: "With over 15 years in hospitality management, John leads our team with passion and dedication to excellence.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Sarah Johnson",
            title: "Events Director",
            description: "Sarah brings creative vision and meticulous planning to every event, ensuring each celebration is truly unique.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Michael Chen",
            title: "Culinary Director",
            description: "Award-winning chef Michael creates exceptional dining experiences that delight our guests' palates.",
            image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    const awards = [
        {
            title: "Best Wedding Venue 2023",
            organization: "Northern Virginia Events Association",
            year: "2023"
        },
        {
            title: "Sustainability Excellence Award",
            organization: "Green Events Initiative",
            year: "2022"
        },
        {
            title: "Top Event Space in DC Metro Area",
            organization: "Washington Life Magazine",
            year: "2022"
        },
        {
            title: "Hospitality Excellence",
            organization: "Virginia Tourism Corporation",
            year: "2021"
        }
    ];

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

    return (
        <div className="relative min-h-screen">
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
                {/* Hero Banner */}
                <section ref={heroRef} className="relative h-[420px] md:h-[520px] lg:h-[620px] overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <img
                        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="Magnoliya Grand Event Space"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                        <div className="px-4">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4">About Magnoliya Grand</h1>
                            <p className="text-lg md:text-xl max-w-2xl mx-auto">
                                Where meaningful moments become unforgettable celebrations
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6 text-center">Our Story & Legacy</h2>
                            <div className="space-y-6 text-lg text-gray-600">
                                <p>
                                    Magnoliya Grand was built on a simple belief: life's most meaningful moments deserve to be celebrated in a place as exceptional as the people who create them. Our journey began with a vision to craft more than just an event space — we wanted to create a destination where love stories are told, milestones are honored, and connections are strengthened.
                                </p>
                                <p>
                                    From the very start, we have been passionate about curating experiences that leave a lasting impression. Weddings are at the heart of what we do — we take pride in turning "I do" into unforgettable celebrations that reflect each couple's unique story. But our legacy goes beyond weddings.
                                </p>
                                <p>
                                    Whether it's a milestone birthday, a corporate conference, a fundraising gala, or a family reunion, every event here is treated with the same level of care, creativity, and attention to detail.
                                </p>
                                <p>
                                    Our venue is directly attached to the Hilton Garden Inn next door, offering the convenience of on-site accommodations for you and your guests. This seamless connection means your loved ones can celebrate late into the evening and simply walk to their rooms — making your event experience as stress-free as it is memorable.
                                </p>
                                <p>
                                    Located just outside Washington, D.C., and minutes from Dulles International Airport, Magnoliya Grand has become a gathering place for guests from near and far. Our versatile spaces, advanced technology, and expert team work together to ensure your event is seamless from start to finish.
                                </p>
                                <p>
                                    Our story continues to grow with every celebration that takes place within our walls. We invite you to become part of our legacy — and let Magnoliya Grand be the place where your most cherished memories are made.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sustainability Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6 text-center">Our Commitment to Sustainability</h2>
                            <p className="text-lg text-gray-600 mb-8 text-center">
                                At Magnoliya Grand, we believe that unforgettable events can be hosted responsibly. We are committed to reducing our environmental footprint while still delivering exceptional experiences for our guests.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-4 text-green-700">Energy Efficiency</h3>
                                    <p className="text-gray-600">
                                        Our event spaces utilize modern, energy-efficient lighting and climate control systems to reduce overall consumption without compromising comfort.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-4 text-green-700">Waste Reduction</h3>
                                    <p className="text-gray-600">
                                        We partner with local recycling programs and encourage sustainable décor choices, helping to minimize waste from each event.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-4 text-green-700">Eco-Friendly Catering</h3>
                                    <p className="text-gray-600">
                                        From locally sourced ingredients to customizable plant-forward menus, we offer catering choices that are as kind to the environment as they are delicious.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold mb-4 text-green-700">Water Conservation</h3>
                                    <p className="text-gray-600">
                                        Our facility uses smart water systems to reduce waste while maintaining the highest standards of cleanliness and hospitality.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 text-center">
                                <p className="text-lg font-semibold text-green-800">
                                    By choosing Magnoliya Grand, you're not just celebrating a moment — you're supporting a greener future.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Information & Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">Get In Touch</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Our team is ready to help you plan your next event. Reach out to us through any of the following methods:
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start">
                                    <div className="bg-gold rounded-full p-3 mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                                        <p className="text-gray-600">7001 Infantry Ridge Rd,</p>
                                        <p className="text-gray-600">Manassas, VA 20109</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-gold rounded-full p-3 mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                                        <p className="text-gray-600">
                                            <a href="tel:+17038435536" aria-label="Call Magnoliya Grand" className="hover:underline">
                                                +1 (703) 843-5536
                                            </a>
                                        </p>
                                        <p className="text-gray-600">
                                            <a href="tel:+170384435649" aria-label="Call Magnoliya Grand secondary" className="hover:underline">
                                                +1 (703) 844-35649
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-gold rounded-full p-3 mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                                        <p className="text-gray-600">
                                            <a href="mailto:sales@magnoliyagrand.com" aria-label="Email Magnoliya Grand" className="hover:underline">
                                                sales@magnoliyagrand.com
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                {/* <div className="flex items-start">
                                    <div className="bg-gold rounded-full p-3 mr-4 flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Hours</h3>
                                        <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-600">Sunday: By appointment only</p>
                                    </div>
                                </div> */}
                            </div>

                            {/* Social Media Links */}
                            {/* <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-600 hover:text-gold transition-colors duration-300">
                                        <span className="sr-only">Facebook</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        ₹                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-gold transition-colors duration-300">
                                        <span className="sr-only">Instagram</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-gold transition-colors duration-300">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </div>
                            </div> */}
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">Send Us a Message</h2>

                            {isSubmitted ? (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                                    <p>Thank you for your message! We'll get back to you soon.</p>
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold focus:border-gold"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold focus:border-gold"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold focus:border-gold"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
                                        <select
                                            id="eventType"
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold focus:border-gold"
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
                                        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                                        <input
                                            type="date"
                                            id="eventDate"
                                            name="eventDate"
                                            value={formData.eventDate}
                                            onChange={handleChange}
                                            min={minEventDate}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold focus:border-gold"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                                        <input
                                            type="number"
                                            id="guests"
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            min="1"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold focus:border-gold"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold focus:border-gold"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

                {/* Google Maps Embed */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">Find Us</h2>
                        <div className="rounded-xl overflow-hidden shadow-xl">
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

                {/* FAQ Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-12 text-center">Frequently Asked Questions</h2>

                        <div className="max-w-4xl mx-auto space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="flex justify-between items-center w-full text-left py-4 font-semibold text-gray-800 hover:text-amber-400 transition-colors duration-300"
                                    >
                                        <span>{faq.question}</span>
                                        <svg
                                            className={`w-5 h-5 transition-transform duration-300 ${activeFAQ === index ? 'transform rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {activeFAQ === index && (
                                        <div className="pb-4 text-gray-600">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Leadership Team - Commented */}
                {/* <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-12 text-center">Leadership Team</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {leadershipTeam.map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="rounded-full overflow-hidden mx-auto mb-6 w-48 h-48 border-4 border-gold">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                                    <p className="text-gold mb-4">{member.title}</p>
                                    <p className="text-gray-600">{member.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Awards & Recognition - Commented */}
                {/* <section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-12 text-center">Awards & Recognitions</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {awards.map((award, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{award.title}</h3>
                                    <p className="text-gold mb-2">{award.organization}</p>
                                    <p className="text-gray-500">{award.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* CTA Section */}
                <section className="py-16 ">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Experience the Magnoliya Difference</h2>
                        <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                            Let us help you create unforgettable memories at our exceptional venue
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="#contact" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl">
                                Plan Your Event
                            </a>
                            <Link href="/gallery" className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                                View Gallery
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;