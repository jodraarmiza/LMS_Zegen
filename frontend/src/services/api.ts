// src/services/api.ts
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { API_BASE_URL, DEBUG_MODE } from '../config';

class ApiService {
  private baseURL: string;
  
  constructor() {
    this.baseURL = API_BASE_URL;
    
    if (DEBUG_MODE) {
      console.log('API Service initialized with baseURL:', this.baseURL);
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    needsAuth: boolean = true,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    // Set up request configuration
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method,
      url: `${this.baseURL}${endpoint}`,
      timeout: 10000, // 10 second timeout
    };

    // Add authorization header if needed
    if (needsAuth) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }
      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    // Add data for non-GET requests
    if (['post', 'put', 'patch'].includes(method.toLowerCase()) && data) {
      requestConfig.data = data;
    }

    // Add params for GET requests
    if (method.toLowerCase() === 'get' && data) {
      requestConfig.params = data;
    }

    try {
      if (DEBUG_MODE) {
        console.log(`API Request: ${method.toUpperCase()} ${requestConfig.url}`, {
          headers: requestConfig.headers,
          data: method !== 'get' ? requestConfig.data : undefined,
          params: method === 'get' ? requestConfig.params : undefined,
        });
      }
      
      // Make the request
      const response = await axios(requestConfig);
      
      if (DEBUG_MODE) {
        console.log(`API Response: ${method.toUpperCase()} ${requestConfig.url}`, {
          status: response.status,
          data: response.data
        });
      }
      
      return response.data as T;
    } catch (error) {
      // Process error and throw
      throw this.handleError(error, endpoint);
    }
  }

  private handleError(error: unknown, endpoint: string): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      // Network errors (no response from server)
      if (!axiosError.response) {
        console.error('Network error:', axiosError.message);
        return new Error(`Network error: Unable to connect to the server. Please check your internet connection and verify that the server is running.`);
      }
      
      // Handle different HTTP error statuses
      const status = axiosError.response.status;
      
      // Get the response data (might contain error message)
      const responseData = axiosError.response.data as any;
      const errorMessage = responseData?.message || responseData?.error || axiosError.message;
      
      switch (status) {
        case 400:
          console.error(`Bad request (400) for ${endpoint}:`, errorMessage);
          return new Error(`Invalid request: ${errorMessage}`);
          
        case 401:
          console.error(`Unauthorized (401) for ${endpoint}:`, errorMessage);
          // Clear stored tokens on authentication error
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          return new Error(`Authentication error: ${errorMessage}`);
          
        case 403:
          console.error(`Forbidden (403) for ${endpoint}:`, errorMessage);
          return new Error(`Permission denied: ${errorMessage}`);
          
        case 404:
          console.error(`Not found (404) for ${endpoint}:`, errorMessage);
          return new Error(`Resource not found: ${endpoint}`);
          
        case 500:
          console.error(`Server error (500) for ${endpoint}:`, errorMessage);
          return new Error(`Server error: ${errorMessage}`);
          
        default:
          console.error(`API error (${status}) for ${endpoint}:`, errorMessage);
          return new Error(`Error ${status}: ${errorMessage}`);
      }
    } 
    
    // Non-Axios errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Unexpected error:', errorMessage);
    return new Error(`An unexpected error occurred: ${errorMessage}`);
  }

  // Public API methods with generics for type safety
  async get<T = any>(endpoint: string, params?: any, needsAuth: boolean = true, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('get', endpoint, params, needsAuth, config);
  }

  async post<T = any>(endpoint: string, data?: any, needsAuth: boolean = true, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('post', endpoint, data, needsAuth, config);
  }

  async put<T = any>(endpoint: string, data?: any, needsAuth: boolean = true, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('put', endpoint, data, needsAuth, config);
  }

  async patch<T = any>(endpoint: string, data?: any, needsAuth: boolean = true, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('patch', endpoint, data, needsAuth, config);
  }

  async delete<T = any>(endpoint: string, needsAuth: boolean = true, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('delete', endpoint, undefined, needsAuth, config);
  }
}

const api = new ApiService();
export default api;