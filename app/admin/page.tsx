import AdminDashboardLayout from '@/components/Admin';
import React from 'react';

const AdminDashboard = () => {
    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
                <p className="text-gray-600 mb-6">Welcome to the admin dashboard. Use the menu on the left to navigate to different management pages.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="rounded-lg bg-white p-4 shadow">
                        <h3 className="text-lg font-medium">Contact Form Entries</h3>
                        <p className="text-sm text-gray-500">Recent contact form submissions and stats.</p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow">
                        <h3 className="text-lg font-medium">Testimonials</h3>
                        <p className="text-sm text-gray-500">Manage guest testimonials and approvals.</p>
                    </div>
                    <div className="rounded-lg bg-white p-4 shadow">
                        <h3 className="text-lg font-medium">Gallery</h3>
                        <p className="text-sm text-gray-500">Add, edit or remove gallery images.</p>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AdminDashboard;