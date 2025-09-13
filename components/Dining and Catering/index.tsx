// app/dining/page.tsx
import Link from 'next/link';

const Dining = () => {
    const restaurants = [
        {
            name: "Magnoliya Multi Cuisine Restaurant",
            cuisine: "Fine Dining from Around the World",
            description: "Magnoliya Grand Multi Cuisine Restaurant offers fine dining from around the world in an elegant setting, making it a premier destination for beautiful events. Known for its diverse international menu including American, Mexican, Italian, Indian, and Middle Eastern food.",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            features: ["International Menu", "Elegant Setting", "Event Hosting"]
        },
        {
            name: "Garden and Grille Restaurant and Bar",
            cuisine: "Relaxed Yet Refined Dining",
            description: "Located within the Hilton Garden Inn, just steps away from our main venue, the Garden and Grille Restaurant and Bar has been serving hotel guests and local diners since its opening in 2020. Known for its relaxed yet refined atmosphere.",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            features: ["Freshly Prepared Dishes", "Handcrafted Cocktails", "Casual Atmosphere"]
        }
    ];

    const cateringOptions = [
        {
            title: "Indoor Catering",
            description: "Elegant plated dinners in our beautiful ballrooms with customizable menus and professional service.",
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Outdoor Catering",
            description: "Romantic sunset receptions on our waterfront terrace with scenic views and ambient lighting.",
            image: "https://images.unsplash.com/photo-1549451378-6e2e2c1c3c5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Garden Catering (Coming Soon)",
            description: "Truly unforgettable gatherings in our beautifully designed garden with natural surroundings.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];

    const culinaryTeam = [
        {
            title: "Skilled Experts",
            description: "Our culinary team is led by a high quality chef whose expertise extends far beyond regional specialties. With a mastery of Italian, Mexican, Middle Eastern, and a wide variety of global cuisines.",
            image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Sustainability",
            description: "Our food and beverage team is central to our commitment to sustainability. In our on-site kitchens, all food scraps are composted, and we work closely with community partners.",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            title: "Health & Safety",
            description: "Comprehensive health and safety training programs for all team members with enhanced protective measures and rigorous kitchen sanitation protocols.",
            image: "https://images.unsplash.com/photo-1585513360126-ec5c22663f6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Slideshow */}
            <section className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                    <div className="px-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Dining & Catering</h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                            Exceptional culinary experiences crafted by our award-winning chefs
                        </p>
                    </div>
                </div>
            </section>

            {/* Restaurants Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Our Restaurants</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our diverse culinary venues, each offering a unique atmosphere and exquisite flavors
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {restaurants.map((restaurant, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                                    <p className="text-gold mb-2 font-medium">{restaurant.cuisine}</p>
                                    <p className="text-gray-600 mb-4">{restaurant.description}</p>
                                    <ul className="flex flex-wrap gap-2 mb-6">
                                        {restaurant.features.map((feature, i) => (
                                            <li key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/reservations" className="text-gold font-medium hover:text-gold-dark transition-colors duration-300 flex items-center">
                                        Make Reservation
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Catering Options */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Catering Options</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide an array of unique settings for both indoor and outdoor dining experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {cateringOptions.map((option, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={option.image}
                                        alt={option.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                                    <p className="text-gray-600 mb-4">{option.description}</p>
                                    <Link href="/contact" className="text-gold font-medium hover:text-gold-dark transition-colors duration-300 flex items-center">
                                        Inquire About Catering
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Culinary Team */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Our Culinary Excellence</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Dedicated to quality, sustainability, and exceptional dining experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {culinaryTeam.map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="rounded-2xl overflow-hidden mb-6 shadow-lg">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-4">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-4">Our Catering Menus</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our diverse menu options for your next event
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gold">Magnoliya Multi Cuisine Restaurant</h3>
                            <div className="space-y-4">
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    American Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Mexican Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Italian Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Indian Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Middle Eastern Menu
                                </a>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gold">Garden and Grille Restaurant and Bar</h3>
                            <div className="space-y-4">
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Breakfast Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Lunch Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Dinner Menu
                                </a>
                                <a href="#" className="block py-2 px-4 bg-gray-100 hover:bg-gold hover:text-white rounded-lg transition-colors duration-300">
                                    Bar Menu
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-gold-light to-gold">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">Reserve Your Table</h2>
                    <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
                        Experience culinary excellence at Magnoliya Grand's award-winning restaurants
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/reservations" className="bg-black text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl">
                            Make a Reservation
                        </Link>
                        <Link href="/contact" className="border border-black text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-black hover:text-white">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dining;