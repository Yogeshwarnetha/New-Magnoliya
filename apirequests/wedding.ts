import axios from "axios";
import { origin } from "./config";

export interface Venue {
    name: string;
    type: string;
    capacity: string;
    image: string;
    description: string[];
    button_text: string;
    button_link: string;
}

export interface WeddingPackage {
    name: string;
    price: string;
    description: string;
    image: string;
    includes: string[];
    button_text: string;
}

export interface Service {
    icon: string;
    title: string;
    description: string;
    gradient: string;
}

export interface TourEmbed {
    title: string;
    embed_url: string;
    description: string;
}

export interface Testimonial {
    text: string;
    author: string;
    event: string;
}

export interface WeddingData {
    id?: number;
    hero_title: string;
    hero_subtitle: string;
    hero_image: string;
    hero_button_text: string;
    hero_button_link: string;
    venues_section_title: string;
    venues_section_description: string[];
    venues: Venue[];
    packages_section_title: string;
    packages_section_description: string;
    wedding_packages: WeddingPackage[];
    services_section_title: string;
    services_section_description: string;
    services: Service[];
    tours_section_title: string;
    tours_section_description: string;
    tour_embeds: TourEmbed[];
    gallery_section_title: string;
    gallery_section_description: string;
    gallery_images: string[];
    gallery_button_text: string;
    gallery_button_link: string;
    testimonials_section_title: string;
    testimonials_section_description: string;
    testimonials: Testimonial[];
    cta_title: string;
    cta_description: string;
    cta_primary_button_text: string;
    cta_primary_button_link: string;
    cta_secondary_button_text: string;
    cta_secondary_button_link: string;
    background_image: string;
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
 * 📋 Get Wedding content
 */
export const getWedding = async (): Promise<ApiResponse<WeddingData>> => {
    try {
        const response = await axios.get(`${origin}/api/v1/weddings`);

        return {
            ok: true,
            status: response.status,
            data: response.data.data,
        };
    } catch (error: any) {
        console.error("Fetching Wedding content failed:", error);

        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                error: error.response.data?.message || "Failed to fetch Wedding content",
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
 * ✏️ Create or Update Wedding content
 */
export const updateWedding = async (formData: FormData): Promise<ApiResponse<WeddingData>> => {
    try {
        const response = await axios.post(`${origin}/api/v1/weddings`, formData, {
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
        console.error("Updating Wedding content failed:", error);

        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                error: error.response.data?.message || "Failed to update Wedding content",
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