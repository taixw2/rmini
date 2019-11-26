'use strict';

module.exports = function promiseify(method, ctx, callback) {
  return (...args) => {
    return new Promise(function(resolve, reject) {
      const defaultCallback = () => (err, result) => {
        if (err) return reject(err);
        return resolve(result ? result.toString('utf8') : result);
      };
      const _callback = callback || defaultCallback;
      method.apply(ctx, [ ...args, _callback(resolve, reject) ]);
    });
  };
};
