# NariSangha - React Native Android App

A React Native Android application built from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Java Development Kit (JDK)** 17 or higher
- **Android Studio** with Android SDK
- **Android SDK Platform 34** and **Android SDK Build-Tools 34.0.0**
- **Android Emulator** or a physical Android device with USB debugging enabled

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Android environment:**
   - Open Android Studio
   - Install Android SDK Platform 34 and Build Tools 34.0.0
   - Set up an Android Virtual Device (AVD) or connect a physical device

3. **Configure environment variables (optional):**
   Create a `.env` file in the root directory if needed for environment-specific configurations.

## Running the App in Android Emulator

Follow these step-by-step instructions to run the application in an Android emulator:

### Step 1: Verify Prerequisites

First, verify that you have all required tools installed:

```bash
# Check Node.js version (should be v18 or higher)
node --version

# Check npm version
npm --version

# Check Java version (should be JDK 17 or higher)
java -version

# Check if Android SDK is configured (should show Android SDK path)
echo $ANDROID_HOME
# OR on macOS/Linux:
echo $ANDROID_SDK_ROOT
```

### Step 2: Install Dependencies

Navigate to the project directory and install all npm dependencies:

```bash
cd apps/mobile
npm install
```

### Step 3: Set Up Android Emulator

**Option A: Using Android Studio GUI**
1. Open **Android Studio**
2. Click on **Tools** → **Device Manager** (or **AVD Manager**)
3. Click **Create Device**
4. Select a device (e.g., Pixel 5, Pixel 6)
5. Select a system image (e.g., Android 13.0 - API Level 33, or Android 14.0 - API Level 34)
6. Click **Finish** to create the AVD

**Option B: Using Command Line**
```bash
# List available system images
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --list | grep system-images

# Create an AVD (replace with your preferred image)
$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager create avd -n Pixel_5_API_34 -k "system-images;android-34;google_apis;x86_64"
```

### Step 4: Start the Android Emulator

**Option A: From Android Studio**
1. Open **Android Studio**
2. Go to **Tools** → **Device Manager**
3. Click the **Play** button (▶️) next to your emulator

**Option B: From Command Line**
```bash
# List available AVDs
emulator -list-avds

# Start a specific emulator (replace with your AVD name)
emulator -avd Pixel_5_API_34

# Or start with specific options
emulator -avd Pixel_5_API_34 -no-snapshot-load
```

**Option C: Using Android Studio's emulator command**
```bash
# On macOS/Linux
$ANDROID_HOME/emulator/emulator -avd Pixel_5_API_34

# Or if emulator is in your PATH
emulator -avd Pixel_5_API_34
```

