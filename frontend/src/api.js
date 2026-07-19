import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ai-powered-career-mentor-skill-gap-70vs.onrender.com/api'
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
