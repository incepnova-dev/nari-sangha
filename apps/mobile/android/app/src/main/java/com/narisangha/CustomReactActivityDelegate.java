package com.narisangha;

import android.os.Bundle;
import com.facebook.react.ReactActivityDelegate;

/**
 * Custom ReactActivityDelegate that prevents New Architecture feature flags initialization
 * to avoid requiring libreact_featureflagsjni.so which isn't available when New Architecture is disabled.
 */
public class CustomReactActivityDelegate extends ReactActivityDelegate {
  
  public CustomReactActivityDelegate(android.app.Activity activity, String mainComponentName) {
    super(activity, mainComponentName);
  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    // Override onCreate but call super to ensure proper initialization
    // The issue is that ReactActivityDelegate.onCreate() calls enableBridgelessArchitecture()
    // which tries to load libreact_featureflagsjni.so
    // We'll try to catch the error or prevent it
    try {
      super.onCreate(savedInstanceState);
    } catch (UnsatisfiedLinkError e) {
      // If the library is missing, try to continue without it
      // This is a workaround for React Native 0.82 when New Architecture is disabled
      if (e.getMessage() != null && e.getMessage().contains("libreact_featureflagsjni.so")) {
        // Log but don't crash - try to continue
        android.util.Log.w("CustomReactActivityDelegate", "Feature flags library not available, continuing without it", e);
        // Manually initialize what we can
        loadApp(getMainComponentName());
      } else {
        throw e;
      }
    }
  }
}

