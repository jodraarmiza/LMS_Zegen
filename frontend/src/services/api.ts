import axios from 'axios';

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to handle token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized errors (token expired, etc.)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Dashboard API services
export const dashboardService = {
  // Get dashboard data
  getDashboardData: async () => {
    return api.get('/api/dashboard');
  },
  
  // Get upcoming sessions
  getUpcomingSessions: async () => {
    return api.get('/api/sessions/upcoming');
  },
  
  // Get daily activities
  getDailyActivities: async (date: string) => {
    return api.get(`/api/activities/daily?date=${date}`);
  },
  
  // Get last viewed courses
  getLastViewedCourses: async () => {
    return api.get('/api/courses/last-viewed');
  }
};

// Auth API services
export const authService = {
  login: async (email: string, password: string) => {
    return api.post('/api/auth/login', { email, password });
  },
  
  logout: async () => {
    return api.post('/api/auth/logout');
  },
  
  register: async (userData: {
    name: string,
    email: string,
    password: string
  }) => {
    return api.post('/api/auth/register', userData);
  }
};