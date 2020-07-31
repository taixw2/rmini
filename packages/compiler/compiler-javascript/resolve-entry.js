const fs = require("fs");
const path = require("path");
const temp = require("temp");
const cwd = process.cwd();

/**
 * 生成临时文件，把所有的 pages 用 import 导出
 * 
 * @param {*} appConfig 
 */
exports.getTemplateEnterPath = async (appConfig) => {
  const openFile = temp.openSync("rmini");
  const content = appConfig.pages.reduce((p, c) => p + "\n" + `import '${path.join(cwd, c)}'`, "");
  await fs.promises.writeFile(openFile.path, content);
  fs.close(openFile.fd, () => null);
  return openFile.path;
};
