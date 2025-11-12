'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { routeAPI } from '@/lib/api';
import { Location, RoutePoint } from '@/types';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function RoutePlanner() {
  const [waypoints, setWaypoints] = useState<RoutePoint[]>([]);
  const [radius, setRadius] = useState<number>(5);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const findLocations = async () => {
    if (waypoints.length < 2) {
      alert('Please select at least 2 points on the map');
      return;
    }

    setLoading(true);
    try {
      const response = await routeAPI.findAlongMultiplePoints(waypoints, radius);
      setLocations(response.data.locations);
    } catch (error) {
      console.error('Error finding locations:', error);
      alert('Failed to find locations');
    } finally {
      setLoading(false);
    }
  };

  const clearRoute = () => {
    setWaypoints([]);
    setLocations([]);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Plan Your Route</h2>
        
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Search Radius (km): {radius}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2 items-end">
            <button
              onClick={findLocations}
              disabled={loading || waypoints.length < 2}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Find Locations'}
            </button>
            
            <button
              onClick={clearRoute}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Clear
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Click on the map to add waypoints. {waypoints.length} point(s) selected.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MapComponent
            waypoints={waypoints}
            setWaypoints={setWaypoints}
            locations={locations}
            radius={radius}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow overflow-y-auto" style={{ maxHeight: '600px' }}>
          <h3 className="text-xl font-bold mb-4">
            Found Locations ({locations.length})
          </h3>
          
          {locations.length === 0 ? (
            <p className="text-gray-500">No locations found. Select waypoints and search.</p>
          ) : (
            <div className="space-y-4">
              {locations.map((location) => (
                <div key={location._id} className="border-b pb-4">
                  <h4 className="font-semibold">{location.name}</h4>
                  <p className="text-sm text-gray-600">{location.category}</p>
                  <p className="text-sm mt-1">{location.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">⭐ {location.rating}</span>
                    <span className="text-sm text-gray-500">
                      ({location.reviewCount} reviews)
                    </span>
                  </div>
                  {location.entryFee > 0 && (
                    <p className="text-sm mt-1">
                      Entry: LKR {location.entryFee}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
