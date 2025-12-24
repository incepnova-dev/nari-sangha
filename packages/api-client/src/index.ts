// Main exports
export * from './apiClient';
export * from './services';

// Re-export types for convenience
export type {
  SignInCredentials,
  SignInData,
  ServiceResult,
} from './services/authService';
export type { UserProfile } from './services/profileService';

