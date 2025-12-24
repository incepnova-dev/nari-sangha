# @narisangha/shared-i18

Shared internationalization (i18n) package for NariSangha mobile and web applications.

## Features

- Unified translation keys for both mobile and web
- Support for 4 languages: English (en), Hindi (hi), Kannada (kn), Bengali (bn)
- Merged authentication keys (signin + login) for backward compatibility
- TypeScript support with type safety

## Usage

```typescript
import { getProperty, languageOptions } from '@narisangha/shared-i18';

// Get a property value
const title = getProperty('brand.title', 'en'); // 'NariSangha'
const hindiTitle = getProperty('brand.title', 'hi'); // 'नारीसंघ'

// Get language options
const options = languageOptions; // Array of { code, name }
```

## Key Structure

### Authentication Keys
- `signin.*` - Used by web app (backward compatible)
- `login.*` - Used by mobile app (backward compatible)
- `auth.*` - Standardized keys for future use

### Other Keys
- `brand.*` - Brand and landing page content
- `signup.*` - Sign up form labels
- `navigation.*` - Navigation menu items

## Adding New Languages

1. Create a new folder in `src/languages/` with the language code (e.g., `ta` for Tamil)
2. Create the same structure: `brand.ts`, `auth.ts`, `signup.ts`, `navigation.ts`
3. Create `index.ts` that combines all properties
4. Add the language to `src/index.ts` in `languageMaps` and `languageOptions`

