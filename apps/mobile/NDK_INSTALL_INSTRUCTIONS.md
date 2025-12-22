# NDK 26.x Installation Instructions

## Problem
React Native 0.83 with NDK 25.1.8937393 has C++20 compatibility issues:
- `error: no member named 'regular' in namespace 'std'`
- `error: no type named 'identity' in namespace 'std'`

## Solution
Upgrade to NDK 26.1.10909125 (or later 26.x version).

## Installation Methods

### Method 1: Android Studio (Recommended)

1. **Open Android Studio**
2. **Open SDK Manager:**
   - Go to **Tools** → **SDK Manager**
   - Or click the SDK Manager icon in the toolbar
3. **Navigate to SDK Tools:**
   - Click on the **"SDK Tools"** tab
   - Check **"Show Package Details"** at the bottom
4. **Install NDK 26.1.10909125:**
   - Expand **"NDK (Side by side)"**
   - Check the box for **"26.1.10909125"**
   - Uncheck any older versions if you want to save space
   - Click **"Apply"** and wait for the download/installation to complete
5. **Verify Installation:**
   ```bash
   ls -la $ANDROID_HOME/ndk/
   ```
   You should see `26.1.10909125` directory.

### Method 2: Command Line (if SDK command-line tools are installed)

1. **Download SDK Command-line Tools** (if not already installed):
   - Visit: https://developer.android.com/studio#command-tools
   - Download the latest command-line tools for your OS
   - Extract to: `$ANDROID_HOME/cmdline-tools/latest/`

2. **Install NDK:**
   ```bash
   $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager "ndk;26.1.10909125"
   ```

3. **Accept Licenses:**
   ```bash
   $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --licenses
   ```

### Method 3: Manual Download (Advanced)

1. **Download NDK:**
   - Visit: https://developer.android.com/ndk/downloads
   - Download NDK 26.1.10909125 for your OS

2. **Extract to NDK directory:**
   ```bash
   # macOS/Linux
   unzip android-ndk-r26b-darwin.zip -d $ANDROID_HOME/ndk/
   # Or extract manually to: $ANDROID_HOME/ndk/26.1.10909125/
   ```

## After Installation

1. **Clean the build:**
   ```bash
   cd android
   ./gradlew clean
   ```

2. **Verify NDK version:**
   ```bash
   cat android/build.gradle | grep ndkVersion
   ```
   Should show: `ndkVersion = "26.1.10909125"`

3. **Build the app:**
   ```bash
   ./gradlew assembleDebug
   ```

## Troubleshooting

### Build still fails with C++20 errors
- Make sure you've cleaned the build: `./gradlew clean`
- Verify NDK is installed: `ls $ANDROID_HOME/ndk/26.1.10909125`
- Check `android/build.gradle` has `ndkVersion = "26.1.10909125"`

### Android Studio doesn't show NDK 26.x
- Make sure you have the latest Android Studio version
- Try updating Android Studio: **Help** → **Check for Updates**
- The NDK version might be slightly different (e.g., 26.2.x) - that's fine, just update the version in `build.gradle`

### Multiple NDK versions
- You can keep multiple NDK versions installed
- The build will use the version specified in `android/build.gradle`
- To save space, you can uninstall NDK 25.1.8937393 after confirming 26.x works

## Verification

After installation, the build should complete without C++20 errors. You should see:
```
BUILD SUCCESSFUL
```

Instead of:
```
error: no member named 'regular' in namespace 'std'
error: no type named 'identity' in namespace 'std'
```

