"use client";

import AdminDashboardLayout from '@/components/Admin';
import DiningAdminPanel from '@/components/Admin/dining';
import React from 'react';




export default function DiningAdmin() {
    

    return (
        <AdminDashboardLayout>
            <DiningAdminPanel/>
        </AdminDashboardLayout>
    );
}
