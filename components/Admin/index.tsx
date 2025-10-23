"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CiMenuFries, CiSearch } from "react-icons/ci";
import { 
    FaHome, 
    FaEnvelope, 
    FaStar, 
    FaImages, 
    FaCalendarCheck, 
    FaBell, 
    FaCog, 
    FaSignOutAlt,
    FaUsers,
    FaHotel,
    FaUtensils,
    FaGlassCheers
} from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

type AdminMenuItem = {
    id: number;
    text: string;
    route: string;
    // Icons from react-icons are React components - accept any to avoid typing mismatches
    icon: any;
}

const adminMenuItems: AdminMenuItem[] = [
    {
        id: 1,
        text: "Dashboard",
        route: "/admin",
        icon: FaHome
    },
    {
        id: 2,
        text: "Homepage Content",
        route: "/admin/homepage",
        icon: FaHome
    },
    {
        id: 3,
        text: "About Page",
        route: "/admin/about",
        icon: FaUsers
    },
    {
        id: 4,
        text: "Contact Form Data",
        route: "/admin/contact-form-data",
        icon: FaEnvelope
    },
    {
        id: 5,
        text: "Testimonials",
        route: "/admin/testimonials",
        icon: FaStar
    },
    {
        id: 6,
        text: "Weddings",
        route: "/admin/weddings",
        icon: FaGlassCheers
    },
    {
        id: 7,
        text: "Gallery Management",
        route: "/admin/gallery",
        icon: FaImages
    },
    {
        id: 8,
        text: "Event Venues",
        route: "/admin/venues",
        icon: FaHotel
    },
    {
        id: 9,
        text: "Rooms & Suites",
        route: "/admin/rooms-suites",
        icon: FaHotel
    },
    {
        id: 10,
        text: "Dining",
        route: "/admin/dining",
        icon: FaUtensils
    },
    {
        id: 11,
        text: "Book Your Visit Data",
        route: "/admin/book-visit-data",
        icon: FaCalendarCheck
    },
];

interface AdminDashboardProps {
    children?: ReactNode;
}

