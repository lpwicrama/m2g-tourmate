export interface Location {
  _id: string;
  name: string;
  description: string;
  category: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
  images: string[];
  entryFee: number;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Guide {
  _id: string;
  name: string;
  email: string;
  phone: string;
  languages: string[];
  specializations: string[];
  experience: number;
  pricePerDay: number;
  location: string;
  bio: string;
  profileImage: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
}

export interface Hotel {
  _id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
  category: string;
  amenities: string[];
  images: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  reviewCount: number;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
}

export interface Transport {
  _id: string;
  name: string;
  type: string;
  provider: string;
  capacity: number;
  pricePerKm?: number;
  pricePerDay?: number;
  features: string[];
  images: string[];
  rating: number;
  reviewCount: number;
}

export interface Review {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  targetType: string;
  targetId: string;
  rating: number;
  title?: string;
  comment: string;
  images: string[];
  createdAt: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  name?: string;
}
