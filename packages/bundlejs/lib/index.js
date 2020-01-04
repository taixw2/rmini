"use strict";
const { rollup } = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const injectPagePath = require("./rollup-plugin-inject-page-path");
const getEnterPath = require("./getEnterPath");
const getConfig = require("./getConfig");

module.exports = bundlejs;

async function bundlejs(appPath, outputPath) {
  const appConfig = getConfig.appConfig(appPath);
  const projectConfig = getConfig.projectConfig(appPath);
  const enterPath = getEnterPath(appPath);
  const plugins = [ resolve(), commonjs() ];

  const polyfillBundle = await rollup({
    input: require.resolve("./polyfill.js"),
    treeshake: false,
    plugins,
  });

  const polyfillContent = await polyfillBundle.generate({ format: "es" });
  const polyfillCode = polyfillContent.output[0].code;

  const appBundle = await rollup({ input: enterPath, plugins: [ ...plugins, injectPagePath() ] });
  await appBundle.write({
    intro: polyfillCode
      .replace("/*appconfig*/ {} /**/", JSON.stringify(appConfig))
      .replace("/*projectconfig*/ {} /**/", JSON.stringify(projectConfig)),
    file: outputPath,
    format: "es",
  });
}
