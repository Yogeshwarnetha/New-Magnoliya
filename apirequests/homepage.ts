import axios from "axios";
import { origin } from "./config";

export interface NavigationTile {
  title: string;
  image: string;
  alt: string;
  link: string;
  description: string;
}

export interface Highlight {
  title: string;
  description: string;
  image: string;
}

export interface Stat {
  value: string;
  label: string;
  sublabel: string;
}

export interface EventVenue {
  name: string;
  capacity: string;
  image: string;
  description: string;
  link: string;
}

export interface FeaturedRoom {
  name: string;
  price: string;
  image: string;
  description: string;
  features: string[];
  link: string;
}

export interface Testimonial {
  text: string;
  author: string;
  event: string;
}

export interface TourEmbed {
  title: string;
  embed_url: string;
}

export interface HomepageData {
  id?: number;
  hero_title: string;
  hero_subtitle: string;
  hero_video_url: string;
  hero_button_text: string;
  hero_button_link: string;
  navigation_section_title: string;
  navigation_section_subtitle: string;
  navigation_tiles: NavigationTile[];
  experience_section_title: string;
  experience_section_subtitle: string;
  highlights: Highlight[];
  stats: Stat[];
  experience_button_text: string;
  experience_button_link: string;
  about_section_title: string;
  about_description: string[];
  about_button_text: string;
  about_button_link: string;
  about_carousel_images: string[];
  venues_section_title: string;
  event_venues: EventVenue[];
  venues_button_text: string;
  venues_button_link: string;
  rooms_section_title: string;
  featured_rooms: FeaturedRoom[];
  rooms_button_text: string;
  rooms_button_link: string;
  dining_section_title: string;
  dining_description: string[];
  dining_button_text: string;
  dining_button_link: string;
  dining_image: string;
  testimonials_section_title: string;
  testimonials: Testimonial[];
  tours_section_title: string;
  tours_description: string;
  tour_embeds: TourEmbed[];
  gallery_section_title: string;
  gallery_images: string[];
  gallery_button_text: string;
  gallery_button_link: string;
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
 * 📋 Get Homepage content
 */
export const getHomepage = async (): Promise<ApiResponse<HomepageData>> => {
  try {
    const response = await axios.get(`${origin}/api/v1/homepage`);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Fetching Homepage content failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to fetch Homepage content",
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
 * ✏️ Create or Update Homepage content
 */
export const updateHomepage = async (formData: FormData): Promise<ApiResponse<HomepageData>> => {
  try {
    const response = await axios.post(`${origin}/api/v1/homepage`, formData, {
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
    console.error("Updating Homepage content failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to update Homepage content",
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