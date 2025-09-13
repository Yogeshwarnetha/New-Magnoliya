// app/about/page.tsx
import Link from 'next/link';

const About = () => {
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <section className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Magnoliya Grand Event Space"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Magnoliya Grand</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            Where meaningful moments become unforgettable celebrations
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 bg-white">
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
            <section className="py-16 bg-green-50">
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

            {/* Leadership Team */}
            <section className="py-16 bg-white">
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
            </section>

            {/* Awards & Recognition */}
            <section className="py-16 bg-gray-100">
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
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Experience the Magnoliya Difference</h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        Let us help you create unforgettable memories at our exceptional venue
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl">
                            Plan Your Event
                        </Link>
                        <Link href="/gallery" className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                            View Gallery
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;