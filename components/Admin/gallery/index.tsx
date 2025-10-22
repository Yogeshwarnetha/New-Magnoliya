"use client";
import { useState, useEffect } from 'react';
import GalleryForm from './galleryForm';
import type { GalleryImage } from '@/types';
import {
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  updateGalleryImageWithFile,
  deleteGalleryImage,
  getGalleryStats
} from '@/apirequests/gallery';

const GalleryAdminPanel = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch gallery images
  const fetchImages = async () => {
    try {
      const response = await getAllGalleryImages();
      console.debug('[GalleryAdmin] getAllGalleryImages response:', response);

      if (response.ok && response.data) {
        setImages(response.data);
        
        // Calculate stats
        const imageStats = response.data.reduce((acc: { [key: string]: number }, image: GalleryImage) => {
          if (!acc.__logged && image) {
            // @ts-ignore
            console.debug('[GalleryAdmin] example image fields:', Object.keys(image).reduce((o: any, k) => ({ ...o, [k]: (image as any)[k] }), {}));
            // @ts-ignore
            acc.__logged = true;
          }
          acc[image.category] = (acc[image.category] || 0) + 1;
          return acc;
        }, {});
        setStats(imageStats);
      } else {
        console.error('Failed to fetch images:', response.error);
        alert(response.error || 'Failed to fetch gallery images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('An unexpected error occurred while fetching images');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      let response;

      if (editingImage) {
        // Check if a new image file is provided
        const hasNewImage = formData.get('image') instanceof File;
        
        if (typeof editingImage.id === 'undefined') {
          throw new Error('Editing image id is missing');
        }

        if (hasNewImage) {
          // Update with new image file
          response = await updateGalleryImageWithFile(editingImage.id, formData);
        } else {
          // Update without changing the image
          const updateData = {
            category: formData.get('category') as string,
            caption: formData.get('caption') as string,
          };
          response = await updateGalleryImage(editingImage.id, updateData);
        }
      } else {
        // Create new image
        response = await createGalleryImage(formData);
      }

      if (response.ok) {
        // Refresh the images list
        await fetchImages();
        
        // Reset form state
        setEditingImage(null);
        setShowForm(false);
        
        alert(editingImage ? 'Image updated successfully!' : 'Image uploaded successfully!');
      } else {
        throw new Error(response.error || 'Failed to save image');
      }
      
    } catch (error: any) {
      console.error('Error saving image:', error);
      alert(error.message || 'Error saving image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const response = await deleteGalleryImage(id);

      if (response.ok) {
        // Refresh the images list
        await fetchImages();
        alert('Image deleted successfully!');
      } else {
        throw new Error(response.error || 'Failed to delete image');
      }
    } catch (error: any) {
      console.error('Error deleting image:', error);
      alert(error.message || 'Error deleting image. Please try again.');
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingImage(null);
    setShowForm(false);
  };

  // Filter images based on search and category
  const filteredImages = images.filter(image => {
    const matchesSearch = image.caption?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         image.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(images.map(img => img.category))];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Gallery Management</h1>
          <p className="text-slate-600">Manage your gallery images and categories</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Image</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {Object.entries(stats).map(([category, count]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl font-bold text-blue-600">{count}</div>
            <div className="text-sm text-slate-600 capitalize mt-1">{category}</div>
          </div>
        ))}
        <div className="bg-slate-800 rounded-lg shadow-sm p-4 text-center text-white">
          <div className="text-2xl font-bold">{images.length}</div>
          <div className="text-sm mt-1">Total Images</div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search images by caption or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-900"
            >
              {categories.map(category => (
                <option key={category} value={category} className="capitalize">
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              {editingImage ? 'Edit Image' : 'Add New Image'}
            </h2>
          </div>
          <div className="p-6">
            <GalleryForm
              onSubmit={handleSubmit}
              editingImage={editingImage}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image, idx) => (
          <div key={image.id ?? idx} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative overflow-hidden">
              <img
                src={image.image}
                alt={image.caption || 'Gallery image'}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full capitalize">
                  {image.category.toLowerCase()}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">
                  {image.createdAt ? new Date(image.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
              {image.caption && (
                <p className="text-slate-700 text-sm mb-4 line-clamp-2">
                  {image.caption}
                </p>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 bg-slate-600 text-white py-2 px-3 rounded text-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => image.id && handleDelete(image.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && !showForm && (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
          <div className="text-slate-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No gallery images found</h3>
          <p className="text-slate-600 mb-6">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by uploading your first gallery image.'
            }
          </p>
          <button
            onClick={() => {
              setShowForm(true);
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Your First Image
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryAdminPanel;