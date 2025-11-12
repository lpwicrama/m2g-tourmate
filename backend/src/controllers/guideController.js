const Guide = require('../models/Guide');
const Review = require('../models/Review');

exports.getAllGuides = async (req, res) => {
  try {
    const { location, language, specialization, minRating, sortBy } = req.query;
    
    let query = {};
    
    if (location) query.location = new RegExp(location, 'i');
    if (language) query.languages = language;
    if (specialization) query.specializations = specialization;
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    
    let sortOptions = {};
    if (sortBy === 'rating') sortOptions.rating = -1;
    else if (sortBy === 'price-low') sortOptions.pricePerDay = 1;
    else if (sortBy === 'price-high') sortOptions.pricePerDay = -1;
    else sortOptions.createdAt = -1;
    
    const guides = await Guide.find(query).sort(sortOptions);
    
    res.json({
      success: true,
      count: guides.length,
      guides
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    
    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide not found' });
    }
    
    const reviews = await Review.find({ 
      targetType: 'guide', 
      targetId: req.params.id 
    }).populate('userId', 'name').sort('-createdAt');
    
    res.json({
      success: true,
      guide,
      reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createGuide = async (req, res) => {
  try {
    const guide = await Guide.create(req.body);
    res.status(201).json({
      success: true,
      guide
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
