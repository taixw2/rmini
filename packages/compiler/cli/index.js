#!/usr/bin/env node

const pkg = require("../package.json");

console.log("Hello~ welcome to rmini", pkg.version);

require("../bin/index").setup();
