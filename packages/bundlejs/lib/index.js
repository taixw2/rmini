'use strict';
const path = require('path');
const fs = require('fs');
const temp = require('temp');
const { rollup } = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const injectPagePath = require('./rollup-plugin-inject-page-path');
const getEnterPath = require('./getEnterPath');

module.exports = bundlejs;

async function bundlejs(appPath, outputPath) {
  const appConfig = getAppConfig(appPath);
  const enterPath = getEnterPath(appPath);
  const plugins = [ resolve(), commonjs() ];

  const polyfillBundle = await rollup({
    input: require.resolve('./polyfill.js'),
    treeshake: false,
    plugins,
  });

  const polyfillContent = await polyfillBundle.generate();
  const polyfillCode = polyfillContent.output[0].code;

  const appBundle = await rollup({ input: enterPath, plugins: [ ...plugins, injectPagePath() ] });
  await appBundle.write({
    intro: polyfill.replace(/\/\*\*\/.*?\/\*\*\//, JSON.stringify(appConfig)),
    file: outputPath,
    format: 'es',
  });
}
