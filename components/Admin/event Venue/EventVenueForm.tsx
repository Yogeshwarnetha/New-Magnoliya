"use client";
import { useState, useEffect } from 'react';
import type { EventVenueData } from '@/apirequests/eventVenue';

interface EventVenueFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  venueData?: EventVenueData | null;
  isLoading?: boolean;
  onCancel?: () => void;
}

const EventVenueForm: React.FC<EventVenueFormProps> = ({
  onSubmit,
  venueData,
  isLoading = false,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    venue_name: '',
    venue_title: '',
    venue_title_description: '',
    description: '',
    squareFeet: '',
    theater: '',
    banquet: '',
    tourUrl: '',
    iframeSrc: '',
    features: [] as string[],
    planning_guidance: [] as string[]
  });
  
  const [venueImage, setVenueImage] = useState<File | null>(null);
  const [venueImagePreview, setVenueImagePreview] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (venueData) {
      setFormData({
        venue_name: venueData.venue_name || '',
        venue_title: venueData.venue_title || '',
        venue_title_description: venueData.venue_title_description || '',
        description: venueData.description || '',
        squareFeet: venueData.squareFeet || '',
        theater: venueData.theater?.toString() || '',
        banquet: venueData.banquet?.toString() || '',
        tourUrl: venueData.tourUrl || '',
        iframeSrc: venueData.iframeSrc || '',
        features: venueData.features || [],
        planning_guidance: venueData.planning_guidance || []
      });
      setVenueImagePreview(venueData.image || '');
      setExistingGalleryImages(venueData.gallery_images || []);
    } else {
      setFormData({
        venue_name: '',
        venue_title: 'Social Venues',
        venue_title_description: 'Exceptional spaces for unforgettable events and celebrations',
        description: '',
        squareFeet: '',
        theater: '',
        banquet: '',
        tourUrl: '',
        iframeSrc: '',
        features: [],
        planning_guidance: [
          "Add 10-15% extra capacity for guest comfort and movement",
          "Consider additional space for dance floors, stages, or buffet stations",
          "Our event planners can help optimize your layout for the best experience"
        ]
      });
      setVenueImagePreview('');
      setExistingGalleryImages([]);
    }
    setVenueImage(null);
    setGalleryImages([]);
    setGalleryPreviews([]);
    setErrors({});
  }, [venueData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleVenueImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVenueImage(file);
      const objectUrl = URL.createObjectURL(file);
      setVenueImagePreview(objectUrl);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setGalleryImages(prev => [...prev, ...files]);
      
      // Create previews
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setGalleryPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (index: number) => {
    setExistingGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }));
  };

  const handlePlanningGuidanceChange = (index: number, value: string) => {
    const updatedGuidance = [...formData.planning_guidance];
    updatedGuidance[index] = value;
    setFormData(prev => ({
      ...prev,
      planning_guidance: updatedGuidance
    }));
  };

  const addPlanningGuidance = () => {
    setFormData(prev => ({
      ...prev,
      planning_guidance: [...prev.planning_guidance, '']
    }));
  };

  const removePlanningGuidance = (index: number) => {
    const updatedGuidance = formData.planning_guidance.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      planning_guidance: updatedGuidance
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.venue_name) newErrors.venue_name = 'Venue name is required';
    if (!formData.venue_title) newErrors.venue_title = 'Venue title is required';
    if (!formData.venue_title_description) newErrors.venue_title_description = 'Venue title description is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.squareFeet) newErrors.squareFeet = 'Square feet is required';
    if (!formData.theater) newErrors.theater = 'Theater capacity is required';
    if (!formData.banquet) newErrors.banquet = 'Banquet capacity is required';
    if (!venueData && !venueImage) newErrors.venue_image = 'Venue image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = new FormData();
    
    // Append text fields
    submitData.append('venue_name', formData.venue_name);
    submitData.append('venue_title', formData.venue_title);
    submitData.append('venue_title_description', formData.venue_title_description);
    submitData.append('description', formData.description);
    submitData.append('squareFeet', formData.squareFeet);
    submitData.append('theater', formData.theater);
    submitData.append('banquet', formData.banquet);
    submitData.append('tourUrl', formData.tourUrl);
    submitData.append('iframeSrc', formData.iframeSrc);
    submitData.append('features', JSON.stringify(formData.features));
    submitData.append('planning_guidance', JSON.stringify(formData.planning_guidance));
    submitData.append('gallery_images', JSON.stringify(existingGalleryImages));

    // Append venue image
    if (venueImage) {
      submitData.append('venue_image', venueImage);
    }

    // Append gallery images
    galleryImages.forEach((file) => {
      submitData.append('gallery_images', file);
    });

    try {
      await onSubmit(submitData);
      // Reset form after successful submission if it's a create operation
      if (!venueData) {
        setFormData({
          venue_name: '',
          venue_title: 'Social Venues',
          venue_title_description: 'Exceptional spaces for unforgettable events and celebrations',
          description: '',
          squareFeet: '',
          theater: '',
          banquet: '',
          tourUrl: '',
          iframeSrc: '',
          features: [],
          planning_guidance: [
            "Add 10-15% extra capacity for guest comfort and movement",
            "Consider additional space for dance floors, stages, or buffet stations",
            "Our event planners can help optimize your layout for the best experience"
          ]
        });
        setVenueImage(null);
        setVenueImagePreview('');
        setGalleryImages([]);
        setGalleryPreviews([]);
        setExistingGalleryImages([]);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {venueData ? 'Edit Event Venue' : 'Add New Event Venue'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Venue Title Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Venue Title Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="venue_title" className="block text-sm font-medium text-gray-700 mb-2">
                Venue Title *
              </label>
              <input
                type="text"
                id="venue_title"
                name="venue_title"
                value={formData.venue_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.venue_title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Social Venues"
              />
              {errors.venue_title && <p className="mt-1 text-sm text-red-600">{errors.venue_title}</p>}
            </div>

            <div>
              <label htmlFor="venue_title_description" className="block text-sm font-medium text-gray-700 mb-2">
                Venue Title Description *
              </label>
              <textarea
                id="venue_title_description"
                name="venue_title_description"
                value={formData.venue_title_description}
                onChange={handleInputChange}
                rows={2}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.venue_title_description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Exceptional spaces for unforgettable events and celebrations"
              />
              {errors.venue_title_description && <p className="mt-1 text-sm text-red-600">{errors.venue_title_description}</p>}
            </div>
          </div>
        </div>

        {/* Venue Information */}
        <div>
          <label htmlFor="venue_name" className="block text-sm font-medium text-gray-700 mb-2">
            Venue Name *
          </label>
          <input
            type="text"
            id="venue_name"
            name="venue_name"
            value={formData.venue_name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.venue_name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Grand Ballroom"
          />
          {errors.venue_name && <p className="mt-1 text-sm text-red-600">{errors.venue_name}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Detailed description of the venue..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Capacity Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700 mb-2">
              Square Feet *
            </label>
            <input
              type="text"
              id="squareFeet"
              name="squareFeet"
              value={formData.squareFeet}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.squareFeet ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="14,500"
            />
            {errors.squareFeet && <p className="mt-1 text-sm text-red-600">{errors.squareFeet}</p>}
          </div>

          <div>
            <label htmlFor="theater" className="block text-sm font-medium text-gray-700 mb-2">
              Theater Capacity *
            </label>
            <input
              type="text"
              id="theater"
              name="theater"
              value={formData.theater}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.theater ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1,800"
            />
            {errors.theater && <p className="mt-1 text-sm text-red-600">{errors.theater}</p>}
          </div>

          <div>
            <label htmlFor="banquet" className="block text-sm font-medium text-gray-700 mb-2">
              Banquet Capacity *
            </label>
            <input
              type="text"
              id="banquet"
              name="banquet"
              value={formData.banquet}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.banquet ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1,200"
            />
            {errors.banquet && <p className="mt-1 text-sm text-red-600">{errors.banquet}</p>}
          </div>
        </div>

        {/* Tour Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tourUrl" className="block text-sm font-medium text-gray-700 mb-2">
              360° Tour URL
            </label>
            <input
              type="url"
              id="tourUrl"
              name="tourUrl"
              value={formData.tourUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://kuula.co/share/collection/..."
            />
          </div>

          <div>
            <label htmlFor="iframeSrc" className="block text-sm font-medium text-gray-700 mb-2">
              Iframe Source URL
            </label>
            <input
              type="url"
              id="iframeSrc"
              name="iframeSrc"
              value={formData.iframeSrc}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://kuula.co/share/collection/..."
            />
          </div>
        </div>

        {/* Venue Image */}
        <div>
          <label htmlFor="venue_image" className="block text-sm font-medium text-gray-700 mb-2">
            Venue Image {!venueData && '*'}
          </label>
          <input
            type="file"
            id="venue_image"
            accept="image/*"
            onChange={handleVenueImageChange}
            className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
              errors.venue_image ? 'border-red-500' : ''
            }`}
          />
          {errors.venue_image && <p className="mt-1 text-sm text-red-600">{errors.venue_image}</p>}
          
          {/* Image Preview */}
          {venueImagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img 
                src={venueImagePreview} 
                alt="Venue preview" 
                className="h-48 w-full object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Features</label>
            <button
              type="button"
              onClick={addFeature}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Add Feature
            </button>
          </div>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Guidance */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Planning Guidance Points</label>
            <button
              type="button"
              onClick={addPlanningGuidance}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Add Guidance
            </button>
          </div>
          <div className="space-y-2">
            {formData.planning_guidance.map((guidance, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  placeholder={`Planning guidance point ${index + 1}`}
                  value={guidance}
                  onChange={(e) => handlePlanningGuidanceChange(index, e.target.value)}
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <button
                  type="button"
                  onClick={() => removePlanningGuidance(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Images */}
        <div>
          <label htmlFor="gallery_images" className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Images
          </label>
          <input
            type="file"
            id="gallery_images"
            accept="image/*"
            multiple
            onChange={handleGalleryImagesChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          
          {/* New Gallery Previews */}
          {galleryPreviews.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">New Gallery Images:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={preview} 
                      alt={`Gallery preview ${index + 1}`} 
                      className="h-24 w-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing Gallery Images */}
          {existingGalleryImages.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Existing Gallery Images:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingGalleryImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Existing gallery ${index + 1}`} 
                      className="h-24 w-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingGalleryImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {venueData ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              venueData ? 'Update Venue' : 'Create Venue'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventVenueForm;