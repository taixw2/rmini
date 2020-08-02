const fs = require("fs");
const path = require("path");
const temp = require("temp");
const cwd = process.cwd();

/**
 * 生成临时文件，把所有的 pages 用 import 导出
 *
 * @param {*} appConfig
 */
exports.createTemplateEnter = async (appConfig) => {
  const openFile = temp.openSync("rmini");
  let prefix = `import '${path.join(cwd, "app.js")}'`;
  const content = appConfig.pages.reduce((p, c) => p + "\n" + `import '${path.join(cwd, c)}'`, prefix);
  await fs.promises.writeFile(openFile.path, content);
  fs.close(openFile.fd, () => null);
  return openFile.path;
};
