// // src/services/api.ts
// import { API_BASE_URL } from '../config';
// import authService from './authService';

// /**
//  * A wrapper for fetch API that includes authorization headers and error handling
//  */
// class API {
//   /**
//    * Make a GET request
//    * @param endpoint API endpoint
//    * @param requireAuth Whether to include authorization header
//    * @returns Response data
//    */
//   async get(endpoint: string, requireAuth: boolean = true) {
//     return this.request('GET', endpoint, null, requireAuth);
//   }

//   /**
//    * Make a POST request
//    * @param endpoint API endpoint
//    * @param data Request body data
//    * @param requireAuth Whether to include authorization header
//    * @returns Response data
//    */
//   async post(endpoint: string, data: any, requireAuth: boolean = true) {
//     return this.request('POST', endpoint, data, requireAuth);
//   }

//   /**
//    * Make a PUT request
//    * @param endpoint API endpoint
//    * @param data Request body data
//    * @param requireAuth Whether to include authorization header
//    * @returns Response data
//    */
//   async put(endpoint: string, data: any, requireAuth: boolean = true) {
//     return this.request('PUT', endpoint, data, requireAuth);
//   }

//   /**
//    * Make a DELETE request
//    * @param endpoint API endpoint
//    * @param requireAuth Whether to include authorization header
//    * @returns Response data
//    */
//   async delete(endpoint: string, requireAuth: boolean = true) {
//     return this.request('DELETE', endpoint, null, requireAuth);
//   }

//   /**
//    * Make a request with automatic token refresh if needed
//    * @param method HTTP method
//    * @param endpoint API endpoint
//    * @param data Request body data
//    * @param requireAuth Whether to include authorization header
//    * @returns Response data
//    */
//   private async request(method: string, endpoint: string, data: any = null, requireAuth: boolean = true) {
//     const headers: HeadersInit = {
//       'Content-Type': 'application/json',
//     };

//     // Add authorization header if required
//     if (requireAuth) {
//       const token = authService.getAccessToken();
//       if (!token) {
//         throw new Error('No access token available');
//       }
//       headers['Authorization'] = `Bearer ${token}`;
//     }

//     // Prepare request options
//     const options: RequestInit = {
//       method,
//       headers,
//       body: data ? JSON.stringify(data) : undefined,
//     };

//     try {
//       // Make the request
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

//       // Handle 401 Unauthorized (token expired)
//       if (response.status === 401 && requireAuth) {
//         try {
//           // Try to refresh the token
//           await authService.refreshAccessToken();
          
//           // Update the authorization header with the new token
//           headers['Authorization'] = `Bearer ${authService.getAccessToken()}`;
//           options.headers = headers;
          
//           // Retry the request with the new token
//           const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, options);
          
//           if (!retryResponse.ok) {
//             throw new Error(`HTTP error ${retryResponse.status}: ${retryResponse.statusText}`);
//           }
          
//           return await retryResponse.json();
//         } catch (refreshError) {
//           // If refresh fails, force logout and throw error
//           authService.logout();
//           throw new Error('Session expired. Please log in again.');
//         }
//       }

//       // Handle other errors
//       if (!response.ok) {
//         // Try to parse error message from response
//         try {
//           const errorData = await response.json();
//           throw new Error(errorData.message || `HTTP error ${response.status}: ${response.statusText}`);
//         } catch (e) {
//           throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
//         }
//       }

//       // No content
//       if (response.status === 204) {
//         return null;
//       }

//       // Parse and return response
//       return await response.json();
//     } catch (error) {
//       console.error('API request failed:', error);
//       throw error;
//     }
//   }

//   /**
//    * Upload a file
//    * @param endpoint API endpoint
//    * @param file File to upload
//    * @param formData Additional form data
//    * @param requireAuth Whether to include authorization header
//    * @returns Response data
//    */
//   async uploadFile(endpoint: string, file: File, formData: Record<string, string> = {}, requireAuth: boolean = true) {
//     const headers: HeadersInit = {};

//     // Add authorization header if required
//     if (requireAuth) {
//       const token = authService.getAccessToken();
//       if (!token) {
//         throw new Error('No access token available');
//       }
//       headers['Authorization'] = `Bearer ${token}`;
//     }

//     // Create form data
//     const formDataObj = new FormData();
//     formDataObj.append('file', file);
    
//     // Add additional form data
//     Object.entries(formData).forEach(([key, value]) => {
//       formDataObj.append(key, value);
//     });

//     try {
//       // Make the request
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//         method: 'POST',
//         headers,
//         body: formDataObj,
//       });

//       // Handle 401 Unauthorized (token expired)
//       if (response.status === 401 && requireAuth) {
//         try {
//           // Try to refresh the token
//           await authService.refreshAccessToken();
          
//           // Update the authorization header with the new token
//           headers['Authorization'] = `Bearer ${authService.getAccessToken()}`;
          
//           // Retry the request with the new token
//           const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
//             method: 'POST',
//             headers,
//             body: formDataObj,
//           });
          
//           if (!retryResponse.ok) {
//             throw new Error(`HTTP error ${retryResponse.status}: ${retryResponse.statusText}`);
//           }
          
//           return await retryResponse.json();
//         } catch (refreshError) {
//           // If refresh fails, force logout and throw error
//           authService.logout();
//           throw new Error('Session expired. Please log in again.');
//         }
//       }

//       // Handle other errors
//       if (!response.ok) {
//         // Try to parse error message from response
//         try {
//           const errorData = await response.json();
//           throw new Error(errorData.message || `HTTP error ${response.status}: ${response.statusText}`);
//         } catch (e) {
//           throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
//         }
//       }

