const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['temple', 'beach', 'mountain', 'wildlife', 'historical', 'cultural', 'adventure'],
    required: true 
  },
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  images: [String],
  entryFee: { type: Number, default: 0 },
  openingHours: {
    opens: String,
    closes: String
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  bestTimeToVisit: [String],
  tags: [String]
}, { timestamps: true });

locationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Location', locationSchema);
