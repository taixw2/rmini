const fs = require('fs');
const path = require('path');
const temp = require('temp');
const getAppConfig = require('./getAppConfig');

module.exports = function getEnterPath(appPath) {
  const appConfig = getAppConfig(appPath);
  const { fd, path: tempPath } = temp.openSync('rmini');

  function importStmt(relativePath) {
    const vari = relativePath.split('/').join('_');
    return `import * as ${vari} from "${path.join(appPath, relativePath)}"`;
  }

  fs.writeFileSync(fd, appConfig.pages.map(importStmt).join(';\n'));
  fs.close(fd, () => null);
  return tempPath;
};
