'use strict';
const { Actions } = require('react-native-router-flux ')
const methods = require('./methods')

module.exports = rminiAdaptor;

rminiAdaptor.navigateTo = function navigateTo(options) {
  Actions.push('webview', options);
}

rminiAdaptor.request = function request(options) {
  fetch(options.url, {
    body: JSON.stringify(options.data),
    method: options.method
  })
  .then((response) => {
    return response.json()
    .then((data) => {
      options.success({
        data,
        statusCode: response.status,
        header: response.headers,
      })
    })
  })
  .catch(() => {
    options.fail()
  })
}
