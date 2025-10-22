import axios from "axios";
import { origin } from "./config";
import type { GalleryImage } from "@/types";

interface GalleryFormData {
  category: string;
  caption?: string;
  image?: File;
}

interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

/**
 * 🖼️ Create a new gallery image
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
    console.error("Gallery image creation failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to upload gallery image",
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
 * 📋 Get all gallery images with optional category filter
 */
export const getAllGalleryImages = async (category?: string): Promise<ApiResponse<GalleryImage[]>> => {
  try {
  const url = category ? `${origin}/api/v1/gallery?category=${encodeURIComponent(category)}` : `${origin}/api/v1/gallery`;
    const response = await axios.get(url);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Fetching all gallery images failed:", error);

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
 * 🔍 Get gallery images by category
 */
export const getGalleryImagesByCategory = async (category: string): Promise<ApiResponse<GalleryImage[]>> => {
  try {
    const response = await axios.get(`${origin}/api/v1/gallery/category/${encodeURIComponent(category)}`);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error(`Fetching gallery images for category ${category} failed:`, error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to fetch gallery images by category",
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
 * 🔍 Get gallery image by ID
 */
export const getGalleryImageById = async (id: number): Promise<ApiResponse<GalleryImage>> => {
  try {
    const response = await axios.get(`${origin}/api/v1/gallery/${id}`);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error(`Fetching gallery image with ID ${id} failed:`, error);

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
 * ✏️ Update gallery image
 */
export const updateGalleryImage = async (id: number, data: Partial<GalleryImage>): Promise<ApiResponse<GalleryImage>> => {
  try {
    const response = await axios.put(`${origin}/api/v1/gallery/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error(`Updating gallery image with ID ${id} failed:`, error);

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
 * ✏️ Update gallery image with file upload
 */
export const updateGalleryImageWithFile = async (id: number, formData: FormData): Promise<ApiResponse<GalleryImage>> => {
  try {
    const response = await axios.put(`${origin}/api/v1/gallery/${id}`, formData, {
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
    console.error(`Updating gallery image with ID ${id} failed:`, error);

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
 * 🗑️ Delete gallery image by ID
 */
export const deleteGalleryImage = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(`${origin}/api/v1/gallery/${id}`);

    return {
      ok: true,
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error(`Deleting gallery image with ID ${id} failed:`, error);

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

/**
 * 📊 Get gallery statistics
 */
export const getGalleryStats = async (): Promise<ApiResponse<{ [key: string]: number }>> => {
  try {
    const response = await axios.get(`${origin}/api/v1/gallery`);
    const images = response.data.data;

    // Calculate stats from the images array
    const stats = images.reduce((acc: { [key: string]: number }, image: GalleryImage) => {
      acc[image.category] = (acc[image.category] || 0) + 1;
      return acc;
    }, {});

    return {
      ok: true,
      status: response.status,
      data: stats,
    };
  } catch (error: any) {
    console.error("Fetching gallery statistics failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to fetch gallery statistics",
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