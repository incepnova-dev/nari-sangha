# Shared i18 Migration Guide

## Overview

The i18 directories from both `apps/mobile/src/i18` and `apps/web/src/i18` have been moved to a shared package at `packages/shared-i18`. This provides a single source of truth for all translations.

## Key Changes

### 1. Merged Authentication Keys
- **Before**: Mobile used `login.*` keys, Web used `signin.*` keys
- **After**: Both `signin.*` and `login.*` keys are available in the shared package for backward compatibility
- **Future**: New standardized `auth.*` keys are available for future use

### 2. Unified Language Structure
- All languages (en, hi, kn, bn) are now in one place
- Each language has: `brand.ts`, `auth.ts`, `signup.ts`, `navigation.ts`
- All keys are merged and available to both platforms

### 3. Adapter Pattern
- Both apps maintain adapter files at their original paths:
  - `apps/mobile/src/i18/index.ts` → re-exports from shared package
  - `apps/web/src/i18/index.js` → re-exports from shared package
- **No code changes needed** - existing imports continue to work

## Structure

```
packages/shared-i18/
├── src/
│   ├── index.ts                    # Main exports
│   └── languages/
│       ├── en/                     # English
│       │   ├── index.ts
│       │   ├── brand.ts
│       │   ├── auth.ts            # Merged signin + login
│       │   ├── signup.ts
│       │   └── navigation.ts
│       ├── hi/                     # Hindi
│       ├── kn/                     # Kannada
│       └── bn/                     # Bengali
├── package.json
└── tsconfig.json
```

## Usage

### In Mobile App
```typescript
// Existing imports still work
import { getProperty } from '../i18';
const title = getProperty('brand.title', 'en');
```

### In Web App
```javascript
// Existing imports still work
import { getProperty } from '../../i18';
const title = getProperty('brand.title', 'en');
```

## Available Keys

### Authentication (Backward Compatible)
- `signin.*` - Used by web app
- `login.*` - Used by mobile app
- `auth.*` - Standardized keys (for future use)

### Other Keys
- `brand.*` - Brand and landing content
- `signup.*` - Sign up form
- `navigation.*` - Navigation items

## Benefits

1. **Single Source of Truth**: All translations in one place
2. **Consistency**: Same translations across platforms
3. **Easier Maintenance**: Update once, works everywhere
4. **Type Safety**: TypeScript support with type definitions
5. **Backward Compatible**: Existing code works without changes
6. **Future Ready**: Standardized `auth.*` keys for migration

## Next Steps

1. **Install dependencies**: Run `npm install` in root to link packages
2. **Test both apps**: Verify translations work correctly
3. **Optional cleanup**: After verification, you can remove old language subdirectories from apps (keep only index files as adapters)

## Adding New Languages

1. Create new folder in `packages/shared-i18/src/languages/` (e.g., `ta` for Tamil)
2. Create files: `brand.ts`, `auth.ts`, `signup.ts`, `navigation.ts`
3. Create `index.ts` that combines all properties
4. Add to `packages/shared-i18/src/index.ts`:
   - Import the new language properties
   - Add to `languageMaps`
   - Add to `languageOptions`

