import { env } from '../config/env';

export const API_BASE_URL = env.API_BASE_URL;

export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export async function post<T = any>(
  path: string,
  body: unknown
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
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