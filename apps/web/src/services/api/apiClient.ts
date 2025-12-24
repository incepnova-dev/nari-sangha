/**
 * API Client
 * Centralized HTTP client with axios
 * Handles request/response interceptors, error handling, and token management
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import getApiConfig from '../../config/api.config';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create(getApiConfig());

// Request interceptor - Add auth token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage or sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      const errorData = data as { message?: string; error?: string };
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          // Optionally trigger a logout event or redirect
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden:', errorData?.message || 'Forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found:', errorData?.message || 'Not found');
          break;
        case 500:
          // Server error
          console.error('Server error:', errorData?.message || 'Internal server error');
          break;
        default:
          console.error('API error:', errorData?.message || error.message);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error: No response received');
    } else {
      // Error setting up request
      console.error('Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

