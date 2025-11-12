const Hotel = require('../models/Hotel');
const Review = require('../models/Review');

exports.getAllHotels = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating, lng, lat, radius } = req.query;
    
    let query = {};
    
    if (category) query.category = category;
    if (minRating) query.rating = { $gte: parseFloat(minRating) };
    if (minPrice || maxPrice) {
      query['priceRange.min'] = {};
      if (minPrice) query['priceRange.min'].$gte = parseFloat(minPrice);
      if (maxPrice) query['priceRange.max'] = { $lte: parseFloat(maxPrice) };
    }
    
    if (lng && lat) {
      query.coordinates = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: (radius || 10) * 1000
        }
      };
    }
    
    const hotels = await Hotel.find(query).sort('-rating');
    
    res.json({
      success: true,
      count: hotels.length,
      hotels
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    
    const reviews = await Review.find({ 
      targetType: 'hotel', 
      targetId: req.params.id 
    }).populate('userId', 'name').sort('-createdAt');
    
    res.json({
      success: true,
      hotel,
      reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({
      success: true,
      hotel
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
