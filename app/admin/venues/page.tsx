"use client";

import AdminDashboardLayout from '@/components/Admin';
import EventVenueAdminPanel from '@/components/Admin/event Venue';
import React from 'react';


export default function VenuesAdmin() {
   

    return (
        <AdminDashboardLayout>
           <EventVenueAdminPanel/>
        </AdminDashboardLayout>
    );
}
