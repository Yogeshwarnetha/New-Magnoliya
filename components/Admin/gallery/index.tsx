"use client";
import { useState, useEffect } from 'react';
import GalleryForm from './galleryForm';
import type { GalleryImage } from '@/apirequests/gallery';
import { getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/apirequests/gallery';

const categories = ["Weddings", "Rooms", "Events", "Dining", "Venues"] as const;

const GalleryAdminPanel = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  // Fetch gallery images
  const fetchGalleryImages = async (category?: string) => {
    setIsLoading(true);
    try {
      const response = await getGalleryImages(category === 'all' ? undefined : category);
      console.debug('[GalleryAdmin] getGalleryImages response:', response);

      if (response.ok && response.data) {
        setGalleryImages(response.data);
      } else {
        console.error('Failed to fetch gallery images:', response.error);
        alert(response.error || 'Failed to fetch gallery images');
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      alert('An unexpected error occurred while fetching images');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchGalleryImages(category === 'all' ? undefined : category);
  };

  // Handle form submission for create/update
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      let response;
      
      if (editingImage) {
        // For updates, we need to handle both FormData and regular JSON updates
        // Since your backend PUT endpoint doesn't handle file uploads, we'll use updateGalleryImage
        const updateData: Partial<GalleryImage> = {
          category: formData.get('category') as GalleryImage['category'],
          caption: formData.get('caption') as string,
        };
        
        response = await updateGalleryImage(editingImage.id, updateData);
      } else {
        response = await createGalleryImage(formData);
      }

      if (response.ok) {
        await fetchGalleryImages(selectedCategory === 'all' ? undefined : selectedCategory);
        setIsFormOpen(false);
        setEditingImage(null);
        alert(`Gallery image ${editingImage ? 'updated' : 'created'} successfully!`);
      } else {
        throw new Error(response.error || `Failed to ${editingImage ? 'update' : 'create'} gallery image`);
      }
    } catch (error: any) {
      console.error('Error submitting gallery image:', error);
      alert(error.message || 'Error submitting image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await deleteGalleryImage(id);

      if (response.ok) {
        await fetchGalleryImages(selectedCategory === 'all' ? undefined : selectedCategory);
        alert('Gallery image deleted successfully!');
      } else {
        throw new Error(response.error || 'Failed to delete gallery image');
      }
    } catch (error: any) {
      console.error('Error deleting gallery image:', error);
      alert(error.message || 'Error deleting image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setIsFormOpen(true);
  };

  // Handle add new
  const handleAddNew = () => {
    setEditingImage(null);
    setIsFormOpen(true);
  };

  // Handle cancel form
  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingImage(null);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Gallery Management</h1>
          <p className="text-slate-600">Manage your gallery images and categories</p>
        </div>
        
        {!isFormOpen && (
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Image</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      {!isFormOpen && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Images
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content - Form or Image Grid */}
      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingImage ? 'Edit Gallery Image' : 'Add New Gallery Image'}
              </h2>
              <button
                onClick={handleCancelForm}
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="p-6">
            <GalleryForm
              onSubmit={handleSubmit}
              galleryImage={editingImage}
              isLoading={isLoading}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      ) : (
        /* Images Grid */
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              {selectedCategory === 'all' ? 'All Images' : `${selectedCategory} Images`}
              <span className="text-sm text-gray-500 ml-2">({galleryImages.length})</span>
            </h2>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading images...</p>
            </div>
          ) : galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    <img
                      src={image.image}
                      alt={image.caption || `Gallery image ${image.id}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {image.category}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(image)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {image.caption && (
                      <p className="text-gray-700 text-sm line-clamp-2">{image.caption}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-2">
                      Added: {new Date(image.createdAt!).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No gallery images found</h3>
              <p className="text-slate-600 mb-6">
                {selectedCategory === 'all' 
                  ? 'Get started by adding your first gallery image.' 
                  : `No images found in ${selectedCategory} category.`}
              </p>
              <button
                onClick={handleAddNew}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add First Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryAdminPanel;