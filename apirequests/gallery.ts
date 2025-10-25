import axios from "axios";
import { origin } from "./config";

export interface GalleryImage {
  id: number;
  category: "Weddings" | "Rooms" | "Events" | "Dining" | "Venues";
  image: string;
  caption?: string;
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
 * 📋 Get all gallery images with optional category filter
 */
export const getGalleryImages = async (category?: string): Promise<ApiResponse<GalleryImage[]>> => {
  try {
    const url = category 
      ? `${origin}/api/v1/gallery/category/${category}`
      : `${origin}/api/v1/gallery`;
    
    const response = await axios.get(url);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Fetching gallery images failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to fetch gallery images",
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
 * 📋 Get single gallery image by ID
 */
export const getGalleryImage = async (id: number): Promise<ApiResponse<GalleryImage>> => {
  try {
    const response = await axios.get(`${origin}/api/v1/gallery/${id}`);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Fetching gallery image failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to fetch gallery image",
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
 * ➕ Create new gallery image
 */
export const createGalleryImage = async (formData: FormData): Promise<ApiResponse<GalleryImage>> => {
  try {
    const response = await axios.post(`${origin}/api/v1/gallery`, formData, {
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
    console.error("Creating gallery image failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to create gallery image",
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
 * ✏️ Update gallery image
 */
export const updateGalleryImage = async (id: number, updateData: Partial<GalleryImage>): Promise<ApiResponse<GalleryImage>> => {
  try {
    const response = await axios.put(`${origin}/api/v1/gallery/${id}`, updateData);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Updating gallery image failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to update gallery image",
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
 * 🗑️ Delete gallery image
 */
export const deleteGalleryImage = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(`${origin}/api/v1/gallery/${id}`);

    return {
      ok: true,
      status: response.status,
    };
  } catch (error: any) {
    console.error("Deleting gallery image failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to delete gallery image",
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