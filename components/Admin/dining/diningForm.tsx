"use client";
import { useState, useEffect } from 'react';

interface CarouselSlide {
    id: number;
    image: string;
    title: string;
    description: string;
}

interface CulinaryStoryCarouselItem {
    image: string;
    title: string;
    description: string;
}

interface CulinaryStoryFeature {
    icon: string;
    title: string;
    description: string;
}

interface CateringOption {
    title: string;
    image: string;
}

interface FlavorfulVoyageCard {
    image: string;
    heading: string;
    description: string;
}

interface RestaurantCard {
    image: string;
    heading: string;
    tagline: string;
    description: string;
    keypoints: string[];
}

interface CulinaryExcellenceItem {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    keypoints: string[];
}

interface DiningData {
    id?: number;
    hero_title: string;
    hero_subtitle: string;
    carousel_slides: CarouselSlide[];
    culinary_story_title: string;
    culinary_story_description: string;
    culinary_story_carousel: CulinaryStoryCarouselItem[];
    culinary_story_features: CulinaryStoryFeature[];
    catering_options: CateringOption[];
    flavorful_voyage_title: string;
    flavorful_voyage_cards: FlavorfulVoyageCard[];
    flavorful_voyage_second_title: string;
    flavorful_voyage_second_description: string;
    restaurants_title: string;
    restaurants_subtitle: string;
    restaurants_cards: RestaurantCard[];
    culinary_excellence: CulinaryExcellenceItem[];
    culinary_excellence_second_title: string;
    culinary_excellence_keypoints: string[];
}

interface DiningFormProps {
    onSubmit: (data: FormData) => Promise<void>;
    diningData?: DiningData | null;
    isLoading?: boolean;
}

