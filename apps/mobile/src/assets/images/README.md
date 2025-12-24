# Home Icon Images

This directory contains the home icon images for the bottom menu.

## Required Image Files

You need to add two PNG image files to this directory:

1. **home-icon-active.png** - Icon to display when Home screen is active
   - Description: Dark blue house icon on white circular background
   - Use when: `isActive={true}` (Home screen is displayed)

2. **home-icon-inactive.png** - Icon to display when Home screen is not active
   - Description: Dark gray house icon on black circular background  
   - Use when: `isActive={false}` (Other screens are displayed)

## Image Specifications

- **Format**: PNG with transparency support
- **Recommended size**: 24x24 pixels (or 48x48 for @2x, 72x72 for @3x retina displays)
- **Aspect ratio**: 1:1 (square)
- The component will automatically resize images to 24x24 pixels using `resizeMode="contain"`

## How to Add Images

1. Save your two home icon images to this directory (`src/assets/images/`)
2. Name them exactly:
   - `home-icon-active.png` (for active state)
   - `home-icon-inactive.png` (for inactive state)
3. The component will automatically load and toggle between them based on the Home screen state

## Usage

The images are automatically loaded in `HomeIcon.tsx` component:
- When `isActive={true}` → shows `home-icon-active.png`
- When `isActive={false}` → shows `home-icon-inactive.png`

The toggle happens automatically based on the `activeScreen === 'home'` check in `BottomMenuBar.tsx`.
