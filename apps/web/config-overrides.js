const path = require('path');

module.exports = function override(config, env) {
  // Configure webpack similar to Metro's extraNodeModules in mobile app
  // This maps workspace packages directly, just like Metro does
  const projectRoot = __dirname;
  const workspaceRoot = path.resolve(projectRoot, '../..');
  const sharedI18Package = path.resolve(workspaceRoot, 'packages/shared-i18');
  const apiClientPackage = path.resolve(workspaceRoot, 'packages/api-client');

  // Configure resolve aliases (similar to Metro's extraNodeModules)
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};
  config.resolve.alias['@narisangha/shared-i18'] = path.resolve(
    sharedI18Package,
    'src'
  );
  config.resolve.alias['@narisangha/api-client'] = path.resolve(
    apiClientPackage,
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

  // Configure babel-loader to process TypeScript files from workspace packages
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
        // Add workspace packages to the include paths
        // Preserve existing includes (typically src/) and add the shared packages
        const srcPath = path.resolve(projectRoot, 'src');
        const packagesToInclude = [sharedI18Package, apiClientPackage];
        
        if (rule.include) {
          if (Array.isArray(rule.include)) {
            // Add packages if not already included
            packagesToInclude.forEach((pkg) => {
              if (!rule.include.some((inc) => inc.includes(path.basename(pkg)))) {
                rule.include.push(pkg);
              }
            });
          } else {
            // Convert single include to array and add packages
            rule.include = [rule.include, ...packagesToInclude];
          }
        } else {
          // If no include specified, add both src and packages
          rule.include = [srcPath, ...packagesToInclude];
        }
      }
    });
  }
  
  return config;
};

