"use strict";
const fs = require("fs");

function promiseify(method, ctx, callback) {
  return (...args) => {
    return new Promise(function(resolve, reject) {
      const defaultCallback = () => (err, result) => {
        if (err) return reject(err);
        return resolve(result ? result.toString("utf8") : result);
      };
      const _callback = callback || defaultCallback;
      method.apply(ctx, [ ...args, _callback(resolve, reject) ]);
    });
  };
}

exports.promiseify = promiseify;

exports.fsify = {
  readFile: promiseify(fs.readFile, fs),
  writeFile: promiseify(fs.writeFile, fs),
  exists: promiseify(fs.exists, fs, (resolve) => (existed) => resolve(existed)),
  mkdir: promiseify(fs.mkdir, fs),
  rmDir: promiseify(fs.rmdir, fs),
};
