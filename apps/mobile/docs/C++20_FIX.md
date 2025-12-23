# C++20 Compilation Error Fix

## Issue
Both React Native 0.82 and 0.83 use C++20, which requires NDK 26.x. NDK 25.x does not fully support C++20 features like `std::regular` and `std::identity`.

## Error Messages
```
error: no member named 'regular' in namespace 'std'
error: no type named 'identity' in namespace 'std'
```

## Solution Applied
**Downgraded to React Native 0.82** and configured for NDK 26.x installation.

### Changes Made:
- React Native: 0.83.0 → 0.82.0
- React: 19.2.3 → 19.1.1 (React Native 0.82 requires React 19.x)
- NDK Version: Configured for 26.1.10909125 (requires proper installation)
- Updated all @react-native/* packages to 0.82.0 versions

## Required: Install NDK 26.1.10909125

**Both React Native 0.82 and 0.83 require NDK 26.x for C++20 support.**

### Installation Steps:

1. **Open Android Studio**
2. **Go to SDK Manager:**
   - Click **Tools** → **SDK Manager**
   - Or click the SDK Manager icon in the toolbar
3. **Navigate to SDK Tools:**
   - Click on the **"SDK Tools"** tab
   - Check **"Show Package Details"** at the bottom
4. **Install NDK 26.1.10909125:**
   - Expand **"NDK (Side by side)"**
   - Check the box for **"26.1.10909125"**
   - **Uncheck any incomplete NDK versions** (they only have `.installer` folders)
   - Click **"Apply"** and wait for the download/installation to complete
5. **Verify Installation:**
   ```bash
   ls -la $ANDROID_HOME/ndk/26.1.10909125/source.properties
   ```
   This should show the file exists.

### After Installation:

```bash
cd android
./gradlew clean
cd ..
npm run android
```

## Note
React Native 0.82 was chosen to avoid potential 0.83-specific issues, but both versions require NDK 26.x for C++20 compatibility.

### Option 3: Temporary Workaround
The autolinking files have been generated with C++20 compatibility headers.
Run `node scripts/generate-autolinking.js` after each clean build.

## Current Status
- ✅ All Java/Kotlin compilation issues fixed
- ✅ MainApplication.java fixed
- ✅ Gradle configuration fixed
- ✅ Autolinking configuration fixed
- ❌ C++ compilation blocked by NDK compatibility issue

The AppState TurboModule error should be resolved once the build completes successfully.

