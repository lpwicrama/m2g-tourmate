const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  address: { type: String, required: true },
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  category: { 
    type: String, 
    enum: ['budget', 'mid-range', 'luxury', 'boutique', 'resort'],
    required: true 
  },
  amenities: [String],
  images: [String],
  priceRange: {
    min: Number,
    max: Number
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  }
}, { timestamps: true });

hotelSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Hotel', hotelSchema);
