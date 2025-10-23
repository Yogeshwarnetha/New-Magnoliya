import axios from "axios";
import { origin } from "./config";

// Ensure axios sends cookies when making cross-origin requests
axios.defaults.withCredentials = true;

// Login function
export const loginAdmin = async (data: {
    email: string;
    password: string;
}) => {
    try {
        const response = await axios({
            url: `${origin}/api/v1/admin-auth/login`,
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials already set globally, but include for clarity
            withCredentials: true,
            data: JSON.stringify(data),
        });

        return response.data;

    } catch (err: any) {
        console.error("Admin Login API call error:", err?.response?.data || err?.message);
        throw err;
    }
};

// Logout function
export const logoutAdmin = async () => {
    try {
    const response = await axios.post(`${origin}/api/v1/admin-auth/logout`, null, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        console.error("Logout error:", error.response?.data || error.message);
        throw error;
    }
};

// Verify token function
export const verifyAdminToken = async () => {
    try {
    const response = await axios.get(`${origin}/api/v1/admin-auth/verify`, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        console.error("Token verification error:", error.response?.data || error.message);
        throw error;
    }
};