const AdminDashboardLayout: React.FC<AdminDashboardProps> = ({ children }) => {
    const router = useRouter();
    const { admin, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [notifications] = useState([
        { id: 1, message: "New contact form submission", time: "5 min ago", read: false },
        { id: 2, message: "Booking request received", time: "1 hour ago", read: false },
        { id: 3, message: "System update available", time: "2 hours ago", read: true },
    ]);

    const unreadNotifications = notifications.filter(n => !n.read).length;

    // Check if mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleNavigation = (route: string) => {
        router.push(route);
        setSearchQuery('');
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            // Implement search functionality here
            alert(`Search functionality for: ${searchQuery}`);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const closeSidebar = () => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    // Overlay for mobile sidebar
    const Overlay = () => (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={closeSidebar}
        />
    );

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Mobile Overlay */}
            {sidebarOpen && isMobile && <Overlay />}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-80 transform bg-white text-slate-900 shadow-xl border-r border-slate-200 transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl w-10 h-10 flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-lg">MG</span>
                            </div>
                            <div className="ml-3">
                                <h1 className="text-xl font-bold text-slate-900">Magnoliya Grand</h1>
                                <p className="text-xs text-slate-600 font-medium">Admin Portal</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200 lg:hidden"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Profile Section */}
                    <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl w-12 h-12 flex items-center justify-center shadow-md">
                                    <span className="text-white font-semibold text-lg">
                                        {admin?.name?.charAt(0).toUpperCase() || 'A'}
                                    </span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                            </div>
                            <div className="ml-4">
                                <p className="font-semibold text-slate-900">{admin?.name || 'Admin User'}</p>
                                <p className="text-sm text-slate-600">{admin?.email || 'admin@magnoliyagrand.com'}</p>
                                <div className="flex items-center mt-1">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                    <p className="text-xs text-slate-500">Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex-1 overflow-y-auto py-6">
                        <nav className="px-4 space-y-1">
                            {adminMenuItems.map((item) => {
                                const isActive = pathname === item.route;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavigation(item.route)}
                                        className={`group flex items-center w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow-sm'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }`}
                                    >
                                        <span className={`mr-3 transition-colors duration-200 ${
                                            isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                                        }`}>
                                            {(() => {
                                                const Icon = item.icon as React.ComponentType<any>;
                                                return <Icon className="w-5 h-5" />;
                                            })()}
                                        </span>
                                        <span className="flex-1 text-left font-medium">{item.text}</span>
                                        {React.createElement(FaChevronRight as any, { className: `h-3 w-3 transition-all duration-200 ${
                                            isActive 
                                                ? 'text-blue-600 rotate-90' 
                                                : 'text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5'
                                        }` })}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-slate-200 bg-white">
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center justify-center rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200 border border-slate-300/50 group"
                            >
                                {React.createElement(FaSignOutAlt as any, { className: "mr-3 text-slate-500 group-hover:text-slate-700" })}
                                Logout
                            </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm border-b border-slate-200">
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* Left Section - Menu & Title */}
                        <div className="flex items-center flex-1 min-w-0">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleSidebar}
                                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 mr-3"
                                aria-label="Toggle menu"
                            >
                                {React.createElement(CiMenuFries as any, { className: "h-6 w-6" })}
                            </button>

                            {/* Desktop Menu Button */}
                            <button
                                onClick={toggleSidebar}
                                className="hidden lg:block p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 mr-4"
                                aria-label="Toggle menu"
                            >
                                {React.createElement(CiMenuFries as any, { className: "h-5 w-5" })}
                            </button>

                            {/* Breadcrumb */}
                            <div className="flex items-center space-x-2 text-sm">
                                <span className="font-medium text-slate-600">Admin</span>
                                <span className="text-slate-400">/</span>
                                <span className="text-slate-900 font-semibold">
                                    {adminMenuItems.find(item => item.route === pathname)?.text || 'Dashboard'}
                                </span>
                            </div>
                        </div>

                        {/* Right Section - Search & Icons */}
                        <div className="flex items-center space-x-3">
                            {/* Search Bar */}
                            <div className="hidden sm:block relative">
                                <form onSubmit={handleSearch} className="flex items-center">
                                    <div className="relative">
                                        {React.createElement(CiSearch as any, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" })}
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 pr-4 py-2.5 w-64 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Mobile Search Button */}
                            <button
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                                className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                aria-label="Search"
                            >
                                {React.createElement(CiSearch as any, { className: "h-5 w-5" })}
                            </button>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-1">
                                {/* Notification Bell */}
                                <div className="relative">
                                    <button
                                        className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                        aria-label="Notifications"
                                    >
                                        {React.createElement(FaBell as any, { className: "h-5 w-5" })}
                                        {unreadNotifications > 0 && (
                                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                                        )}
                                    </button>
                                    
                                    {/* Notification Dropdown */}
                                    <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-10 hidden group-hover:block">
                                        <div className="p-4 border-b border-slate-200">
                                            <h3 className="font-semibold text-slate-900">Notifications</h3>
                                            <p className="text-sm text-slate-600">{unreadNotifications} unread</p>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 ${
                                                        !notification.read ? 'bg-blue-50' : ''
                                                    }`}
                                                >
                                                    <p className="text-sm text-slate-900">{notification.message}</p>
                                                    <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-2 border-t border-slate-200">
                                            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2">
                                                View All Notifications
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Settings Gear */}
                                <button
                                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    aria-label="Settings"
                                >
                                    {React.createElement(FaCog as any, { className: "h-5 w-5" })}
                                </button>

                                {/* User Avatar */}
                                <div className="flex items-center space-x-3 ml-2 pl-3 border-l border-slate-300">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg w-8 h-8 flex items-center justify-center shadow-sm">
                                            <span className="text-white font-semibold text-sm">
                                                {admin?.name?.charAt(0).toUpperCase() || 'A'}
                                            </span>
                                        </div>
                                        <div className="hidden md:block text-right">
                                            <p className="text-sm font-medium text-slate-900">{admin?.name || 'Admin User'}</p>
                                            <p className="text-xs text-slate-500">Online</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    {showMobileSearch && (
                        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 sm:hidden">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <div className="relative flex-1">
                                    {React.createElement(CiSearch as any, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" })}
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowMobileSearch(false)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
                    <div className="mx-auto max-w-7xl">
                        {/* Welcome Card */}
                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 mb-6 text-white shadow-lg">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="mb-4 md:mb-0">
                                    <h1 className="text-2xl font-bold mb-2">Welcome back, {admin?.name || 'Admin'}! 👋</h1>
                                    <p className="text-slate-200 text-sm">
                                        Here's what's happening with Magnoliya Grand today.
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
                                        <p className="text-sm font-semibold">Today's Visitors</p>
                                        <p className="text-xl font-bold">127</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
                                        <p className="text-sm font-semibold">New Bookings</p>
                                        <p className="text-xl font-bold">8</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm text-center">
                                        <p className="text-sm font-semibold">Messages</p>
                                        <p className="text-xl font-bold">12</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Page Content */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
                            {children}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-slate-200 py-4 px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-slate-600">
                            &copy; 2024 Magnoliya Grand. All rights reserved.
                        </p>
                        <div className="flex space-x-4 mt-2 md:mt-0">
                            <button className="text-sm text-slate-600 hover:text-slate-900">Help</button>
                            <button className="text-sm text-slate-600 hover:text-slate-900">Privacy</button>
                            <button className="text-sm text-slate-600 hover:text-slate-900">Terms</button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;