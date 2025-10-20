import Link from 'next/link';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Rooms & Suites', href: '/rooms-suites' },
    { label: 'Dining & Catering', href: '/dining' },
    { label: 'Event Venues', href: '/venues' },
    { label: 'Weddings & Social Events', href: '/weddings' },
    { label: 'Corporate Events', href: '/corporate' },
  ];

  const moreLinks = [
    { label: 'Event Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    // { label: 'Privacy Policy', href: '/privacy' },
    // { label: 'Terms of Service', href: '/terms' },
  ];

  const SOCIAL_LINKS = [
    { name: "Facebook", href: "https://www.facebook.com/magnoliyagrand/", img: "/facebook.png" },
    { name: "Instagram", href: "https://www.instagram.com/magnoliyagrand/", img: "/instagram.png" },
    { name: "Twitter", href: "https://x.com/MagnoliyaGrand", img: "/twitter-bird.png" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <img src='https://res.cloudinary.com/dwd2dks0h/image/upload/v1757458532/magnoliya-logo1_ljqkso.png' alt="Hotel Logo" width={250} height={50} />
            <p className="my-4">Where exceptional experiences and luxury stays create unforgettable memories.</p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:opacity-80 transition-opacity duration-300"
                >
                  <span className="sr-only">{social.name}</span>
                  <img 
                    src={social.img} 
                    alt={social.name} 
                    className="h-6 w-6 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">More Links</h3>
            <ul className="space-y-2">
              {moreLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                required
              />
              <button type="submit" className="gold-gradient text-white font-medium py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Reviews Badge and Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row items-center">
          <div className="flex items-center mb-4 md:mb-0">
            {/* Add your reviews badge content here if needed */}
          </div>
          <div className="text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Luxury Venue. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;