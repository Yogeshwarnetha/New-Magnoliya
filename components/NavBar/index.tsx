"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaBars,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const FaPhoneIcon = FaPhone as React.ElementType;
const FaEnvelopeIcon = FaEnvelope as React.ElementType;
const FaBarsIcon = FaBars as React.ElementType;
const IoCloseIcon = IoClose as React.ElementType;

const CONTACT_INFO = {
  phone: "+1 234 567 890",
  email: "info@magnoliya.com",
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
  // { label: "Home", href: "/" },
  { label: "Rooms & Suites", href: "/rooms-suites" },
  { label: "Dining", href: "/dining" },
  { label: "Event Venues", href: "/venues" },
  { label: "Weddings", href: "/weddings" },
  { label: "Corporate Events", href: "/corporate" },
  { label: "Event Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        <div className="hidden md:flex w-full bg-gray-900 text-white py-3 px-6 items-center justify-between z-40">
          <div className="flex items-center space-x-6 text-sm">
            <span className="flex items-center gap-2">
              <FaPhoneIcon className="text-amber-400" size={12} />
              {CONTACT_INFO.phone}
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
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900 py-2 shadow-lg" : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto flex items-center justify-between min-h-[72px]">
          {/* Logo (desktop & tablet) */}
          <Link
            href="/"
            className="text-2xl font-bold text-white font-cormorant items-center flex"
          >
            <img
              src={scrolled
                ? "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/logo%20New.png"
                : "https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/logo%20New.png"
              }
              alt="Hotel Logo"
              className="mr-2 w-auto h-20 sm:h-24 md:h-28 lg:h-32"
            />
          </Link>

          {/* Desktop menu only for large screens */}
          <div className="hidden lg:flex flex-wrap items-center space-x-6 ml-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="nav-link text-white hover:text-amber-400 transition-colors duration-300 px-2 py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Hamburger menu for md and below */}
          <div className="flex lg:hidden items-center gap-2">
            {/* <img
              src="https://res.cloudinary.com/dwd2dks0h/image/upload/v1757458532/magnoliya-logo1_ljqkso.png"
              alt="Hotel Logo"
              className="w-auto h-8"
            /> */}
            <button
              className="flex justify-center items-center w-10 h-10 text-white focus:outline-none"
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
        className={`fixed top-0 left-0 h-full w-full bg-gray-900 shadow-lg transform transition-transform duration-500 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 px-8 overflow-y-auto relative">
          {/* Close button */}
          <button
            className="absolute top-5 right-5 text-white p-2"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <IoCloseIcon size={32} />
          </button>

          {/* Logo in mobile menu */}
          <div className="flex justify-center mb-10">
            <Link
              href="/"
              className="text-2xl font-bold text-white font-cormorant flex items-center"
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
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white text-lg font-medium hover:text-amber-400 transition-colors duration-300 py-2 border-b border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact info (mobile) */}
          <div className="mt-10 pt-6 border-t border-gray-700">
            <div className="flex flex-col space-y-4 text-white">
              <span className="flex items-center gap-3">
                <FaPhoneIcon className="text-amber-400" />
                {CONTACT_INFO.phone}
              </span>
              <span className="flex items-center gap-3">
                <FaEnvelopeIcon className="text-amber-400" />
                {CONTACT_INFO.email}
              </span>
            </div>
          </div>

          {/* Social icons */}
          <div className="mt-10 pt-6 border-t border-gray-700 flex justify-center space-x-4 pb-8">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-amber-400 transition-colors duration-300 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
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
          max-width: 1200px;
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