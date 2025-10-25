"use client";
import { useState, useEffect } from 'react';
import AboutForm from './AboutForm';
import type { AboutUsData } from '@/types';
import { getAboutUs, updateAboutUs } from '@/apirequests/about';

const AboutAdminPanel = () => {
  const [aboutData, setAboutData] = useState<AboutUsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch About Us content
  const fetchAboutUs = async () => {
    try {
      const response = await getAboutUs();
      console.debug('[AboutAdmin] getAboutUs response:', response);

      if (response.ok && response.data) {
        setAboutData(response.data);
      } else {
        console.error('Failed to fetch About Us content:', response.error);
        alert(response.error || 'Failed to fetch About Us content');
      }
    } catch (error) {
      console.error('Error fetching About Us content:', error);
      alert('An unexpected error occurred while fetching content');
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await updateAboutUs(formData);

      if (response.ok && response.data) {
        setAboutData(response.data);
        setIsEditing(false);
        alert('About Us content updated successfully!');
      } else {
        throw new Error(response.error || 'Failed to update About Us content');
      }
    } catch (error: any) {
      console.error('Error updating About Us content:', error);
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
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">About Us Management</h1>
          <p className="text-slate-600">Manage your About Us page content and sections</p>
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
              <h2 className="text-xl font-semibold text-slate-900">Edit About Us Content</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="p-6">
            <AboutForm
              onSubmit={handleSubmit}
              aboutData={aboutData}
              isLoading={isLoading}
            />
          </div>
        </div>
      ) : (
        /* Content Preview */
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Current Content Preview</h2>
          
          {aboutData ? (
            <div className="space-y-6">
              {/* Hero Section Preview */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Hero Section</h3>
                <p><strong>Title:</strong> {aboutData.hero_title}</p>
                <p><strong>Subtitle:</strong> {aboutData.hero_subtitle}</p>
                <p><strong>Carousel Slides:</strong> {aboutData.carousel_slides?.length || 0}</p>
              </div>

              {/* Story Section Preview */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Our Story</h3>
                <p><strong>Title:</strong> {aboutData.story_title}</p>
                <p><strong>Paragraphs:</strong> {aboutData.story_paragraphs?.length || 0}</p>
                <div className="mt-2 text-sm text-gray-600">
                  {aboutData.story_paragraphs?.slice(0, 2).map((para, idx) => (
                    <p key={idx} className="truncate">{para}</p>
                  ))}
                </div>
              </div>

              {/* Sustainability Section Preview */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sustainability</h3>
                <p><strong>Title:</strong> {aboutData.sustainability_title}</p>
                <p><strong>Features:</strong> {aboutData.sustainability_features?.length || 0}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Description:</strong> {aboutData.sustainability_description?.substring(0, 100)}...
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v3m0-3V6a2 2 0 012-2h2a2 2 0 012 2v0M9 6h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No About Us content found</h3>
              <p className="text-slate-600 mb-6">
                Get started by creating your About Us page content.
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

export default AboutAdminPanel;