const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['car', 'van', 'bus', 'train', 'tuk-tuk', 'bike'],
    required: true 
  },
  provider: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerKm: Number,
  pricePerDay: Number,
  features: [String],
  images: [String],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  contactInfo: {
    phone: String,
    email: String
  },
  availability: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Transport', transportSchema);
