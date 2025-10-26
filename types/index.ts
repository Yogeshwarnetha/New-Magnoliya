export interface NavigationTile {
    title: string;
    icon: string;
    link: string;
}

export interface MenuItem {
    label: string;
    href: string;
}

// Shared types
export interface GalleryImage {
    id?: number;
    category: string;
    image: string;
    caption?: string;
    createdAt?: string;
    updatedAt?: string;
}

// About Us related types
export interface CarouselSlide {
    id: number;
    image: string;
    title: string;
    description: string;
}

export interface SustainabilityFeature {
    title: string;
    description: string;
}

export interface AboutUsData {
    id?: number;
    hero_title: string;
    hero_subtitle: string;
    carousel_slides: CarouselSlide[];
    story_title: string;
    story_paragraphs: string[];
    sustainability_title: string;
    sustainability_description: string;
    sustainability_features: SustainabilityFeature[];
    sustainability_commitment: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

// Dining related types
export interface DiningCarouselSlide {
    id: number;
    image: string;
    title: string;
    description: string;
}

export interface CulinaryStoryCarouselItem {
    image: string;
    title: string;
    description: string;
}

export interface CulinaryStoryFeature {
    icon: string;
    title: string;
    description: string;
}

export interface CateringOption {
    title: string;
    image: string;
}

export interface FlavorfulVoyageCard {
    image: string;
    heading: string;
    description: string;
}

export interface FlavorfulVoyageSecondCard {
    title: string;
    description: string;
}

export interface RestaurantCard {
    image: string;
    heading: string;
    tagline: string;
    description: string;
    keypoints: string[];
}

export interface CulinaryExcellenceItem {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    keypoints: string[];
}

export interface DiningData {
    id?: number;
    hero_title: string;
    hero_subtitle: string;
    carousel_slides: DiningCarouselSlide[];
    culinary_story_title: string;
    culinary_story_description: string;
    culinary_story_carousel: CulinaryStoryCarouselItem[];
    culinary_story_features: CulinaryStoryFeature[];
    catering_options: CateringOption[];
    flavorful_voyage_title: string;
    flavorful_voyage_cards: FlavorfulVoyageCard[];
    flavorful_voyage_second_cards: FlavorfulVoyageSecondCard[];
    restaurants_title: string;
    restaurants_subtitle: string;
    restaurants_cards: RestaurantCard[];
    culinary_excellence: CulinaryExcellenceItem[];
    culinary_excellence_second_title: string;
    culinary_excellence_keypoints: string[];
    createdAt?: string | Date;
    updatedAt?: string | Date;
}