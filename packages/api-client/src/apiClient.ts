// Environment-agnostic API client
// The base URL should be passed from the consuming app

export interface ApiClientConfig {
  baseURL: string;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
  }

  async post<T = any>(
    path: string,
    body: unknown
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
          parsed?.message || parsed?.error || 'Request failed. Please try again.';

        return {
          ok,
          status,
          error: message,
        };
      }

      return {
        ok,
        status,
        data: parsed as T,
      };
    } catch (error: any) {
      return {
        ok: false,
        status: 0,
        error: error?.message || 'Network error. Please try again.',
      };
    }
  }

  async get<T = any>(
    path: string,
    token?: string
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseURL}${path}`, {
        method: 'GET',
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
          parsed?.message || parsed?.error || 'Request failed. Please try again.';

        return {
          ok,
          status,
          error: message,
        };
      }

      return {
        ok,
        status,
        data: parsed as T,
      };
    } catch (error: any) {
      return {
        ok: false,
        status: 0,
        error: error?.message || 'Network error. Please try again.',
      };
    }
  }
}

// Factory function to create an API client instance
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}

// Export the class for advanced usage
export { ApiClient };

