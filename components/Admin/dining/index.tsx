"use client";
import { useState, useEffect } from 'react';
import DiningForm from './diningForm';
import type { DiningData } from '@/types';
import { getDining, updateDining } from '@/apirequests/dining';

const DiningAdminPanel = () => {
    const [diningData, setDiningData] = useState<DiningData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch Dining content
    const fetchDining = async () => {
        try {
            const response = await getDining();
            console.debug('[DiningAdmin] getDining response:', response);

            if (response.ok && response.data) {
                setDiningData(response.data);
            } else {
                console.error('Failed to fetch Dining content:', response.error);
                alert(response.error || 'Failed to fetch Dining content');
            }
        } catch (error) {
            console.error('Error fetching Dining content:', error);
            alert('An unexpected error occurred while fetching content');
        }
    };

    useEffect(() => {
        fetchDining();
    }, []);

    // Handle form submission
    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            const response = await updateDining(formData);

            if (response.ok && response.data) {
                setDiningData(response.data);
                setIsEditing(false);
                alert('Dining content updated successfully!');
            } else {
                throw new Error(response.error || 'Failed to update Dining content');
            }
        } catch (error: any) {
            console.error('Error updating Dining content:', error);
            alert(error.message || 'Error updating content. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                <div className="mb-4 lg:mb-0">
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Dining Management</h1>
                    <p className="text-slate-600">Manage your Dining page content and sections</p>
                </div>
                
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium flex items-center space-x-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit Content</span>
                    </button>
                )}
            </div>

            {/* Content Preview / Edit Form */}
            {isEditing ? (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-slate-900">Edit Dining Content</h2>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-slate-600 hover:text-slate-800 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <DiningForm
                            onSubmit={handleSubmit}
                            diningData={diningData}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            ) : (
                /* Content Preview */
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-6">Current Content Preview</h2>
                    
                    {diningData ? (
                        <div className="space-y-6">
                            {/* Hero Section Preview */}
                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Hero Section</h3>
                                <p><strong>Title:</strong> {diningData.hero_title}</p>
                                <p><strong>Subtitle:</strong> {diningData.hero_subtitle}</p>
                                <p><strong>Carousel Slides:</strong> {diningData.carousel_slides?.length || 0}</p>
                            </div>

                            {/* Culinary Story Section Preview */}
                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Culinary Story</h3>
                                <p><strong>Title:</strong> {diningData.culinary_story_title}</p>
                                <p><strong>Carousel Items:</strong> {diningData.culinary_story_carousel?.length || 0}</p>
                                <p><strong>Features:</strong> {diningData.culinary_story_features?.length || 0}</p>
                            </div>

                            {/* Flavorful Voyage Section Preview */}
                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Flavorful Voyage</h3>
                                <p><strong>Title:</strong> {diningData.flavorful_voyage_title}</p>
                                <p><strong>Cards:</strong> {diningData.flavorful_voyage_cards?.length || 0}</p>
                                <p><strong>Second Title:</strong> {diningData.flavorful_voyage_second_title}</p>
                            </div>

                            {/* Restaurants Section Preview */}
                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Restaurants</h3>
                                <p><strong>Title:</strong> {diningData.restaurants_title}</p>
                                <p><strong>Subtitle:</strong> {diningData.restaurants_subtitle}</p>
                                <p><strong>Restaurant Cards:</strong> {diningData.restaurants_cards?.length || 0}</p>
                            </div>

                            {/* Culinary Excellence Section Preview */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Culinary Excellence</h3>
                                <p><strong>Items:</strong> {diningData.culinary_excellence?.length || 0}</p>
                                <p><strong>Second Title:</strong> {diningData.culinary_excellence_second_title}</p>
                                <p><strong>Keypoints:</strong> {diningData.culinary_excellence_keypoints?.length || 0}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-slate-50 rounded-lg">
                            <div className="text-slate-400 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v3m0-3V6a2 2 0 012-2h2a2 2 0 012 2v0M9 6h6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Dining content found</h3>
                            <p className="text-slate-600 mb-6">
                                Get started by creating your Dining page content.
                            </p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Create Content
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DiningAdminPanel;