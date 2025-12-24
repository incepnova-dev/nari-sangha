const path = require('path');

module.exports = function override(config, env) {
  // Configure webpack similar to Metro's extraNodeModules in mobile app
  // This maps workspace packages directly, just like Metro does
  const projectRoot = __dirname;
  const workspaceRoot = path.resolve(projectRoot, '../..');
  const sharedI18Package = path.resolve(workspaceRoot, 'packages/shared-i18');

  // Configure resolve aliases (similar to Metro's extraNodeModules)
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};
  config.resolve.alias['@narisangha/shared-i18'] = path.resolve(
    sharedI18Package,
    'src'
  );

  // Remove ModuleScopePlugin to allow imports from workspace packages
  if (config.resolve && config.resolve.plugins) {
    config.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => {
        // Remove ModuleScopePlugin which blocks imports outside src/
        return !(
          plugin.constructor &&
          plugin.constructor.name === 'ModuleScopePlugin'
        );
      }
    );
  }

  // Configure babel-loader to process TypeScript files from shared-i18 package
  // Create React App uses babel-loader to process TypeScript files
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
  if (oneOfRule) {
    // Find all rules that process TypeScript/TSX files
    oneOfRule.oneOf.forEach((rule) => {
      if (
        rule.test &&
        (rule.test.toString().includes('tsx?') ||
          rule.test.toString().includes('ts'))
      ) {
        // Add shared-i18 package to the include paths
        // Preserve existing includes (typically src/) and add the shared package
        const srcPath = path.resolve(projectRoot, 'src');
        if (rule.include) {
          if (Array.isArray(rule.include)) {
            // Add shared package if not already included
            if (!rule.include.some((inc) => inc.includes('shared-i18'))) {
              rule.include.push(sharedI18Package);
            }
          } else {
            // Convert single include to array and add shared package
            rule.include = [rule.include, sharedI18Package];
          }
        } else {
          // If no include specified, add both src and shared package
          rule.include = [srcPath, sharedI18Package];
        }
      }
    });
  }
  
  return config;
};