//       // Parse and return response
//       return await response.json();
//     } catch (error) {
//       console.error('File upload failed:', error);
//       throw error;
//     }
//   }
// }

// export default new API();
// src/services/api.ts
import { API_BASE_URL, API_URLS, DEBUG_MODE } from '../config';
import authService from './authService';

// Keep track of which API URL works
let currentAPIUrl = API_BASE_URL;
let hasTriedAllURLs = false;

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
    // Hilangkan slash depan dari endpoint jika ada untuk menghindari double slash
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    
    // Create a list of URLs to try if we haven't tried all URLs yet
    const urlsToTry = hasTriedAllURLs 
      ? [currentAPIUrl] // Just use the current URL if we've already found a working one
      : Object.values(API_URLS); // Try all URLs in order
    
    // First try the proxy approach (which avoids CORS)
    if (!hasTriedAllURLs) {
      // Proxy URL for Vite dev server
      urlsToTry.unshift('/api/v1/');
    }
    
    // Keep track of the original error to throw if all attempts fail
    let lastError: Error | null = null;
    
    // Try each URL until one works
    for (const baseUrl of urlsToTry) {
      try {
        // PERBAIKAN: Gabungkan baseUrl dengan endpoint dengan benar
        let url;
        
        // Pastikan ada slash di antara baseUrl dan endpoint
        if (baseUrl === '/api/v1/') {
          // Kasus proxy 
          url = `${baseUrl}${cleanEndpoint}`;
        } else if (baseUrl.startsWith('http')) {
          // Kasus absolute URL - tambahkan slash jika baseUrl tidak diakhiri dengan slash
          const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
          url = `${base}${cleanEndpoint}`;
        } else {
          // Kasus URL relatif lainnya
          url = `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}${cleanEndpoint}`;
        }
        
        if (DEBUG_MODE) {
          console.log(`Trying ${method} request to: ${url}`);
        }
        
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
        let options: RequestInit = {
          method,
          headers,
          body: data ? JSON.stringify(data) : undefined,
        };
        
        // For absolute URLs (not relative URLs), add these settings
        if (baseUrl.startsWith('http')) {
          options = {
            ...options,
            mode: 'cors',
            credentials: 'omit',
          };
        }

        if (DEBUG_MODE) {
          console.log('Request options:', options);
        }
        
        // Make the request with a timeout of 10 seconds (increased for slower connections)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        options.signal = controller.signal;
        
        const response = await fetch(url, options);
        clearTimeout(timeoutId); // Clear the timeout
        
        if (DEBUG_MODE) {
          console.log(`Response status: ${response.status}`);
        }

        // If we get a response, update the current API URL for future requests
        if (baseUrl.startsWith('http')) {
          // Ensure trailing slash for consistency
          currentAPIUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        } else {
          currentAPIUrl = baseUrl;
        }
        hasTriedAllURLs = true;

        // Handle 401 Unauthorized (token expired)
        if (response.status === 401 && requireAuth) {
          try {
            console.log('Token expired, attempting refresh...');
            // Try to refresh the token
            await authService.refreshAccessToken();
            
            // Update the authorization header with the new token
            headers['Authorization'] = `Bearer ${authService.getAccessToken()}`;
            options.headers = headers;
            
            console.log('Retrying request with new token');
            // Retry the request with the new token
            const retryResponse = await fetch(url, options);
            
            if (!retryResponse.ok) {
              throw new Error(`HTTP error ${retryResponse.status}: ${retryResponse.statusText}`);
            }
            
            return await retryResponse.json();
          } catch (refreshError) {
            // If refresh fails, force logout and throw error
            console.error('Token refresh failed:', refreshError);
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
        console.error(`API request to ${baseUrl} failed:`, error);
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // If it's not a network/timeout error, it's probably a server error,
        // so we shouldn't try other URLs
        if (!(error instanceof TypeError) && 
            !(error instanceof DOMException && error.name === 'AbortError')) {
          throw error;
        }
        
        // For network errors, continue to the next URL
        if (DEBUG_MODE) {
          console.log(`Trying next API base URL...`);
        }
      }
    }
    
    // If we reach here, all URLs failed
    console.error('All API URL attempts failed.');
    
    // Create a user-friendly error message
    console.error('Network error detected. Check if:');
    console.error('1. The server is running');
    console.error('2. CORS is properly configured on the server');
    console.error('3. There are no network connectivity issues');
    
    throw new Error(`Network error: Could not connect to the server. Please check your connection and server status.`);
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
    // Hilangkan slash depan dari endpoint jika ada untuk menghindari double slash
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    
    // Pastikan ada slash di antara currentAPIUrl dan endpoint
    const base = currentAPIUrl.endsWith('/') ? currentAPIUrl : `${currentAPIUrl}/`;
    const url = `${base}${cleanEndpoint}`;
    
    console.log(`Uploading file to: ${url}`);
    
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

    // Prepare CORS options based on URL
    const corsOptions = currentAPIUrl.startsWith('http') 
      ? { mode: 'cors' as RequestMode, credentials: 'omit' as RequestCredentials } 
      : {};

    try {
      // Make the request
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formDataObj,
        ...corsOptions
      });

      // Handle 401 Unauthorized (token expired)
      if (response.status === 401 && requireAuth) {
        try {
          // Try to refresh the token
          await authService.refreshAccessToken();
          
          // Update the authorization header with the new token
          headers['Authorization'] = `Bearer ${authService.getAccessToken()}`;
          
          // Retry the request with the new token
          const retryResponse = await fetch(url, {
            method: 'POST',
            headers,
            body: formDataObj,
            ...corsOptions
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