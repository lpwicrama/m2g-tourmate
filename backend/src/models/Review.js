const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetType: { 
    type: String, 
    enum: ['guide', 'hotel', 'transport', 'location'],
    required: true 
  },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  comment: { type: String, required: true },
  images: [String],
  helpful: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
