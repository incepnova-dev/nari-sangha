// Central export for all mobile services
// This file creates API client instances using the shared @narisangha/api-client package
// Usage example:
//   import { authService, profileService, apiClient } from '../services';

import { createApiClient, createAuthService, createProfileService } from '@narisangha/api-client';
import { env } from '../config/env';

// Create API client instance with mobile-specific config
const apiClient = createApiClient({
  baseURL: env.API_BASE_URL,
});

// Create service instances
export const authService = createAuthService(apiClient);
export const profileService = createProfileService(apiClient);

// Export the API client for advanced usage
export { apiClient };

// Re-export types and functions for convenience
export * from '@narisangha/api-client';

// Convenience exports that match the old API
export const signIn = authService.signIn.bind(authService);
export const getProfile = profileService.getProfile.bind(profileService);