Wait for the emulator to fully boot (you'll see the Android home screen).

### Step 5: Verify Emulator is Running

In a new terminal, verify that the emulator is detected:

```bash
# Check connected devices (should show your emulator)
adb devices
```

You should see output like:
```
List of devices attached
emulator-5554   device
```

### Step 6: Start Metro Bundler

In a **new terminal window**, navigate to the project directory and start the Metro bundler:

```bash
cd apps/mobile
npm start
```

The Metro bundler will start and display a QR code. Keep this terminal window open.

**Alternative: Start Metro with cache reset (if you encounter issues)**
```bash
npm start -- --reset-cache
```

### Step 7: Build and Run the App

In **another new terminal window**, run the Android build command:

```bash
cd apps/mobile
npm run android
```

This command will:
1. Build the Android APK
2. Install it on the running emulator
3. Launch the app automatically

**Note:** The first build may take several minutes as Gradle downloads dependencies.

### Step 8: View the App

The app should automatically open on your emulator. If it doesn't, you can manually launch it from the app drawer on the emulator.

### Quick Start (All-in-One)

If you already have everything set up, you can run these commands in sequence:

```bash
# Terminal 1: Start Metro bundler
cd apps/mobile
npm start

# Terminal 2: Start emulator (if not already running)
emulator -avd Pixel_5_API_34

# Terminal 3: Build and run the app
cd apps/mobile
npm run android
```

### Alternative: Using Android Studio

You can also run the app directly from Android Studio:

1. Open Android Studio
2. Click **File** → **Open** and select the `android` folder in your project
3. Wait for Gradle sync to complete
4. Start your emulator from **Tools** → **Device Manager**
5. Click the **Run** button (▶️) or press `Shift+F10` (Windows/Linux) or `Ctrl+R` (macOS)

## Project Structure

```
apps/mobile/
├── android/                    # Android native code
│   ├── app/
│   │   └── src/main/
│   │       ├── java/com/narisangha/
│   │       └── res/
│   ├── build.gradle
│   └── settings.gradle
├── src/                        # React Native source code
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── Home.tsx           # Home screen (post-login)
│   │   └── Landing.tsx        # Landing screen (pre-login)
│   ├── services/              # API services
│   │   ├── apiClient.ts       # HTTP client
│   │   └── authService.ts     # Authentication service
│   ├── config/                # Configuration
│   │   └── env.ts             # Environment variables
│   ├── i18/                   # Internationalization
│   │   ├── en/                # English translations
│   │   ├── hi/                # Hindi translations
│   │   ├── bn/                # Bengali translations
│   │   └── kn/                # Kannada translations
│   ├── styles/                # Stylesheets
│   │   ├── components/         # Component-specific styles
│   │   ├── common/            # Shared styles
│   │   └── theme/             # Theme constants
│   ├── __tests__/             # Test files
│   └── App.tsx                # Main React component
├── scripts/                   # Utility scripts
├── docs/                      # Documentation
├── index.ts                   # Entry point (TypeScript)
├── index.js                   # Entry point (JavaScript wrapper)
├── package.json               # Dependencies and scripts
├── babel.config.js            # Babel configuration
├── metro.config.js            # Metro bundler configuration
├── jest.config.js             # Jest test configuration
└── tsconfig.json              # TypeScript configuration
```

## Features

- ✅ Modern React Native setup with TypeScript
- ✅ Authentication flow (Login/Sign Up)
- ✅ Multi-language support (English, Hindi, Bengali, Kannada)
- ✅ API integration with centralized services
- ✅ Component-based architecture
- ✅ Organized stylesheet system
- ✅ Comprehensive test suite
- ✅ SafeAreaView for proper screen handling
- ✅ Ready for Android development

## Development

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Running Tests

#### Quick Commands

**Run All Tests**
```bash
cd android
./gradlew test
```

**Run Specific Test Class**
```bash
cd android
./gradlew test --tests "com.narisangha.MainActivityTest"
```

**Run with Clean Build**
```bash
cd android
./gradlew clean test
```

**Generate HTML Report**
```bash
cd android
./gradlew test
# Report available at: android/app/build/reports/tests/testDebugUnitTest/index.html
# Test summary auto-generated at: docs/TEST_SUITE_SUMMARY.md
```

#### Test Suite Information

- **Total Tests:** 29 tests across 3 test classes
- **Test Summary:** See `docs/TEST_SUITE_SUMMARY.md` for detailed results
- **Test Coverage:** All Java classes (CustomReactActivityDelegate, MainActivity, MainApplication)
- **Test Framework:** JUnit 4.13.2 with Robolectric 4.11.1

For detailed test execution summary, see [Test Suite Summary](docs/TEST_SUITE_SUMMARY.md).

### Making Changes

1. Edit `src/App.tsx` to modify the main component
2. Components are located in `src/components/`
3. Services and API calls are in `src/services/`
4. The app will automatically reload when you save changes
5. Press `R` twice in the Metro bundler terminal to reload manually

## Troubleshooting

### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Android build issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Node modules issues
```bash
rm -rf node_modules
npm install
```

## Building for Production

1. Generate a release keystore (if you haven't already)
2. Update `android/app/build.gradle` with your signing config
3. Build the APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
4. The APK will be located at `android/app/build/outputs/apk/release/app-release.apk`

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Android Development Guide](https://developer.android.com/guide)
- [React Native Community](https://reactnative.dev/community/overview)

## License

This project is open source and available under the MIT License.

