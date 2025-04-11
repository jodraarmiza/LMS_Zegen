// // src/config.ts

// // API configuration - Sesuaikan dengan alamat server backend Anda
// export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:50404/api/v1';


// // Application configuration
// export const APP_NAME = 'Campus Connect LMS';
// export const APP_VERSION = '1.0.0';

// // You can set this to 'true' during development for more detailed console logs
// export const DEBUG_MODE = true;

// // File upload limits
// export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB in bytes
// src/config.ts

// API configuration with fallback options
const apiUrl = import.meta.env.VITE_API_URL;

// Log the environment variable to help with debugging
console.log('VITE_API_URL from environment:', apiUrl);

// Fungsi helper untuk memastikan URL diakhiri dengan slash (/)
const ensureTrailingSlash = (url: string): string => {
  if (!url) return '';
  return url.endsWith('/') ? url : `${url}/`;
};

// Multiple API options in case the primary one fails - pastikan semua diakhiri dengan slash
export const API_URLS = {
  // Primary URL from environment variable
  primary: ensureTrailingSlash(apiUrl || 'http://localhost:50404/api/v1'),
  // Fallback options
  localhost: 'http://localhost:50404/api/v1/',
  networkIP: 'http://192.168.1.235:50404/api/v1/',
  localIP: 'http://192.168.1.24:50404/api/v1/',
  // Relative URL (if frontend and backend are served from same origin)
  relative: '/api/v1/'
};

// Default API URL to use
export const API_BASE_URL = API_URLS.primary;

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