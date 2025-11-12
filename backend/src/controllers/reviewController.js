const Review = require('../models/Review');
const Guide = require('../models/Guide');
const Hotel = require('../models/Hotel');
const Transport = require('../models/Transport');
const Location = require('../models/Location');

exports.createReview = async (req, res) => {
  try {
    const { targetType, targetId, rating, title, comment } = req.body;
    const userId = req.user._id;
    
    const existingReview = await Review.findOne({ userId, targetType, targetId });
    if (existingReview) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already reviewed this item' 
      });
    }
    
    const review = await Review.create({
      userId,
      targetType,
      targetId,
      rating,
      title,
      comment
    });
    
    await updateTargetRating(targetType, targetId);
    
    res.status(201).json({
      success: true,
      review
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

async function updateTargetRating(targetType, targetId) {
  const reviews = await Review.find({ targetType, targetId });
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  
  let Model;
  switch(targetType) {
    case 'guide': Model = Guide; break;
    case 'hotel': Model = Hotel; break;
    case 'transport': Model = Transport; break;
    case 'location': Model = Location; break;
  }
  
  await Model.findByIdAndUpdate(targetId, {
    rating: Math.round(avgRating * 10) / 10,
    reviewCount: reviews.length
  });
}

exports.getReviewsByTarget = async (req, res) => {
  try {
    const { targetType, targetId } = req.params;
    
    const reviews = await Review.find({ targetType, targetId })
      .populate('userId', 'name')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
