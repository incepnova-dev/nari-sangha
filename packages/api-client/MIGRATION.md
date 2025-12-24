# API Client Migration Summary

## What Was Done

The API service calls have been moved from `apps/mobile/src/services` to a shared package at `packages/api-client` that can be used by both mobile and web applications.

## Structure

```
packages/
  └── api-client/
      ├── package.json
      ├── tsconfig.json
      ├── src/
      │   ├── index.ts              # Main exports
      │   ├── apiClient.ts          # Base HTTP client (environment-agnostic)
      │   └── services/
      │       ├── authService.ts
      │       ├── profileService.ts
      │       └── index.ts
      └── README.md
```

## Key Changes

### 1. Shared Package (`packages/api-client`)
- **Environment-agnostic**: The API client no longer depends on mobile-specific config
- **Factory pattern**: Uses `createApiClient()` and `createAuthService()` / `createProfileService()` functions
- **Base URL injection**: Base URL is passed from the consuming app

### 2. Mobile App Integration (`apps/mobile/src/services/index.ts`)
- Creates API client instance with mobile-specific config
- Exports service instances for use throughout the app
- Maintains backward compatibility with existing imports

### 3. Configuration Updates
- **Root `package.json`**: Added workspaces configuration
- **Mobile `package.json`**: Added `@narisangha/api-client` dependency
- **Metro config**: Updated to watch workspace packages
- **TypeScript config**: Added path mapping for the shared package

## Usage in Mobile App

The API remains the same for existing code:

```typescript
import { signIn, getProfile, UserProfile } from '../services';

// Usage is unchanged
const result = await signIn({ email: 'user@example.com', password: 'password' });
const profile = await getProfile(token);
```

## Usage in Web App (Future)

```typescript
import { createApiClient, createAuthService, createProfileService } from '@narisangha/api-client';

const apiClient = createApiClient({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
});

const authService = createAuthService(apiClient);
const profileService = createProfileService(apiClient);

// Use services
const result = await authService.signIn({ email: 'user@example.com', password: 'password' });
```

## Next Steps

1. **Install dependencies**: Run `npm install` in the root directory to link workspace packages
2. **Test mobile app**: Verify all API calls work correctly
3. **Update web app**: When ready, update `apps/web` to use the shared package
4. **Remove old files**: After verifying everything works, you can remove:
   - `apps/mobile/src/services/apiClient.ts`
   - `apps/mobile/src/services/authService.ts`
   - `apps/mobile/src/services/profileService.ts`

## Benefits

1. **Single source of truth**: API logic is centralized
2. **Type safety**: Shared TypeScript types across apps
3. **Maintainability**: Changes to API logic only need to be made in one place
4. **Reusability**: Easy to add new services that work in both mobile and web
5. **Testing**: Can test API client independently

