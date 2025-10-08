"use client";

import AdminDashboardLayout from '@/components/Admin';
import React, { useState } from 'react';

type HeroSlide = { id: string; title: string; subtitle: string; image: string };

const initialSlides: HeroSlide[] = [
    { id: 's1', title: 'Luxury Stays. Memorable Events.', subtitle: 'Exceptional Experiences.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' },
    { id: 's2', title: 'Elegant Ballrooms', subtitle: 'Host your perfect event', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3' },
];

export default function HomepageAdmin() {
    const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState('');

    const addSlide = (e: React.FormEvent) => {
        e.preventDefault();
        setSlides(s => [{ id: `s-${Date.now()}`, title: title || 'New Slide', subtitle, image }, ...s]);
        setTitle(''); setSubtitle(''); setImage(''); setIsOpen(false);
    };

    const remove = (id: string) => setSlides(s => s.filter(x => x.id !== id));

    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Homepage Content</h2>
                        <p className="text-sm text-gray-500">Manage hero slides and homepage sections (UI demo, in-memory).</p>
                    </div>
                    <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">Add Slide</button>
                </div>

                <div className="bg-white rounded shadow overflow-hidden">
                    <div className="p-4 border-b">Hero Slides ({slides.length})</div>
                    <div className="p-4">
                        <table className="w-full text-sm">
                            <thead className="text-left text-xs text-gray-500 border-b"><tr><th className="py-2">Title</th><th>Subtitle</th><th>Image</th><th className="text-right">Actions</th></tr></thead>
                            <tbody>
                                {slides.map(s => (
                                    <tr key={s.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2">{s.title}</td>
                                        <td>{s.subtitle}</td>
                                        <td className="text-xs text-gray-600 truncate max-w-xs">{s.image}</td>
                                        <td className="text-right">
                                            <button onClick={() => alert('Edit not implemented in demo')} className="text-blue-600 mr-2">Edit</button>
                                            <button onClick={() => remove(s.id)} className="text-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded p-4 w-full max-w-md">
                            <h3 className="font-semibold mb-3">Add Hero Slide</h3>
                            <form onSubmit={addSlide} className="space-y-3">
                                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border px-3 py-2 rounded" />
                                <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtitle" className="w-full border px-3 py-2 rounded" />
                                <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="w-full border px-3 py-2 rounded" />
                                <div className="flex justify-end space-x-2">
                                    <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1 border rounded">Cancel</button>
                                    <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminDashboardLayout>
    );
}
