import { getProfile, UserProfile } from '../../services/profileService';
import { get } from '../../services/apiClient';

// Mock the apiClient
jest.mock('../../services/apiClient');

const mockGet = get as jest.MockedFunction<typeof get>;

describe('profileService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    const mockToken = 'test-jwt-token';
    const mockProfile: UserProfile = {
      id: 'user-123',
      name: 'Test User',
      email: 'test@example.com',
    };

    it('should successfully fetch user profile with valid token', async () => {
      mockGet.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockProfile,
      });

      const result = await getProfile(mockToken);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProfile);
      expect(result.status).toBe(200);
      expect(result.error).toBeUndefined();
      expect(mockGet).toHaveBeenCalledWith('/auth/profile', mockToken);
    });

    it('should return error when token is missing', async () => {
      const result = await getProfile('');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Authentication token is required');
      expect(result.status).toBe(401);
      expect(result.data).toBeUndefined();
      expect(mockGet).not.toHaveBeenCalled();
    });

    it('should return error when token is undefined', async () => {
      const result = await getProfile(undefined as any);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Authentication token is required');
      expect(result.status).toBe(401);
      expect(result.data).toBeUndefined();
      expect(mockGet).not.toHaveBeenCalled();
    });

    it('should handle 401 unauthorized error', async () => {
      mockGet.mockResolvedValue({
        ok: false,
        status: 401,
        error: 'Unauthorized',
      });

      const result = await getProfile(mockToken);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Unauthorized');
      expect(result.status).toBe(401);
      expect(result.data).toBeUndefined();
      expect(mockGet).toHaveBeenCalledWith('/auth/profile', mockToken);
    });

    it('should handle 403 forbidden error', async () => {
      mockGet.mockResolvedValue({
        ok: false,
        status: 403,
        error: 'Forbidden',
      });

      const result = await getProfile(mockToken);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Forbidden');
      expect(result.status).toBe(403);
      expect(result.data).toBeUndefined();
    });

    it('should handle 404 not found error', async () => {
      mockGet.mockResolvedValue({
        ok: false,
        status: 404,
        error: 'Profile not found',
      });

      const result = await getProfile(mockToken);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Profile not found');
      expect(result.status).toBe(404);
      expect(result.data).toBeUndefined();
    });

    it('should handle 500 server error', async () => {
      mockGet.mockResolvedValue({
        ok: false,
        status: 500,
        error: 'Internal server error',
      });

      const result = await getProfile(mockToken);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Internal server error');
      expect(result.status).toBe(500);
      expect(result.data).toBeUndefined();
    });

    it('should handle network errors', async () => {
      mockGet.mockResolvedValue({
        ok: false,
        status: 0,
        error: 'Network error. Please try again.',
      });

      const result = await getProfile(mockToken);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error. Please try again.');
      expect(result.status).toBe(0);
      expect(result.data).toBeUndefined();
    });

    it('should handle response without error message', async () => {
      mockGet.mockResolvedValue({
        ok: false,
        status: 400,
      });

      const result = await getProfile(mockToken);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to fetch profile. Please try again.');
      expect(result.status).toBe(400);
      expect(result.data).toBeUndefined();
    });

    it('should handle profile with additional fields', async () => {
      const extendedProfile: UserProfile = {
        id: 'user-456',
        name: 'Extended User',
        email: 'extended@example.com',
        phone: '123-456-7890',
        avatar: 'https://example.com/avatar.jpg',
        createdAt: '2024-01-01T00:00:00Z',
      };

      mockGet.mockResolvedValue({
        ok: true,
        status: 200,
        data: extendedProfile,
      });

      const result = await getProfile(mockToken);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(extendedProfile);
      expect(result.data?.phone).toBe('123-456-7890');
      expect(result.data?.avatar).toBe('https://example.com/avatar.jpg');
    });

    it('should handle empty profile response', async () => {
      mockGet.mockResolvedValue({
        ok: true,
        status: 200,
        data: {},
      });

      const result = await getProfile(mockToken);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({});
      expect(result.status).toBe(200);
    });

    it('should use correct Authorization header format', async () => {
      mockGet.mockResolvedValue({
        ok: true,
        status: 200,
        data: mockProfile,
      });

      await getProfile(mockToken);

      expect(mockGet).toHaveBeenCalledWith('/auth/profile', mockToken);
    });
  });
});

