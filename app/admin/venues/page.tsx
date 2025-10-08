"use client";

import AdminDashboardLayout from '@/components/Admin';
import React, { useState } from 'react';

type Venue = { id: string; name: string; capacity: string; image?: string };

const initial: Venue[] = [
    { id: 'v1', name: 'Grand Ballroom', capacity: 'Up to 1,800 guests', image: '' },
    { id: 'v2', name: 'Lakeview Terrace', capacity: 'Up to 200 guests', image: '' },
];

export default function VenuesAdmin() {
    const [venues, setVenues] = useState<Venue[]>(initial);
    const [editing, setEditing] = useState<Venue | null>(null);

    const add = () => setVenues(s => [{ id: `v-${Date.now()}`, name: 'New Venue', capacity: '', image: '' }, ...s]);
    const remove = (id: string) => setVenues(s => s.filter(x => x.id !== id));
    const save = () => {
        if (!editing) return;
        setVenues(s => s.map(x => x.id === editing.id ? editing : x));
        setEditing(null);
    };

    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Event Venues</h2>
                        <p className="text-sm text-gray-500">Manage venue listings (in-memory demo).</p>
                    </div>
                    <div>
                        <button onClick={add} className="px-4 py-2 bg-blue-600 text-white rounded">Add Venue</button>
                    </div>
                </div>

                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="text-left text-xs text-gray-500 border-b"><tr><th className="py-2">Name</th><th>Capacity</th><th className="text-right">Actions</th></tr></thead>
                        <tbody>
                            {venues.map(v => (
                                <tr key={v.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{v.name}</td>
                                    <td>{v.capacity}</td>
                                    <td className="text-right">
                                        <button onClick={() => setEditing(v)} className="text-blue-600 mr-2">Edit</button>
                                        <button onClick={() => remove(v.id)} className="text-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {editing && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded p-4 w-full max-w-lg">
                            <h3 className="font-semibold mb-3">Edit Venue</h3>
                            <div className="space-y-2">
                                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <input value={editing.capacity} onChange={(e) => setEditing({ ...editing, capacity: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full border px-3 py-2 rounded" placeholder="Image URL (optional)" />
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
