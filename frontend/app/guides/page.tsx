'use client';

import { useEffect, useState } from 'react';
import { guideAPI } from '@/lib/api';
import { Guide } from '@/types';
import GuideCard from '@/components/guides/GuideCard';

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    language: '',
    specialization: '',
    minRating: '',
    sortBy: 'rating',
  });

  useEffect(() => {
    fetchGuides();
  }, [filters]);

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const response = await guideAPI.getAll(filters);
      setGuides(response.data.guides);
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tour Guides in Sri Lanka</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          
          <select
            value={filters.language}
            onChange={(e) => setFilters({ ...filters, language: e.target.value })}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
            <option value="German">German</option>
            <option value="French">French</option>
          </select>
          
          <input
            type="text"
            placeholder="Specialization"
            value={filters.specialization}
            onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          
          <select
            value={filters.minRating}
            onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
            className="px-4 py-2 border rounded"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="px-4 py-2 border rounded"
          >
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl">Loading guides...</p>
        </div>
      ) : guides.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No guides found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <GuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      )}
    </div>
  );
}
