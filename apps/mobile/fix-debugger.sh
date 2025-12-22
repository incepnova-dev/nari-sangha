#!/bin/bash

echo "🔧 Fixing React Native Debugger Connection..."

# Kill any running Metro bundler processes
echo "📱 Stopping Metro bundler..."
pkill -f "react-native" || true
pkill -f "metro" || true
sleep 2

# Clear Metro bundler cache
echo "🧹 Clearing Metro bundler cache..."
rm -rf /tmp/metro-* /tmp/haste-* 2>/dev/null || true
rm -rf $TMPDIR/metro-* $TMPDIR/haste-* 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

# Clear React Native cache
echo "🧹 Clearing React Native cache..."
rm -rf $TMPDIR/react-* 2>/dev/null || true
watchman watch-del-all 2>/dev/null || true

# Clear Android build cache (optional but recommended)
echo "🧹 Clearing Android build cache..."
cd android
./gradlew clean 2>/dev/null || true
cd ..

echo "✅ Cache cleared!"
echo ""
echo "📝 Next steps:"
echo "1. Start Metro bundler with: npm start -- --reset-cache"
echo "2. In a new terminal, run: npm run android"
echo "3. Shake the device/emulator and select 'Debug'"
echo ""
echo "💡 If the issue persists, try:"
echo "   - Restart the Android emulator/device"
echo "   - Close and reopen React Native DevTools"
echo "   - Check that the app name 'NariSangha' matches in app.json and MainActivity.java"

