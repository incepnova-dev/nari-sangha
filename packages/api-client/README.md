# @narisangha/api-client

Shared API client package for NariSangha mobile and web applications.

## Usage

### Creating an API client instance

```typescript
import { createApiClient, createAuthService, createProfileService } from '@narisangha/api-client';

// Create API client with your base URL
const apiClient = createApiClient({
  baseURL: 'http://localhost:3001/api',
});

// Create service instances
const authService = createAuthService(apiClient);
const profileService = createProfileService(apiClient);

// Use the services
const result = await authService.signIn({ email: 'user@example.com', password: 'password' });
```

## Services

- **AuthService**: Authentication operations (sign in, etc.)
- **ProfileService**: User profile operations

