#!/bin/bash

# Script to fix NDK 26.1.10909125 installation issue
# The NDK installation is incomplete (missing source.properties and NDK files)

set -e

ANDROID_HOME="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$HOME/Library/Android/sdk}}"
NDK_VERSION="26.1.10909125"
NDK_PATH="$ANDROID_HOME/ndk/$NDK_VERSION"

echo "=========================================="
echo "NDK Installation Fix Script"
echo "=========================================="
echo ""
echo "NDK Path: $NDK_PATH"
echo ""

# Check if incomplete installation exists
if [ -d "$NDK_PATH" ]; then
    echo "⚠️  Found incomplete NDK installation at $NDK_PATH"
    echo "   Removing incomplete installation..."
    rm -rf "$NDK_PATH"
    echo "✅ Removed incomplete installation"
    echo ""
fi

# Check for sdkmanager
SDKMANAGER=""
if [ -d "$ANDROID_HOME/cmdline-tools" ]; then
    SDKMANAGER=$(find "$ANDROID_HOME/cmdline-tools" -name "sdkmanager" -type f 2>/dev/null | head -1)
fi

if [ -n "$SDKMANAGER" ]; then
    echo "✅ Found sdkmanager at: $SDKMANAGER"
    echo ""
    echo "Installing NDK $NDK_VERSION via sdkmanager..."
    echo ""
    "$SDKMANAGER" "ndk;$NDK_VERSION"
    echo ""
    echo "✅ NDK installation complete!"
else
    echo "❌ sdkmanager not found in command-line tools"
    echo ""
    echo "=========================================="
    echo "MANUAL INSTALLATION REQUIRED"
    echo "=========================================="
    echo ""
    echo "Please install NDK $NDK_VERSION via Android Studio:"
    echo ""
    echo "1. Open Android Studio"
    echo "2. Go to: Tools → SDK Manager"
    echo "3. Click on the 'SDK Tools' tab"
    echo "4. Check 'Show Package Details' at the bottom"
    echo "5. Expand 'NDK (Side by side)'"
    echo "6. Check the box for '26.1.10909125'"
    echo "7. Click 'Apply' and wait for installation"
    echo ""
    echo "After installation, run:"
    echo "  cd android && ./gradlew clean"
    echo ""
    exit 1
fi

# Verify installation
if [ -f "$NDK_PATH/source.properties" ]; then
    echo ""
    echo "✅ Verification successful!"
    echo "   NDK $NDK_VERSION is properly installed"
    echo ""
    echo "Next steps:"
    echo "  cd android && ./gradlew clean"
else
    echo ""
    echo "⚠️  Installation may have failed. Please verify manually."
    echo "   Expected file: $NDK_PATH/source.properties"
fi

