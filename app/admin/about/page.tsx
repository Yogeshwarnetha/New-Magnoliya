"use client";

import AdminDashboardLayout from '@/components/Admin';
import React, { useState } from 'react';

type Section = { id: string; heading: string; content: string };

const initial: Section[] = [
    { id: 'a1', heading: 'About Magnoliya Grand', content: 'Where luxury meets impeccable service.' },
    { id: 'a2', heading: 'Our Mission', content: 'Deliver memorable experiences for guests.' },
];

export default function AboutAdmin() {
    const [sections, setSections] = useState<Section[]>(initial);
    const [editing, setEditing] = useState<Section | null>(null);

    const save = () => {
        if (!editing) return;
        setSections(s => s.map(x => x.id === editing.id ? editing : x));
        setEditing(null);
    };

    const add = () => setSections(s => [{ id: `a-${Date.now()}`, heading: 'New Section', content: '' }, ...s]);
    const remove = (id: string) => setSections(s => s.filter(x => x.id !== id));

    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">About Page Content</h2>
                        <p className="text-sm text-gray-500">Edit about page sections (in-memory demo).</p>
                    </div>
                    <div>
                        <button onClick={add} className="px-4 py-2 bg-blue-600 text-white rounded mr-2">Add Section</button>
                    </div>
                </div>

                <div className="space-y-4">
                    {sections.map(s => (
                        <div key={s.id} className="bg-white p-4 rounded shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{s.heading}</h3>
                                    <p className="text-sm text-gray-600">{s.content}</p>
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => setEditing(s)} className="text-blue-600">Edit</button>
                                    <button onClick={() => remove(s.id)} className="text-red-600">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {editing && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded p-4 w-full max-w-lg">
                            <h3 className="font-semibold mb-3">Edit Section</h3>
                            <div className="space-y-2">
                                <input value={editing.heading} onChange={(e) => setEditing({ ...editing, heading: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full border px-3 py-2 rounded" rows={6} />
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
}
