// src/config.ts

// API configuration with fallback options
const apiUrl = import.meta.env.VITE_API_URL;

// Log the environment variable to help with debugging
console.log('VITE_API_URL from environment:', apiUrl);

// Multiple API options in case the primary one fails
export const API_URLS = {
  // Relative URL - works regardless of how the frontend is accessed
  relative: '/api/v1',
  
  // Make localhost the second priority 
  localhost: 'http://localhost:50404/api/v1',
  
  // Other URLs as fallbacks
  networkIP: 'http://192.168.1.250:50404/api/v1',
  localIP: 'http://192.168.1.24:50404/api/v1',
  clientIP: 'http://192.168.100.250:50404/api/v1'
};

// Default API URL to use - use relative URL for flexibility with vite --host
export const API_BASE_URL = API_URLS.relative;

// Application configuration
export const APP_NAME = 'Campus Connect LMS';
export const APP_VERSION = '1.0.0';

// Debug mode - automatically enabled in development
export const DEBUG_MODE = import.meta.env.DEV || import.meta.env.MODE === 'development' || true;

// File upload limits
export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Log configuration in debug mode
if (DEBUG_MODE) {
  console.log('Application config:', {
    APP_NAME,
    APP_VERSION,
    API_BASE_URL,
    DEBUG_MODE,
    MODE: import.meta.env.MODE,
    allApiUrls: API_URLS
  });
}