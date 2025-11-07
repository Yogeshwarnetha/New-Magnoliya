"use client";
import { useState, useEffect } from 'react';
import type { GalleryImage } from '@/apirequests/gallery';

interface GalleryFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  galleryImage?: GalleryImage | null;
  isLoading?: boolean;
  onCancel?: () => void;
}

const categories = ["Weddings", "Events", "Dining", "Venues"] as const;

const GalleryForm: React.FC<GalleryFormProps> = ({
  onSubmit,
  galleryImage,
  isLoading = false,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    category: '' as GalleryImage['category'],
    caption: ''
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (galleryImage) {
      setFormData({
        category: galleryImage.category,
        caption: galleryImage.caption || ''
      });
      setImagePreview(galleryImage.image);
    } else {
      setFormData({
        category: 'Weddings',
        caption: ''
      });
      setImagePreview('');
      setImageFile(null);
    }
    setErrors({});
  }, [galleryImage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.category) newErrors.category = 'Category is required';
    if (!galleryImage && !imageFile) newErrors.image = 'Image is required';

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
    submitData.append('category', formData.category);
    submitData.append('caption', formData.caption);

    // Append image if it's a new file
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    try {
      await onSubmit(submitData);
      // Reset form after successful submission if it's a create operation
      if (!galleryImage) {
        setFormData({ category: 'Weddings', caption: '' });
        setImageFile(null);
        setImagePreview('');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {galleryImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Image {!galleryImage && '*'}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
              errors.image ? 'border-red-500' : ''
            }`}
          />
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-48 w-full object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Caption */}
        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
            Caption
          </label>
          <textarea
            id="caption"
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            rows={3}
            placeholder="Enter image caption (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
                {galleryImage ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              galleryImage ? 'Update Image' : 'Add Image'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;