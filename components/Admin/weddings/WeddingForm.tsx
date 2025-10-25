"use client";
import { useState, useEffect } from 'react';
import type { WeddingData, Venue, WeddingPackage, Service, TourEmbed, Testimonial } from '@/apirequests/wedding';

interface WeddingFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  weddingData?: WeddingData | null;
  isLoading?: boolean;
}

const WeddingForm: React.FC<WeddingFormProps> = ({
  onSubmit,
  weddingData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_image: '',
    hero_button_text: '',
    hero_button_link: '',
    venues_section_title: '',
    venues_section_description: ['', ''],
    packages_section_title: '',
    packages_section_description: '',
    services_section_title: '',
    services_section_description: '',
    tours_section_title: '',
    tours_section_description: '',
    gallery_section_title: '',
    gallery_section_description: '',
    gallery_button_text: '',
    gallery_button_link: '',
    testimonials_section_title: '',
    testimonials_section_description: '',
    cta_title: '',
    cta_description: '',
    cta_primary_button_text: '',
    cta_primary_button_link: '',
    cta_secondary_button_text: '',
    cta_secondary_button_link: '',
    background_image: '',
    venues: [] as Venue[],
    wedding_packages: [] as WeddingPackage[],
    services: [] as Service[],
    tour_embeds: [] as TourEmbed[],
    gallery_images: [] as string[],
    testimonials: [] as Testimonial[]
  });
  
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [venueImages, setVenueImages] = useState<File[]>([]);
  const [packageImages, setPackageImages] = useState<File[]>([]);
  const [galleryImagesFiles, setGalleryImagesFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (weddingData) {
      setFormData({
        hero_title: weddingData.hero_title || '',
        hero_subtitle: weddingData.hero_subtitle || '',
        hero_image: weddingData.hero_image || '',
        hero_button_text: weddingData.hero_button_text || '',
        hero_button_link: weddingData.hero_button_link || '',
        venues_section_title: weddingData.venues_section_title || '',
        venues_section_description: weddingData.venues_section_description || ['', ''],
        packages_section_title: weddingData.packages_section_title || '',
        packages_section_description: weddingData.packages_section_description || '',
        services_section_title: weddingData.services_section_title || '',
        services_section_description: weddingData.services_section_description || '',
        tours_section_title: weddingData.tours_section_title || '',
        tours_section_description: weddingData.tours_section_description || '',
        gallery_section_title: weddingData.gallery_section_title || '',
        gallery_section_description: weddingData.gallery_section_description || '',
        gallery_button_text: weddingData.gallery_button_text || '',
        gallery_button_link: weddingData.gallery_button_link || '',
        testimonials_section_title: weddingData.testimonials_section_title || '',
        testimonials_section_description: weddingData.testimonials_section_description || '',
        cta_title: weddingData.cta_title || '',
        cta_description: weddingData.cta_description || '',
        cta_primary_button_text: weddingData.cta_primary_button_text || '',
        cta_primary_button_link: weddingData.cta_primary_button_link || '',
        cta_secondary_button_text: weddingData.cta_secondary_button_text || '',
        cta_secondary_button_link: weddingData.cta_secondary_button_link || '',
        background_image: weddingData.background_image || '',
        venues: weddingData.venues || [],
        wedding_packages: weddingData.wedding_packages || [],
        services: weddingData.services || [],
        tour_embeds: weddingData.tour_embeds || [],
        gallery_images: weddingData.gallery_images || [],
        testimonials: weddingData.testimonials || []
      });
    }
    setErrors({});
  }, [weddingData]);

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

  const handleDescriptionChange = (section: 'venues', index: number, value: string) => {
    const updatedDescriptions = [...formData.venues_section_description];
    updatedDescriptions[index] = value;
    setFormData(prev => ({
      ...prev,
      venues_section_description: updatedDescriptions
    }));
  };

  // Venues Handlers
  const handleVenueChange = (index: number, field: keyof Venue, value: string | string[]) => {
    const updatedVenues = [...formData.venues];
    if (!updatedVenues[index]) {
      updatedVenues[index] = { 
        name: '', type: '', capacity: '', image: '', description: [], button_text: '', button_link: '' 
      };
    }
    updatedVenues[index] = { ...updatedVenues[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      venues: updatedVenues
    }));
  };

  const handleVenueImageChange = (index: number, file: File) => {
    const updatedFiles = [...venueImages];
    updatedFiles[index] = file;
    setVenueImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedVenues = [...formData.venues];
    if (!updatedVenues[index]) {
      updatedVenues[index] = { 
        name: '', type: '', capacity: '', image: objectUrl, description: [], button_text: '', button_link: '' 
      };
    } else {
      updatedVenues[index] = { ...updatedVenues[index], image: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      venues: updatedVenues
    }));
  };

  const handleVenueDescriptionChange = (venueIndex: number, descIndex: number, value: string) => {
    const updatedVenues = [...formData.venues];
    const venue = { ...updatedVenues[venueIndex] };
    const descriptions = [...venue.description];
    descriptions[descIndex] = value;
    venue.description = descriptions;
    updatedVenues[venueIndex] = venue;
    setFormData(prev => ({
      ...prev,
      venues: updatedVenues
    }));
  };

  const addVenueDescription = (venueIndex: number) => {
    const updatedVenues = [...formData.venues];
    const venue = { ...updatedVenues[venueIndex] };
    venue.description = [...venue.description, ''];
    updatedVenues[venueIndex] = venue;
    setFormData(prev => ({
      ...prev,
      venues: updatedVenues
    }));
  };

  const removeVenueDescription = (venueIndex: number, descIndex: number) => {
    const updatedVenues = [...formData.venues];
    const venue = { ...updatedVenues[venueIndex] };
    venue.description = venue.description.filter((_, i) => i !== descIndex);
    updatedVenues[venueIndex] = venue;
    setFormData(prev => ({
      ...prev,
      venues: updatedVenues
    }));
  };

  const addVenue = () => {
    setFormData(prev => ({
      ...prev,
      venues: [...prev.venues, { 
        name: '', type: '', capacity: '', image: '', description: [''], button_text: '', button_link: '' 
      }]
    }));
  };

  const removeVenue = (index: number) => {
    const updatedVenues = formData.venues.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      venues: updatedVenues
    }));
    const updatedFiles = venueImages.filter((_, i) => i !== index);
    setVenueImages(updatedFiles);
  };

  // Wedding Packages Handlers
  const handlePackageChange = (index: number, field: keyof WeddingPackage, value: string | string[]) => {
    const updatedPackages = [...formData.wedding_packages];
    if (!updatedPackages[index]) {
      updatedPackages[index] = { name: '', price: '', description: '', image: '', includes: [], button_text: '' };
    }
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      wedding_packages: updatedPackages
    }));
  };

  const handlePackageImageChange = (index: number, file: File) => {
    const updatedFiles = [...packageImages];
    updatedFiles[index] = file;
    setPackageImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedPackages = [...formData.wedding_packages];
    if (!updatedPackages[index]) {
      updatedPackages[index] = { name: '', price: '', description: '', image: objectUrl, includes: [], button_text: '' };
    } else {
      updatedPackages[index] = { ...updatedPackages[index], image: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      wedding_packages: updatedPackages
    }));
  };

  const handlePackageIncludeChange = (packageIndex: number, includeIndex: number, value: string) => {
    const updatedPackages = [...formData.wedding_packages];
    const pkg = { ...updatedPackages[packageIndex] };
    const includes = [...pkg.includes];
    includes[includeIndex] = value;
    pkg.includes = includes;
    updatedPackages[packageIndex] = pkg;
    setFormData(prev => ({
      ...prev,
      wedding_packages: updatedPackages
    }));
  };

  const addPackageInclude = (packageIndex: number) => {
    const updatedPackages = [...formData.wedding_packages];
    const pkg = { ...updatedPackages[packageIndex] };
    pkg.includes = [...pkg.includes, ''];
    updatedPackages[packageIndex] = pkg;
    setFormData(prev => ({
      ...prev,
      wedding_packages: updatedPackages
    }));
  };

  const removePackageInclude = (packageIndex: number, includeIndex: number) => {
    const updatedPackages = [...formData.wedding_packages];
    const pkg = { ...updatedPackages[packageIndex] };
    pkg.includes = pkg.includes.filter((_, i) => i !== includeIndex);
    updatedPackages[packageIndex] = pkg;
    setFormData(prev => ({
      ...prev,
      wedding_packages: updatedPackages
    }));
  };

  const addWeddingPackage = () => {
    setFormData(prev => ({
      ...prev,
      wedding_packages: [...prev.wedding_packages, { name: '', price: '', description: '', image: '', includes: [], button_text: '' }]
    }));
  };

  const removeWeddingPackage = (index: number) => {
    const updatedPackages = formData.wedding_packages.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      wedding_packages: updatedPackages
    }));
    const updatedFiles = packageImages.filter((_, i) => i !== index);
    setPackageImages(updatedFiles);
  };

  // Services Handlers
  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
    const updatedServices = [...formData.services];
    if (!updatedServices[index]) {
      updatedServices[index] = { icon: '', title: '', description: '', gradient: '' };
    }
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { icon: '', title: '', description: '', gradient: '' }]
    }));
  };

  const removeService = (index: number) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  // Tour Embeds Handlers
  const handleTourEmbedChange = (index: number, field: keyof TourEmbed, value: string) => {
    const updatedTours = [...formData.tour_embeds];
    if (!updatedTours[index]) {
      updatedTours[index] = { title: '', embed_url: '', description: '' };
    }
    updatedTours[index] = { ...updatedTours[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      tour_embeds: updatedTours
    }));
  };

  const addTourEmbed = () => {
    setFormData(prev => ({
      ...prev,
      tour_embeds: [...prev.tour_embeds, { title: '', embed_url: '', description: '' }]
    }));
  };

  const removeTourEmbed = (index: number) => {
    const updatedTours = formData.tour_embeds.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      tour_embeds: updatedTours
    }));
  };

  // Testimonials Handlers
  const handleTestimonialChange = (index: number, field: keyof Testimonial, value: string) => {
    const updatedTestimonials = [...formData.testimonials];
    if (!updatedTestimonials[index]) {
      updatedTestimonials[index] = { text: '', author: '', event: '' };
    }
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      testimonials: updatedTestimonials
    }));
  };

  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { text: '', author: '', event: '' }]
    }));
  };

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = formData.testimonials.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      testimonials: updatedTestimonials
    }));
  };

  // Gallery Images Handlers
  const handleGalleryFileChange = (index: number, file: File) => {
    const updatedFiles = [...galleryImagesFiles];
    updatedFiles[index] = file;
    setGalleryImagesFiles(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedImages = [...formData.gallery_images];
    updatedImages[index] = objectUrl;
    setFormData(prev => ({
      ...prev,
      gallery_images: updatedImages
    }));
  };

  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      gallery_images: [...prev.gallery_images, '']
    }));
  };

  const removeGalleryImage = (index: number) => {
    const updatedImages = formData.gallery_images.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      gallery_images: updatedImages
    }));
    const updatedFiles = galleryImagesFiles.filter((_, i) => i !== index);
    setGalleryImagesFiles(updatedFiles);
  };

  // File Handlers
  const handleHeroImageChange = (file: File) => {
    setHeroImage(file);
    const objectUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      hero_image: objectUrl
    }));
  };

  const handleBackgroundImageChange = (file: File) => {
    setBackgroundImage(file);
    const objectUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      background_image: objectUrl
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.hero_title) newErrors.hero_title = 'Hero title is required';
    if (!formData.hero_subtitle) newErrors.hero_subtitle = 'Hero subtitle is required';
    if (!formData.venues_section_title) newErrors.venues_section_title = 'Venues section title is required';

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
    submitData.append('hero_title', formData.hero_title);
    submitData.append('hero_subtitle', formData.hero_subtitle);
    submitData.append('hero_button_text', formData.hero_button_text);
    submitData.append('hero_button_link', formData.hero_button_link);
    submitData.append('venues_section_title', formData.venues_section_title);
    submitData.append('venues_section_description', JSON.stringify(formData.venues_section_description));
    submitData.append('packages_section_title', formData.packages_section_title);
    submitData.append('packages_section_description', formData.packages_section_description);
    submitData.append('services_section_title', formData.services_section_title);
    submitData.append('services_section_description', formData.services_section_description);
    submitData.append('tours_section_title', formData.tours_section_title);
    submitData.append('tours_section_description', formData.tours_section_description);
    submitData.append('gallery_section_title', formData.gallery_section_title);
    submitData.append('gallery_section_description', formData.gallery_section_description);
    submitData.append('gallery_button_text', formData.gallery_button_text);
    submitData.append('gallery_button_link', formData.gallery_button_link);
    submitData.append('testimonials_section_title', formData.testimonials_section_title);
    submitData.append('testimonials_section_description', formData.testimonials_section_description);
    submitData.append('cta_title', formData.cta_title);
    submitData.append('cta_description', formData.cta_description);
    submitData.append('cta_primary_button_text', formData.cta_primary_button_text);
    submitData.append('cta_primary_button_link', formData.cta_primary_button_link);
    submitData.append('cta_secondary_button_text', formData.cta_secondary_button_text);
    submitData.append('cta_secondary_button_link', formData.cta_secondary_button_link);

    // Append JSON arrays
    submitData.append('venues', JSON.stringify(formData.venues));
    submitData.append('wedding_packages', JSON.stringify(formData.wedding_packages));
    submitData.append('services', JSON.stringify(formData.services));
    submitData.append('tour_embeds', JSON.stringify(formData.tour_embeds));
    submitData.append('gallery_images', JSON.stringify(formData.gallery_images));
    submitData.append('testimonials', JSON.stringify(formData.testimonials));

    // Append files
    if (heroImage) submitData.append('hero_image', heroImage);
    if (backgroundImage) submitData.append('background_image', backgroundImage);
    
    venueImages.forEach(file => submitData.append('venue_images', file));
    packageImages.forEach(file => submitData.append('package_images', file));
    galleryImagesFiles.forEach(file => submitData.append('gallery_images_files', file));

    try {
      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error updating Wedding content. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Manage Wedding Content
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="hero_title" className="block text-sm font-medium text-gray-700 mb-2">
                Hero Title *
              </label>
              <input
                type="text"
                id="hero_title"
                name="hero_title"
                value={formData.hero_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.hero_title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Weddings"
              />
              {errors.hero_title && <p className="mt-1 text-sm text-red-600">{errors.hero_title}</p>}
            </div>
            <div>
              <label htmlFor="hero_subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                Hero Subtitle *
              </label>
              <input
                type="text"
                id="hero_subtitle"
                name="hero_subtitle"
                value={formData.hero_subtitle}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.hero_subtitle ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your Forever Starts Here at Magnoliya Grand Manor"
              />
              {errors.hero_subtitle && <p className="mt-1 text-sm text-red-600">{errors.hero_subtitle}</p>}
            </div>
            <div>
              <label htmlFor="hero_button_text" className="block text-sm font-medium text-gray-700 mb-2">
                Hero Button Text
              </label>
              <input
                type="text"
                id="hero_button_text"
                name="hero_button_text"
                value={formData.hero_button_text}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Begin Your Journey"
              />
            </div>
            <div>
              <label htmlFor="hero_button_link" className="block text-sm font-medium text-gray-700 mb-2">
                Hero Button Link
              </label>
              <input
                type="text"
                id="hero_button_link"
                name="hero_button_link"
                value={formData.hero_button_link}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleHeroImageChange(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.hero_image && (
                <img src={formData.hero_image} alt="Hero" className="mt-2 h-32 object-cover rounded" />
              )}
            </div>
          </div>
        </div>

        {/* Venues Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Venues Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="venues_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title *
              </label>
              <input
                type="text"
                id="venues_section_title"
                name="venues_section_title"
                value={formData.venues_section_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.venues_section_title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your Forever Starts Here"
              />
              {errors.venues_section_title && <p className="mt-1 text-sm text-red-600">{errors.venues_section_title}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <div className="space-y-3">
                {formData.venues_section_description.map((paragraph, index) => (
                  <textarea
                    key={index}
                    value={paragraph}
                    onChange={(e) => handleDescriptionChange('venues', index, e.target.value)}
                    rows={3}
                    placeholder={`Description paragraph ${index + 1}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Venues */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Venues</h4>
              <button
                type="button"
                onClick={addVenue}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Venue
              </button>
            </div>
            <div className="space-y-6">
              {formData.venues.map((venue, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Venue {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeVenue(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Venue Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleVenueImageChange(index, e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {venue.image && (
                        <img src={venue.image} alt={`Venue ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Venue Name"
                      value={venue.name}
                      onChange={(e) => handleVenueChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Venue Type"
                      value={venue.type}
                      onChange={(e) => handleVenueChange(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Capacity"
                      value={venue.capacity}
                      onChange={(e) => handleVenueChange(index, 'capacity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <button
                          type="button"
                          onClick={() => addVenueDescription(index)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Add Paragraph
                        </button>
                      </div>
                      <div className="space-y-2">
                        {venue.description.map((desc, descIndex) => (
                          <div key={descIndex} className="flex gap-2">
                            <textarea
                              placeholder={`Description paragraph ${descIndex + 1}`}
                              value={desc}
                              onChange={(e) => handleVenueDescriptionChange(index, descIndex, e.target.value)}
                              rows={2}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeVenueDescription(index, descIndex)}
                              className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={venue.button_text}
                      onChange={(e) => handleVenueChange(index, 'button_text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Button Link"
                      value={venue.button_link}
                      onChange={(e) => handleVenueChange(index, 'button_link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wedding Packages Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wedding Packages Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="packages_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                id="packages_section_title"
                name="packages_section_title"
                value={formData.packages_section_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Curated Experiences"
              />
            </div>
            <div>
              <label htmlFor="packages_section_description" className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                id="packages_section_description"
                name="packages_section_description"
                value={formData.packages_section_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your wedding deserves a setting as unforgettable as the day itself..."
              />
            </div>
          </div>

          {/* Wedding Packages */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Wedding Packages</h4>
              <button
                type="button"
                onClick={addWeddingPackage}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Package
              </button>
            </div>
            <div className="space-y-6">
              {formData.wedding_packages.map((pkg, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Package {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeWeddingPackage(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Package Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handlePackageImageChange(index, e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {pkg.image && (
                        <img src={pkg.image} alt={`Package ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Package Name"
                      value={pkg.name}
                      onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      value={pkg.price}
                      onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Description"
                      value={pkg.description}
                      onChange={(e) => handlePackageChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Includes</label>
                        <button
                          type="button"
                          onClick={() => addPackageInclude(index)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Add Include
                        </button>
                      </div>
                      <div className="space-y-2">
                        {pkg.includes.map((include, includeIndex) => (
                          <div key={includeIndex} className="flex gap-2">
                            <input
                              type="text"
                              placeholder={`Include ${includeIndex + 1}`}
                              value={include}
                              onChange={(e) => handlePackageIncludeChange(index, includeIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removePackageInclude(index, includeIndex)}
                              className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={pkg.button_text}
                      onChange={(e) => handlePackageChange(index, 'button_text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="services_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                id="services_section_title"
                name="services_section_title"
                value={formData.services_section_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wedding Offerings"
              />
            </div>
            <div>
              <label htmlFor="services_section_description" className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                id="services_section_description"
                name="services_section_description"
                value={formData.services_section_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="From intimate ceremonies to grand celebrations..."
              />
            </div>
          </div>

          {/* Services */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Services</h4>
              <button
                type="button"
                onClick={addService}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Service
              </button>
            </div>
            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Service {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      placeholder="Icon Name (e.g., FiHeart)"
                      value={service.icon}
                      onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Service Title"
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Service Description"
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Gradient Class (e.g., from-pink-50 to-rose-50)"
                      value={service.gradient}
                      onChange={(e) => handleServiceChange(index, 'gradient', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tours Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">360° Tours Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="tours_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                id="tours_section_title"
                name="tours_section_title"
                value={formData.tours_section_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="360° Venue Tours"
              />
            </div>
            <div>
              <label htmlFor="tours_section_description" className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                id="tours_section_description"
                name="tours_section_description"
                value={formData.tours_section_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Explore our spaces with interactive 360° tours..."
              />
            </div>
          </div>

          {/* Tour Embeds */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Tour Embeds</h4>
              <button
                type="button"
                onClick={addTourEmbed}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Tour
              </button>
            </div>
            <div className="space-y-4">
              {formData.tour_embeds.map((tour, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Tour {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeTourEmbed(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      placeholder="Tour Title"
                      value={tour.title}
                      onChange={(e) => handleTourEmbedChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Embed URL"
                      value={tour.embed_url}
                      onChange={(e) => handleTourEmbedChange(index, 'embed_url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Tour Description"
                      value={tour.description}
                      onChange={(e) => handleTourEmbedChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="gallery_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                id="gallery_section_title"
                name="gallery_section_title"
                value={formData.gallery_section_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wedding Gallery"
              />
            </div>
            <div>
              <label htmlFor="gallery_section_description" className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                id="gallery_section_description"
                name="gallery_section_description"
                value={formData.gallery_section_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Browse through our collection of beautiful wedding moments..."
              />
            </div>
          </div>

          {/* Gallery Images */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Gallery Images</h4>
              <button
                type="button"
                onClick={addGalleryImage}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Image
              </button>
            </div>
            <div className="space-y-4">
              {formData.gallery_images.map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Gallery Image {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleGalleryFileChange(index, e.target.files[0])}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {image && (
                      <img src={image} alt={`Gallery ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Testimonials Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="testimonials_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                id="testimonials_section_title"
                name="testimonials_section_title"
                value={formData.testimonials_section_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Real Wedding Stories"
              />
            </div>
            <div>
              <label htmlFor="testimonials_section_description" className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                id="testimonials_section_description"
                name="testimonials_section_description"
                value={formData.testimonials_section_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Hear from couples who celebrated their special day with us"
              />
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Testimonials</h4>
              <button
                type="button"
                onClick={addTestimonial}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Testimonial
              </button>
            </div>
            <div className="space-y-4">
              {formData.testimonials.map((testimonial, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Testimonial {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeTestimonial(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <textarea
                      placeholder="Testimonial Text"
                      value={testimonial.text}
                      onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Author"
                      value={testimonial.author}
                      onChange={(e) => handleTestimonialChange(index, 'author', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Event"
                      value={testimonial.event}
                      onChange={(e) => handleTestimonialChange(index, 'event', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call to Action Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="cta_title" className="block text-sm font-medium text-gray-700 mb-2">
                CTA Title
              </label>
              <input
                type="text"
                id="cta_title"
                name="cta_title"
                value={formData.cta_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Begin Your Wedding Journey"
              />
            </div>
            <div>
              <label htmlFor="cta_description" className="block text-sm font-medium text-gray-700 mb-2">
                CTA Description
              </label>
              <textarea
                id="cta_description"
                name="cta_description"
                value={formData.cta_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Let us help you create the wedding of your dreams..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cta_primary_button_text" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  id="cta_primary_button_text"
                  name="cta_primary_button_text"
                  value={formData.cta_primary_button_text}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Schedule a Tour"
                />
              </div>
              <div>
                <label htmlFor="cta_primary_button_link" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  id="cta_primary_button_link"
                  name="cta_primary_button_link"
                  value={formData.cta_primary_button_link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cta_secondary_button_text" className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  id="cta_secondary_button_text"
                  name="cta_secondary_button_text"
                  value={formData.cta_secondary_button_text}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Request Pricing"
                />
              </div>
              <div>
                <label htmlFor="cta_secondary_button_link" className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  id="cta_secondary_button_link"
                  name="cta_secondary_button_link"
                  value={formData.cta_secondary_button_link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Image</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleBackgroundImageChange(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.background_image && (
              <img src={formData.background_image} alt="Background" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
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
                Updating...
              </>
            ) : (
              'Update Wedding Content'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeddingForm;