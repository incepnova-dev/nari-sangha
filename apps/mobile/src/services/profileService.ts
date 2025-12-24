import { get, ApiResponse } from './apiClient';

export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

/**
 * Get user profile from the API
 * @param token - JWT token obtained from login
 * @returns ServiceResult with user profile data
 */
export async function getProfile(
  token: string
): Promise<ServiceResult<UserProfile>> {
  if (!token) {
    return {
      success: false,
      error: 'Authentication token is required',
      status: 401,
    };
  }

  const response: ApiResponse<UserProfile> = await get('/auth/profile', token);

  if (!response.ok) {
    return {
      success: false,
      error: response.error || 'Failed to fetch profile. Please try again.',
      status: response.status,
    };
  }

  return {
    success: true,
    data: response.data,
    status: response.status,
  };
}

