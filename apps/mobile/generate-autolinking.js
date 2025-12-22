const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const androidDir = path.join(__dirname, 'android');
const appDir = path.join(androidDir, 'app');
const buildDir = path.join(appDir, 'build', 'generated', 'autolinking');

// Ensure directories exist
const packageListDir = path.join(buildDir, 'com', 'facebook', 'react');
const jniDir = path.join(buildDir, 'src', 'main', 'jni');
fs.mkdirSync(packageListDir, {recursive: true});
fs.mkdirSync(jniDir, {recursive: true});
fs.mkdirSync(path.join(androidDir, 'build', 'generated', 'autolinking'), {recursive: true});

// Generate PackageList.java
const packageListJava = `package com.facebook.react;

import java.util.Arrays;
import java.util.List;

// Autolinking package list
public class PackageList {
  private ReactApplicationContext reactContext;

  public PackageList(ReactApplicationContext reactContext) {
    this.reactContext = reactContext;
  }

  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // No packages to autolink
    );
  }
}
`;

fs.writeFileSync(path.join(packageListDir, 'PackageList.java'), packageListJava);

// Generate autolinking.json
const autolinkingJson = {
  project: {
    android: {
      packageName: 'com.narisangha'
    }
  },
  dependencies: {}
};

fs.writeFileSync(
  path.join(androidDir, 'build', 'generated', 'autolinking', 'autolinking.json'),
  JSON.stringify(autolinkingJson, null, 2)
);

// Generate minimal autolinking.h and autolinking.cpp for New Architecture
const autolinkingH = `#pragma once

// Fix for C++20 compatibility with NDK 25.1.8937393
#include <concepts>
#include <functional>

#include <ReactCommon/CallInvoker.h>
#include <ReactCommon/JavaTurboModule.h>
#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>

namespace facebook {
namespace react {

std::shared_ptr<TurboModule> autolinking_ModuleProvider(const std::string moduleName, const JavaTurboModule::InitParams &params);
std::shared_ptr<TurboModule> autolinking_cxxModuleProvider(const std::string moduleName, const std::shared_ptr<CallInvoker>& jsInvoker);
void autolinking_registerProviders(std::shared_ptr<ComponentDescriptorProviderRegistry const> providerRegistry);

} // namespace react
} // namespace facebook
`;

const autolinkingCpp = `#include "autolinking.h"

namespace facebook {
namespace react {

std::shared_ptr<TurboModule> autolinking_ModuleProvider(const std::string moduleName, const JavaTurboModule::InitParams &params) {
  // No autolinked modules
  return nullptr;
}

std::shared_ptr<TurboModule> autolinking_cxxModuleProvider(const std::string moduleName, const std::shared_ptr<CallInvoker>& jsInvoker) {
  // No autolinked modules
  return nullptr;
}

void autolinking_registerProviders(std::shared_ptr<ComponentDescriptorProviderRegistry const> providerRegistry) {
  // No autolinked modules
}

} // namespace react
} // namespace facebook
`;

fs.writeFileSync(path.join(jniDir, 'autolinking.h'), autolinkingH);
fs.writeFileSync(path.join(jniDir, 'autolinking.cpp'), autolinkingCpp);

console.log('✓ Generated autolinking files');

