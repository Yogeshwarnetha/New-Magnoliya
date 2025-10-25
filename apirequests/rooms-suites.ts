import axios from "axios";
import { origin } from "./config";

export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
}

export interface RoomType {
  name: string;
  description: string;
  image: string;
  features: string[];
}

export interface HotelFeature {
  image: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface RoomsSuitesData {
  id?: number;
  hero_title: string;
  carousel_slides: CarouselSlide[];
  connected_hotel_title: string;
  connected_hotel_description: string[];
  connected_hotel_image: string;
  accommodations_title: string;
  accommodations_description: string;
  room_types: RoomType[];
  hotel_features: HotelFeature[];
  gallery_title: string;
  gallery_description: string;
  gallery_images: GalleryImage[];
  cta_title: string;
  cta_description: string;
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
 * 📋 Get Rooms & Suites content
 */
export const getRoomsSuites = async (): Promise<ApiResponse<RoomsSuitesData>> => {
  try {
    const response = await axios.get(`${origin}/api/v1/rooms`);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Fetching Rooms & Suites content failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to fetch Rooms & Suites content",
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
 * ✏️ Create or Update Rooms & Suites content
 */
export const updateRoomsSuites = async (formData: FormData): Promise<ApiResponse<RoomsSuitesData>> => {
  try {
    const response = await axios.post(`${origin}/api/v1/rooms`, formData, {
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
    console.error("Updating Rooms & Suites content failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to update Rooms & Suites content",
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