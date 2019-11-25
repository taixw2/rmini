'use strict';
const path = require('path')
const fs = require('fs')
const temp = require('temp')
const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const composeEnter = require('./composeEnter')

module.exports = composejs;

function composejs(appPath, outputPath = "./test1.js") {
  const enterInfo = composeEnter(appPath);

  return rollup.rollup({
    cache: false,
    input: require.resolve('./polyfill.js'),
    treeshake: false,
    plugins: [resolve(), commonjs()]
  })
    .then((bundle) => {
      return bundle.generate({
        format: 'es',
      })
    })
    .then(({ output }) => {
      const polyfill = output[0].code;
      return rollup.rollup({
        input: enterInfo.tempPath,
        plugins: [
          resolve(),
          commonjs(), {
            transform(code, id) {
              if (!/pages/.test(id)) return null
              const pagePath = id.replace(/.*(\/page.*)\.js$/, "$1")
              const result = code.replace(/Page\(/, `Page.__path__="${pagePath}";\nPage(`)
              return { code: result }
            }
          }],
      })
        .then((bundle) => ({ bundle, polyfill }))
    })
    .then(({ bundle, polyfill }) => {
      return bundle.write({
        intro: polyfill.replace(/\/\*\*\/.*?\/\*\*\//, JSON.stringify(enterInfo.appConfig)),
        file: outputPath,
        outro: 'return $$private',
        format: 'es',
      })
    })
    .catch((e) => console.error(e))
}
