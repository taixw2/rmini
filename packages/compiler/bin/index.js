const path = require("path");
const os = require("os");
const compressing = require("compressing");
const { createTemplateEntry } = require("./create-template");
const { compilerHtml } = require("../compiler-html");
const { compilerJavascript } = require("../compiler-javascript");

const cwd = process.cwd();

exports.setup = async function() {
  const projectConfigPath = path.join(cwd, "project.config.json");
  const appConfigPath = path.join(cwd, "app.json");

  const appConfig = require(appConfigPath);
  const projectConfig = require(projectConfigPath);
  const entryDir = await createTemplateEntry(projectConfig);

  await compilerHtml(entryDir, appConfig, projectConfig);
  // 配置，是否需要进行 babel 转换 es6 代码

  // 是否使用 tenser 进行压缩
  await compilerJavascript(entryDir, appConfig, projectConfig);

  const filename = path.join(os.tmpdir(), projectConfig.appid + ".zip")
  await compressing.zip.compressDir(entryDir, filename);
  // TODO: 上传到服务器
  console.log('output', entryDir);
  console.log('output.zip', filename);
};
