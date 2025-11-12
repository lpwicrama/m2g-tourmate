const Location = require('../models/Location');
const turf = require('@turf/turf');
const axios = require('axios');

exports.findLocationsAlongActualRoute = async (req, res) => {
  try {
    const { startPoint, endPoint, radius = 5, travelMode = 'driving' } = req.body;
    
    const routeData = await getOSRMRoute(startPoint, endPoint, travelMode);
    
    if (!routeData.routes || routeData.routes.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No route found between these points' 
      });
    }
    
    const allRoutes = routeData.routes;
    const locationsPerRoute = [];
    
    for (let route of allRoutes) {
      const routeLine = turf.lineString(route.geometry.coordinates);
      const buffered = turf.buffer(routeLine, radius, { units: 'kilometers' });
      
      const locations = await Location.find({
        coordinates: {
          $geoWithin: {
            $geometry: buffered.geometry
          }
        }
      }).select('-__v');
      
      locationsPerRoute.push({
        routeIndex: allRoutes.indexOf(route),
        distance: route.distance / 1000,
        duration: route.duration / 60,
        geometry: route.geometry,
        locations: locations,
        steps: route.legs[0].steps
      });
    }
    
    res.json({
      success: true,
      routes: locationsPerRoute,
      totalAlternatives: allRoutes.length
    });
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.findLocationsAlongMultiPointRoute = async (req, res) => {
  try {
    const { waypoints, radius = 5, travelMode = 'driving' } = req.body;
    
    if (waypoints.length < 2) {
      return res.status(400).json({ 
        success: false, 
        message: 'At least 2 waypoints required' 
      });
    }
    
    const routeData = await getOSRMRouteMultiPoint(waypoints, travelMode);
    
    if (!routeData.routes || routeData.routes.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No route found' 
      });
    }
    
    const route = routeData.routes[0];
    const routeLine = turf.lineString(route.geometry.coordinates);
    const buffered = turf.buffer(routeLine, radius, { units: 'kilometers' });
    
    const locations = await Location.find({
      coordinates: {
        $geoWithin: {
          $geometry: buffered.geometry
        }
      }
    }).select('-__v');
    
    res.json({
      success: true,
      route: {
        distance: route.distance / 1000,
        duration: route.duration / 60,
        geometry: route.geometry,
        steps: route.legs.flatMap(leg => leg.steps)
      },
      locations,
      waypoints: waypoints.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

async function getOSRMRoute(startPoint, endPoint, travelMode = 'driving') {
  const profile = travelMode === 'walking' ? 'foot' : 'car';
  const url = `https://router.project-osrm.org/route/v1/${profile}/${startPoint.lng},${startPoint.lat};${endPoint.lng},${endPoint.lat}?alternatives=3&geometries=geojson&steps=true&overview=full`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch route from OSRM');
  }
}

async function getOSRMRouteMultiPoint(waypoints, travelMode = 'driving') {
  const profile = travelMode === 'walking' ? 'foot' : 'car';
  const coordinates = waypoints.map(wp => `${wp.lng},${wp.lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/${profile}/${coordinates}?geometries=geojson&steps=true&overview=full`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch multi-point route from OSRM');
  }
}

exports.getNearbyLocations = async (req, res) => {
  try {
    const { lng, lat, radius = 10, category } = req.query;
    
    const query = {
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radius * 1000
        }
      }
    };
    
    if (category) {
      query.category = category;
    }
    
    const locations = await Location.find(query).limit(50);
    
    res.json({
      success: true,
      count: locations.length,
      locations
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
