# Component Test Suite

This directory contains all test cases for components in the `src/components/` folder.

## Test Structure

```
src/__tests__/
├── components/
│   ├── UnauthenticatedLanding.test.tsx
│   └── index.test.ts
├── setup.ts
├── test-suite.ts
└── README.md
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Specific Test File
```bash
npm test -- UnauthenticatedLanding.test.tsx
```

### Run Tests Matching a Pattern
```bash
npm test -- --testNamePattern="Rendering"
```

## Test Coverage

Tests cover:
- Component rendering
- User interactions (button clicks, modal operations)
- Callback functions
- Language support
- Props handling
- Accessibility

## Writing New Tests

When adding a new component:

1. Create a test file: `src/__tests__/components/ComponentName.test.tsx`
2. Follow the existing test structure
3. Mock external dependencies
4. Test all user interactions
5. Test all props and callbacks
6. Update this README if needed

## Test Best Practices

- Use `@testing-library/react-native` for rendering and interactions
- Mock external dependencies (languages, APIs, etc.)
- Test user interactions, not implementation details
- Use descriptive test names
- Group related tests with `describe` blocks
- Clean up after each test with `beforeEach` or `afterEach`

