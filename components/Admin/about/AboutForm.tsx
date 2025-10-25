"use client";
import { useState, useEffect } from 'react';
import type { AboutUsData, CarouselSlide, SustainabilityFeature } from '@/types';

interface AboutFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  aboutData?: AboutUsData | null;
  isLoading?: boolean;
}

const AboutForm: React.FC<AboutFormProps> = ({
  onSubmit,
  aboutData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    hero_title: '',
    hero_subtitle: '',
    story_title: '',
    sustainability_title: '',
    sustainability_description: '',
    sustainability_commitment: '',
    carousel_slides: [] as CarouselSlide[],
    story_paragraphs: ['', '', '', '', '', ''],
    sustainability_features: [] as SustainabilityFeature[]
  });
  
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (aboutData) {
      setFormData({
        hero_title: aboutData.hero_title || '',
        hero_subtitle: aboutData.hero_subtitle || '',
        story_title: aboutData.story_title || '',
        sustainability_title: aboutData.sustainability_title || '',
        sustainability_description: aboutData.sustainability_description || '',
        sustainability_commitment: aboutData.sustainability_commitment || '',
        carousel_slides: aboutData.carousel_slides || [],
        story_paragraphs: aboutData.story_paragraphs || ['', '', '', '', '', ''],
        sustainability_features: aboutData.sustainability_features || []
      });
    }
    setErrors({});
  }, [aboutData]);

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

  const handleParagraphChange = (index: number, value: string) => {
    const updatedParagraphs = [...formData.story_paragraphs];
    updatedParagraphs[index] = value;
    setFormData(prev => ({
      ...prev,
      story_paragraphs: updatedParagraphs
    }));
  };

  const handleCarouselSlideChange = (index: number, field: keyof CarouselSlide, value: string) => {
    const updatedSlides = [...formData.carousel_slides];
    if (!updatedSlides[index]) {
      updatedSlides[index] = { id: index + 1, image: '', title: '', description: '' };
    }
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      carousel_slides: updatedSlides
    }));
  };

  const handleSustainabilityFeatureChange = (index: number, field: keyof SustainabilityFeature, value: string) => {
    const updatedFeatures = [...formData.sustainability_features];
    if (!updatedFeatures[index]) {
      updatedFeatures[index] = { title: '', description: '' };
    }
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      sustainability_features: updatedFeatures
    }));
  };

  const handleCarouselImageChange = (index: number, file: File) => {
    const updatedFiles = [...carouselImages];
    updatedFiles[index] = file;
    setCarouselImages(updatedFiles);

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    const updatedSlides = [...formData.carousel_slides];
    if (!updatedSlides[index]) {
      updatedSlides[index] = { id: index + 1, image: objectUrl, title: '', description: '' };
    } else {
      updatedSlides[index] = { ...updatedSlides[index], image: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      carousel_slides: updatedSlides
    }));
  };

  const addCarouselSlide = () => {
    setFormData(prev => ({
      ...prev,
      carousel_slides: [...prev.carousel_slides, { id: prev.carousel_slides.length + 1, image: '', title: '', description: '' }]
    }));
  };

  const removeCarouselSlide = (index: number) => {
    const updatedSlides = formData.carousel_slides.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      carousel_slides: updatedSlides
    }));
    
    const updatedFiles = carouselImages.filter((_, i) => i !== index);
    setCarouselImages(updatedFiles);
  };

  const addSustainabilityFeature = () => {
    setFormData(prev => ({
      ...prev,
      sustainability_features: [...prev.sustainability_features, { title: '', description: '' }]
    }));
  };

  const removeSustainabilityFeature = (index: number) => {
    const updatedFeatures = formData.sustainability_features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      sustainability_features: updatedFeatures
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.hero_title) newErrors.hero_title = 'Hero title is required';
    if (!formData.hero_subtitle) newErrors.hero_subtitle = 'Hero subtitle is required';
    if (!formData.story_title) newErrors.story_title = 'Story title is required';
    if (!formData.sustainability_title) newErrors.sustainability_title = 'Sustainability title is required';
    if (!formData.sustainability_description) newErrors.sustainability_description = 'Sustainability description is required';
    if (!formData.sustainability_commitment) newErrors.sustainability_commitment = 'Sustainability commitment is required';

    // Validate story paragraphs
    formData.story_paragraphs.forEach((paragraph, index) => {
      if (!paragraph.trim()) {
        newErrors[`paragraph_${index}`] = `Paragraph ${index + 1} is required`;
      }
    });

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
    submitData.append('story_title', formData.story_title);
    submitData.append('sustainability_title', formData.sustainability_title);
    submitData.append('sustainability_description', formData.sustainability_description);
    submitData.append('sustainability_commitment', formData.sustainability_commitment);
    submitData.append('carousel_slides', JSON.stringify(formData.carousel_slides));
    submitData.append('story_paragraphs', JSON.stringify(formData.story_paragraphs));
    submitData.append('sustainability_features', JSON.stringify(formData.sustainability_features));

    // Append carousel images
    carouselImages.forEach((file, index) => {
      submitData.append('carousel_images', file);
    });

    try {
      await onSubmit(submitData);
      alert('About Us content updated successfully!');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error updating About Us content. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Manage About Us Content
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
              />
              {errors.hero_subtitle && <p className="mt-1 text-sm text-red-600">{errors.hero_subtitle}</p>}
            </div>
          </div>
        </div>

        {/* Carousel Slides */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Carousel Slides</h3>
            <button
              type="button"
              onClick={addCarouselSlide}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              Add Slide
            </button>
          </div>
          <div className="space-y-4">
            {formData.carousel_slides.map((slide, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Slide {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeCarouselSlide(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleCarouselImageChange(index, e.target.files[0])}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {slide.image && (
                      <img src={slide.image} alt={`Slide ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={slide.title}
                    onChange={(e) => handleCarouselSlideChange(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    placeholder="Description"
                    value={slide.description}
                    onChange={(e) => handleCarouselSlideChange(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Story Section</h3>
          <div>
            <label htmlFor="story_title" className="block text-sm font-medium text-gray-700 mb-2">
              Story Title *
            </label>
            <input
              type="text"
              id="story_title"
              name="story_title"
              value={formData.story_title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.story_title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.story_title && <p className="mt-1 text-sm text-red-600">{errors.story_title}</p>}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Story Paragraphs *
            </label>
            <div className="space-y-3">
              {formData.story_paragraphs.map((paragraph, index) => (
                <div key={index}>
                  <textarea
                    value={paragraph}
                    onChange={(e) => handleParagraphChange(index, e.target.value)}
                    rows={3}
                    placeholder={`Paragraph ${index + 1}`}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[`paragraph_${index}`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors[`paragraph_${index}`] && (
                    <p className="mt-1 text-sm text-red-600">{errors[`paragraph_${index}`]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="sustainability_title" className="block text-sm font-medium text-gray-700 mb-2">
                Sustainability Title *
              </label>
              <input
                type="text"
                id="sustainability_title"
                name="sustainability_title"
                value={formData.sustainability_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.sustainability_title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.sustainability_title && <p className="mt-1 text-sm text-red-600">{errors.sustainability_title}</p>}
            </div>
            <div>
              <label htmlFor="sustainability_description" className="block text-sm font-medium text-gray-700 mb-2">
                Sustainability Description *
              </label>
              <textarea
                id="sustainability_description"
                name="sustainability_description"
                value={formData.sustainability_description}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.sustainability_description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.sustainability_description && <p className="mt-1 text-sm text-red-600">{errors.sustainability_description}</p>}
            </div>
            <div>
              <label htmlFor="sustainability_commitment" className="block text-sm font-medium text-gray-700 mb-2">
                Sustainability Commitment *
              </label>
              <textarea
                id="sustainability_commitment"
                name="sustainability_commitment"
                value={formData.sustainability_commitment}
                onChange={handleInputChange}
                rows={2}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.sustainability_commitment ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.sustainability_commitment && <p className="mt-1 text-sm text-red-600">{errors.sustainability_commitment}</p>}
            </div>
          </div>

          {/* Sustainability Features */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Sustainability Features</h4>
              <button
                type="button"
                onClick={addSustainabilityFeature}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Feature
              </button>
            </div>
            <div className="space-y-4">
              {formData.sustainability_features.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Feature {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeSustainabilityFeature(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      placeholder="Feature Title"
                      value={feature.title}
                      onChange={(e) => handleSustainabilityFeatureChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Feature Description"
                      value={feature.description}
                      onChange={(e) => handleSustainabilityFeatureChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
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
              'Update About Us Content'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutForm;