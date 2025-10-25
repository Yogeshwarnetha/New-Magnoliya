import axios from "axios";
import { origin } from "./config";

export interface EventVenueData {
    id?: number;
    venue_name: string;
    venue_title: string;
    venue_title_description: string;
    description: string;
    image: string;
    squareFeet: string;
    theater: string | number;
    banquet: string | number;
    tourUrl?: string;
    iframeSrc?: string;
    features: string[];
    gallery_images: string[];
    planning_guidance: string[];
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
 * 📋 Get all event venues
 */
export const getEventVenues = async (): Promise<ApiResponse<EventVenueData[]>> => {
    try {
        const response = await axios.get(`${origin}/api/v1/event`);

        return {
            ok: true,
            status: response.status,
            data: response.data.data,
        };
    } catch (error: any) {
        console.error("Fetching event venues failed:", error);

        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                error: error.response.data?.message || "Failed to fetch event venues",
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
 * 📋 Get single event venue
 */
export const getEventVenue = async (id: number): Promise<ApiResponse<EventVenueData>> => {
    try {
        const response = await axios.get(`${origin}/api/v1/event/${id}`);

        return {
            ok: true,
            status: response.status,
            data: response.data.data,
        };
    } catch (error: any) {
        console.error("Fetching event venue failed:", error);

        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                error: error.response.data?.message || "Failed to fetch event venue",
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
 * ➕ Create new event venue
 */
export const createEventVenue = async (formData: FormData): Promise<ApiResponse<EventVenueData>> => {
    try {
        const response = await axios.post(`${origin}/api/v1/event`, formData, {
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
        console.error("Creating event venue failed:", error);

        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                error: error.response.data?.message || "Failed to create event venue",
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
 * ✏️ Update event venue
 */
export const updateEventVenue = async (id: number, formData: FormData): Promise<ApiResponse<EventVenueData>> => {
    try {
        const response = await axios.put(`${origin}/api/v1/event/${id}`, formData, {
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
        console.error("Updating event venue failed:", error);

        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                error: error.response.data?.message || "Failed to update event venue",
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
 * 🗑️ Delete event venue
 */
export const deleteEventVenue = async (id: number): Promise<ApiResponse> => {
    try {
        const response = await axios.delete(`${origin}/api/v1/event/${id}`);

        return {
            ok: true,
            status: response.status,
        };
    } catch (error: any) {
        console.error("Deleting event venue failed:", error);

        if (error.response) {
            return {
                ok: false,
                status: error.response.status,
                error: error.response.data?.message || "Failed to delete event venue",
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