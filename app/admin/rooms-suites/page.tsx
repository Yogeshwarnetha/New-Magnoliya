"use client";

import AdminDashboardLayout from '@/components/Admin';
import React, { useState } from 'react';

type Room = { id: string; name: string; price: string; features?: string[] };

const initial: Room[] = [
    { id: 'r1', name: 'King Room', price: 'From $150/night', features: ['King Bed', 'Free WiFi'] },
    { id: 'r2', name: 'King Suite', price: 'From $280/night', features: ['Separate living area', 'Mini bar'] },
];

export default function RoomsAdmin() {
    const [rooms, setRooms] = useState<Room[]>(initial);
    const [editing, setEditing] = useState<Room | null>(null);

    const add = () => setRooms(s => [{ id: `r-${Date.now()}`, name: 'New Room', price: '', features: [] }, ...s]);
    const remove = (id: string) => setRooms(s => s.filter(x => x.id !== id));
    const save = () => {
        if (!editing) return;
        setRooms(s => s.map(x => x.id === editing.id ? editing : x));
        setEditing(null);
    };

    return (
        <AdminDashboardLayout>
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Rooms & Suites</h2>
                        <p className="text-sm text-gray-500">Manage room types (in-memory demo).</p>
                    </div>
                    <div>
                        <button onClick={add} className="px-4 py-2 bg-blue-600 text-white rounded">Add Room</button>
                    </div>
                </div>

                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="text-left text-xs text-gray-500 border-b"><tr><th className="py-2">Name</th><th>Price</th><th className="text-right">Actions</th></tr></thead>
                        <tbody>
                            {rooms.map(r => (
                                <tr key={r.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2">{r.name}</td>
                                    <td>{r.price}</td>
                                    <td className="text-right">
                                        <button onClick={() => setEditing(r)} className="text-blue-600 mr-2">Edit</button>
                                        <button onClick={() => remove(r.id)} className="text-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {editing && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded p-4 w-full max-w-lg">
                            <h3 className="font-semibold mb-3">Edit Room</h3>
                            <div className="space-y-2">
                                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <input value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className="w-full border px-3 py-2 rounded" />
                                <textarea value={(editing.features || []).join(', ')} onChange={(e) => setEditing({ ...editing, features: e.target.value.split(',').map(s => s.trim()) })} className="w-full border px-3 py-2 rounded" rows={3} placeholder="Comma separated features" />
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
