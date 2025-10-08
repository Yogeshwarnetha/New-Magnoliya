import AdminDashboardLayout from '@/components/Admin';
import React from 'react';

const ContactFormDataPage = () => {
    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Form Data</h2>
                <p className="text-gray-600 mb-6">List of contact form submissions will appear here.</p>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 text-sm text-gray-500">No entries yet.</div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ContactFormDataPage;
