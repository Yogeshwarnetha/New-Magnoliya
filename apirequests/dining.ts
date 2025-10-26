import axios from "axios";
import { origin } from "./config";

export interface CarouselSlide {
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
    carousel_slides: CarouselSlide[];
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
    createdAt?: Date;
    updatedAt?: Date;
}

interface ApiResponse<T = any> {
    ok: boolean;
    status: number;
    data?: T;
    error?: string;
}

/**
 * 📋 Get Dining content
 */
export const getDining = async (): Promise<ApiResponse<DiningData>> => {
    try {
        const response = await axios.get(`${origin}/api/v1/dining`);

        return {
            ok: true,
            status: response.status,
            data: response.data.data,
        };
    } catch (error: any) {
        console.error("Fetching Dining content failed:", error);

        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                error: error.response.data?.message || "Failed to fetch Dining content",
            };
        } else if (error.request) {
            return {
                ok: false,
                status: 503,
                error: "Network error - Unable to reach the server",
            };
        } else {
            return {
                ok: false,
                status: 500,
                error: "An unexpected error occurred",
            };
        }
    }
};

/**
 * ✏️ Create or Update Dining content
 */
export const updateDining = async (formData: FormData): Promise<ApiResponse<DiningData>> => {
    try {
        const response = await axios.post(`${origin}/api/v1/dining`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            ok: true,
            status: response.status,
            data: response.data.data,
        };
    } catch (error: any) {
        console.error("Updating Dining content failed:", error);

        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                error: error.response.data?.message || "Failed to update Dining content",
            };
        } else if (error.request) {
            return {
                ok: false,
                status: 503,
                error: "Network error - Unable to reach the server",
            };
        } else {
            return {
                ok: false,
                status: 500,
                error: "An unexpected error occurred",
            };
        }
    }
};