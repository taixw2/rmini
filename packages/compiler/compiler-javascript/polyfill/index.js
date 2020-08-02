const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const replace = require("@rollup/plugin-replace");
const babelPlugin = require("rollup-plugin-babel");

exports.compilerPolyfill = (AppConfig, ProjectConfig) => {
  /**
   * @type {import('rollup').InputOptions}
   */
  const inputOptions = {
    input: require.resolve("./entry.js"),
    treeshake: true,
    plugins: [
      resolve(),
      commonjs(),
      replace({
        __APPCONFIG__: JSON.stringify(AppConfig),
        __PROJECTCONFIG__: JSON.stringify(ProjectConfig),
      }),
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
        plugins: [
          "@babel/plugin-proposal-nullish-coalescing-operator",
          "@babel/plugin-proposal-optional-chaining",
        ],
        exclude: "node_modules/**",
      }),
    ],
  };

  /**
   * @type {import('rollup').OutputOptions}
   */
  const outputOptions = {
    format: "umd",
    strict: false,
    name: "__polyfill__",
  };

  return rollup
    .rollup(inputOptions)
    .then((bundle) => {
      return bundle.generate(outputOptions);
    })
    .then((res) => res.output[0].code)
    .then((code) => {
      // console.log(code)
      return code;
    });
};

// exports.compilerPolyfill();
