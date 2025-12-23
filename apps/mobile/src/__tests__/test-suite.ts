/**
 * Test Suite Runner
 * 
 * This file can be used to run all tests in the test suite.
 * Run with: npm test or jest
 */

// Import all test files to ensure they're included in the test run
import './components/Landing.test';

/**
 * Test Suite Configuration
 * 
 * All component tests should follow this structure:
 * - Place test files in src/__tests__/components/
 * - Name test files as ComponentName.test.tsx
 * - Use @testing-library/react-native for testing
 * - Mock external dependencies
 * - Test rendering, interactions, and callbacks
 */

export const testSuiteConfig = {
  components: [
    'Landing',
  ],
  testLocation: 'src/__tests__/components/',
  testPattern: '*.test.tsx',
};

