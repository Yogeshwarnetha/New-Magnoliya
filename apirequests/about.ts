import axios from "axios";
import { origin } from "./config";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface SustainabilityFeature {
  title: string;
  description: string;
}

interface AboutUsData {
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
 * 📋 Get About Us content
 */
export const getAboutUs = async (): Promise<ApiResponse<AboutUsData>> => {
  try {
    const response = await axios.get(`${origin}/api/v1/about`);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Fetching About Us content failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to fetch About Us content",
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
 * ✏️ Create or Update About Us content
 */
export const updateAboutUs = async (formData: FormData): Promise<ApiResponse<AboutUsData>> => {
  try {
    const response = await axios.post(`${origin}/api/v1/about`, formData, {
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
    console.error("Updating About Us content failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to update About Us content",
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