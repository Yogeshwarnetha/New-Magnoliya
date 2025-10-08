"use client";

import AdminDashboardLayout from '@/components/Admin';
import React, { useState } from 'react';

type Dining = { id: string; name: string; description: string };

const initial: Dining[] = [
    { id: 'd1', name: 'Signature Restaurant', description: 'Multicuisine fine dining experience.' },
    { id: 'd2', name: 'Rooftop Bar', description: 'Panoramic views and cocktails.' },
];

export default function DiningAdmin() {
    const [items, setItems] = useState<Dining[]>(initial);
    const [editing, setEditing] = useState<Dining | null>(null);

    const add = () => setItems(s => [{ id: `d-${Date.now()}`, name: 'New Outlet', description: '' }, ...s]);
    const remove = (id: string) => setItems(s => s.filter(x => x.id !== id));
    const save = () => {
        if (!editing) return;
        setItems(s => s.map(x => x.id === editing.id ? editing : x));
        setEditing(null);
    };

    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Dining Page Content</h2>
                        <p className="text-sm text-gray-500">Manage dining outlets and descriptions (in-memory demo).</p>
                    </div>
                    <div>
                        <button onClick={add} className="px-4 py-2 bg-blue-600 text-white rounded">Add Outlet</button>
                    </div>
                </div>

                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="text-left text-xs text-gray-500 border-b"><tr><th className="py-2">Name</th><th>Description</th><th className="text-right">Actions</th></tr></thead>
                        <tbody>
                            {items.map(i => (
                                <tr key={i.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{i.name}</td>
                                    <td className="text-xs text-gray-600 truncate max-w-xs">{i.description}</td>
                                    <td className="text-right">
                                        <button onClick={() => setEditing(i)} className="text-blue-600 mr-2">Edit</button>
                                        <button onClick={() => remove(i.id)} className="text-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {editing && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded p-4 w-full max-w-lg">
                            <h3 className="font-semibold mb-3">Edit Outlet</h3>
                            <div className="space-y-2">
                                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full border px-3 py-2 rounded" rows={4} />
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
