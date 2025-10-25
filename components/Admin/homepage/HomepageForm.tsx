"use client";
import { useState, useEffect } from 'react';
import type { HomepageData, NavigationTile, Highlight, Stat, EventVenue, FeaturedRoom, Testimonial, TourEmbed } from '@/apirequests/homepage';

interface HomepageFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  homepageData?: HomepageData | null;
  isLoading?: boolean;
}

const HomepageForm: React.FC<HomepageFormProps> = ({
  onSubmit,
  homepageData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_video_url: '',
    hero_button_text: '',
    hero_button_link: '',
    navigation_section_title: '',
    navigation_section_subtitle: '',
    experience_section_title: '',
    experience_section_subtitle: '',
    experience_button_text: '',
    experience_button_link: '',
    about_section_title: '',
    about_description: ['', ''],
    about_button_text: '',
    about_button_link: '',
    venues_section_title: '',
    venues_button_text: '',
    venues_button_link: '',
    rooms_section_title: '',
    rooms_button_text: '',
    rooms_button_link: '',
    dining_section_title: '',
    dining_description: ['', ''],
    dining_button_text: '',
    dining_button_link: '',
    dining_image: '',
    testimonials_section_title: '',
    tours_section_title: '',
    tours_description: '',
    gallery_section_title: '',
    gallery_button_text: '',
    gallery_button_link: '',
    cta_title: '',
    cta_description: '',
    cta_primary_button_text: '',
    cta_primary_button_link: '',
    cta_secondary_button_text: '',
    cta_secondary_button_link: '',
    background_image: '',
    navigation_tiles: [] as NavigationTile[],
    highlights: [] as Highlight[],
    stats: [] as Stat[],
    about_carousel_images: [] as string[],
    event_venues: [] as EventVenue[],
    featured_rooms: [] as FeaturedRoom[],
    testimonials: [] as Testimonial[],
    tour_embeds: [] as TourEmbed[],
    gallery_images: [] as string[]
  });
  
  const [heroVideo, setHeroVideo] = useState<File | null>(null);
  const [navigationTileImages, setNavigationTileImages] = useState<File[]>([]);
  const [highlightImages, setHighlightImages] = useState<File[]>([]);
  const [aboutCarouselImages, setAboutCarouselImages] = useState<File[]>([]);
  const [venueImages, setVenueImages] = useState<File[]>([]);
  const [roomImages, setRoomImages] = useState<File[]>([]);
  const [diningImage, setDiningImage] = useState<File | null>(null);
  const [galleryImagesFiles, setGalleryImagesFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (homepageData) {
      setFormData({
        hero_title: homepageData.hero_title || '',
        hero_subtitle: homepageData.hero_subtitle || '',
        hero_video_url: homepageData.hero_video_url || '',
        hero_button_text: homepageData.hero_button_text || '',
        hero_button_link: homepageData.hero_button_link || '',
        navigation_section_title: homepageData.navigation_section_title || '',
        navigation_section_subtitle: homepageData.navigation_section_subtitle || '',
        experience_section_title: homepageData.experience_section_title || '',
        experience_section_subtitle: homepageData.experience_section_subtitle || '',
        experience_button_text: homepageData.experience_button_text || '',
        experience_button_link: homepageData.experience_button_link || '',
        about_section_title: homepageData.about_section_title || '',
        about_description: homepageData.about_description || ['', ''],
        about_button_text: homepageData.about_button_text || '',
        about_button_link: homepageData.about_button_link || '',
        venues_section_title: homepageData.venues_section_title || '',
        venues_button_text: homepageData.venues_button_text || '',
        venues_button_link: homepageData.venues_button_link || '',
        rooms_section_title: homepageData.rooms_section_title || '',
        rooms_button_text: homepageData.rooms_button_text || '',
        rooms_button_link: homepageData.rooms_button_link || '',
        dining_section_title: homepageData.dining_section_title || '',
        dining_description: homepageData.dining_description || ['', ''],
        dining_button_text: homepageData.dining_button_text || '',
        dining_button_link: homepageData.dining_button_link || '',
        dining_image: homepageData.dining_image || '',
        testimonials_section_title: homepageData.testimonials_section_title || '',
        tours_section_title: homepageData.tours_section_title || '',
        tours_description: homepageData.tours_description || '',
        gallery_section_title: homepageData.gallery_section_title || '',
        gallery_button_text: homepageData.gallery_button_text || '',
        gallery_button_link: homepageData.gallery_button_link || '',
        cta_title: homepageData.cta_title || '',
        cta_description: homepageData.cta_description || '',
        cta_primary_button_text: homepageData.cta_primary_button_text || '',
        cta_primary_button_link: homepageData.cta_primary_button_link || '',
        cta_secondary_button_text: homepageData.cta_secondary_button_text || '',
        cta_secondary_button_link: homepageData.cta_secondary_button_link || '',
        background_image: homepageData.background_image || '',
        navigation_tiles: homepageData.navigation_tiles || [],
        highlights: homepageData.highlights || [],
        stats: homepageData.stats || [],
        about_carousel_images: homepageData.about_carousel_images || [],
        event_venues: homepageData.event_venues || [],
        featured_rooms: homepageData.featured_rooms || [],
        testimonials: homepageData.testimonials || [],
        tour_embeds: homepageData.tour_embeds || [],
        gallery_images: homepageData.gallery_images || []
      });
    }
    setErrors({});
  }, [homepageData]);

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

  const handleDescriptionChange = (section: 'about' | 'dining', index: number, value: string) => {
    const key = section === 'about' ? 'about_description' : 'dining_description';
    const updatedDescriptions = [...formData[key]];
    updatedDescriptions[index] = value;
    setFormData(prev => ({
      ...prev,
      [key]: updatedDescriptions
    }));
  };

  // Navigation Tiles Handlers
  const handleNavigationTileChange = (index: number, field: keyof NavigationTile, value: string) => {
    const updatedTiles = [...formData.navigation_tiles];
    if (!updatedTiles[index]) {
      updatedTiles[index] = { title: '', image: '', alt: '', link: '', description: '' };
    }
    updatedTiles[index] = { ...updatedTiles[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      navigation_tiles: updatedTiles
    }));
  };

  const handleNavigationTileImageChange = (index: number, file: File) => {
    const updatedFiles = [...navigationTileImages];
    updatedFiles[index] = file;
    setNavigationTileImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedTiles = [...formData.navigation_tiles];
    if (!updatedTiles[index]) {
      updatedTiles[index] = { title: '', image: objectUrl, alt: '', link: '', description: '' };
    } else {
      updatedTiles[index] = { ...updatedTiles[index], image: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      navigation_tiles: updatedTiles
    }));
  };

  const addNavigationTile = () => {
    setFormData(prev => ({
      ...prev,
      navigation_tiles: [...prev.navigation_tiles, { title: '', image: '', alt: '', link: '', description: '' }]
    }));
  };

  const removeNavigationTile = (index: number) => {
    const updatedTiles = formData.navigation_tiles.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      navigation_tiles: updatedTiles
    }));
    const updatedFiles = navigationTileImages.filter((_, i) => i !== index);
    setNavigationTileImages(updatedFiles);
  };

  // Highlights Handlers
  const handleHighlightChange = (index: number, field: keyof Highlight, value: string) => {
    const updatedHighlights = [...formData.highlights];
    if (!updatedHighlights[index]) {
      updatedHighlights[index] = { title: '', description: '', image: '' };
    }
    updatedHighlights[index] = { ...updatedHighlights[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      highlights: updatedHighlights
    }));
  };

  const handleHighlightImageChange = (index: number, file: File) => {
    const updatedFiles = [...highlightImages];
    updatedFiles[index] = file;
    setHighlightImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedHighlights = [...formData.highlights];
    if (!updatedHighlights[index]) {
      updatedHighlights[index] = { title: '', description: '', image: objectUrl };
    } else {
      updatedHighlights[index] = { ...updatedHighlights[index], image: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      highlights: updatedHighlights
    }));
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, { title: '', description: '', image: '' }]
    }));
  };

  const removeHighlight = (index: number) => {
    const updatedHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      highlights: updatedHighlights
    }));
    const updatedFiles = highlightImages.filter((_, i) => i !== index);
    setHighlightImages(updatedFiles);
  };

  // Stats Handlers
  const handleStatChange = (index: number, field: keyof Stat, value: string) => {
    const updatedStats = [...formData.stats];
    if (!updatedStats[index]) {
      updatedStats[index] = { value: '', label: '', sublabel: '' };
    }
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      stats: updatedStats
    }));
  };

  const addStat = () => {
    setFormData(prev => ({
      ...prev,
      stats: [...prev.stats, { value: '', label: '', sublabel: '' }]
    }));
  };

  const removeStat = (index: number) => {
    const updatedStats = formData.stats.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      stats: updatedStats
    }));
  };

  // Event Venues Handlers
  const handleEventVenueChange = (index: number, field: keyof EventVenue, value: string) => {
    const updatedVenues = [...formData.event_venues];
    if (!updatedVenues[index]) {
      updatedVenues[index] = { name: '', capacity: '', image: '', description: '', link: '' };
    }
    updatedVenues[index] = { ...updatedVenues[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      event_venues: updatedVenues
    }));
  };

  const handleVenueImageChange = (index: number, file: File) => {
    const updatedFiles = [...venueImages];
    updatedFiles[index] = file;
    setVenueImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedVenues = [...formData.event_venues];
    if (!updatedVenues[index]) {
      updatedVenues[index] = { name: '', capacity: '', image: objectUrl, description: '', link: '' };
    } else {
      updatedVenues[index] = { ...updatedVenues[index], image: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      event_venues: updatedVenues
    }));
  };

  const addEventVenue = () => {
    setFormData(prev => ({
      ...prev,
      event_venues: [...prev.event_venues, { name: '', capacity: '', image: '', description: '', link: '' }]
    }));
  };

  const removeEventVenue = (index: number) => {
    const updatedVenues = formData.event_venues.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      event_venues: updatedVenues
    }));
    const updatedFiles = venueImages.filter((_, i) => i !== index);
    setVenueImages(updatedFiles);
  };

  // Featured Rooms Handlers
  const handleFeaturedRoomChange = (index: number, field: keyof FeaturedRoom, value: string | string[]) => {
    const updatedRooms = [...formData.featured_rooms];
    if (!updatedRooms[index]) {
      updatedRooms[index] = { name: '', price: '', image: '', description: '', features: [], link: '' };
    }
    updatedRooms[index] = { ...updatedRooms[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      featured_rooms: updatedRooms
    }));
  };

  const handleRoomImageChange = (index: number, file: File) => {
    const updatedFiles = [...roomImages];
    updatedFiles[index] = file;
    setRoomImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedRooms = [...formData.featured_rooms];
    if (!updatedRooms[index]) {
      updatedRooms[index] = { name: '', price: '', image: objectUrl, description: '', features: [], link: '' };
    } else {
      updatedRooms[index] = { ...updatedRooms[index], image: objectUrl };
    }
    setFormData(prev => ({
      ...prev,
      featured_rooms: updatedRooms
    }));
  };

  const handleRoomFeatureChange = (roomIndex: number, featureIndex: number, value: string) => {
    const updatedRooms = [...formData.featured_rooms];
    const room = { ...updatedRooms[roomIndex] };
    const features = [...room.features];
    features[featureIndex] = value;
    room.features = features;
    updatedRooms[roomIndex] = room;
    setFormData(prev => ({
      ...prev,
      featured_rooms: updatedRooms
    }));
  };

  const addRoomFeature = (roomIndex: number) => {
    const updatedRooms = [...formData.featured_rooms];
    const room = { ...updatedRooms[roomIndex] };
    room.features = [...room.features, ''];
    updatedRooms[roomIndex] = room;
    setFormData(prev => ({
      ...prev,
      featured_rooms: updatedRooms
    }));
  };

  const removeRoomFeature = (roomIndex: number, featureIndex: number) => {
    const updatedRooms = [...formData.featured_rooms];
    const room = { ...updatedRooms[roomIndex] };
    room.features = room.features.filter((_, i) => i !== featureIndex);
    updatedRooms[roomIndex] = room;
    setFormData(prev => ({
      ...prev,
      featured_rooms: updatedRooms
    }));
  };

  const addFeaturedRoom = () => {
    setFormData(prev => ({
      ...prev,
      featured_rooms: [...prev.featured_rooms, { name: '', price: '', image: '', description: '', features: [], link: '' }]
    }));
  };

  const removeFeaturedRoom = (index: number) => {
    const updatedRooms = formData.featured_rooms.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      featured_rooms: updatedRooms
    }));
    const updatedFiles = roomImages.filter((_, i) => i !== index);
    setRoomImages(updatedFiles);
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

  // Tour Embeds Handlers
  const handleTourEmbedChange = (index: number, field: keyof TourEmbed, value: string) => {
    const updatedTours = [...formData.tour_embeds];
    if (!updatedTours[index]) {
      updatedTours[index] = { title: '', embed_url: '' };
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
      tour_embeds: [...prev.tour_embeds, { title: '', embed_url: '' }]
    }));
  };

  const removeTourEmbed = (index: number) => {
    const updatedTours = formData.tour_embeds.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      tour_embeds: updatedTours
    }));
  };

  // About Carousel Images Handlers
  const handleAboutCarouselImageChange = (index: number, file: File) => {
    const updatedFiles = [...aboutCarouselImages];
    updatedFiles[index] = file;
    setAboutCarouselImages(updatedFiles);

    const objectUrl = URL.createObjectURL(file);
    const updatedImages = [...formData.about_carousel_images];
    updatedImages[index] = objectUrl;
    setFormData(prev => ({
      ...prev,
      about_carousel_images: updatedImages
    }));
  };

  const addAboutCarouselImage = () => {
    setFormData(prev => ({
      ...prev,
      about_carousel_images: [...prev.about_carousel_images, '']
    }));
  };

  const removeAboutCarouselImage = (index: number) => {
    const updatedImages = formData.about_carousel_images.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      about_carousel_images: updatedImages
    }));
    const updatedFiles = aboutCarouselImages.filter((_, i) => i !== index);
    setAboutCarouselImages(updatedFiles);
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
  const handleHeroVideoChange = (file: File) => {
    setHeroVideo(file);
    const objectUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      hero_video_url: objectUrl
    }));
  };

  const handleDiningImageChange = (file: File) => {
    setDiningImage(file);
    const objectUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      dining_image: objectUrl
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.hero_title) newErrors.hero_title = 'Hero title is required';
    if (!formData.hero_subtitle) newErrors.hero_subtitle = 'Hero subtitle is required';
    if (!formData.navigation_section_title) newErrors.navigation_section_title = 'Navigation section title is required';
    if (!formData.experience_section_title) newErrors.experience_section_title = 'Experience section title is required';

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
    submitData.append('navigation_section_title', formData.navigation_section_title);
    submitData.append('navigation_section_subtitle', formData.navigation_section_subtitle);
    submitData.append('experience_section_title', formData.experience_section_title);
    submitData.append('experience_section_subtitle', formData.experience_section_subtitle);
    submitData.append('experience_button_text', formData.experience_button_text);
    submitData.append('experience_button_link', formData.experience_button_link);
    submitData.append('about_section_title', formData.about_section_title);
    submitData.append('about_description', JSON.stringify(formData.about_description));
    submitData.append('about_button_text', formData.about_button_text);
    submitData.append('about_button_link', formData.about_button_link);
    submitData.append('venues_section_title', formData.venues_section_title);
    submitData.append('venues_button_text', formData.venues_button_text);
    submitData.append('venues_button_link', formData.venues_button_link);
    submitData.append('rooms_section_title', formData.rooms_section_title);
    submitData.append('rooms_button_text', formData.rooms_button_text);
    submitData.append('rooms_button_link', formData.rooms_button_link);
    submitData.append('dining_section_title', formData.dining_section_title);
    submitData.append('dining_description', JSON.stringify(formData.dining_description));
    submitData.append('dining_button_text', formData.dining_button_text);
    submitData.append('dining_button_link', formData.dining_button_link);
    submitData.append('testimonials_section_title', formData.testimonials_section_title);
    submitData.append('tours_section_title', formData.tours_section_title);
    submitData.append('tours_description', formData.tours_description);
    submitData.append('gallery_section_title', formData.gallery_section_title);
    submitData.append('gallery_button_text', formData.gallery_button_text);
    submitData.append('gallery_button_link', formData.gallery_button_link);
    submitData.append('cta_title', formData.cta_title);
    submitData.append('cta_description', formData.cta_description);
    submitData.append('cta_primary_button_text', formData.cta_primary_button_text);
    submitData.append('cta_primary_button_link', formData.cta_primary_button_link);
    submitData.append('cta_secondary_button_text', formData.cta_secondary_button_text);
    submitData.append('cta_secondary_button_link', formData.cta_secondary_button_link);

    // Append JSON arrays
    submitData.append('navigation_tiles', JSON.stringify(formData.navigation_tiles));
    submitData.append('highlights', JSON.stringify(formData.highlights));
    submitData.append('stats', JSON.stringify(formData.stats));
    submitData.append('event_venues', JSON.stringify(formData.event_venues));
    submitData.append('featured_rooms', JSON.stringify(formData.featured_rooms));
    submitData.append('testimonials', JSON.stringify(formData.testimonials));
    submitData.append('tour_embeds', JSON.stringify(formData.tour_embeds));
    submitData.append('gallery_images', JSON.stringify(formData.gallery_images));
    submitData.append('about_carousel_images', JSON.stringify(formData.about_carousel_images));

  // Append files
  if (heroVideo) submitData.append('hero_video', heroVideo);
  if (diningImage) submitData.append('dining_image', diningImage);
    
    navigationTileImages.forEach(file => submitData.append('navigation_tile_images', file));
    highlightImages.forEach(file => submitData.append('highlight_images', file));
    aboutCarouselImages.forEach(file => submitData.append('about_carousel_images_files', file));
    venueImages.forEach(file => submitData.append('venue_images', file));
    roomImages.forEach(file => submitData.append('room_images', file));
    galleryImagesFiles.forEach(file => submitData.append('gallery_images_files', file));

    try {
      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error updating Homepage content. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Manage Homepage Content
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
                placeholder="Memorable Events, Luxury Stays"
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
                placeholder="Exceptional Experiences."
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
                placeholder="Book events/schedule meeting"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => e.target.files?.[0] && handleHeroVideoChange(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.hero_video_url && (
                <video src={formData.hero_video_url} controls className="mt-2 h-32 rounded" />
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tiles Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation Tiles Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="navigation_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title *
              </label>
              <input
                type="text"
                id="navigation_section_title"
                name="navigation_section_title"
                value={formData.navigation_section_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.navigation_section_title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Experience Luxury"
              />
              {errors.navigation_section_title && <p className="mt-1 text-sm text-red-600">{errors.navigation_section_title}</p>}
            </div>
            <div>
              <label htmlFor="navigation_section_subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                id="navigation_section_subtitle"
                name="navigation_section_subtitle"
                value={formData.navigation_section_subtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Discover the exceptional services and amenities..."
              />
            </div>
          </div>

          {/* Navigation Tiles */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Navigation Tiles</h4>
              <button
                type="button"
                onClick={addNavigationTile}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Tile
              </button>
            </div>
            <div className="space-y-4">
              {formData.navigation_tiles.map((tile, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Tile {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeNavigationTile(index)}
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
                        onChange={(e) => e.target.files?.[0] && handleNavigationTileImageChange(index, e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {tile.image && (
                        <img src={tile.image} alt={`Tile ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={tile.title}
                      onChange={(e) => handleNavigationTileChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Link"
                      value={tile.link}
                      onChange={(e) => handleNavigationTileChange(index, 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Description"
                      value={tile.description}
                      onChange={(e) => handleNavigationTileChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="experience_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title *
              </label>
              <input
                type="text"
                id="experience_section_title"
                name="experience_section_title"
                value={formData.experience_section_title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.experience_section_title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="The Magnoliya Grand Experience"
              />
              {errors.experience_section_title && <p className="mt-1 text-sm text-red-600">{errors.experience_section_title}</p>}
            </div>
            <div>
              <label htmlFor="experience_section_subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                Section Subtitle
              </label>
              <textarea
                id="experience_section_subtitle"
                name="experience_section_subtitle"
                value={formData.experience_section_subtitle}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Discover the exceptional amenities and services..."
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Highlights</h4>
              <button
                type="button"
                onClick={addHighlight}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Highlight
              </button>
            </div>
            <div className="space-y-4">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Highlight {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index)}
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
                        onChange={(e) => e.target.files?.[0] && handleHighlightImageChange(index, e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {highlight.image && (
                        <img src={highlight.image} alt={`Highlight ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={highlight.title}
                      onChange={(e) => handleHighlightChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={highlight.description}
                      onChange={(e) => handleHighlightChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Stats</h4>
              <button
                type="button"
                onClick={addStat}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Stat
              </button>
            </div>
            <div className="space-y-4">
              {formData.stats.map((stat, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Stat {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeStat(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      placeholder="Value"
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Label"
                      value={stat.label}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Sublabel"
                      value={stat.sublabel}
                      onChange={(e) => handleStatChange(index, 'sublabel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="about_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                id="about_section_title"
                name="about_section_title"
                value={formData.about_section_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="About Magnoliya Grand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Description
              </label>
              <div className="space-y-3">
                {formData.about_description.map((paragraph, index) => (
                  <textarea
                    key={index}
                    value={paragraph}
                    onChange={(e) => handleDescriptionChange('about', index, e.target.value)}
                    rows={3}
                    placeholder={`Description paragraph ${index + 1}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* About Carousel Images */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">About Carousel Images</h4>
              <button
                type="button"
                onClick={addAboutCarouselImage}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Image
              </button>
            </div>
            <div className="space-y-4">
              {formData.about_carousel_images.map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Image {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeAboutCarouselImage(index)}
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
                      onChange={(e) => e.target.files?.[0] && handleAboutCarouselImageChange(index, e.target.files[0])}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {image && (
                      <img src={image} alt={`About carousel ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Venues Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Venues Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="venues_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                id="venues_section_title"
                name="venues_section_title"
                value={formData.venues_section_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Featured Event Venues"
              />
            </div>
          </div>

          {/* Event Venues */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Event Venues</h4>
              <button
                type="button"
                onClick={addEventVenue}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Venue
              </button>
            </div>
            <div className="space-y-4">
              {formData.event_venues.map((venue, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Venue {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeEventVenue(index)}
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
                      onChange={(e) => handleEventVenueChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Capacity"
                      value={venue.capacity}
                      onChange={(e) => handleEventVenueChange(index, 'capacity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Description"
                      value={venue.description}
                      onChange={(e) => handleEventVenueChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Link"
                      value={venue.link}
                      onChange={(e) => handleEventVenueChange(index, 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Rooms Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Rooms Section</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="rooms_section_title" className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                id="rooms_section_title"
                name="rooms_section_title"
                value={formData.rooms_section_title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Luxury Accommodations"
              />
            </div>
          </div>

          {/* Featured Rooms */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-900">Featured Rooms</h4>
              <button
                type="button"
                onClick={addFeaturedRoom}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Room
              </button>
            </div>
            <div className="space-y-6">
              {formData.featured_rooms.map((room, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Room {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeFeaturedRoom(index)}
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
                        onChange={(e) => e.target.files?.[0] && handleRoomImageChange(index, e.target.files[0])}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {room.image && (
                        <img src={room.image} alt={`Room ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Room Name"
                      value={room.name}
                      onChange={(e) => handleFeaturedRoomChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Price Tag"
                      value={room.price}
                      onChange={(e) => handleFeaturedRoomChange(index, 'price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      placeholder="Description"
                      value={room.description}
                      onChange={(e) => handleFeaturedRoomChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Link"
                      value={room.link}
                      onChange={(e) => handleFeaturedRoomChange(index, 'link', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
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
                placeholder="Guest Experiences"
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
                placeholder="Gallery"
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
                placeholder="Plan Your Dream Stay or Event Today"
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
                placeholder="Experience unparalleled luxury and impeccable service..."
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
                  placeholder="Book Now"
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
                  placeholder="Contact Us"
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
                  placeholder="/contact"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background image upload removed */}

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
              'Update Homepage Content'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomepageForm;