"use client";

import AdminDashboardLayout from '@/components/Admin';
import React, { useState } from 'react';

type Package = { id: string; name: string; price: string; details: string };

const initial: Package[] = [
    { id: 'w1', name: 'Silver Wedding Package', price: 'Contact for price', details: 'Basic coordination and venue' },
    { id: 'w2', name: 'Gold Wedding Package', price: 'Contact for price', details: 'Full coordination, decor, and catering' },
];

export default function WeddingsAdmin() {
    const [packages, setPackages] = useState<Package[]>(initial);
    const [editing, setEditing] = useState<Package | null>(null);

    const add = () => setPackages(s => [{ id: `w-${Date.now()}`, name: 'New Package', price: '', details: '' }, ...s]);
    const remove = (id: string) => setPackages(s => s.filter(x => x.id !== id));
    const save = () => {
        if (!editing) return;
        setPackages(s => s.map(x => x.id === editing.id ? editing : x));
        setEditing(null);
    };

    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Weddings Content</h2>
                        <p className="text-sm text-gray-500">Manage wedding packages and highlights (in-memory demo).</p>
                    </div>
                    <div>
                        <button onClick={add} className="px-4 py-2 bg-blue-600 text-white rounded">Add Package</button>
                    </div>
                </div>

                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="text-left text-xs text-gray-500 border-b"><tr><th className="py-2">Package</th><th>Price</th><th>Details</th><th className="text-right">Actions</th></tr></thead>
                        <tbody>
                            {packages.map(p => (
                                <tr key={p.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{p.name}</td>
                                    <td>{p.price}</td>
                                    <td className="text-xs text-gray-600 truncate max-w-xs">{p.details}</td>
                                    <td className="text-right">
                                        <button onClick={() => setEditing(p)} className="text-blue-600 mr-2">Edit</button>
                                        <button onClick={() => remove(p.id)} className="text-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {editing && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded p-4 w-full max-w-lg">
                            <h3 className="font-semibold mb-3">Edit Package</h3>
                            <div className="space-y-2">
                                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <input value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <textarea value={editing.details} onChange={(e) => setEditing({ ...editing, details: e.target.value })} className="w-full border px-3 py-2 rounded" rows={5} />
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
