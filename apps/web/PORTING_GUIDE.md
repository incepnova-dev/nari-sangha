# Porting Guide: Mobile to Web

This guide explains how the mobile React Native app has been ported to a React web application with the same functionality and styling.

## Structure Overview

The web app structure mirrors the mobile app structure:

```
apps/web/src/
├── component/          # Web components (ported from mobile)
│   ├── Welcome/       # Example: Ported Welcome component
│   └── mobile-routes/ # Routing system matching mobile app
├── __mocks__/         # Mock data (copied from mobile)
├── styles/
│   ├── theme/         # Theme constants (CSS variables + TypeScript)
│   └── global/        # Global styles and reset
└── App.tsx            # Main app component
```

## Key Differences: React Native → React Web

### 1. Component Conversion

**Mobile (React Native):**
```tsx
import { View, Text, TouchableOpacity } from 'react-native';

<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
  <TouchableOpacity onPress={handlePress}>
    <Text>Button</Text>
  </TouchableOpacity>
</View>
```

**Web (React):**
```tsx
import styles from './Component.module.css';

<div className={styles.container}>
  <h1 className={styles.title}>Hello</h1>
  <button onClick={handlePress} className={styles.button}>
    Button
  </button>
</div>
```

### 2. StyleSheet → CSS Modules

**Mobile:**
```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF5F7',
  },
});
```

**Web:**
```css
/* Component.module.css */
.container {
  flex: 1;
  padding: var(--spacing-lg);
  background-color: var(--bg-primary);
}
```

### 3. Navigation

**Mobile:** Custom navigation object
```tsx
navigation.navigate('HomeLanding');
```

**Web:** React Router with matching API
```tsx
import { useMobileNavigation, ROUTES } from '../mobile-routes/Routes';

const navigation = useMobileNavigation();
navigation.navigate(ROUTES.HOME_LANDING);
```

## Theme System

### CSS Variables
All theme values are available as CSS variables in `apps/web/src/styles/theme/variables.css`:

```css
:root {
  --color-primary: #E91E63;
  --bg-primary: #FFF5F7;
  --spacing-lg: 16px;
  /* ... etc */
}
```

### TypeScript Constants
Also available as TypeScript constants:

```tsx
import { colors, spacing, typography } from '../styles/theme';

const style = {
  backgroundColor: colors.primary,
  padding: spacing.lg,
};
```

## Porting a Component - Step by Step

### Step 1: Create Component Directory
```bash
mkdir apps/web/src/component/ComponentName
```

### Step 2: Convert Component File

1. Replace React Native imports:
   - `View` → `div`
   - `Text` → `h1`, `h2`, `p`, `span` (semantic HTML)
   - `TouchableOpacity` → `button` or `div` with `onClick`
   - `ScrollView` → `div` with `overflow-y: auto`
   - `TextInput` → `input` or `textarea`
   - `Image` → `img`

2. Replace style prop with className:
   ```tsx
   // Mobile
   <View style={styles.container}>
   
   // Web
   <div className={styles.container}>
   ```

3. Update event handlers:
   ```tsx
   // Mobile
   <TouchableOpacity onPress={handleClick}>
   
   // Web
   <button onClick={handleClick}>
   ```

### Step 3: Create CSS Module

1. Copy styles from mobile `Component.styles.ts`
2. Convert React Native StyleSheet to CSS:
   - `flex: 1` → `flex: 1` (works the same)
   - `paddingVertical: 16` → `padding-top: 16px; padding-bottom: 16px;`
   - `paddingHorizontal: 16` → `padding-left: 16px; padding-right: 16px;`
   - `alignItems: 'center'` → `align-items: center;`
   - `justifyContent: 'center'` → `justify-content: center;`
   - Use CSS variables: `colors.primary` → `var(--color-primary)`
   - Use spacing variables: `spacing.lg` → `var(--spacing-lg)`

3. Add responsive styles:
   ```css
   @media (max-width: 768px) {
     .container {
       padding: var(--spacing-md);
     }
   }
   ```

### Step 4: Update Navigation

Use the `useMobileNavigation` hook:
```tsx
import { useMobileNavigation, ROUTES } from '../mobile-routes/Routes';

const Component = () => {
  const navigation = useMobileNavigation();
  
  const handleNavigate = () => {
    navigation.navigate(ROUTES.HOME_LANDING);
  };
  
  // ...
};
```

### Step 5: Add Route

Update `apps/web/src/component/mobile-routes/AppRoutes.tsx`:
```tsx
import ComponentName from '../ComponentName/ComponentName';

// In Routes:
<Route
  path={routePaths[ROUTES.COMPONENT_NAME]}
  element={<ComponentName />}
/>
```

## Responsive Design

All components should work on both desktop and mobile browsers:

1. **Mobile-first approach**: Base styles for mobile, enhance for desktop
2. **Touch-friendly**: Minimum 44px tap targets
3. **Media queries**: Use breakpoints from `variables.css`
4. **Viewport meta**: Already set in `public/index.html`

Example:
```css
.button {
  padding: var(--spacing-md);
  min-height: 44px; /* Touch-friendly */
}

@media (min-width: 769px) {
  .button {
    padding: var(--spacing-lg);
  }
}
```

## Common Conversions

| React Native | React Web |
|-------------|-----------|
| `View` | `div` |
| `Text` | `span`, `p`, `h1-h6` |
| `TouchableOpacity` | `button` or `div[role="button"]` |
| `ScrollView` | `div` with `overflow-y: auto` |
| `TextInput` | `input` or `textarea` |
| `Image` | `img` |
| `StatusBar` | Not needed (browser handles) |
| `Platform.OS` | CSS media queries or feature detection |
| `StyleSheet.create()` | CSS Modules |
| `style={styles.x}` | `className={styles.x}` |
| `onPress` | `onClick` |
| `activeOpacity` | CSS `:active` pseudo-class |

## Completed Components

- ✅ Theme system (colors, spacing, typography, icons)
- ✅ Global styles and reset
- ✅ Routing infrastructure
- ✅ Welcome component
- ✅ Mock data (all files copied and updated)

## Remaining Components to Port

- [ ] SignIn
- [ ] SignUpIndiaPhone
- [ ] SignUpGlobalEmail
- [ ] RegionSelection
- [ ] HomeLanding
- [ ] TopMenuBar
- [ ] BottomMenuBar
- [ ] SideMenu
- [ ] Profile
- [ ] ProductsOption
- [ ] HealthProducts
- [ ] Insurance
- ... (and ~40 more components)

## Testing

1. Start the web app:
   ```bash
   cd apps/web
   npm start
   ```

2. Test responsive design:
   - Desktop: Open browser at full width
   - Mobile: Use browser dev tools device emulation
   - Touch: Test on actual mobile device

## Notes

- All mock data has been copied and paths updated
- Theme variables match mobile app exactly
- Navigation API matches mobile app for easy porting
- Responsive design built-in for desktop and mobile browsers
- CSS Modules provide style encapsulation

