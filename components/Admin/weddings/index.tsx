"use client";
import { useState, useEffect } from 'react';
import WeddingForm from './WeddingForm';
import type { WeddingData } from '@/apirequests/wedding';
import { getWedding, updateWedding } from '@/apirequests/wedding';

const WeddingAdminPanel = () => {
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Wedding content
  const fetchWedding = async () => {
    try {
      const response = await getWedding();
      console.debug('[WeddingAdmin] getWedding response:', response);

      if (response.ok && response.data) {
        setWeddingData(response.data);
      } else {
        console.error('Failed to fetch Wedding content:', response.error);
        alert(response.error || 'Failed to fetch Wedding content');
      }
    } catch (error) {
      console.error('Error fetching Wedding content:', error);
      alert('An unexpected error occurred while fetching content');
    }
  };

  useEffect(() => {
    fetchWedding();
  }, []);

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await updateWedding(formData);

      if (response.ok && response.data) {
        setWeddingData(response.data);
        setIsEditing(false);
        alert('Wedding content updated successfully!');
      } else {
        throw new Error(response.error || 'Failed to update Wedding content');
      }
    } catch (error: any) {
      console.error('Error updating Wedding content:', error);
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
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Weddings Management</h1>
          <p className="text-slate-600">Manage your Weddings page content and sections</p>
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
              <h2 className="text-xl font-semibold text-slate-900">Edit Wedding Content</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="p-6">
            <WeddingForm
              onSubmit={handleSubmit}
              weddingData={weddingData}
              isLoading={isLoading}
            />
          </div>
        </div>
      ) : (
        /* Content Preview */
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Current Content Preview</h2>
          
          {weddingData ? (
            <div className="space-y-6">
              {/* Hero Section Preview */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Hero Section</h3>
                <p><strong>Title:</strong> {weddingData.hero_title}</p>
                <p><strong>Subtitle:</strong> {weddingData.hero_subtitle}</p>
                <p><strong>Button Text:</strong> {weddingData.hero_button_text}</p>
              </div>

              {/* Venues Section Preview */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Venues Section</h3>
                <p><strong>Section Title:</strong> {weddingData.venues_section_title}</p>
                <p><strong>Venues Count:</strong> {weddingData.venues?.length || 0}</p>
                <p><strong>Description Paragraphs:</strong> {weddingData.venues_section_description?.length || 0}</p>
              </div>

              {/* Packages Section Preview */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Packages Section</h3>
                <p><strong>Section Title:</strong> {weddingData.packages_section_title}</p>
                <p><strong>Packages:</strong> {weddingData.wedding_packages?.length || 0}</p>
              </div>

              {/* Services Section Preview */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Services Section</h3>
                <p><strong>Section Title:</strong> {weddingData.services_section_title}</p>
                <p><strong>Services:</strong> {weddingData.services?.length || 0}</p>
              </div>

              {/* Tours Section Preview */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">360° Tours</h3>
                <p><strong>Section Title:</strong> {weddingData.tours_section_title}</p>
                <p><strong>Tours:</strong> {weddingData.tour_embeds?.length || 0}</p>
              </div>

              {/* Gallery Section Preview */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Gallery</h3>
                <p><strong>Section Title:</strong> {weddingData.gallery_section_title}</p>
                <p><strong>Images:</strong> {weddingData.gallery_images?.length || 0}</p>
              </div>

              {/* Testimonials Section Preview */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Testimonials</h3>
                <p><strong>Section Title:</strong> {weddingData.testimonials_section_title}</p>
                <p><strong>Testimonials:</strong> {weddingData.testimonials?.length || 0}</p>
              </div>

              {/* CTA Section Preview */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Call to Action</h3>
                <p><strong>Title:</strong> {weddingData.cta_title}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Description:</strong> {weddingData.cta_description?.substring(0, 100)}...
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Wedding content found</h3>
              <p className="text-slate-600 mb-6">
                Get started by creating your Wedding page content.
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

export default WeddingAdminPanel;