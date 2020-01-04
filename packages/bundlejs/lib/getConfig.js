const path = require("path");

exports.appConfig = (appPath) => require(path.join(appPath, "app.json"));
exports.projectConfig = (appPath) => require(path.join(appPath, "project.config.json"));
