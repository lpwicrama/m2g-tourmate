const Transport = require('../models/Transport');
const Review = require('../models/Review');

exports.getAllTransports = async (req, res) => {
  try {
    const { type, minRating, maxPrice, sortBy } = req.query;
    
    let query = { availability: true };
    
    if (type) query.type = type;
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    if (maxPrice) {
      query.$or = [
        { pricePerDay: { $lte: parseFloat(maxPrice) } },
        { pricePerKm: { $lte: parseFloat(maxPrice) } }
      ];
    }
    
    let sortOptions = {};
    if (sortBy === 'rating') sortOptions.rating = -1;
    else if (sortBy === 'price') sortOptions.pricePerDay = 1;
    else sortOptions.createdAt = -1;
    
    const transports = await Transport.find(query).sort(sortOptions);
    
    res.json({
      success: true,
      count: transports.length,
      transports
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTransportById = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    
    if (!transport) {
      return res.status(404).json({ success: false, message: 'Transport not found' });
    }
    
    const reviews = await Review.find({ 
      targetType: 'transport', 
      targetId: req.params.id 
    }).populate('userId', 'name').sort('-createdAt');
    
    res.json({
      success: true,
      transport,
      reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createTransport = async (req, res) => {
  try {
    const transport = await Transport.create(req.body);
    res.status(201).json({
      success: true,
      transport
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
