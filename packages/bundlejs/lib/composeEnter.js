const fs = require('fs')
const path = require('path')
const temp = require('temp')

module.exports = function composeEnter(appPath) {
  const appConfig = require(path.join(appPath, 'app.json'));
  temp.track();
  const { fd, path: tempPath } = temp.openSync('rmini');

  function importStmt(relativePath) {
    const vari = relativePath.split('/').join('_');
    return `import * as ${vari} from "${path.join(appPath, relativePath)}"`
  }

  fs.writeFileSync(fd, appConfig.pages.map(importStmt).join(';\n'));
  fs.close(fd);
  return { tempPath, appConfig };
}
