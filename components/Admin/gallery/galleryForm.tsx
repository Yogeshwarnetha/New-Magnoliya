"use client";
import { useState, useEffect } from 'react';
import type { GalleryImage } from '@/types';

interface GalleryFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  editingImage?: GalleryImage | null;
  onCancel?: () => void;
  isLoading?: boolean;
}

const GalleryForm: React.FC<GalleryFormProps> = ({
  onSubmit,
  editingImage,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    category: '',
    caption: '',
    image: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    { value: 'Weddings', label: 'Weddings' },
    { value: 'Rooms', label: 'Rooms' },
    { value: 'Events', label: 'Events' },
    { value: 'Dining', label: 'Dining' },
    { value: 'Venues', label: 'Venues' }
  ];

  useEffect(() => {
    if (editingImage) {
      setFormData({
        category: editingImage.category,
        caption: editingImage.caption || '',
        image: null
      });
      setPreviewUrl(editingImage.image);
    } else {
      setFormData({
        category: '',
        caption: '',
        image: null
      });
      setPreviewUrl('');
    }
    setErrors({});
  }, [editingImage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          image: 'Please select a valid image file (JPEG, PNG, GIF, WebP)'
        }));
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Clear error
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

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!editingImage && !formData.image) {
      newErrors.image = 'Image is required';
    }

    if (formData.caption && formData.caption.length > 500) {
      newErrors.caption = 'Caption must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = new FormData();
    submitData.append('category', formData.category);
    submitData.append('caption', formData.caption);
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    try {
      await onSubmit(submitData);
      
      // Reset form after successful submission if not editing
      if (!editingImage) {
        setFormData({
          category: '',
          caption: '',
          image: null
        });
        setPreviewUrl('');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      category: '',
      caption: '',
      image: null
    });
    setPreviewUrl('');
    setErrors({});
    onCancel?.();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Field */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        {/* Image Upload Field */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            {editingImage ? 'Replace Image' : 'Upload Image *'}
          </label>
          
          {/* Image Preview */}
          {(previewUrl || editingImage?.image) && (
            <div className="mb-4">
              <img
                src={previewUrl || editingImage?.image}
                alt="Preview"
                className="max-w-full h-48 object-cover rounded-lg border border-gray-300"
              />
              {editingImage?.image && !previewUrl && (
                <p className="text-sm text-gray-500 mt-2">
                  Current image: {editingImage.image.split('/').pop()}
                </p>
              )}
            </div>
          )}

          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.image ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="mt-1 text-sm text-gray-500">
            Supported formats: JPEG, PNG, GIF, WebP (Max: 5MB)
          </p>
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        {/* Caption Field */}
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
            placeholder="Enter a caption for the image (optional)"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.caption ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <div className="flex justify-between mt-1">
            {errors.caption && (
              <p className="text-sm text-red-600">{errors.caption}</p>
            )}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.caption.length}/500
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          {editingImage && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {editingImage ? 'Updating...' : 'Uploading...'}
              </>
            ) : (
              editingImage ? 'Update Image' : 'Upload Image'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;