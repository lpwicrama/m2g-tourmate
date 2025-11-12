'use client';

import { useEffect, useState } from 'react';
import { transportAPI } from '@/lib/api';
import { Transport } from '@/types';

export default function TransportPage() {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetchTransports();
  }, [selectedType]);

  const fetchTransports = async () => {
    setLoading(true);
    try {
      const filters = selectedType ? { type: selectedType } : {};
      const response = await transportAPI.getAll(filters);
      setTransports(response.data.transports);
    } catch (error) {
      console.error('Error fetching transports:', error);
    } finally {
      setLoading(false);
    }
  };

  const transportTypes = ['car', 'van', 'bus', 'train', 'tuk-tuk', 'bike'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Transport Options</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Transport Type</h2>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedType('')}
            className={`px-6 py-2 rounded ${
              selectedType === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          
          {transportTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2 rounded capitalize ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-xl">Loading transport options...</p>
        </div>
      ) : transports.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No transport options found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transports.map((transport) => (
            <div key={transport._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{transport.name}</h3>
                  <p className="text-gray-600 capitalize">{transport.type}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Available
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">
                Provider: {transport.provider}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold">{transport.rating.toFixed(1)}</span>
                <span className="text-gray-500 text-sm">
                  ({transport.reviewCount} reviews)
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">Capacity: {transport.capacity} people</p>
              </div>
              
              <div className="mb-4">
                {transport.pricePerDay && (
                  <p className="text-2xl font-bold text-blue-600">
                    LKR {transport.pricePerDay}/day
                  </p>
                )}
                {transport.pricePerKm && (
                  <p className="text-sm text-gray-600">
                    LKR {transport.pricePerKm}/km
                  </p>
                )}
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Features:</p>
                <div className="flex flex-wrap gap-2">
                  {transport.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
