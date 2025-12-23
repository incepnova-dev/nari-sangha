/**
 * Jest setup file for React Native testing
 * This file runs before each test file
 */

// Ensure Platform is available before React Native is imported
// This is needed for @testing-library/react-native
const ReactNative = require('react-native');
if (!ReactNative.Platform) {
  ReactNative.Platform = {
    OS: 'ios',
    select: jest.fn((dict) => dict.ios),
    Version: 15,
  };
}

// Global test utilities
global.requestAnimationFrame = (callback: FrameRequestCallback) => {
  return setTimeout(callback, 0);
};

global.cancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};

