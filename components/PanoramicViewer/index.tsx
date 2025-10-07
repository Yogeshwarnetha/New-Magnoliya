"use client";
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    src: string;
    alt?: string;
}

const PanoramicViewer: React.FC<Props> = ({ src, alt = 'Panoramic view' }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const dragStartRef = useRef(0);
    const startPanRef = useRef(0);
    const [isDragging, setIsDragging] = useState(false);
    const [pan, setPan] = useState(0);
    const [maxPan, setMaxPan] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isAutoPanning, setIsAutoPanning] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const panoramicImage = 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/IMG_20250711_165221_00_004.jpg';

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStartRef.current = e.clientX;
        startPanRef.current = pan;
        containerRef.current?.focus();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        dragStartRef.current = e.touches[0].clientX;
        startPanRef.current = pan;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartRef.current;
        if (maxPan <= 0) return;
        const newPan = Math.min(Math.max(startPanRef.current - deltaX, 0), maxPan);
        setPan(newPan);
        setRotation((newPan / Math.max(maxPan, 1)) * 360);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - dragStartRef.current;
        if (maxPan <= 0) return;
        const newPan = Math.min(Math.max(startPanRef.current - deltaX, 0), maxPan);
        setPan(newPan);
        setRotation((newPan / Math.max(maxPan, 1)) * 360);
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    // Auto-pan effect
    useEffect(() => {
        if (!isAutoPanning) return;
        
        const interval = setInterval(() => {
            setPan(prev => {
                if (maxPan <= 0) return prev;
                const next = prev + 2;
                if (next >= maxPan) return 0;
                return next;
            });
        }, 50);
        
        return () => clearInterval(interval);
    }, [isAutoPanning, maxPan]);

    // Update rotation when pan changes
    useEffect(() => {
        if (maxPan > 0) {
            setRotation((pan / maxPan) * 360);
        }
    }, [pan, maxPan]);

    // Handle resize and initial load
    useEffect(() => {
        const handleResize = () => {
            if (!imgRef.current || !containerRef.current) return;
            const imgRect = imgRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            setMaxPan(Math.max(imgRect.width - containerRect.width, 0));
        };

        window.addEventListener('resize', handleResize);
        
        // Initial calculation after image loads
        if (isLoaded) {
            handleResize();
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const step = 80;
        if (e.code === 'ArrowLeft') {
            setPan(prev => Math.max(prev - step, 0));
        } else if (e.code === 'ArrowRight') {
            setPan(prev => Math.min(prev + step, maxPan));
        } else if (e.code === 'Space') {
            e.preventDefault();
            setIsAutoPanning(prev => !prev);
        }
    };

    const handleImageLoad = () => {
        setIsLoaded(true);
        if (!imgRef.current || !containerRef.current) return;
        const imgRect = imgRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        setMaxPan(Math.max(imgRect.width - containerRect.width, 0));
    };

    const normalizedRotation = ((rotation % 360) + 360) % 360;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">Magnoliya Panoramic View</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Drag or swipe to pan across our panoramic image — experience the venue in a wide, continuous view
                </p>

                <div className="max-w-4xl mx-auto">
                    <div
                        ref={containerRef}
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        className="relative bg-gray-100 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <img
                            ref={imgRef}
                            src={panoramicImage}
                            alt={alt}
                            onLoad={handleImageLoad}
                            className="h-64 md:h-96 lg:h-[500px] transition-transform duration-100 ease-out"
                            style={{ 
                                transform: `translateX(-${pan}px)`, 
                                width: 'auto',
                                maxWidth: 'none'
                            }}
                        />

                        {!isLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-gray-500">Loading panoramic view...</div>
                            </div>
                        )}

                        {isLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center bg-black bg-opacity-60 text-white py-4 px-8 rounded-2xl backdrop-blur-sm border border-white border-opacity-20 transition-opacity duration-300">
                                    <div className="flex items-center justify-center mb-3">
                                        <svg className="w-10 h-10 mr-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-semibold mb-1">Pan to Explore</p>
                                    <p className="text-sm opacity-90">Drag or use arrows to look around</p>
                                    <p className="text-xs opacity-70 mt-2">Position {Math.round(normalizedRotation)}°</p>
                                </div>
                            </div>
                        )}

                        {isLoaded && (
                            <>
                                <div className="absolute top-6 right-6 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                                    {Math.round(normalizedRotation)}°
                                </div>

                                {isAutoPanning && (
                                    <div className="absolute top-6 left-6 bg-green-600 bg-opacity-90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm flex items-center">
                                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                                        Auto-panning
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setPan(prev => Math.max(prev - 80, 0))}
                                className="bg-gold hover:bg-yellow-600 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold"
                                aria-label="Pan left"
                                disabled={!isLoaded}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setIsAutoPanning(prev => !prev)}
                                disabled={!isLoaded}
                                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                                    isAutoPanning
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-gold hover:bg-yellow-600 text-white'
                                } ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isAutoPanning ? 'Stop Auto-Pan' : 'Start Auto-Pan'}
                            </button>

                            <button
                                onClick={() => setPan(prev => Math.min(prev + 80, maxPan))}
                                className="bg-gold hover:bg-yellow-600 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold"
                                aria-label="Pan right"
                                disabled={!isLoaded}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <div className="bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use the Panoramic Viewer</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white mb-2">↔️</div>
                                    <p>Drag to pan</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white mb-2">🔄</div>
                                    <p>Use buttons or auto-pan</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white mb-2">⌨️</div>
                                    <p>Keyboard arrows to pan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PanoramicViewer;