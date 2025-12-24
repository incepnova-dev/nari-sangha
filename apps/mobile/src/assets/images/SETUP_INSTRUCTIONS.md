# Home Icon Images Setup Instructions

## Quick Setup

To add your home icon images:

1. **Save your two images** to this directory (`src/assets/images/`) with these exact names:
   - `home-icon-active.png` - Dark blue house icon on white background (shown when Home screen is active)
   - `home-icon-inactive.png` - Dark gray house icon on black background (shown when Home screen is inactive)

2. **Image Requirements:**
   - Format: PNG
   - Recommended size: 24x24px (or 48x48px for @2x, 72x72px for @3x)
   - Should have transparent background or match the app's background

3. **Verify the setup:**
   - The images should be in: `apps/mobile/src/assets/images/`
   - File names must match exactly: `home-icon-active.png` and `home-icon-inactive.png`
   - The component will automatically load and toggle between them

## How It Works

The `HomeIcon.tsx` component automatically:
- Shows `home-icon-active.png` when `isActive={true}` (Home screen is displayed)
- Shows `home-icon-inactive.png` when `isActive={false}` (other screens are displayed)

The toggle happens automatically based on the navigation state in `BottomMenuBar.tsx`.

## Troubleshooting

If images don't appear:
1. Check file names match exactly (case-sensitive)
2. Ensure files are PNG format
3. Restart Metro bundler: `npm start -- --reset-cache`
4. Rebuild the app: `npm run android`

