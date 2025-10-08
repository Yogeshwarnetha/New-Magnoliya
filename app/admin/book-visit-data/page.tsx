import AdminDashboardLayout from '@/components/Admin';
import React from 'react';

const BookVisitDataPage = () => {
    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book Your Visit Data</h2>
                <p className="text-gray-600 mb-6">Data from 'Book Your Visit' submissions will appear here.</p>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 text-sm text-gray-500">No bookings yet.</div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default BookVisitDataPage;
