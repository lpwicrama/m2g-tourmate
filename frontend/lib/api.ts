import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const routeAPI = {
  findAlongRoute: (startPoint: any, endPoint: any, radius: number) =>
    api.post('/routes/find-along-route', { startPoint, endPoint, radius }),
  
  findAlongMultiplePoints: (waypoints: any[], radius: number) =>
    api.post('/routes/find-multi-point', { waypoints, radius }),
  
  getNearby: (lng: number, lat: number, radius: number, category?: string) =>
    api.get('/routes/nearby', { params: { lng, lat, radius, category } }),
};

export const guideAPI = {
  getAll: (filters?: any) => api.get('/guides', { params: filters }),
  getById: (id: string) => api.get(`/guides/${id}`),
  create: (data: any) => api.post('/guides', data),
};

export const hotelAPI = {
  getAll: (filters?: any) => api.get('/hotels', { params: filters }),
  getById: (id: string) => api.get(`/hotels/${id}`),
  create: (data: any) => api.post('/hotels', data),
};

export const transportAPI = {
  getAll: (filters?: any) => api.get('/transports', { params: filters }),
  getById: (id: string) => api.get(`/transports/${id}`),
  create: (data: any) => api.post('/transports', data),
};

export const reviewAPI = {
  create: (data: any, token: string) =>
    api.post('/reviews', data, { headers: { Authorization: `Bearer ${token}` } }),
  
  getByTarget: (targetType: string, targetId: string) =>
    api.get(`/reviews/${targetType}/${targetId}`),
};

export default api;
