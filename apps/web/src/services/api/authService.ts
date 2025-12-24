/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import apiClient from './apiClient';
import { AxiosError } from 'axios';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  [key: string]: any;
}

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
  status?: number;
}

/**
 * Sign in user
 * @param credentials - User credentials
 * @returns Response with user data and token
 */
export const signIn = async (credentials: SignInCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    // Extract error message from response
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.error || 
                        axiosError.message || 
                        'Sign in failed. Please try again.';
    
    return {
      success: false,
      error: errorMessage,
      status: axiosError.response?.status,
    };
  }
};

/**
 * Sign up user
 * @param userData - User registration data
 * @returns Response with user data and token
 */
export const signUp = async (userData: SignUpData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/signup', userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.error || 
                        axiosError.message || 
                        'Sign up failed. Please try again.';
    
    return {
      success: false,
      error: errorMessage,
      status: axiosError.response?.status,
    };
  }
};

/**
 * Sign out user
 * @returns Response status
 */
export const signOut = async (): Promise<AuthResponse> => {
  try {
    await apiClient.post('/auth/signout');
    // Clear local storage
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    return {
      success: true,
    };
  } catch (error) {
    // Even if API call fails, clear local storage
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    return {
      success: true, // Consider it successful if we cleared local storage
    };
  }
};

/**
 * Get current user
 * @returns Current user data
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const response = await apiClient.get('/auth/me');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.message || 
                        'Failed to fetch user data.';
    
    return {
      success: false,
      error: errorMessage,
      status: axiosError.response?.status,
    };
  }
};

/**
 * Refresh authentication token
 * @returns New token data
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/refresh');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.message || 
                        'Failed to refresh token.';
    
    return {
      success: false,
      error: errorMessage,
      status: axiosError.response?.status,
    };
  }
};

