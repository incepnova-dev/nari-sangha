const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const path = require('path');
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const apiClientPackage = path.resolve(workspaceRoot, 'packages/api-client');
const sharedI18Package = path.resolve(workspaceRoot, 'packages/shared-i18');

const config = {
  server: {
    port: 8081,
    enhanceMiddleware: (middleware) => {
      return middleware;
    },
  },
  watchFolders: [workspaceRoot, apiClientPackage, sharedI18Package],
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'png', 'jpg', 'jpeg'],
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'],
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
    extraNodeModules: {
      '@narisangha/api-client': apiClientPackage,
      '@narisangha/shared-i18': sharedI18Package,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);