const DiningForm: React.FC<DiningFormProps> = ({
    onSubmit,
    diningData,
    isLoading = false
}) => {
    const [formData, setFormData] = useState({
        hero_title: '',
        hero_subtitle: '',
        culinary_story_title: '',
        culinary_story_description: '',
        restaurants_title: '',
        restaurants_subtitle: '',
        flavorful_voyage_title: '',
        flavorful_voyage_second_title: '',
        flavorful_voyage_second_description: '',
        culinary_excellence_second_title: '',
        carousel_slides: [] as CarouselSlide[],
        culinary_story_carousel: [] as CulinaryStoryCarouselItem[],
        culinary_story_features: [] as CulinaryStoryFeature[],
        catering_options: [] as CateringOption[],
        flavorful_voyage_cards: [] as FlavorfulVoyageCard[],
        restaurants_cards: [] as RestaurantCard[],
        culinary_excellence: [] as CulinaryExcellenceItem[],
        culinary_excellence_keypoints: [] as string[]
    });
    
    const [carouselImages, setCarouselImages] = useState<File[]>([]);
    const [culinaryStoryImages, setCulinaryStoryImages] = useState<File[]>([]);
    const [cateringOptionImages, setCateringOptionImages] = useState<File[]>([]);
    const [flavorfulVoyageImages, setFlavorfulVoyageImages] = useState<File[]>([]);
    const [restaurantCardImages, setRestaurantCardImages] = useState<File[]>([]);
    const [culinaryExcellenceImages, setCulinaryExcellenceImages] = useState<File[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (diningData) {
            setFormData({
                hero_title: diningData.hero_title || '',
                hero_subtitle: diningData.hero_subtitle || '',
                culinary_story_title: diningData.culinary_story_title || '',
                culinary_story_description: diningData.culinary_story_description || '',
                restaurants_title: diningData.restaurants_title || '',
                restaurants_subtitle: diningData.restaurants_subtitle || '',
                flavorful_voyage_title: diningData.flavorful_voyage_title || '',
                flavorful_voyage_second_title: diningData.flavorful_voyage_second_title || '',
                flavorful_voyage_second_description: diningData.flavorful_voyage_second_description || '',
                culinary_excellence_second_title: diningData.culinary_excellence_second_title || '',
                carousel_slides: diningData.carousel_slides || [],
                culinary_story_carousel: diningData.culinary_story_carousel || [],
                culinary_story_features: diningData.culinary_story_features || [],
                catering_options: diningData.catering_options || [],
                flavorful_voyage_cards: diningData.flavorful_voyage_cards || [],
                restaurants_cards: diningData.restaurants_cards || [],
                culinary_excellence: diningData.culinary_excellence || [],
                culinary_excellence_keypoints: diningData.culinary_excellence_keypoints || []
            });
        }
        setErrors({});
    }, [diningData]);

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

    // Carousel Slides Management
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

    const handleCarouselImageChange = (index: number, file: File) => {
        const updatedFiles = [...carouselImages];
        updatedFiles[index] = file;
        setCarouselImages(updatedFiles);

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

    // Culinary Story Carousel Management
    const handleCulinaryStoryCarouselChange = (index: number, field: keyof CulinaryStoryCarouselItem, value: string) => {
        const updatedCarousel = [...formData.culinary_story_carousel];
        if (!updatedCarousel[index]) {
            updatedCarousel[index] = { image: '', title: '', description: '' };
        }
        updatedCarousel[index] = { ...updatedCarousel[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            culinary_story_carousel: updatedCarousel
        }));
    };

    const handleCulinaryStoryImageChange = (index: number, file: File) => {
        const updatedFiles = [...culinaryStoryImages];
        updatedFiles[index] = file;
        setCulinaryStoryImages(updatedFiles);

        const objectUrl = URL.createObjectURL(file);
        const updatedCarousel = [...formData.culinary_story_carousel];
        if (!updatedCarousel[index]) {
            updatedCarousel[index] = { image: objectUrl, title: '', description: '' };
        } else {
            updatedCarousel[index] = { ...updatedCarousel[index], image: objectUrl };
        }
        setFormData(prev => ({
            ...prev,
            culinary_story_carousel: updatedCarousel
        }));
    };

    const addCulinaryStoryCarousel = () => {
        setFormData(prev => ({
            ...prev,
            culinary_story_carousel: [...prev.culinary_story_carousel, { image: '', title: '', description: '' }]
        }));
    };

    const removeCulinaryStoryCarousel = (index: number) => {
        const updatedCarousel = formData.culinary_story_carousel.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            culinary_story_carousel: updatedCarousel
        }));
        
        const updatedFiles = culinaryStoryImages.filter((_, i) => i !== index);
        setCulinaryStoryImages(updatedFiles);
    };

    // Culinary Story Features Management
    const handleCulinaryStoryFeatureChange = (index: number, field: keyof CulinaryStoryFeature, value: string) => {
        const updatedFeatures = [...formData.culinary_story_features];
        if (!updatedFeatures[index]) {
            updatedFeatures[index] = { icon: '', title: '', description: '' };
        }
        updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            culinary_story_features: updatedFeatures
        }));
    };

    const addCulinaryStoryFeature = () => {
        setFormData(prev => ({
            ...prev,
            culinary_story_features: [...prev.culinary_story_features, { icon: '', title: '', description: '' }]
        }));
    };

    const removeCulinaryStoryFeature = (index: number) => {
        const updatedFeatures = formData.culinary_story_features.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            culinary_story_features: updatedFeatures
        }));
    };

    // Catering Options Management
    const handleCateringOptionChange = (index: number, field: keyof CateringOption, value: string) => {
        const updatedOptions = [...formData.catering_options];
        if (!updatedOptions[index]) {
            updatedOptions[index] = { title: '', image: '' };
        }
        updatedOptions[index] = { ...updatedOptions[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            catering_options: updatedOptions
        }));
    };

    const handleCateringOptionImageChange = (index: number, file: File) => {
        const updatedFiles = [...cateringOptionImages];
        updatedFiles[index] = file;
        setCateringOptionImages(updatedFiles);

        const objectUrl = URL.createObjectURL(file);
        const updatedOptions = [...formData.catering_options];
        if (!updatedOptions[index]) {
            updatedOptions[index] = { title: '', image: objectUrl };
        } else {
            updatedOptions[index] = { ...updatedOptions[index], image: objectUrl };
        }
        setFormData(prev => ({
            ...prev,
            catering_options: updatedOptions
        }));
    };

    const addCateringOption = () => {
        setFormData(prev => ({
            ...prev,
            catering_options: [...prev.catering_options, { title: '', image: '' }]
        }));
    };

    const removeCateringOption = (index: number) => {
        const updatedOptions = formData.catering_options.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            catering_options: updatedOptions
        }));
        
        const updatedFiles = cateringOptionImages.filter((_, i) => i !== index);
        setCateringOptionImages(updatedFiles);
    };

    // Flavorful Voyage Cards Management
    const handleFlavorfulVoyageCardChange = (index: number, field: keyof FlavorfulVoyageCard, value: string) => {
        const updatedCards = [...formData.flavorful_voyage_cards];
        if (!updatedCards[index]) {
            updatedCards[index] = { image: '', heading: '', description: '' };
        }
        updatedCards[index] = { ...updatedCards[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            flavorful_voyage_cards: updatedCards
        }));
    };

    const handleFlavorfulVoyageImageChange = (index: number, file: File) => {
        const updatedFiles = [...flavorfulVoyageImages];
        updatedFiles[index] = file;
        setFlavorfulVoyageImages(updatedFiles);

        const objectUrl = URL.createObjectURL(file);
        const updatedCards = [...formData.flavorful_voyage_cards];
        if (!updatedCards[index]) {
            updatedCards[index] = { image: objectUrl, heading: '', description: '' };
        } else {
            updatedCards[index] = { ...updatedCards[index], image: objectUrl };
        }
        setFormData(prev => ({
            ...prev,
            flavorful_voyage_cards: updatedCards
        }));
    };

    const addFlavorfulVoyageCard = () => {
        setFormData(prev => ({
            ...prev,
            flavorful_voyage_cards: [...prev.flavorful_voyage_cards, { image: '', heading: '', description: '' }]
        }));
    };

    const removeFlavorfulVoyageCard = (index: number) => {
        const updatedCards = formData.flavorful_voyage_cards.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            flavorful_voyage_cards: updatedCards
        }));
        
        const updatedFiles = flavorfulVoyageImages.filter((_, i) => i !== index);
        setFlavorfulVoyageImages(updatedFiles);
    };

    // Restaurants Cards Management
    const handleRestaurantCardChange = (index: number, field: keyof RestaurantCard, value: string | string[]) => {
        const updatedCards = [...formData.restaurants_cards];
        if (!updatedCards[index]) {
            updatedCards[index] = { image: '', heading: '', tagline: '', description: '', keypoints: [] };
        }
        updatedCards[index] = { ...updatedCards[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            restaurants_cards: updatedCards
        }));
    };

    const handleRestaurantCardImageChange = (index: number, file: File) => {
        const updatedFiles = [...restaurantCardImages];
        updatedFiles[index] = file;
        setRestaurantCardImages(updatedFiles);

        const objectUrl = URL.createObjectURL(file);
        const updatedCards = [...formData.restaurants_cards];
        if (!updatedCards[index]) {
            updatedCards[index] = { image: objectUrl, heading: '', tagline: '', description: '', keypoints: [] };
        } else {
            updatedCards[index] = { ...updatedCards[index], image: objectUrl };
        }
        setFormData(prev => ({
            ...prev,
            restaurants_cards: updatedCards
        }));
    };

    const addRestaurantCard = () => {
        setFormData(prev => ({
            ...prev,
            restaurants_cards: [...prev.restaurants_cards, { image: '', heading: '', tagline: '', description: '', keypoints: [] }]
        }));
    };

    const removeRestaurantCard = (index: number) => {
        const updatedCards = formData.restaurants_cards.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            restaurants_cards: updatedCards
        }));
        
        const updatedFiles = restaurantCardImages.filter((_, i) => i !== index);
        setRestaurantCardImages(updatedFiles);
    };

    // Culinary Excellence Management
    const handleCulinaryExcellenceChange = (index: number, field: keyof CulinaryExcellenceItem, value: string | string[]) => {
        const updatedItems = [...formData.culinary_excellence];
        if (!updatedItems[index]) {
            updatedItems[index] = { title: '', subtitle: '', description: '', image: '', keypoints: [] };
        }
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setFormData(prev => ({
            ...prev,
            culinary_excellence: updatedItems
        }));
    };

    const handleCulinaryExcellenceImageChange = (index: number, file: File) => {
        const updatedFiles = [...culinaryExcellenceImages];
        updatedFiles[index] = file;
        setCulinaryExcellenceImages(updatedFiles);

        const objectUrl = URL.createObjectURL(file);
        const updatedItems = [...formData.culinary_excellence];
        if (!updatedItems[index]) {
            updatedItems[index] = { title: '', subtitle: '', description: '', image: objectUrl, keypoints: [] };
        } else {
            updatedItems[index] = { ...updatedItems[index], image: objectUrl };
        }
        setFormData(prev => ({
            ...prev,
            culinary_excellence: updatedItems
        }));
    };

    const addCulinaryExcellence = () => {
        setFormData(prev => ({
            ...prev,
            culinary_excellence: [...prev.culinary_excellence, { title: '', subtitle: '', description: '', image: '', keypoints: [] }]
        }));
    };

    const removeCulinaryExcellence = (index: number) => {
        const updatedItems = formData.culinary_excellence.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            culinary_excellence: updatedItems
        }));
        
        const updatedFiles = culinaryExcellenceImages.filter((_, i) => i !== index);
        setCulinaryExcellenceImages(updatedFiles);
    };

    // Culinary Excellence Keypoints Management
    const handleCulinaryExcellenceKeypointChange = (index: number, value: string) => {
        const updatedKeypoints = [...formData.culinary_excellence_keypoints];
        updatedKeypoints[index] = value;
        setFormData(prev => ({
            ...prev,
            culinary_excellence_keypoints: updatedKeypoints
        }));
    };

    const addCulinaryExcellenceKeypoint = () => {
        setFormData(prev => ({
            ...prev,
            culinary_excellence_keypoints: [...prev.culinary_excellence_keypoints, '']
        }));
    };

    const removeCulinaryExcellenceKeypoint = (index: number) => {
        const updatedKeypoints = formData.culinary_excellence_keypoints.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            culinary_excellence_keypoints: updatedKeypoints
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.hero_title) newErrors.hero_title = 'Hero title is required';
        if (!formData.hero_subtitle) newErrors.hero_subtitle = 'Hero subtitle is required';
        if (!formData.culinary_story_title) newErrors.culinary_story_title = 'Culinary story title is required';
        if (!formData.culinary_story_description) newErrors.culinary_story_description = 'Culinary story description is required';
        if (!formData.restaurants_title) newErrors.restaurants_title = 'Restaurants title is required';
        if (!formData.restaurants_subtitle) newErrors.restaurants_subtitle = 'Restaurants subtitle is required';
        if (!formData.flavorful_voyage_title) newErrors.flavorful_voyage_title = 'Flavorful voyage title is required';
        if (!formData.flavorful_voyage_second_title) newErrors.flavorful_voyage_second_title = 'Flavorful voyage second title is required';
        if (!formData.flavorful_voyage_second_description) newErrors.flavorful_voyage_second_description = 'Flavorful voyage second description is required';
        if (!formData.culinary_excellence_second_title) newErrors.culinary_excellence_second_title = 'Culinary excellence second title is required';

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
        submitData.append('culinary_story_title', formData.culinary_story_title);
        submitData.append('culinary_story_description', formData.culinary_story_description);
        submitData.append('restaurants_title', formData.restaurants_title);
        submitData.append('restaurants_subtitle', formData.restaurants_subtitle);
        submitData.append('flavorful_voyage_title', formData.flavorful_voyage_title);
        submitData.append('flavorful_voyage_second_title', formData.flavorful_voyage_second_title);
        submitData.append('flavorful_voyage_second_description', formData.flavorful_voyage_second_description);
        submitData.append('culinary_excellence_second_title', formData.culinary_excellence_second_title);
        
        // Append JSON data
        submitData.append('carousel_slides', JSON.stringify(formData.carousel_slides));
        submitData.append('culinary_story_carousel', JSON.stringify(formData.culinary_story_carousel));
        submitData.append('culinary_story_features', JSON.stringify(formData.culinary_story_features));
        submitData.append('catering_options', JSON.stringify(formData.catering_options));
        submitData.append('flavorful_voyage_cards', JSON.stringify(formData.flavorful_voyage_cards));
        submitData.append('restaurants_cards', JSON.stringify(formData.restaurants_cards));
        submitData.append('culinary_excellence', JSON.stringify(formData.culinary_excellence));
        submitData.append('culinary_excellence_keypoints', JSON.stringify(formData.culinary_excellence_keypoints));

        // Append all image files
        carouselImages.forEach((file, index) => {
            submitData.append('carousel_images', file);
        });
        culinaryStoryImages.forEach((file, index) => {
            submitData.append('culinary_story_carousel_images', file);
        });
        cateringOptionImages.forEach((file, index) => {
            submitData.append('catering_option_images', file);
        });
        flavorfulVoyageImages.forEach((file, index) => {
            submitData.append('flavorful_voyage_card_images', file);
        });
        restaurantCardImages.forEach((file, index) => {
            submitData.append('restaurant_card_images', file);
        });
        culinaryExcellenceImages.forEach((file, index) => {
            submitData.append('culinary_excellence_images', file);
        });

        try {
            await onSubmit(submitData);
            alert('Dining content updated successfully!');
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Error updating Dining content. Please try again.');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Manage Dining Content
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
                        <h3 className="text-lg font-semibold text-gray-900">Hero Carousel Slides</h3>
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

                {/* Culinary Story Section */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Culinary Story Section</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="culinary_story_title" className="block text-sm font-medium text-gray-700 mb-2">
                                Culinary Story Title *
                            </label>
                            <input
                                type="text"
                                id="culinary_story_title"
                                name="culinary_story_title"
                                value={formData.culinary_story_title}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.culinary_story_title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.culinary_story_title && <p className="mt-1 text-sm text-red-600">{errors.culinary_story_title}</p>}
                        </div>
                        <div>
                            <label htmlFor="culinary_story_description" className="block text-sm font-medium text-gray-700 mb-2">
                                Culinary Story Description *
                            </label>
                            <textarea
                                id="culinary_story_description"
                                name="culinary_story_description"
                                value={formData.culinary_story_description}
                                onChange={handleInputChange}
                                rows={4}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.culinary_story_description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.culinary_story_description && <p className="mt-1 text-sm text-red-600">{errors.culinary_story_description}</p>}
                        </div>
                    </div>

                    {/* Culinary Story Carousel */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-semibold text-gray-900">Culinary Story Carousel</h4>
                            <button
                                type="button"
                                onClick={addCulinaryStoryCarousel}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                                Add Carousel Item
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.culinary_story_carousel.map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h5 className="font-medium text-gray-900">Carousel Item {index + 1}</h5>
                                        <button
                                            type="button"
                                            onClick={() => removeCulinaryStoryCarousel(index)}
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
                                                onChange={(e) => e.target.files?.[0] && handleCulinaryStoryImageChange(index, e.target.files[0])}
                                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                            {item.image && (
                                                <img src={item.image} alt={`Culinary Story ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={item.title}
                                            onChange={(e) => handleCulinaryStoryCarouselChange(index, 'title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={item.description}
                                            onChange={(e) => handleCulinaryStoryCarouselChange(index, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Culinary Story Features */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-semibold text-gray-900">Culinary Story Features</h4>
                            <button
                                type="button"
                                onClick={addCulinaryStoryFeature}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                                Add Feature
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.culinary_story_features.map((feature, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h5 className="font-medium text-gray-900">Feature {index + 1}</h5>
                                        <button
                                            type="button"
                                            onClick={() => removeCulinaryStoryFeature(index)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Icon (SVG code)"
                                            value={feature.icon}
                                            onChange={(e) => handleCulinaryStoryFeatureChange(index, 'icon', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={feature.title}
                                            onChange={(e) => handleCulinaryStoryFeatureChange(index, 'title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={feature.description}
                                            onChange={(e) => handleCulinaryStoryFeatureChange(index, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Catering Options */}
                <div className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Catering Options</h3>
                        <button
                            type="button"
                            onClick={addCateringOption}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                            Add Catering Option
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.catering_options.map((option, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-medium text-gray-900">Catering Option {index + 1}</h4>
                                    <button
                                        type="button"
                                        onClick={() => removeCateringOption(index)}
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
                                            onChange={(e) => e.target.files?.[0] && handleCateringOptionImageChange(index, e.target.files[0])}
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {option.image && (
                                            <img src={option.image} alt={`Catering ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={option.title}
                                        onChange={(e) => handleCateringOptionChange(index, 'title', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Flavorful Voyage Section */}
                <div className="border-b border-gray-200 pb-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="flavorful_voyage_title" className="block text-sm font-medium text-gray-700 mb-2">
                                Flavorful Voyage Title *
                            </label>
                            <input
                                type="text"
                                id="flavorful_voyage_title"
                                name="flavorful_voyage_title"
                                value={formData.flavorful_voyage_title}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.flavorful_voyage_title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.flavorful_voyage_title && <p className="mt-1 text-sm text-red-600">{errors.flavorful_voyage_title}</p>}
                        </div>
                        <div>
                            <label htmlFor="flavorful_voyage_second_title" className="block text-sm font-medium text-gray-700 mb-2">
                                Flavorful Voyage Second Title *
                            </label>
                            <input
                                type="text"
                                id="flavorful_voyage_second_title"
                                name="flavorful_voyage_second_title"
                                value={formData.flavorful_voyage_second_title}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.flavorful_voyage_second_title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.flavorful_voyage_second_title && <p className="mt-1 text-sm text-red-600">{errors.flavorful_voyage_second_title}</p>}
                        </div>
                        <div>
                            <label htmlFor="flavorful_voyage_second_description" className="block text-sm font-medium text-gray-700 mb-2">
                                Flavorful Voyage Second Description *
                            </label>
                            <textarea
                                id="flavorful_voyage_second_description"
                                name="flavorful_voyage_second_description"
                                value={formData.flavorful_voyage_second_description}
                                onChange={handleInputChange}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.flavorful_voyage_second_description ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.flavorful_voyage_second_description && <p className="mt-1 text-sm text-red-600">{errors.flavorful_voyage_second_description}</p>}
                        </div>
                    </div>

                    {/* Flavorful Voyage Cards */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-semibold text-gray-900">Flavorful Voyage Cards</h4>
                            <button
                                type="button"
                                onClick={addFlavorfulVoyageCard}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                                Add Card
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.flavorful_voyage_cards.map((card, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h5 className="font-medium text-gray-900">Card {index + 1}</h5>
                                        <button
                                            type="button"
                                            onClick={() => removeFlavorfulVoyageCard(index)}
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
                                                onChange={(e) => e.target.files?.[0] && handleFlavorfulVoyageImageChange(index, e.target.files[0])}
                                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                            {card.image && (
                                                <img src={card.image} alt={`Flavorful Voyage ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Heading"
                                            value={card.heading}
                                            onChange={(e) => handleFlavorfulVoyageCardChange(index, 'heading', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={card.description}
                                            onChange={(e) => handleFlavorfulVoyageCardChange(index, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Restaurants Section */}
                <div className="border-b border-gray-200 pb-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="restaurants_title" className="block text-sm font-medium text-gray-700 mb-2">
                                Restaurants Title *
                            </label>
                            <input
                                type="text"
                                id="restaurants_title"
                                name="restaurants_title"
                                value={formData.restaurants_title}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.restaurants_title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.restaurants_title && <p className="mt-1 text-sm text-red-600">{errors.restaurants_title}</p>}
                        </div>
                        <div>
                            <label htmlFor="restaurants_subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                                Restaurants Subtitle *
                            </label>
                            <input
                                type="text"
                                id="restaurants_subtitle"
                                name="restaurants_subtitle"
                                value={formData.restaurants_subtitle}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.restaurants_subtitle ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.restaurants_subtitle && <p className="mt-1 text-sm text-red-600">{errors.restaurants_subtitle}</p>}
                        </div>
                    </div>

                    {/* Restaurants Cards */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-semibold text-gray-900">Restaurants Cards</h4>
                            <button
                                type="button"
                                onClick={addRestaurantCard}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                                Add Restaurant
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.restaurants_cards.map((card, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h5 className="font-medium text-gray-900">Restaurant {index + 1}</h5>
                                        <button
                                            type="button"
                                            onClick={() => removeRestaurantCard(index)}
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
                                                onChange={(e) => e.target.files?.[0] && handleRestaurantCardImageChange(index, e.target.files[0])}
                                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                            {card.image && (
                                                <img src={card.image} alt={`Restaurant ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Heading"
                                            value={card.heading}
                                            onChange={(e) => handleRestaurantCardChange(index, 'heading', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Tagline"
                                            value={card.tagline}
                                            onChange={(e) => handleRestaurantCardChange(index, 'tagline', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={card.description}
                                            onChange={(e) => handleRestaurantCardChange(index, 'description', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Keypoints (one per line)</label>
                                            <textarea
                                                value={card.keypoints.join('\n')}
                                                onChange={(e) => handleRestaurantCardChange(index, 'keypoints', e.target.value.split('\n'))}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="Enter keypoints, one per line"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Culinary Excellence Section */}
                <div className="border-b border-gray-200 pb-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="culinary_excellence_second_title" className="block text-sm font-medium text-gray-700 mb-2">
                                Culinary Excellence Second Title *
                            </label>
                            <input
                                type="text"
                                id="culinary_excellence_second_title"
                                name="culinary_excellence_second_title"
                                value={formData.culinary_excellence_second_title}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.culinary_excellence_second_title ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.culinary_excellence_second_title && <p className="mt-1 text-sm text-red-600">{errors.culinary_excellence_second_title}</p>}
                        </div>
                    </div>

                    {/* Culinary Excellence Items */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-semibold text-gray-900">Culinary Excellence Items</h4>
                            <button
                                type="button"
                                onClick={addCulinaryExcellence}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                                Add Item
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.culinary_excellence.map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h5 className="font-medium text-gray-900">Item {index + 1}</h5>
                                        <button
                                            type="button"
                                            onClick={() => removeCulinaryExcellence(index)}
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
                                                onChange={(e) => e.target.files?.[0] && handleCulinaryExcellenceImageChange(index, e.target.files[0])}
                                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                            {item.image && (
                                                <img src={item.image} alt={`Culinary Excellence ${index + 1}`} className="mt-2 h-20 object-cover rounded" />
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={item.title}
                                            onChange={(e) => handleCulinaryExcellenceChange(index, 'title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Subtitle"
                                            value={item.subtitle}
                                            onChange={(e) => handleCulinaryExcellenceChange(index, 'subtitle', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={item.description}
                                            onChange={(e) => handleCulinaryExcellenceChange(index, 'description', e.target.value)}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Keypoints (one per line)</label>
                                            <textarea
                                                value={item.keypoints.join('\n')}
                                                onChange={(e) => handleCulinaryExcellenceChange(index, 'keypoints', e.target.value.split('\n'))}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="Enter keypoints, one per line"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Culinary Excellence Keypoints */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-md font-semibold text-gray-900">Culinary Excellence Keypoints</h4>
                            <button
                                type="button"
                                onClick={addCulinaryExcellenceKeypoint}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            >
                                Add Keypoint
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.culinary_excellence_keypoints.map((keypoint, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder={`Keypoint ${index + 1}`}
                                        value={keypoint}
                                        onChange={(e) => handleCulinaryExcellenceKeypointChange(index, e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeCulinaryExcellenceKeypoint(index)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Remove
                                    </button>
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
                            'Update Dining Content'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DiningForm;