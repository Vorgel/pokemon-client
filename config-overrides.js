module.exports = function override(config, env) {
  // Webpack config from CRA react-scripts has an invalid plugin value for tailwind in version 4
  // This config override fixes it
  const webpackConfigPluginsWithInvalidTailwind4ConfigValue = config.module.rules[1].oneOf.find(rule => rule.test.toString() === '/\\.css$/').use.find(loader => !!loader?.options?.postcssOptions?.plugins).options.postcssOptions.plugins
  const indexOfBadTailwind4Value = webpackConfigPluginsWithInvalidTailwind4ConfigValue.indexOf('tailwindcss');

  if (indexOfBadTailwind4Value > -1) {
    webpackConfigPluginsWithInvalidTailwind4ConfigValue.splice(indexOfBadTailwind4Value, 1);
  }

  webpackConfigPluginsWithInvalidTailwind4ConfigValue.push('@tailwindcss/postcss')

  return config
}