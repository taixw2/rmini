const fs = require("fs");
const path = require("path");
const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const babelPlugin = require("rollup-plugin-babel");
const terser = require("rollup-plugin-terser");

const cwd = process.cwd();

const { getTemplateEnterPath } = require("./resolve-entry");
const { compilerPolyfill } = require("./polyfill");
/**
 * 编译所有的 javascript 文件
 * 该文件运行在原生的 JavascriptCore 中
 *
 * @param {string} entryDir
 * @param {{ pages: string[] }} appConfig
 * @param {{ setting: { [key as string]: boolean }  }} projectConfig
 */
exports.compilerJavascript = async function(entryDir, appConfig, projectConfig) {
  /**
   * 将 AppConfig 中的 pages 构成一个入口文件
   */
  const templateEntry = await getTemplateEnterPath(appConfig);
  const polyfillCode = await compilerPolyfill(appConfig, projectConfig);

  const rollupPlugins = [resolve(), commonjs()];
  if (projectConfig.setting.es6) {
    rollupPlugins.push(
      babelPlugin({
        babelrc: false,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                esmodules: true,
              },
            },
          ],
        ],
        plugins: ["@babel/plugin-proposal-nullish-coalescing-operator", "@babel/plugin-proposal-optional-chaining"],
        exclude: "node_modules/**",
      })
    );
  }

  if (projectConfig.setting.minified) {
    rollupPlugins.push(terser.terser());
  }

  /**
   * 为每一个 Page 植入一个 pageId 标识
   *
   * @type import('rollup').Plugin
   */
  const injectPageId = {
    name: "__inject_pageid",
    transform(code, id) {
      if (!/pages/.test(id)) return null;
      const pageId = id.substr(cwd.length).replace(/\.js$/, "");
      return { code: "Page.__pageId = '" + pageId + "'\n" + code };
    },
  };
  rollupPlugins.push(injectPageId);

  const code = await rollupCompiler(templateEntry, rollupPlugins, polyfillCode);
  return fs.promises.writeFile(path.join(entryDir, "main.js"), code, { encoding: "utf-8" });
};

function rollupCompiler(entry, plugins, polyfill) {
  return rollup
    .rollup({
      input: entry,
      treeshake: true,
      plugins: plugins,
    })
    .then((bundler) => {
      return bundler.generate({
        format: "iife",
        intro: "const { getApp, wx, App, Page, global } = __polyfill",
        outro: "",
      });
    })
    .then((res) => res.output[0].code)
    .then((code) => {
      return polyfill + code;
    })
    .then((code) => code)
    .catch(console.error);
}
