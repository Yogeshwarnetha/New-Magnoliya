"use client";

import AdminDashboardLayout from '@/components/Admin';
import RoomsSuitesAdminPanel from '@/components/Admin/room&suits';
import React from 'react';



export default function RoomsAdmin() {
   

    return (
        <AdminDashboardLayout>
           <RoomsSuitesAdminPanel/>
        </AdminDashboardLayout>
    );
}
