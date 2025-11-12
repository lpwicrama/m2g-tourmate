import { Guide } from '@/types';
import Link from 'next/link';

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={guide.profileImage || 'https://via.placeholder.com/80'}
            alt={guide.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">{guide.name}</h3>
              {guide.verified && (
                <span className="text-blue-600" title="Verified">✓</span>
              )}
            </div>
            
            <p className="text-gray-600">{guide.location}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{guide.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm">
                ({guide.reviewCount} reviews)
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              LKR {guide.pricePerDay}
            </p>
            <p className="text-sm text-gray-600">per day</p>
          </div>
        </div>
        
        <p className="text-gray-700 mt-4 line-clamp-2">{guide.bio}</p>
        
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Languages:</p>
          <div className="flex flex-wrap gap-2">
            {guide.languages.map((lang, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Specializations:</p>
          <div className="flex flex-wrap gap-2">
            {guide.specializations.map((spec, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Link
            href={`/guides/${guide._id}`}
            className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Profile
          </Link>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}
