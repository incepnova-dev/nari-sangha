// Re-export from shared i18 package
// This adapter allows the web app to use the shared package
// while maintaining the same import path
// webpack is configured via config-overrides.js to resolve @narisangha/shared-i18
// using aliases (similar to Metro's extraNodeModules in mobile app)

export * from '@narisangha/shared-i18';

