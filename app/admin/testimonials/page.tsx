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
};

const initialTestimonials: Testimonial[] = [
    {
        id: 't1',
        name: 'Sofia Martinez',
        title: 'Happy Guest',
        rating: 5,
        message: 'Our stay was exceptional — the service, the rooms and the view were all perfect. Highly recommended!',
        avatar: '/public/facebook.png',
    },
    {
        id: 't2',
        name: 'Liam Johnson',
        title: 'Event Planner',
        rating: 4,
        message: 'We hosted a corporate event at Magnoliya Grand. The staff were professional and the venue looked stunning.',
        avatar: '/public/instagram.png',
    },
    {
        id: 't3',
        name: 'Aisha Khan',
        title: 'Bride',
        rating: 5,
        message: 'Beautiful wedding venue and amazing coordination. Everything went smoothly on our big day.',
        avatar: '/public/magnoliya-logo.png',
    },
];

const TestimonialsPage: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

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
        };

        setTestimonials((s) => [newTestimonial, ...s]);
        resetForm();
    };

    const handleDelete = (id: string) => {
        if (!confirm('Delete this testimonial?')) return;
        setTestimonials((s) => s.filter((t) => t.id !== id));
    };

    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Testimonials</h2>
                <p className="text-gray-600 mb-6">Manage testimonials from guests here. Add new entries using the form below.</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <form onSubmit={handleAdd} className="col-span-1 lg:col-span-1 bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium mb-4">Add Testimonial (dummy local)</h3>

                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />

                        <label className="block text-sm font-medium text-gray-700 mt-3">Title / Role</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />

                        <label className="block text-sm font-medium text-gray-700 mt-3">Rating</label>
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                            <option value={5}>5 - Excellent</option>
                            <option value={4}>4 - Very Good</option>
                            <option value={3}>3 - Good</option>
                            <option value={2}>2 - Fair</option>
                            <option value={1}>1 - Poor</option>
                        </select>

                        <label className="block text-sm font-medium text-gray-700 mt-3">Message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />

                        <label className="block text-sm font-medium text-gray-700 mt-3">Avatar URL (optional)</label>
                        <input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="/public/avatar.png or external url" className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />

                        <div className="mt-4 flex space-x-2">
                            <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add</button>
                            <button type="button" onClick={resetForm} className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Reset</button>
                        </div>
                    </form>

                    <div className="col-span-2 space-y-4">
                        {testimonials.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-4 text-sm text-gray-500">No testimonials yet.</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {testimonials.map((t) => (
                                    <div key={t.id} className="bg-white rounded-lg shadow p-4 flex">
                                        <div className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                            {t.avatar ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-gray-500 font-semibold">{t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">{t.name}</p>
                                                    {t.title && <p className="text-xs text-gray-500">{t.title}</p>}
                                                </div>
                                                <div className="text-sm text-yellow-500">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-700">{t.message}</p>
                                            <div className="mt-3 flex items-center space-x-2">
                                                <button onClick={() => handleDelete(t.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                                                <button onClick={() => alert('Edit not implemented in this demo')} className="text-sm text-blue-600 hover:underline">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default TestimonialsPage;
