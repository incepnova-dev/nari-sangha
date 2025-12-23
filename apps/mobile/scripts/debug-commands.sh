#!/bin/bash
# Debug commands for React Native white screen issue

echo "1. Stopping Metro bundler if running..."
pkill -f "react-native start" || true
pkill -f "node.*cli.js start" || true

echo "2. Clearing Metro bundler cache..."
npm start -- --reset-cache &
METRO_PID=$!

echo "3. Waiting for Metro to start..."
sleep 5

echo "4. Cleaning Android build..."
cd android
./gradlew clean
cd ..

echo "5. Rebuilding app..."
echo "Now run: npm run android"
echo ""
echo "Or manually:"
echo "  - Make sure Metro is running (npm start -- --reset-cache)"
echo "  - In another terminal: npm run android"
echo ""
echo "Metro PID: $METRO_PID"
echo "To stop Metro: kill $METRO_PID"
