import { ApiClient, ApiResponse } from '../apiClient';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInData {
  token?: string;
  refreshToken?: string;
  user?: {
    name?: string;
    email?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export function createAuthService(client: ApiClient) {
  return {
    async signIn(
      credentials: SignInCredentials
    ): Promise<ServiceResult<SignInData>> {
      const response: ApiResponse<SignInData> = await client.post(
        '/auth/login',
        credentials
      );

      if (!response.ok) {
        return {
          success: false,
          error: response.error || 'Sign in failed. Please try again.',
          status: response.status,
        };
      }

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    },
  };
}

