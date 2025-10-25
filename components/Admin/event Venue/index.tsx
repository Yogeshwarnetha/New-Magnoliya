"use client";
import { useState, useEffect } from 'react';
import EventVenueForm from './EventVenueForm';
import type { EventVenueData } from '@/apirequests/eventVenue';
import { getEventVenues, createEventVenue, updateEventVenue, deleteEventVenue } from '@/apirequests/eventVenue';

const EventVenueAdminPanel = () => {
  const [venues, setVenues] = useState<EventVenueData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<EventVenueData | null>(null);

  // Fetch event venues
  const fetchEventVenues = async () => {
    setIsLoading(true);
    try {
      const response = await getEventVenues();
      console.debug('[EventVenueAdmin] getEventVenues response:', response);

      if (response.ok && response.data) {
        setVenues(response.data);
      } else {
        console.error('Failed to fetch event venues:', response.error);
        alert(response.error || 'Failed to fetch event venues');
      }
    } catch (error) {
      console.error('Error fetching event venues:', error);
      alert('An unexpected error occurred while fetching venues');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventVenues();
  }, []);

  // Handle form submission for create/update
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      let response;
      
      if (editingVenue && editingVenue.id) {
        response = await updateEventVenue(editingVenue.id, formData);
      } else {
        response = await createEventVenue(formData);
      }

      if (response.ok) {
        await fetchEventVenues();
        setIsFormOpen(false);
        setEditingVenue(null);
        alert(`Event venue ${editingVenue ? 'updated' : 'created'} successfully!`);
      } else {
        throw new Error(response.error || `Failed to ${editingVenue ? 'update' : 'create'} event venue`);
      }
    } catch (error: any) {
      console.error('Error submitting event venue:', error);
      alert(error.message || 'Error submitting venue. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this venue?')) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await deleteEventVenue(id);

      if (response.ok) {
        await fetchEventVenues();
        alert('Event venue deleted successfully!');
      } else {
        throw new Error(response.error || 'Failed to delete event venue');
      }
    } catch (error: any) {
      console.error('Error deleting event venue:', error);
      alert(error.message || 'Error deleting venue. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (venue: EventVenueData) => {
    setEditingVenue(venue);
    setIsFormOpen(true);
  };

  // Handle add new
  const handleAddNew = () => {
    setEditingVenue(null);
    setIsFormOpen(true);
  };

  // Handle cancel form
  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingVenue(null);
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">Event Venues Management</h1>
          <p className="text-slate-600">Manage your event venues, capacities, gallery images, and planning guidance</p>
        </div>
        
        {!isFormOpen && (
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Venue</span>
          </button>
        )}
      </div>

      {/* Content - Form or Venues List */}
      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingVenue ? 'Edit Event Venue' : 'Add New Event Venue'}
              </h2>
              <button
                onClick={handleCancelForm}
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="p-6">
            <EventVenueForm
              onSubmit={handleSubmit}
              venueData={editingVenue}
              isLoading={isLoading}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      ) : (
        /* Venues List */
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Event Venues
              <span className="text-sm text-gray-500 ml-2">({venues.length})</span>
            </h2>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading venues...</p>
            </div>
          ) : venues.length > 0 ? (
            <div className="space-y-6">
              {venues.map((venue) => (
                <div key={venue.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={venue.image}
                        alt={venue.venue_name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{venue.venue_name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{venue.venue_title}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(venue)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => venue.id && handleDelete(venue.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-2 line-clamp-2">{venue.venue_title_description}</p>
                      <p className="text-gray-600 mb-4 line-clamp-2">{venue.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium text-gray-500">Square Feet:</span>
                          <p className="text-gray-800">{venue.squareFeet}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Theater:</span>
                          <p className="text-gray-800">{venue.theater}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Banquet:</span>
                          <p className="text-gray-800">{venue.banquet}</p>
                        </div>
                      </div>
                      
                      {venue.tourUrl && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-500">360° Tour:</span>
                          <p className="text-blue-600 text-sm truncate">{venue.tourUrl}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-500">Features:</span>
                          <p className="text-gray-800">{venue.features?.length || 0} features</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Gallery Images:</span>
                          <p className="text-gray-800">{venue.gallery_images?.length || 0} images</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="font-medium text-gray-500">Planning Guidance:</span>
                        <p className="text-gray-800 text-sm">{venue.planning_guidance?.length || 0} points</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg">
              <div className="text-slate-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No event venues found</h3>
              <p className="text-slate-600 mb-6">
                Get started by adding your first event venue.
              </p>
              <button
                onClick={handleAddNew}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add First Venue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventVenueAdminPanel;