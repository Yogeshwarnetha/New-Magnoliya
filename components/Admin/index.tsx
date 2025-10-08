"use client";

import React, { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CiMenuFries, CiSearch } from "react-icons/ci";

import { FaHome, FaEnvelope, FaStar, FaImages, FaCalendarCheck, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import type { IconType } from 'react-icons';

type AdminMenuItem = {
    id: number;
    text: string;
    route: string;
    icon: IconType;
}

const adminMenuItems: AdminMenuItem[] = [
    {
        id: 1,
        text: "Dashboard",
        route: "/admin",
        icon: FaHome
    },
    {
        id: 6,
        text: "Homepage Content",
        route: "/admin/homepage",
        icon: FaHome
    },
    {
        id: 7,
        text: "About Page",
        route: "/admin/about",
        icon: FaStar
    },
    {
        id: 2,
        text: "Contact Form Data",
        route: "/admin/contact-form-data",
        icon: FaEnvelope
    },
    {
        id: 3,
        text: "Testimonials",
        route: "/admin/testimonials",
        icon: FaStar
    },
    {
        id: 8,
        text: "Weddings",
        route: "/admin/weddings",
        icon: FaCalendarCheck
    },
    {
        id: 4,
        text: "Gallery Management",
        route: "/admin/gallery",
        icon: FaImages
    },
    {
        id: 9,
        text: "Event Venues",
        route: "/admin/venues",
        icon: FaImages
    },
    {
        id: 10,
        text: "Rooms & Suites",
        route: "/admin/rooms-suites",
        icon: FaImages
    },
    {
        id: 11,
        text: "Dining",
        route: "/admin/dining",
        icon: FaImages
    },
    {
        id: 5,
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
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleNavigation = (route: string) => {
        router.push(route);
        setSearchQuery('');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    const handleLogout = () => {
        router.push("/");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white text-gray-800 shadow-xl transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="bg-blue-600 rounded-lg w-8 h-8 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">CS</span>
                            </div>
                            <h1 className="ml-2 text-xl font-bold text-gray-900">Magnoliya Grand</h1>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
                        >
                            <svg
                                className="h-6 w-6"
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
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-white font-semibold">A</span>
                            </div>
                            <div className="ml-3">
                                <p className="font-medium text-gray-900">Admin User</p>
                                <p className="text-xs text-gray-500">admin@clearstay360.com</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="px-2 space-y-1">
                            {adminMenuItems.map((item) => {
                                const isActive = pathname === item.route;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavigation(item.route)}
                                        className={`group flex items-center w-full rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200 ${isActive
                                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <span className="mr-3 opacity-80">{React.createElement(item.icon as React.ComponentType<any>, { className: 'w-5 h-5' })}</span>
                                        <span className="flex-1 text-left">{item.text}</span>
                                        {React.createElement(FaChevronRight as React.ComponentType<any>, { className: `h-3 w-3 transition-transform ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}` })}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                        >
                            {React.createElement(FaSignOutAlt as React.ComponentType<any>, { className: 'mr-2' })}
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between px-4 py-3 lg:px-6">
                        {/* Left Section - Menu & Title */}
                        <div className="flex items-center flex-1 min-w-0">
                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleSidebar}
                                className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 mr-3"
                                aria-label="Toggle menu"
                            >
                                {React.createElement(CiMenuFries as React.ComponentType<any>, { className: 'h-6 w-6' })}
                            </button>

                            {/* Desktop Menu Button */}
                            <button
                                onClick={toggleSidebar}
                                className="hidden lg:block p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 mr-4"
                                aria-label="Toggle menu"
                            >
                                {React.createElement(CiMenuFries as React.ComponentType<any>, { className: 'h-5 w-5' })}
                            </button>

                            {/* Title */}
                            <div className="flex items-center min-w-0">
                                <h1 className="text-lg font-semibold text-gray-900 truncate">
                                    Admin Dashboard
                                </h1>
                            </div>
                        </div>

                        {/* Right Section - Search & Icons */}
                        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                            {/* Search Bar - Hidden on mobile, visible on tablet and up */}
                            <div className="hidden sm:block relative">
                                <form onSubmit={handleSearch} className="flex items-center">
                                    <div className="relative">
                                        {React.createElement(CiSearch as React.ComponentType<any>, { className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' })}
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 pr-4 py-2 w-48 lg:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Mobile Search Button */}
                            <button
                                onClick={() => setShowMobileSearch(!showMobileSearch)}
                                className="sm:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                aria-label="Search"
                            >
                                {React.createElement(CiSearch as React.ComponentType<any>, { className: 'h-5 w-5' })}
                            </button>

                            {/* Notification Bell */}
                            <button
                                className="relative p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 group"
                                aria-label="Notifications"
                            >
                                {React.createElement(FaBell as React.ComponentType<any>, { className: 'h-5 w-5' })}
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                                <span className="sr-only">View notifications</span>
                            </button>

                            {/* Settings Gear */}
                            <button
                                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 group"
                                aria-label="Settings"
                            >
                                {React.createElement(FaCog as React.ComponentType<any>, { className: 'h-5 w-5' })}
                                <span className="sr-only">Settings</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    {showMobileSearch && (
                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sm:hidden">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <div className="relative flex-1">
                                    {React.createElement(CiSearch as React.ComponentType<any>, { className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' })}
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowMobileSearch(false)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardLayout;