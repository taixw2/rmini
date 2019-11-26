const path = require('path');

module.exports = (appPath) => require(path.join(appPath, 'app.json'));
