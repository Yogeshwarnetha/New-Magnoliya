"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaBars,
  FaPhone,
  FaEnvelope,
  FaChevronDown
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const FaPhoneIcon = FaPhone as React.ElementType;
const FaEnvelopeIcon = FaEnvelope as React.ElementType;
const FaBarsIcon = FaBars as React.ElementType;
const IoCloseIcon = IoClose as React.ElementType;
const FaChevronDownIcon = FaChevronDown as React.ElementType;

const CONTACT_INFO = {
  phone1: "+1 (703) 843-5536",
  phone2: "+1 (703) 844-35649",
  email: "sales@magnoliyagrand.com",
};

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/magnoliyagrand/", img: "/facebook.png" },
  { name: "Instagram", href: "https://www.instagram.com/magnoliyagrand/", img: "/instagram.png" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/magnoliya-grand-7727b92ab", img: "/Likedin.png" },
  { name: "Twitter", href: "https://x.com/MagnoliyaGrand", img: "/twitter-bird.png" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCNG6YVfx2i9b5O98vgE7rFw", img: "/youtube.png" },
  { name: "Tiktok", href: "https://www.tiktok.com/@magnoliyagrand?_t=ZT-8tbtueOhSP5&_r=1", img: "/tiktok.png" },
];

const menuItems = [
  { label: "Home", href: "/" },
  { 
    label: "Events", 
    href: "/venues",
    dropdown: [
      { label: "Corporate Events", href: "/corporate" },
      { label: "Weddings", href: "/weddings" },
      { label: "Social Events", href: "/venues" }
    ]
  },
  // { label: "Weddings", href: "/weddings" },
  // Second line items
  { label: "Rooms & Suites", href: "/rooms-suites" },
  { label: "Dining", href: "/dining" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Topbar (desktop only) */}
      {!scrolled && (
        <div className="hidden md:flex w-full bg-white text-gray-900 py-3 px-6 items-center justify-around z-40">
          <div className="flex items-center space-x-6 text-sm">
            <span className="flex items-center gap-2">
              <FaPhoneIcon className="text-amber-400" size={12} />
              {CONTACT_INFO.phone1} | {CONTACT_INFO.phone2}
            </span>
            <span className="flex items-center gap-2">
              <FaEnvelopeIcon className="text-amber-400" size={12} />
              {CONTACT_INFO.email}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:bg-white/10 transition-colors duration-300 p-1.5 rounded-full"
                aria-label={item.name}
              >
                <img src={item.img} alt={item.name + " icon"} style={{ width: 20, height: 20 }} />
              </a>
            ))}
          </div>
        </div>
      )}

      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white py-2 shadow-lg" : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto flex items-center justify-between min-h-[72px] px-4">
          {/* Logo - Left side */}
          <Link
            href="/"
            className={`text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'} font-cormorant items-center flex`}
          >
            <img
              src={scrolled
                ? "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/logo%20New.png"
                : "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/logo%20New.png"
              }
              alt="Hotel Logo"
              className="mr-1 w-auto h-20 sm:h-24 md:h-28 lg:h-32"
            />
          </Link>

          {/* Centered Menu Items - Desktop only */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="flex flex-col items-center space-y-2 max-w-4xl">
              {/* First line */}
              <div className="flex flex-wrap items-center justify-center space-x-3">
                {menuItems.slice(0, 7).map((item, index) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                  const linkColorClass = isActive ? 'text-amber-400' : (scrolled ? 'text-gray-900' : 'text-white');
                  
                  if (item.label === "Events" && item.dropdown) {
                    return (
                      <div 
                        key={index}
                        className="relative"
                        onMouseEnter={() => setEventsDropdownOpen(true)}
                        onMouseLeave={() => setEventsDropdownOpen(false)}
                      >
                        <div className={`nav-link ${linkColorClass} hover:text-amber-400 transition-colors duration-300 px-2 py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium relative group cursor-pointer flex items-center gap-1`}>
                          {item.label}
                          <FaChevronDownIcon 
                            size={12} 
                            className={`transition-transform duration-300 ${eventsDropdownOpen ? 'rotate-180' : ''}`} 
                          />
                          <span className={`${isActive ? 'w-full' : 'w-0 group-hover:w-full'} absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300`}></span>
                        </div>
                        
                        {/* Enhanced Dropdown Menu with gap protection */}
                        {eventsDropdownOpen && (
                          <div 
                            className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden"
                            style={{ marginTop: '0px' }} // Remove any gap
                            onMouseEnter={() => setEventsDropdownOpen(true)}
                            onMouseLeave={() => setEventsDropdownOpen(false)}
                          >
                            {/* Dropdown Items */}
                            <div className="py-2">
                              {item.dropdown.map((dropdownItem, dropdownIndex) => (
                                <Link
                                  key={dropdownIndex}
                                  href={dropdownItem.href}
                                  className="block px-4 py-3 text-gray-900 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                  onClick={() => setEventsDropdownOpen(false)}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">
                                      {dropdownItem.label}
                                    </span>
                                    <div className="w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={`nav-link ${linkColorClass} hover:text-amber-400 transition-colors duration-300 px-2 py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium relative group`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                      <span className={`${isActive ? 'w-full' : 'w-0 group-hover:w-full'} absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300`}></span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Button - Right side */}
          <div className="hidden lg:flex">
            <a href="https://magnoliyagrandmanorconferenceandeventcenter.tripleseat.com/booking_request/35062" target="blank">
              <button className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Booking Request
              </button>
            </a>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              className={`flex justify-center items-center w-10 h-10 ${scrolled ? 'text-gray-900' : 'text-white'} focus:outline-none`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <IoCloseIcon size={28} /> : <FaBarsIcon size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isOpen ? "opacity-70 visible" : "opacity-0 invisible"} md:hidden`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Sidebar (full screen) */}
      <div
        className={`fixed top-0 left-0 h-full w-full ${scrolled ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} shadow-lg transform transition-transform duration-500 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 px-8 overflow-y-auto relative">
          {/* Close button */}
          <button
            className={`absolute top-5 right-5 ${scrolled ? 'text-gray-900' : 'text-white'} p-2`}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <IoCloseIcon size={32} />
          </button>

          {/* Logo in mobile menu */}
          <div className="flex justify-center mb-10">
            <Link
              href="/"
              className={`text-2xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'} font-cormorant flex items-center`}
            >
              <img
                src="https://res.cloudinary.com/dwd2dks0h/image/upload/v1757458532/magnoliya-logo1_ljqkso.png"
                alt="Hotel Logo"
                className={`mr-2 w-auto h-12`}
              />
            </Link>
          </div>

          {/* Menu items */}
          <div className="flex flex-col space-y-6">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
              
              if (item.label === "Events" && item.dropdown) {
                return (
                  <div key={index} className="border-b border-gray-700 pb-2">
                    <div className={`${isActive ? 'text-amber-400 font-semibold' : (scrolled ? 'text-gray-900' : 'text-white')} text-lg font-medium py-2 flex items-center justify-between`}>
                      {item.label}
                      <FaChevronDownIcon size={14} className="text-amber-400" />
                    </div>
                    <div className="ml-4 flex flex-col space-y-4 mt-4 bg-gray-800/30 rounded-xl p-4">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          href={dropdownItem.href}
                          className={`${pathname === dropdownItem.href ? 'text-amber-400 font-semibold bg-amber-400/10' : (scrolled ? 'text-gray-600' : 'text-gray-300')} p-3 rounded-lg hover:bg-white/10 hover:text-amber-400 transition-all duration-300`}
                          onClick={() => setIsOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`${isActive ? 'text-amber-400 border-amber-400 font-semibold' : (scrolled ? 'text-gray-900' : 'text-white')} text-lg font-medium hover:text-amber-400 transition-colors duration-300 py-2 border-b ${scrolled ? 'border-gray-200' : 'border-gray-700'}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Booking Button in Mobile Menu */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <button className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center">
              Booking Request
            </button>
          </div>

          {/* Contact info (mobile) */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className={`flex flex-col space-y-4 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              <span className="flex items-center gap-3">
                <FaPhoneIcon className="text-amber-400" />
                {CONTACT_INFO.phone1} | {CONTACT_INFO.phone2}
              </span>
              <span className="flex items-center gap-3">
                <FaEnvelopeIcon className="text-amber-400" />
                {CONTACT_INFO.email}
              </span>
            </div>
          </div>

          {/* Social icons */}
          <div className="mt-6 pt-6 border-t border-gray-700 flex justify-center space-x-4 pb-8">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${scrolled ? 'text-gray-900 hover:text-amber-400 bg-gray-200 hover:bg-gray-100' : 'text-white hover:text-amber-400 bg-gray-800 hover:bg-gray-700'} transition-colors duration-300 p-2 rounded-full`}
                aria-label={item.name}
              >
                <img src={item.img} alt={item.name + " icon"} style={{ width: 20, height: 20 }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1440px;
        }
        .nav-link {
          position: relative;
        }
        .nav-link:hover {
          color: #fbbf24;
        }
      `}</style>
    </>
  );
};

export default Navbar;