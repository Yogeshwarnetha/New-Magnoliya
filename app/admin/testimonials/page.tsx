"use client";

import AdminDashboardLayout from '@/components/Admin';
import React, { useState } from 'react';

type Testimonial = {
    id: string;
    name: string;
    title?: string;
    rating: number;
    message: string;
    avatar?: string;
    date?: string;
};

const initialTestimonials: Testimonial[] = [
    {
        id: 't1',
        name: 'Sofia Martinez',
        title: 'Happy Guest',
        rating: 5,
        message: 'Our stay was exceptional — the service, the rooms and the view were all perfect. Highly recommended!',
        avatar: '/public/facebook.png',
        date: '2024-01-15',
    },
    {
        id: 't2',
        name: 'Liam Johnson',
        title: 'Event Planner',
        rating: 4,
        message: 'We hosted a corporate event at Magnoliya Grand. The staff were professional and the venue looked stunning.',
        avatar: '/public/instagram.png',
        date: '2024-01-12',
    },
    {
        id: 't3',
        name: 'Aisha Khan',
        title: 'Bride',
        rating: 5,
        message: 'Beautiful wedding venue and amazing coordination. Everything went smoothly on our big day.',
        avatar: '/public/magnoliya-logo.png',
        date: '2024-01-10',
    },
];

const TestimonialsPage: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');
    const [avatar, setAvatar] = useState('');

    const resetForm = () => {
        setName('');
        setTitle('');
        setRating(5);
        setMessage('');
        setAvatar('');
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !message.trim()) {
            alert('Please provide at least a name and message.');
            return;
        }

        const newTestimonial: Testimonial = {
            id: `t-${Date.now()}`,
            name: name.trim(),
            title: title.trim() || undefined,
            rating: Math.max(1, Math.min(5, Number(rating) || 5)),
            message: message.trim(),
            avatar: avatar.trim() || undefined,
            date: new Date().toISOString().split('T')[0],
        };

        setTestimonials((s) => [newTestimonial, ...s]);
        resetForm();
        setIsFormOpen(false);
    };

    const handleDelete = (id: string) => {
        if (!confirm('Delete this testimonial?')) return;
        setTestimonials((s) => s.filter((t) => t.id !== id));
    };

    const openForm = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        resetForm();
    };

    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-sm ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                    ★
                </span>
            ))}
            <span className="ml-1 text-xs text-gray-500">({rating})</span>
        </div>
    );

    return (
        <AdminDashboardLayout>
            <div className="p-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
                        <p className="text-sm text-gray-600 mt-1">Manage guest testimonials and reviews</p>
                    </div>
                    <button
                        onClick={openForm}
                        className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Testimonial
                    </button>
                </div>

                {/* Stats Cards - Compact */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white rounded-lg shadow p-3">
                        <div className="text-lg font-bold text-gray-900">{testimonials.length}</div>
                        <div className="text-xs text-gray-500">Total</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-3">
                        <div className="text-lg font-bold text-gray-900">
                            {testimonials.filter(t => t.rating === 5).length}
                        </div>
                        <div className="text-xs text-gray-500">5-Star</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-3">
                        <div className="text-lg font-bold text-gray-900">
                            {testimonials.length > 0 ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1) : '0.0'}
                        </div>
                        <div className="text-xs text-gray-500">Avg Rating</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-3">
                        <div className="text-lg font-bold text-gray-900">
                            {new Set(testimonials.map(t => t.name)).size}
                        </div>
                        <div className="text-xs text-gray-500">Guests</div>
                    </div>
                </div>

                {/* Testimonials Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200">
                        <h3 className="text-base font-medium text-gray-900">Testimonials List</h3>
                        <p className="text-xs text-gray-500 mt-1">Showing {testimonials.length} testimonials</p>
                    </div>

                    {testimonials.length === 0 ? (
                        <div className="text-center py-8">
                            <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No testimonials</h3>
                            <p className="mt-1 text-xs text-gray-500">Get started by creating a new testimonial.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Guest
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rating
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Message
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {testimonials.map((testimonial) => (
                                        <tr key={testimonial.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8">
                                                        {testimonial.avatar ? (
                                                            <img
                                                                className="h-8 w-8 rounded-full object-cover"
                                                                src={testimonial.avatar}
                                                                alt={testimonial.name}
                                                            />
                                                        ) : (
                                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <span className="text-blue-600 font-medium text-xs">
                                                                    {testimonial.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {testimonial.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {testimonial.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <StarRating rating={testimonial.rating} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-sm text-gray-900 max-w-xs truncate">
                                                    {testimonial.message}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                                                {testimonial.date}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-1">
                                                    <button
                                                        onClick={() => alert('Edit not implemented in this demo')}
                                                        className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition-colors text-xs"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(testimonial.id)}
                                                        className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50 transition-colors text-xs"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Compact Add Testimonial Modal */}
                {isFormOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                            <div className="px-4 py-3 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-medium text-gray-900">Add Testimonial</h3>
                                    <button
                                        onClick={closeForm}
                                        className="text-gray-400 hover:text-gray-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleAdd} className="p-4 space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Name *
                                    </label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter guest name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Title / Role
                                    </label>
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="e.g., Happy Guest"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Rating
                                    </label>
                                    <select
                                        value={rating}
                                        onChange={(e) => setRating(Number(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    >
                                        <option value={5}>5 - Excellent</option>
                                        <option value={4}>4 - Very Good</option>
                                        <option value={3}>3 - Good</option>
                                        <option value={2}>2 - Fair</option>
                                        <option value={1}>1 - Poor</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Message *
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter testimonial message"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Avatar URL (optional)
                                    </label>
                                    <input
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                </div>

                                <div className="flex justify-end space-x-2 pt-3">
                                    <button
                                        type="button"
                                        onClick={closeForm}
                                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Add Testimonial
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminDashboardLayout>
    );
};

export default TestimonialsPage;