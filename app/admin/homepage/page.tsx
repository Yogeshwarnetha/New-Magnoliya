"use client";

import AdminDashboardLayout from '@/components/Admin';
import HomepageAdminPanel from '@/components/Admin/homepage';
import React from 'react';


export default function HomepageAdmin() {
  

    return (
        <AdminDashboardLayout>
            <HomepageAdminPanel/>
        </AdminDashboardLayout>
    );
}
