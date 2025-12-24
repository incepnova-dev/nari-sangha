#!/bin/bash

# Script to help set up home icon images
# This script helps rename and move home icon images to the correct location

IMAGES_DIR="src/assets/images"
ACTIVE_ICON="home-icon-active.png"
INACTIVE_ICON="home-icon-inactive.png"

echo "Home Icon Setup Script"
echo "======================"
echo ""
echo "This script helps you set up the home icon images."
echo ""
echo "Required files:"
echo "  - $ACTIVE_ICON (dark blue on white - active state)"
echo "  - $INACTIVE_ICON (dark gray on black - inactive state)"
echo ""
echo "Please ensure you have two PNG image files ready."
echo ""
read -p "Do you have the image files ready? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please prepare your image files and run this script again."
    exit 1
fi

# Create directory if it doesn't exist
mkdir -p "$IMAGES_DIR"

echo ""
echo "Please provide the paths to your image files:"
echo ""

# Get active icon
read -p "Path to ACTIVE icon (dark blue on white): " active_path
if [ -f "$active_path" ]; then
    cp "$active_path" "$IMAGES_DIR/$ACTIVE_ICON"
    echo "✓ Copied active icon to $IMAGES_DIR/$ACTIVE_ICON"
else
    echo "✗ File not found: $active_path"
fi

# Get inactive icon
read -p "Path to INACTIVE icon (dark gray on black): " inactive_path
if [ -f "$inactive_path" ]; then
    cp "$inactive_path" "$IMAGES_DIR/$INACTIVE_ICON"
    echo "✓ Copied inactive icon to $IMAGES_DIR/$INACTIVE_ICON"
else
    echo "✗ File not found: $inactive_path"
fi

echo ""
echo "Setup complete!"
echo "The images should now be available in $IMAGES_DIR"

