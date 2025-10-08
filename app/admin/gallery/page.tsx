"use client";

import AdminDashboardLayout from '@/components/Admin';
import React, { useState } from 'react';

type ImageItem = { id: string; url: string; caption?: string };

const initial: ImageItem[] = [
    { id: 'g1', url: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157318.jpg', caption: 'Hotel exterior' },
    { id: 'g2', url: 'https://pub-56ba1c6c262346a6bcbe2ce75c0c40c5.r2.dev/P1157342.jpg', caption: 'Ballroom' },
];

const GalleryAdminPage = () => {
    const [images, setImages] = useState<ImageItem[]>(initial);
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [editing, setEditing] = useState<ImageItem | null>(null);

    const add = (e: React.FormEvent) => {
        e.preventDefault();
        setImages(s => [{ id: `g-${Date.now()}`, url, caption }, ...s]);
        setUrl(''); setCaption(''); setIsOpen(false);
    };

    const save = () => {
        if (!editing) return;
        setImages(s => s.map(i => i.id === editing.id ? editing : i));
        setEditing(null);
    };

    const remove = (id: string) => setImages(s => s.filter(i => i.id !== id));

    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-0">Gallery Management</h2>
                        <p className="text-sm text-gray-500">Upload and manage gallery images (in-memory demo).</p>
                    </div>
                    <div>
                        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">Add Image</button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b">
                        <strong>Images</strong> ({images.length})
                    </div>
                    <div className="p-4">
                        <table className="w-full text-sm">
                            <thead className="text-left text-xs text-gray-500 border-b"><tr><th className="py-2">Preview</th><th>Caption / URL</th><th className="text-right">Actions</th></tr></thead>
                            <tbody>
                                {images.map(img => (
                                    <tr key={img.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2 w-24"><img src={img.url} alt={img.caption || 'image'} className="h-12 w-20 object-cover rounded" /></td>
                                        <td className="text-xs text-gray-700 truncate max-w-xs">{img.caption || img.url}</td>
                                        <td className="text-right">
                                            <button onClick={() => setEditing(img)} className="text-blue-600 mr-2">Edit</button>
                                            <button onClick={() => remove(img.id)} className="text-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Modal */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded p-4 w-full max-w-md">
                            <h3 className="font-semibold mb-3">Add Image</h3>
                            <form onSubmit={add} className="space-y-2">
                                <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Image URL" className="w-full border px-3 py-2 rounded" required />
                                <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption (optional)" className="w-full border px-3 py-2 rounded" />
                                <div className="flex justify-end space-x-2">
                                    <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1 border rounded">Cancel</button>
                                    <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {editing && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded p-4 w-full max-w-md">
                            <h3 className="font-semibold mb-3">Edit Image</h3>
                            <div className="space-y-2">
                                <input value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <input value={editing.caption} onChange={(e) => setEditing({ ...editing, caption: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <div className="flex justify-end space-x-2">
                                    <button onClick={() => setEditing(null)} className="px-3 py-1 border rounded">Cancel</button>
                                    <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminDashboardLayout>
    );
};

export default GalleryAdminPage;
