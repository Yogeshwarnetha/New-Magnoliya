"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";

const Privacy = () => {
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

    return (
        <div className="relative min-h-screen">
            {/* Decorative repeating background */}
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
                {/* Banner Section */}
                <section ref={heroRef} className="relative h-64 md:h-80 overflow-hidden">
                    <img
                        src="https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/FoodBeveragesHeroBanner.jpg"
                        alt="Privacy Policy Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                        <div className="px-4">
                            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Privacy Policy</h1>
                            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                                Protecting your privacy and personal information
                            </p>
                        </div>
                    </div>
                </section>

                {/* Privacy Policy Content */}
                <main className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl my-12 border border-gray-100">
                    <div className="text-center mb-8">
                        <p className="text-lg text-gray-600 mb-2">Effective date: 21 October 2025</p>
                        <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">1</span>
                                </div>
                                Overview
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                This Privacy Policy explains how Magnoliya Grand collects, uses, discloses, and protects 
                                personal information when you visit our website or use our services. We are committed to 
                                protecting your privacy and complying with applicable data protection laws.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">2</span>
                                </div>
                                Information We Collect
                            </h2>
                            <p className="text-gray-700 mb-4 text-lg">
                                We may collect the following categories of information:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Contact and identity details (name, email, phone number)</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Booking and payment information</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Communications you send to us</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Technical data (IP address, browser type)</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Usage data and analytics</span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">3</span>
                                </div>
                                How We Use Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                We use personal information to operate and improve our services, process bookings and 
                                payments, communicate with you, detect fraud, and comply with legal obligations. Where 
                                required by law, we will obtain your consent before processing.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">4</span>
                                </div>
                                Cookies & Tracking
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                We use cookies and similar technologies to provide core site functionality, analyze site 
                                usage, and personalize content. You can manage cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">5</span>
                                </div>
                                Sharing & Disclosure
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                We may share information with service providers who perform services on our behalf 
                                (payment processors, analytics providers) and when required by law or to protect rights 
                                and safety. We do not sell personal data to third parties.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">6</span>
                                </div>
                                International Transfers
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Personal data may be transferred and stored in locations outside your country. Where 
                                transfers occur, we will ensure appropriate safeguards are in place in accordance with 
                                applicable law.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">7</span>
                                </div>
                                Data Security
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                We implement reasonable technical and organizational measures to protect personal 
                                information from unauthorized access, alteration, disclosure, or destruction. However, 
                                no method of transmission over the internet is completely secure.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">8</span>
                                </div>
                                Your Rights
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Depending on your jurisdiction, you may have rights to access, correct, delete, or 
                                restrict the processing of your personal data, and to receive a copy in a portable 
                                format. To exercise these rights, contact us using the details below.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">9</span>
                                </div>
                                Retention
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                We retain personal information only as long as necessary for the purposes described 
                                and to comply with legal obligations. Retention periods vary based on the data 
                                category and purpose.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">10</span>
                                </div>
                                Children
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Our services are not intended for children under the age of 16. We do not knowingly 
                                collect personal information from children without parental consent. If you believe 
                                we have collected information from a child, please contact us.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">11</span>
                                </div>
                                Changes to this Policy
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                We may update this Privacy Policy from time to time. Material changes will be 
                                published on this page with a new effective date.
                            </p>
                        </section>

                        <section className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                            <h2 className="text-2xl font-serif font-bold text-gold mb-4 flex items-center">
                                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-gold font-bold">12</span>
                                </div>
                                Contact
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                For privacy questions or to exercise your rights, please contact us at{" "}
                                <a 
                                    href="mailto:privacy@magnoliyagrand.com" 
                                    className="text-gold font-semibold hover:text-gold-dark transition-colors duration-300"
                                >
                                    sales@magnoliyagrand.com
                                </a>
                                .
                            </p>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Privacy;