"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAdminToken, logoutAdmin } from '@/apirequests/adminAuth'

interface Admin {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextType {
    admin: Admin | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (admin: Admin, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            if (!token) {
                setLoading(false);
                return;
            }

            // Verify the token with the server
            const result = await verifyAdminToken();
            if (result.success && result.admin) {
                setAdmin(result.admin);
                // Update localStorage with fresh admin data
                localStorage.setItem('adminUser', JSON.stringify(result.admin));
            } else {
                // Token is invalid, clear everything
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                setAdmin(null);
            }
        } catch (error) {
            console.error('Auth verification failed:', error);
            // Clear invalid tokens
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            setAdmin(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (adminData: Admin, token: string) => {
        setAdmin(adminData);
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(adminData));
    };

    const logout = async () => {
        try {
            await logoutAdmin();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setAdmin(null);
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            router.push('/admin-login');
        }
    };

    const value: AuthContextType = {
        admin,
        loading,
        isAuthenticated: !!admin,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};