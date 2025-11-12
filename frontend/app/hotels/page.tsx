'use client';

import { useEffect, useState } from 'react';
import { hotelAPI } from '@/lib/api';
import { Hotel } from '@/types';

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  });

  useEffect(() => {
    fetchHotels();
  }, [filters]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const response = await hotelAPI.getAll(filters);
      setHotels(response.data.hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Hotels in Sri Lanka</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="budget">Budget</option>
            <option value="mid-range">Mid-Range</option>
            <option value="luxury">Luxury</option>
            <option value="boutique">Boutique</option>
            <option value="resort">Resort</option>
          </select>
          
          <input
            type="number"
            placeholder="Min Price (LKR)"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          
          <input
            type="number"
            placeholder="Max Price (LKR)"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          
          <select
            value={filters.minRating}
            onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
            className="px-4 py-2 border rounded"
          >
            <option value="">Any Rating</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl">Loading hotels...</p>
        </div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No hotels found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={hotel.images[0] || 'https://via.placeholder.com/400x300'}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <p className="text-gray-600 mb-2">{hotel.address}</p>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold">{hotel.rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm">
                    ({hotel.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {hotel.category}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {hotel.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">From</p>
                    <p className="text-2xl font-bold text-blue-600">
                      LKR {hotel.priceRange.min}
                    </p>
                  </div>
                  
                  <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
