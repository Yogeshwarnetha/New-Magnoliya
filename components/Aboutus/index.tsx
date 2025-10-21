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
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Decorative background image used on the Homepage
    const backgroundImage = "https://pub-5508d64e14364eca9f48ef0efa18bda5.r2.dev/center-bg.png";

    // Enhanced Carousel slides for hero section
    const carouselSlides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            title: "About Magnoliya Grand",
            description: "Where meaningful moments become unforgettable celebrations"
        },
        {
            id: 2,
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/BallRoom.jpeg",
            title: "Our Legacy",
            description: "Crafting exceptional experiences since our inception"
        },
        {
            id: 3,
            image: "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FrontPre.jpg",
            title: "Your Vision",
            description: "Transforming dreams into reality with every celebration"
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
                {/* Enhanced Hero Carousel Section */}
                <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
                    <div className="absolute inset-0">
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
                                    {/* Enhanced gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                                    
                                    {/* Enhanced Slide content */}
                                    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                                        <div className="px-6 max-w-4xl">
                                            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
                                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-6 leading-tight text-white">
                                                {slide.title}
                                            </h1>
                                            {/* <p className="text-xl md:text-2xl text-gold font-light mb-8 max-w-2xl mx-auto">
                                                {slide.description}
                                            </p> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Carousel Navigation */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-gold transition-all duration-300 z-20 hover:scale-110 hover:shadow-2xl"
                        aria-label="Previous slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 backdrop-blur-sm rounded-full p-4 hover:bg-gold transition-all duration-300 z-20 hover:scale-110 hover:shadow-2xl"
                        aria-label="Next slide"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Enhanced Carousel Indicators */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
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

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="animate-bounce">
                            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Our Story Section */}
                <section className="py-24 relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full translate-x-1/3 translate-y-1/3"></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-6">
                                <div className="w-20 h-px bg-gold mr-4"></div>
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">OUR STORY</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-6">
                                Our Story & Legacy
                            </h2>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="space-y-8 text-lg text-gray-700 font-light leading-relaxed">
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

                {/* Enhanced Sustainability Section */}
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
                                <span className="text-gold font-semibold tracking-widest text-sm uppercase">SUSTAINABILITY</span>
                                <div className="w-20 h-px bg-gold ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
                                Our Commitment to Sustainability
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                                At Magnoliya Grand, we believe that unforgettable events can be hosted responsibly. We are committed to reducing our environmental footprint while still delivering exceptional experiences for our guests.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {[
                                {
                                   
                                    title: "Energy Efficiency",
                                    description: "Our event spaces utilize modern, energy-efficient lighting and climate control systems to reduce overall consumption without compromising comfort."
                                },
                                {
                                   
                                    title: "Waste Reduction",
                                    description: "We partner with local recycling programs and encourage sustainable décor choices, helping to minimize waste from each event."
                                },
                                {
                                   
                                    title: "Eco-Friendly Catering",
                                    description: "From locally sourced ingredients to customizable plant-forward menus, we offer catering choices that are as kind to the environment as they are delicious."
                                },
                                {
                                    
                                    title: "Water Conservation",
                                    description: "Our facility uses smart water systems to reduce waste while maintaining the highest standards of cleanliness and hospitality."
                                }
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
                                >
                                    {/* <div className="text-4xl mb-4">{feature.icon}</div> */}
                                    <h3 className="text-2xl font-serif font-light text-green-700 mb-4">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed font-light">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border border-gold/20">
                                <p className="text-2xl font-serif font-light text-green-800">
                                    By choosing Magnoliya Grand, you're not just celebrating a moment — you're supporting a greener future.
                                </p>
                            </div>
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
                                <span className="text-black font-semibold tracking-widest text-sm uppercase">EXPERIENCE THE DIFFERENCE</span>
                                <div className="w-20 h-px bg-black ml-4"></div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-light text-black mb-6">
                                Experience the Magnoliya Difference
                            </h2>
                            <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto font-light">
                                Let us help you create unforgettable memories at our exceptional venue
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="#contact" className="bg-black text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
                                    Plan Your Event
                                </a>
                                <Link href="/gallery" className="border-2 border-black text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white transform hover:scale-105">
                                    View Gallery
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;