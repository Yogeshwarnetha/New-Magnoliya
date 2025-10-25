"use client";

import AdminDashboardLayout from '@/components/Admin';
import WeddingAdminPanel from '@/components/Admin/weddings';
import React from 'react';



export default function WeddingsAdmin() {
  

    return (
        <AdminDashboardLayout>
           <WeddingAdminPanel/>
        </AdminDashboardLayout>
    );
}
