const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  languages: [String],
  specializations: [String],
  experience: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  location: { type: String, required: true },
  bio: String,
  profileImage: String,
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  availability: [{
    date: Date,
    available: Boolean
  }]
}, { timestamps: true });

module.exports = mongoose.model('Guide', guideSchema);
