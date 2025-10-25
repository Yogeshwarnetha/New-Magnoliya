"use client";
import { useState, useEffect } from 'react';
import type { RoomsSuitesData, CarouselSlide, RoomType, HotelFeature, GalleryImage } from '@/apirequests/rooms-suites';

interface RoomsSuitesFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  roomsData?: RoomsSuitesData | null;
  isLoading?: boolean;
}

const RoomsSuitesForm: React.FC<RoomsSuitesFormProps> = ({
  onSubmit,
  roomsData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    hero_title: '',
    connected_hotel_title: '',
    connected_hotel_description: ['', ''],
    connected_hotel_image: '',
    accommodations_title: '',
    accommodations_description: '',
    gallery_title: '',
    gallery_description: '',
    cta_title: '',
    cta_description: '',
    carousel_slides: [] as CarouselSlide[],
    room_types: [] as RoomType[],
    hotel_features: [] as HotelFeature[],
    gallery_images: [] as GalleryImage[]
  });
  
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [roomTypeImages, setRoomTypeImages] = useState<File[]>([]);
  const [hotelFeatureImages, setHotelFeatureImages] = useState<File[]>([]);
  const [galleryImagesFiles, setGalleryImagesFiles] = useState<File[]>([]);
  const [connectedHotelImage, setConnectedHotelImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (roomsData) {
      setFormData({
        hero_title: roomsData.hero_title || '',
        connected_hotel_title: roomsData.connected_hotel_title || '',
        connected_hotel_description: roomsData.connected_hotel_description || ['', ''],
        connected_hotel_image: roomsData.connected_hotel_image || '',
        accommodations_title: roomsData.accommodations_title || '',
        accommodations_description: roomsData.accommodations_description || '',
        gallery_title: roomsData.gallery_title || '',
        gallery_description: roomsData.gallery_description || '',
        cta_title: roomsData.cta_title || '',
        cta_description: roomsData.cta_description || '',
        carousel_slides: roomsData.carousel_slides || [],
        room_types: roomsData.room_types || [],
        hotel_features: roomsData.hotel_features || [],
        gallery_images: roomsData.gallery_images || []
      });
    }
    setErrors({});
  }, [roomsData]);

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

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDescriptions = [...formData.connected_hotel_description];
    updatedDescriptions[index] = value;
    setFormData(prev => ({
      ...prev,
      connected_hotel_description: updatedDescriptions
    }));
  };

  // Carousel Slides Handlers
  const handleCarouselSlideChange = (index: number, field: keyof CarouselSlide, value: string) => {
    const updatedSlides = [...formData.carousel_slides];
    if (!updatedSlides[index]) {
      updatedSlides[index] = { id: index + 1, image: '', title: '' };
    }
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      carousel_slides: updatedSlides
    }));
  };

  const handleCarouselImageChange = (index: number, file: File) => {
    const updatedFiles = [...carouselImages];
    updatedFiles[index] = file;
    setCarouselImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedSlides = [...formData.carousel_slides];
    if (!updatedSlides[index]) {
      updatedSlides[index] = { id: index + 1, image: objectUrl, title: '' };
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
      carousel_slides: [...prev.carousel_slides, { id: prev.carousel_slides.length + 1, image: '', title: '' }]
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

  // Room Types Handlers
  const handleRoomTypeChange = (index: number, field: keyof RoomType, value: string | string[]) => {
    const updatedRoomTypes = [...formData.room_types];
    if (!updatedRoomTypes[index]) {
      updatedRoomTypes[index] = { name: '', description: '', image: '', features: [] };
    }
    updatedRoomTypes[index] = { ...updatedRoomTypes[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      room_types: updatedRoomTypes
    }));
  };

  const handleRoomTypeImageChange = (index: number, file: File) => {
    const updatedFiles = [...roomTypeImages];
    updatedFiles[index] = file;
    setRoomTypeImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedRoomTypes = [...formData.room_types];
    if (!updatedRoomTypes[index]) {
      updatedRoomTypes[index] = { name: '', description: '', image: objectUrl, features: [] };
    } else {
      updatedRoomTypes[index] = { ...updatedRoomTypes[index], image: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      room_types: updatedRoomTypes
    }));
  };

  const handleRoomFeatureChange = (roomIndex: number, featureIndex: number, value: string) => {
    const updatedRoomTypes = [...formData.room_types];
    const room = { ...updatedRoomTypes[roomIndex] };
    const features = [...room.features];
    features[featureIndex] = value;
    room.features = features;
    updatedRoomTypes[roomIndex] = room;
    setFormData(prev => ({
      ...prev,
      room_types: updatedRoomTypes
    }));
  };

  const addRoomFeature = (roomIndex: number) => {
    const updatedRoomTypes = [...formData.room_types];
    const room = { ...updatedRoomTypes[roomIndex] };
    room.features = [...room.features, ''];
    updatedRoomTypes[roomIndex] = room;
    setFormData(prev => ({
      ...prev,
      room_types: updatedRoomTypes
    }));
  };

  const removeRoomFeature = (roomIndex: number, featureIndex: number) => {
    const updatedRoomTypes = [...formData.room_types];
    const room = { ...updatedRoomTypes[roomIndex] };
    room.features = room.features.filter((_, i) => i !== featureIndex);
    updatedRoomTypes[roomIndex] = room;
    setFormData(prev => ({
      ...prev,
      room_types: updatedRoomTypes
    }));
  };

  const addRoomType = () => {
    setFormData(prev => ({
      ...prev,
      room_types: [...prev.room_types, { name: '', description: '', image: '', features: [] }]
    }));
  };

  const removeRoomType = (index: number) => {
    const updatedRoomTypes = formData.room_types.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      room_types: updatedRoomTypes
    }));
    const updatedFiles = roomTypeImages.filter((_, i) => i !== index);
    setRoomTypeImages(updatedFiles);
  };

  // Hotel Features Handlers
  const handleHotelFeatureChange = (index: number, field: keyof HotelFeature, value: string) => {
    const updatedFeatures = [...formData.hotel_features];
    if (!updatedFeatures[index]) {
      updatedFeatures[index] = { image: '', title: '', description: '' };
    }
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      hotel_features: updatedFeatures
    }));
  };

  const handleHotelFeatureImageChange = (index: number, file: File) => {
    const updatedFiles = [...hotelFeatureImages];
    updatedFiles[index] = file;
    setHotelFeatureImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedFeatures = [...formData.hotel_features];
    if (!updatedFeatures[index]) {
      updatedFeatures[index] = { image: objectUrl, title: '', description: '' };
    } else {
      updatedFeatures[index] = { ...updatedFeatures[index], image: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      hotel_features: updatedFeatures
    }));
  };

  const addHotelFeature = () => {
    setFormData(prev => ({
      ...prev,
      hotel_features: [...prev.hotel_features, { image: '', title: '', description: '' }]
    }));
  };

  const removeHotelFeature = (index: number) => {
    const updatedFeatures = formData.hotel_features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      hotel_features: updatedFeatures
    }));
    const updatedFiles = hotelFeatureImages.filter((_, i) => i !== index);
    setHotelFeatureImages(updatedFiles);
  };

  // Gallery Images Handlers
  const handleGalleryImageChange = (index: number, field: keyof GalleryImage, value: string) => {
    const updatedGallery = [...formData.gallery_images];
    if (!updatedGallery[index]) {
      updatedGallery[index] = { src: '', caption: '' };
    }
    updatedGallery[index] = { ...updatedGallery[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      gallery_images: updatedGallery
    }));
  };

  const handleGalleryFileChange = (index: number, file: File) => {
    const updatedFiles = [...galleryImagesFiles];
    updatedFiles[index] = file;
    setGalleryImagesFiles(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedGallery = [...formData.gallery_images];
    if (!updatedGallery[index]) {
      updatedGallery[index] = { src: objectUrl, caption: '' };
    } else {
      updatedGallery[index] = { ...updatedGallery[index], src: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      gallery_images: updatedGallery
    }));
  };

  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      gallery_images: [...prev.gallery_images, { src: '', caption: '' }]
    }));
  };

  const removeGalleryImage = (index: number) => {
    const updatedGallery = formData.gallery_images.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      gallery_images: updatedGallery
    }));
    const updatedFiles = galleryImagesFiles.filter((_, i) => i !== index);
    setGalleryImagesFiles(updatedFiles);
  };

  // Connected Hotel Image Handler
  const handleConnectedHotelImageChange = (file: File) => {
    setConnectedHotelImage(file);
    const objectUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      connected_hotel_image: objectUrl
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.hero_title) newErrors.hero_title = 'Hero title is required';
    if (!formData.connected_hotel_title) newErrors.connected_hotel_title = 'Connected hotel title is required';
    if (!formData.accommodations_title) newErrors.accommodations_title = 'Accommodations title is required';
    if (!formData.gallery_title) newErrors.gallery_title = 'Gallery title is required';
    if (!formData.cta_title) newErrors.cta_title = 'CTA title is required';

    formData.connected_hotel_description.forEach((desc, index) => {
      if (!desc.trim()) {
        newErrors[`hotel_desc_${index}`] = `Hotel description paragraph ${index + 1} is required`;
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
    submitData.append('connected_hotel_title', formData.connected_hotel_title);
    submitData.append('connected_hotel_description', JSON.stringify(formData.connected_hotel_description));
    submitData.append('accommodations_title', formData.accommodations_title);
    submitData.append('accommodations_description', formData.accommodations_description);
    submitData.append('gallery_title', formData.gallery_title);
    submitData.append('gallery_description', formData.gallery_description);
    submitData.append('cta_title', formData.cta_title);
    submitData.append('cta_description', formData.cta_description);
    submitData.append('carousel_slides', JSON.stringify(formData.carousel_slides));
    submitData.append('room_types', JSON.stringify(formData.room_types));
    submitData.append('hotel_features', JSON.stringify(formData.hotel_features));
    submitData.append('gallery_images', JSON.stringify(formData.gallery_images));

    // Append images
    if (connectedHotelImage) {
      submitData.append('connected_hotel_image', connectedHotelImage);
    }
    carouselImages.forEach((file, index) => {
      submitData.append('carousel_images', file);
    });
    roomTypeImages.forEach((file, index) => {
      submitData.append('room_type_images', file);
    });
    hotelFeatureImages.forEach((file, index) => {
      submitData.append('hotel_feature_images', file);
    });
    galleryImagesFiles.forEach((file, index) => {
      submitData.append('gallery_images_files', file);
    });

    try {
      await onSubmit(submitData);
      alert('Rooms & Suites content updated successfully!');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error updating Rooms & Suites content. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Manage Rooms & Suites Content
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
                placeholder="Rooms & Suites"
              />
              {errors.hero_title && <p className="mt-1 text-sm text-red-600">{errors.hero_title}</p>}
            </div>
          </div>

          {/* Carousel Slides */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Carousel Slides</h4>
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
                    <h5 className="font-medium text-gray-900">Slide {index + 1}</h5>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connected Hotel Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Hotel Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="connected_hotel_title" className="block text-sm font-medium text-gray-700 mb-2">
                Hotel Title *
              </label>
              <input
                type="text"
                id="connected_hotel_title"
                name="connected_hotel_title"
                value={formData.connected_hotel_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.connected_hotel_title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Connected to Hilton Garden Inn"
              />
              {errors.connected_hotel_title && <p className="mt-1 text-sm text-red-600">{errors.connected_hotel_title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hotel Description *
              </label>
              <div className="space-y-3">
                {formData.connected_hotel_description.map((paragraph, index) => (
                  <div key={index}>
                    <textarea
                      value={paragraph}
                      onChange={(e) => handleDescriptionChange(index, e.target.value)}
                      rows={3}
                      placeholder={`Description paragraph ${index + 1}`}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`hotel_desc_${index}`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`hotel_desc_${index}`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`hotel_desc_${index}`]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleConnectedHotelImageChange(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.connected_hotel_image && (
                <img src={formData.connected_hotel_image} alt="Hotel" className="mt-2 h-32 object-cover rounded" />
              )}
            </div>
          </div>
        </div>

        {/* Accommodations Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Accommodations Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="accommodations_title" className="block text-sm font-medium text-gray-700 mb-2">
                Accommodations Title *
              </label>
              <input
                type="text"
                id="accommodations_title"
                name="accommodations_title"
                value={formData.accommodations_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.accommodations_title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Accommodation Options"
              />
              {errors.accommodations_title && <p className="mt-1 text-sm text-red-600">{errors.accommodations_title}</p>}
            </div>

            <div>
              <label htmlFor="accommodations_description" className="block text-sm font-medium text-gray-700 mb-2">
                Accommodations Description
              </label>
              <textarea
                id="accommodations_description"
                name="accommodations_description"
                value={formData.accommodations_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Choose from our variety of room types..."
              />
            </div>
          </div>

          {/* Room Types */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Room Types</h4>
              <button
                type="button"
                onClick={addRoomType}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Room Type
              </button>
            </div>
            <div className="space-y-6">
              {formData.room_types.map((room, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Room Type {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeRoomType(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      placeholder="Room Name"
                      value={room.name}
                      onChange={(e) => handleRoomTypeChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Room Description"
                      value={room.description}
                      onChange={(e) => handleRoomTypeChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleRoomTypeImageChange(index, e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {room.image && (
                        <img src={room.image} alt={`Room ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Features</label>
                        <button
                          type="button"
                          onClick={() => addRoomFeature(index)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {room.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex gap-2">
                            <input
                              type="text"
                              placeholder={`Feature ${featureIndex + 1}`}
                              value={feature}
                              onChange={(e) => handleRoomFeatureChange(index, featureIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeRoomFeature(index, featureIndex)}
                              className="px-3 py-2 text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hotel Features */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Hotel Features</h3>
            <button
              type="button"
              onClick={addHotelFeature}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              Add Feature
            </button>
          </div>
          <div className="space-y-4">
            {formData.hotel_features.map((feature, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-medium text-gray-900">Feature {index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeHotelFeature(index)}
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
                      onChange={(e) => e.target.files?.[0] && handleHotelFeatureImageChange(index, e.target.files[0])}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {feature.image && (
                      <img src={feature.image} alt={`Feature ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Feature Title"
                    value={feature.title}
                    onChange={(e) => handleHotelFeatureChange(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    placeholder="Feature Description"
                    value={feature.description}
                    onChange={(e) => handleHotelFeatureChange(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="gallery_title" className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Title *
              </label>
              <input
                type="text"
                id="gallery_title"
                name="gallery_title"
                value={formData.gallery_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.gallery_title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Hotel Gallery"
              />
              {errors.gallery_title && <p className="mt-1 text-sm text-red-600">{errors.gallery_title}</p>}
            </div>

            <div>
              <label htmlFor="gallery_description" className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Description
              </label>
              <textarea
                id="gallery_description"
                name="gallery_description"
                value={formData.gallery_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Explore our beautiful property..."
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
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleGalleryFileChange(index, e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {image.src && (
                        <img src={image.src} alt={`Gallery ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Image Caption"
                      value={image.caption}
                      onChange={(e) => handleGalleryImageChange(index, 'caption', e.target.value)}
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
                CTA Title *
              </label>
              <input
                type="text"
                id="cta_title"
                name="cta_title"
                value={formData.cta_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cta_title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ready to Book Your Stay?"
              />
              {errors.cta_title && <p className="mt-1 text-sm text-red-600">{errors.cta_title}</p>}
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
                placeholder="Experience the comfort and convenience..."
              />
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
              'Update Rooms & Suites Content'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomsSuitesForm;