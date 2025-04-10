// src/services/api.ts
import { API_BASE_URL } from '../config';
import authService from './authService';

/**
 * A wrapper for fetch API that includes authorization headers and error handling
 */
class API {
  /**
   * Make a GET request
   * @param endpoint API endpoint
   * @param requireAuth Whether to include authorization header
   * @returns Response data
   */
  async get(endpoint: string, requireAuth: boolean = true) {
    return this.request('GET', endpoint, null, requireAuth);
  }

  /**
   * Make a POST request
   * @param endpoint API endpoint
   * @param data Request body data
   * @param requireAuth Whether to include authorization header
   * @returns Response data
   */
  async post(endpoint: string, data: any, requireAuth: boolean = true) {
    return this.request('POST', endpoint, data, requireAuth);
  }

  /**
   * Make a PUT request
   * @param endpoint API endpoint
   * @param data Request body data
   * @param requireAuth Whether to include authorization header
   * @returns Response data
   */
  async put(endpoint: string, data: any, requireAuth: boolean = true) {
    return this.request('PUT', endpoint, data, requireAuth);
  }

  /**
   * Make a DELETE request
   * @param endpoint API endpoint
   * @param requireAuth Whether to include authorization header
   * @returns Response data
   */
  async delete(endpoint: string, requireAuth: boolean = true) {
    return this.request('DELETE', endpoint, null, requireAuth);
  }

  /**
   * Make a request with automatic token refresh if needed
   * @param method HTTP method
   * @param endpoint API endpoint
   * @param data Request body data
   * @param requireAuth Whether to include authorization header
   * @returns Response data
   */
  private async request(method: string, endpoint: string, data: any = null, requireAuth: boolean = true) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authorization header if required
    if (requireAuth) {
      const token = authService.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      // Make the request
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

      // Handle 401 Unauthorized (token expired)
      if (response.status === 401 && requireAuth) {
        try {
          // Try to refresh the token
          await authService.refreshAccessToken();
          
          // Update the authorization header with the new token
          headers['Authorization'] = `Bearer ${authService.getAccessToken()}`;
          options.headers = headers;
          
          // Retry the request with the new token
          const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, options);
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP error ${retryResponse.status}: ${retryResponse.statusText}`);
          }
          
          return await retryResponse.json();
        } catch (refreshError) {
          // If refresh fails, force logout and throw error
          authService.logout();
          throw new Error('Session expired. Please log in again.');
        }
      }

      // Handle other errors
      if (!response.ok) {
        // Try to parse error message from response
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error ${response.status}: ${response.statusText}`);
        } catch (e) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
      }

      // No content
      if (response.status === 204) {
        return null;
      }

      // Parse and return response
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Upload a file
   * @param endpoint API endpoint
   * @param file File to upload
   * @param formData Additional form data
   * @param requireAuth Whether to include authorization header
   * @returns Response data
   */
  async uploadFile(endpoint: string, file: File, formData: Record<string, string> = {}, requireAuth: boolean = true) {
    const headers: HeadersInit = {};

    // Add authorization header if required
    if (requireAuth) {
      const token = authService.getAccessToken();
      if (!token) {
        throw new Error('No access token available');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Create form data
    const formDataObj = new FormData();
    formDataObj.append('file', file);
    
    // Add additional form data
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    try {
      // Make the request
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formDataObj,
      });

      // Handle 401 Unauthorized (token expired)
      if (response.status === 401 && requireAuth) {
        try {
          // Try to refresh the token
          await authService.refreshAccessToken();
          
          // Update the authorization header with the new token
          headers['Authorization'] = `Bearer ${authService.getAccessToken()}`;
          
          // Retry the request with the new token
          const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: formDataObj,
          });
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP error ${retryResponse.status}: ${retryResponse.statusText}`);
          }
          
          return await retryResponse.json();
        } catch (refreshError) {
          // If refresh fails, force logout and throw error
          authService.logout();
          throw new Error('Session expired. Please log in again.');
        }
      }

      // Handle other errors
      if (!response.ok) {
        // Try to parse error message from response
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error ${response.status}: ${response.statusText}`);
        } catch (e) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
      }

      // Parse and return response
      return await response.json();
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }
}

export default new API();