// Central export for all web services
// This file creates API client instances using the shared @narisangha/api-client package
// Usage example:
//   import { authService, profileService, apiClient, signIn, signUp, signOut, getCurrentUser, refreshToken } from '../services';

// Use relative imports to avoid TypeScript path resolution issues
import { createApiClient, createAuthService, createProfileService } from '../../../../packages/api-client/src';
import getApiConfig from '../config/api.config';

// Get base URL from config
const apiConfig = getApiConfig();

// Create API client instance with web-specific config
const apiClient = createApiClient({
  baseURL: apiConfig.baseURL,
});

// Create service instances
export const authService = createAuthService(apiClient);
export const profileService = createProfileService(apiClient);

// Export the API client for advanced usage
export { apiClient };

// Re-export types and functions for convenience
export * from '../../../../packages/api-client/src';

// Helper function to get token from storage
function getToken(): string | undefined {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || undefined;
}

// Helper function to store tokens
function storeTokens(data: any): void {
  if (data?.token) {
    localStorage.setItem('authToken', data.token);
  }
  if (data?.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken);
  }
}

// Helper function to clear tokens
function clearTokens(): void {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
}

// Convenience exports that match the old API
export const signIn = async (credentials: { email: string; password: string }) => {
  const result = await authService.signIn(credentials);
  
  if (result.success && result.data) {
    storeTokens(result.data);
  }
  
  return result;
};

// Additional auth methods not in api-client package
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

export const signUp = async (userData: SignUpData): Promise<AuthResponse> => {
  const token = getToken();
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${apiConfig.baseURL}/auth/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify(userData),
    });

    const status = response.status;
    const ok = response.ok;

    let parsed: any = undefined;
    try {
      parsed = await response.json();
    } catch {
      // ignore JSON parse errors
    }

    if (!ok) {
      const message =
        parsed?.message || parsed?.error || 'Sign up failed. Please try again.';

      if (status === 401) {
        clearTokens();
      }

      return {
        success: false,
        error: message,
        status,
      };
    }

    if (parsed) {
      storeTokens(parsed);
    }

    return {
      success: true,
      data: parsed,
      status,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Network error. Please try again.',
      status: 0,
    };
  }
};

export const signOut = async (): Promise<AuthResponse> => {
  const token = getToken();
  
  try {
    if (token) {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      await fetch(`${apiConfig.baseURL}/auth/signout`, {
        method: 'POST',
        headers,
      });
    }
  } catch (error) {
    // Continue even if API call fails
  } finally {
    // Always clear local storage
    clearTokens();
  }
  
  return {
    success: true,
  };
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const token = getToken();
  
  if (!token) {
    return {
      success: false,
      error: 'No authentication token found',
      status: 401,
    };
  }
  
  const result = await profileService.getProfile(token);
  
  return {
    success: result.success,
    data: result.data,
    error: result.error,
    status: result.status,
  };
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const token = getToken();
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${apiConfig.baseURL}/auth/refresh`, {
      method: 'POST',
      headers,
    });

    const status = response.status;
    const ok = response.ok;

    let parsed: any = undefined;
    try {
      parsed = await response.json();
    } catch {
      // ignore JSON parse errors
    }

    if (!ok) {
      const message =
        parsed?.message || parsed?.error || 'Failed to refresh token.';

      if (status === 401) {
        clearTokens();
      }

      return {
        success: false,
        error: message,
        status,
      };
    }

    if (parsed) {
      storeTokens(parsed);
    }

    return {
      success: true,
      data: parsed,
      status,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Network error. Please try again.',
      status: 0,
    };
  }
};

// Re-export types for convenience
export type { SignInCredentials, SignInData, ServiceResult, UserProfile } from '../../../../packages/api-client/src';

